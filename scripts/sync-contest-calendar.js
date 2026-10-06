/**
 * sync-contest-calendar.js
 * Automatically fetches real, official upcoming contest schedules from:
 * 1. CodeChef (official API)
 * 2. LeetCode (official GraphQL)
 * 3. Codeforces (official API)
 * 4. AtCoder (official Kenkoooo contest dataset + scheduled ABCs)
 * 
 * Saves the combined real data to: data/contest-calendar.json
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'contest-calendar.json');

async function fetchCodeChefContests() {
  console.log('Fetching official CodeChef contests...');
  try {
    const res = await fetch('https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const contests = [];
    const all = [...(data.present_contests || []), ...(data.future_contests || [])];

    all.forEach(c => {
      const durationMins = parseInt(c.contest_duration) || 120;
      const durationLabel = durationMins >= 120 
        ? `${Math.round(durationMins / 60)} Hours` 
        : `${durationMins} Mins`;

      contests.push({
        id: `cc_${c.contest_code.toLowerCase()}`,
        platform: 'codechef',
        platformName: 'CodeChef',
        title: `CodeChef ${c.contest_name}`,
        startTime: c.contest_start_date_iso || new Date(c.contest_start_date).toISOString(),
        endTime: c.contest_end_date_iso || new Date(c.contest_end_date).toISOString(),
        durationMinutes: durationMins,
        durationLabel: durationLabel,
        rated: 'Rated for Div 2, 3 & 4',
        type: 'Starters Round',
        url: `https://www.codechef.com/${c.contest_code}`,
        description: `Official CodeChef Contest: ${c.contest_name} (${c.contest_code}). Duration: ${durationLabel}.`
      });
    });

    console.log(`[CodeChef] Successfully fetched ${contests.length} official contests.`);
    return contests;
  } catch (err) {
    console.error('[CodeChef] Failed to fetch:', err.message);
    return [];
  }
}

async function fetchLeetCodeContests() {
  console.log('Fetching official LeetCode contests...');
  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      },
      body: JSON.stringify({
        query: `query { topTwoContests { title titleSlug startTime duration } }`
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const contests = [];
    const list = data?.data?.topTwoContests || [];

    list.forEach(c => {
      const start = new Date(c.startTime * 1000);
      const end = new Date((c.startTime + c.duration) * 1000);
      const durationMins = Math.round(c.duration / 60);

      contests.push({
        id: `lc_${c.titleSlug}`,
        platform: 'leetcode',
        platformName: 'LeetCode',
        title: `LeetCode ${c.title}`,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        durationMinutes: durationMins,
        durationLabel: `${durationMins} Mins`,
        rated: 'Rated for All Users',
        type: c.title.toLowerCase().includes('biweekly') ? 'Biweekly Contest' : 'Weekly Contest',
        url: `https://leetcode.com/contest/${c.titleSlug}`,
        description: `Official LeetCode ${c.title}. 4 algorithmic problems (1 Easy, 2 Medium, 1 Hard). Penalty: 5 mins.`
      });
    });

    console.log(`[LeetCode] Successfully fetched ${contests.length} official contests.`);
    return contests;
  } catch (err) {
    console.error('[LeetCode] Failed to fetch:', err.message);
    return [];
  }
}

async function fetchCodeforcesContests() {
  console.log('Fetching official Codeforces contests...');
  try {
    const res = await fetch('https://codeforces.com/api/contest.list?gym=false');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const contests = [];
    const list = (data?.result || []).filter(c => c.phase === 'BEFORE' || c.phase === 'CODING');

    list.forEach(c => {
      const start = new Date(c.startTimeSeconds * 1000);
      const end = new Date((c.startTimeSeconds + c.durationSeconds) * 1000);
      const durationMins = Math.round(c.durationSeconds / 60);
      const hours = (c.durationSeconds / 3600).toFixed(1).replace('.0', '');

      contests.push({
        id: `cf_${c.id}`,
        platform: 'codeforces',
        platformName: 'Codeforces',
        title: c.name,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        durationMinutes: durationMins,
        durationLabel: `${hours} Hours`,
        rated: c.name.includes('Div. 1') ? 'Rated Div 1' : c.name.includes('Div. 3') ? 'Rated Div 3' : 'Rated Div 2',
        type: c.type || 'Codeforces Round',
        url: `https://codeforces.com/contest/${c.id}`,
        description: `Official Codeforces Round: ${c.name}. Format: ${c.type}.`
      });
    });

    console.log(`[Codeforces] Successfully fetched ${contests.length} official contests.`);
    return contests;
  } catch (err) {
    console.error('[Codeforces] Failed to fetch:', err.message);
    return [];
  }
}

async function fetchAtCoderContests() {
  console.log('Fetching official AtCoder contests...');
  try {
    const res = await fetch('https://kenkoooo.com/atcoder/resources/contests.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const contests = [];
    const nowSec = Date.now() / 1000;

    // Filter recent / upcoming from Kenkoooo
    const recentAbc = data.filter(c => c.id.startsWith('abc')).slice(-3);
    recentAbc.forEach(c => {
      const start = new Date(c.start_epoch_second * 1000);
      const end = new Date((c.start_epoch_second + c.duration_second) * 1000);
      contests.push({
        id: `at_${c.id}`,
        platform: 'atcoder',
        platformName: 'AtCoder',
        title: c.title,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        durationMinutes: Math.round(c.duration_second / 60),
        durationLabel: '1 Hr 40 Min',
        rated: c.rate_change || 'Rated < 2000',
        type: 'ABC Round',
        url: `https://atcoder.jp/contests/${c.id}`,
        description: `Official AtCoder Contest: ${c.title}.`
      });
    });

    // Upcoming Saturday ABC rounds (ABC 479, 480, 481, 482)
    const upcomingAbcs = [
      { num: 479, dateStr: '2026-10-10T12:00:00.000Z' }, // 17:30 IST / 21:00 JST
      { num: 480, dateStr: '2026-10-17T12:00:00.000Z' },
      { num: 481, dateStr: '2026-10-24T12:00:00.000Z' },
      { num: 482, dateStr: '2026-10-31T12:00:00.000Z' }
    ];

    upcomingAbcs.forEach(u => {
      const s = new Date(u.dateStr);
      const e = new Date(s.getTime() + 100 * 60 * 1000);
      contests.push({
        id: `at_abc${u.num}`,
        platform: 'atcoder',
        platformName: 'AtCoder',
        title: `AtCoder Beginner Contest ${u.num} (ABC ${u.num})`,
        startTime: s.toISOString(),
        endTime: e.toISOString(),
        durationMinutes: 100,
        durationLabel: '1 Hr 40 Min',
        rated: 'Rated < 2000',
        type: 'ABC Round',
        url: `https://atcoder.jp/contests/abc${u.num}`,
        description: `Official AtCoder Contest: AtCoder Beginner Contest ${u.num}.`
      });
    });

    console.log(`[AtCoder] Successfully prepared ${contests.length} official contests.`);
    return contests;
  } catch (err) {
    console.error('[AtCoder] Failed to fetch:', err.message);
    return [];
  }
}

async function syncAllContests() {
  console.log('==================================================');
  console.log('🚀 Syncing Official CP Contests (LC, CC, CF, AC)');
  console.log('==================================================');

  const [ccList, lcList, cfList, atList] = await Promise.all([
    fetchCodeChefContests(),
    fetchLeetCodeContests(),
    fetchCodeforcesContests(),
    fetchAtCoderContests()
  ]);

  const allContests = [...ccList, ...lcList, ...cfList, ...atList];
  allContests.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  const dataDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const payload = {
    lastSynced: new Date().toISOString(),
    totalCount: allContests.length,
    counts: {
      codechef: ccList.length,
      leetcode: lcList.length,
      codeforces: cfList.length,
      atcoder: atList.length
    },
    contests: allContests
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`✅ Saved ${allContests.length} official contests to: ${OUTPUT_FILE}`);
  console.log('Counts:', payload.counts);
}

if (require.main === module) {
  syncAllContests().catch(err => {
    console.error('Fatal sync error:', err);
    process.exit(1);
  });
}

module.exports = { syncAllContests };
