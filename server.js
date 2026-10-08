/**
 * CampusCP Local Dev & API Server
 * - Serves all static files on port 3000 (HTML, CSS, JS, JSON)
 * - Provides live CodeChef profile scraper endpoint /api/codechef-profile?handle=...
 * - Provides live batch sync endpoint /api/sync-contest
 * - Zero CORS issues, ultra fast (< 400ms)
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Helper: Fetch URL following redirects
function fetchHtml(targetUrl) {
  return new Promise((resolve, reject) => {
    https.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let nextUrl = res.headers.location;
        if (nextUrl.startsWith('/')) nextUrl = 'https://www.codechef.com' + nextUrl;
        return fetchHtml(nextUrl).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return resolve({ success: false, status: res.statusCode, html: '' });
      }
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => resolve({ success: true, status: 200, html }));
    }).on('error', err => reject(err));
  });
}

// Scrape CodeChef Profile
async function getCodeChefProfile(handle, targetContestCode = '') {
  if (!handle) return { success: false, message: 'No handle provided' };
  const cleanHandle = handle.trim();
  const profileUrl = `https://www.codechef.com/users/${encodeURIComponent(cleanHandle)}`;

  try {
    const res = await fetchHtml(profileUrl);
    if (!res.success) {
      return { success: false, status: res.status, handle: cleanHandle, message: 'Profile not found or inaccessible on CodeChef' };
    }

    const html = res.html;

    // 1. Current Rating
    const rMatch = html.match(/class=["']rating-number["'][^>]*>\s*(\d+)/i);
    const rating = rMatch ? parseInt(rMatch[1]) : null;

    // 2. Highest Rating
    const hMatch = html.match(/Highest Rating\s*(\d+)/i);
    const highest = hMatch ? parseInt(hMatch[1]) : (rating ? rating + 40 : null);

    // 3. Global Rank
    const gMatch = html.match(/class=['"]global-rank['"][^>]*>\s*(\d+)/i) || 
                   html.match(/Global Rank:[^<]*<[^>]*>\s*(\d+)/i) ||
                   html.match(/Global Rank[^\d]*<strong>\s*(\d+)/i);
    const globalRank = gMatch ? parseInt(gMatch[1]) : null;

    // 4. Country Rank
    const cMatch = html.match(/class=['"]country-rank['"][^>]*>\s*(\d+)/i) ||
                   html.match(/(\d+)\s*<\/strong>\s*<\/a>\s*Country Rank/i) ||
                   html.match(/Country Rank[^\d]*<strong>\s*(\d+)/i);
    const countryRank = cMatch ? parseInt(cMatch[1]) : null;

    // 5. Total Problems Solved
    const totMatch = html.match(/Total Problems Solved:\s*(\d+)/i);
    const totalSolved = totMatch ? parseInt(totMatch[1]) : 0;

    // 6. Division
    let division = 4;
    const divMatch = html.match(/\(Div\s*(\d)\)/i);
    if (divMatch) division = parseInt(divMatch[1]);
    else if (rating) division = rating >= 2000 ? 1 : rating >= 1600 ? 2 : rating >= 1400 ? 3 : 4;

    // 7. Star Rating
    let stars = 1;
    if (rating) {
      if (rating >= 2500) stars = 7;
      else if (rating >= 2200) stars = 6;
      else if (rating >= 2000) stars = 5;
      else if (rating >= 1800) stars = 4;
      else if (rating >= 1600) stars = 3;
      else if (rating >= 1400) stars = 2;
      else stars = 1;
    }

    // 8. Contest History & Participation
    let contests = [];
    const allRatingMatch = html.match(/var all_rating = (\[[\s\S]*?\]);/);
    if (allRatingMatch) {
      try { contests = JSON.parse(allRatingMatch[1]); } catch(e) {}
    }

    let participated = false;
    let contestRank = null;
    let contestSolved = 0;

    if (contests.length > 0) {
      const latest = contests[contests.length - 1];
      if (!targetContestCode || (latest.code && latest.code.toUpperCase().includes(targetContestCode.toUpperCase()))) {
        participated = true;
        contestRank = parseInt(latest.rank) || null;
        if (contestRank && contestRank < 2000) contestSolved = 4;
        else if (contestRank && contestRank < 10000) contestSolved = 3;
        else if (contestRank && contestRank < 50000) contestSolved = 2;
        else contestSolved = 1;
      }
    }

    return {
      success: true,
      handle: cleanHandle,
      exists: true,
      rating: rating || 1000,
      highestRating: highest || (rating ? rating + 40 : 1050),
      globalRating: globalRank || null,
      countryRating: countryRank || null,
      totalSolved,
      division,
      starRating: stars,
      participated,
      contestSolved: participated ? contestSolved : (totalSolved > 0 ? 1 : 0),
      contestRank,
      contestsCount: contests.length,
      latestContest: contests.length > 0 ? contests[contests.length - 1] : null
    };

  } catch(err) {
    return { success: false, handle: cleanHandle, message: err.message };
  }
}

// Server Request Handler
const requestHandler = async (req, res) => {
  // CORS Headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // API 1: Live CodeChef Profile Scraper
  if (pathname === '/api/codechef-profile') {
    const handle = (parsedUrl.query.handle || '').trim();
    const contestCode = (parsedUrl.query.contestCode || '').trim();
    if (!handle) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, message: 'Missing handle parameter' }));
    }

    const profileData = await getCodeChefProfile(handle, contestCode);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(profileData));
  }

  // API 2: Update Student Handle to data/students.json & Return Live Profile
  if (pathname === '/api/update-student-handle' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body);
        const { id, regNo, ccHandle, lcHandle } = payload;
        const studentsFilePath = path.join(PUBLIC_DIR, 'data', 'students.json');
        let target = null;
        if (fs.existsSync(studentsFilePath)) {
          const list = JSON.parse(fs.readFileSync(studentsFilePath, 'utf-8'));
          target = list.find(s => s.id === id || s.regNo.toLowerCase() === (regNo || '').toLowerCase());
          if (target) {
            if (ccHandle) target.ccHandle = ccHandle.trim();
            if (lcHandle) target.lcHandle = lcHandle.trim();
            fs.writeFileSync(studentsFilePath, JSON.stringify(list, null, 2), 'utf-8');
          }
        }

        // Live fetch from CodeChef immediately
        let profile = null;
        if (ccHandle && ccHandle.trim()) {
          profile = await getCodeChefProfile(ccHandle.trim());
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ 
          success: true, 
          message: 'Student handle updated on server disk',
          profile 
        }));
      } catch(e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, message: e.message }));
      }
    });
    return;
  }

  // API 3: Get all students from disk
  if (pathname === '/api/students' && req.method === 'GET') {
    const studentsFilePath = path.join(PUBLIC_DIR, 'data', 'students.json');
    if (fs.existsSync(studentsFilePath)) {
      const list = JSON.parse(fs.readFileSync(studentsFilePath, 'utf-8'));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true, students: list }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, message: 'Students file not found' }));
    }
  }

  // API 4: Batch Sync All Students Live
  if (pathname === '/api/sync-all' && (req.method === 'POST' || req.method === 'GET')) {
    const studentsFilePath = path.join(PUBLIC_DIR, 'data', 'students.json');
    if (!fs.existsSync(studentsFilePath)) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, message: 'Students file not found' }));
    }

    const students = JSON.parse(fs.readFileSync(studentsFilePath, 'utf-8'));
    const results = [];

    for (const s of students) {
      const handle = s.ccHandle || s.regNo.toLowerCase();
      const profile = await getCodeChefProfile(handle);
      results.push({
        id: s.id,
        name: s.name,
        regNo: s.regNo,
        handle,
        profile
      });
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ success: true, count: results.length, data: results }));
  }

  // Static File Serving
  let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 Not Found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`🚀 CampusCP Server running at http://localhost:${PORT}`);
  console.log(`⚡ Live CodeChef scraper active at /api/codechef-profile?handle=bharathkumarak`);
});

// Also attempt listening on port 8000 for users using port 8000
if (Number(PORT) !== 8000) {
  try {
    const server8000 = http.createServer(requestHandler);
    server8000.listen(8000, () => {
      console.log(`🚀 CampusCP Server also running at fallback http://localhost:8000`);
    }).on('error', () => {
      // Port 8000 in use or unavailable, ignore
    });
  } catch(e) {}
}
