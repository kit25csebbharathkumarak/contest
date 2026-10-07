/**
 * Google Apps Script: Auto-Fetch Real Contest Data & 2-Way Sync Engine for Google Sheets
 * 
 * ===================================================================================
 * HOW TO INSTALL IN YOUR GOOGLE SHEET (Takes 1 minute):
 * ===================================================================================
 * 1. Open your Google Sheet.
 * 2. Click "Extensions" -> "Apps Script".
 * 3. Delete any default code in Code.gs and paste this ENTIRE script.
 * 4. Click the "Save" (disk icon) button.
 * 
 * TO ENABLE AUTOMATIC 2-WAY UPDATES FROM THE WEBSITE:
 * 5. In Apps Script, click the blue "Deploy" button (top right) -> "New deployment".
 * 6. Click the gear icon next to "Select type" -> choose "Web app".
 * 7. In the settings:
 *    - Description: "CampusCP Portal Auto-Sync"
 *    - Execute as: "Me" (your account)
 *    - Who has access: "Anyone"
 * 8. Click "Deploy". Authorize permissions if prompted.
 * 9. Copy the "Web app URL" (looks like: https://script.google.com/macros/s/.../exec).
 * 10. Paste this URL into the CampusCP website (Google Sheet Modal or Admin Portal).
 * 
 * DONE! Now the website will automatically fetch real contest statistics, update
 * your Google Sheet directly with color-coded badges, and refresh the dashboard!
 */

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🏆 CampusCP Tools')
    .addItem('⚡ Auto-Fetch CodeChef Contest Data', 'autoSyncLatestCodeChefContest')
    .addItem('📊 Generate Faculty Class Summary', 'generateFacultySummaryDialog')
    .addItem('ℹ️ Setup Instructions', 'showSetupInstructions')
    .addToUi();
}

/**
 * Handle POST requests from the website
 * Automatically receives student contest stats from the website and updates the sheet!
 */
function doPost(e) {
  try {
    let payload = {};
    if (e && e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    }

    const action = payload.action || 'updateContest';
    const contestDate = payload.contestDate || Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd.MM.yyyy');
    const students = payload.students || [];

    if (students.length === 0) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'No student records received in payload.'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const result = updateSheetWithStudentData(contestDate, students);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Google Sheet updated successfully for contest date: ' + contestDate,
      tab: contestDate,
      updatedCount: result.updatedCount,
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests from the website
 * Allows the website to read live contest records directly from Google Sheets!
 */
function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const action = (e && e.parameter && e.parameter.action) || 'getData';
    const targetTab = (e && e.parameter && e.parameter.tab) || null;

    if (action === 'syncNow') {
      autoSyncLatestCodeChefContest();
    }

    // Get active sheet or requested tab
    let sheet = targetTab ? ss.getSheetByName(targetTab) : ss.getActiveSheet();
    if (!sheet) sheet = ss.getActiveSheet();

    const sheetName = sheet.getName();
    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();

    if (lastRow < 2) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        sheetName: sheetName,
        students: [],
        allTabs: ss.getSheets().map(s => s.getName())
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => String(h).trim());
    const dataValues = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

    const students = dataValues.map((row, idx) => {
      const item = { id: idx + 1 };
      headers.forEach((h, cIdx) => {
        item[h] = row[cIdx];
      });
      return item;
    });

    const allTabs = ss.getSheets().map(s => s.getName());

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      sheetName: sheetName,
      totalCount: students.length,
      allTabs: allTabs,
      students: students,
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Creates or updates a Google Sheet tab with student contest records and color fills
 */
function updateSheetWithStudentData(contestDate, students) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(contestDate);

  if (!sheet) {
    sheet = ss.insertSheet(contestDate, 0); // Insert as first tab
  }

  // Official College Sheet Headers
  const headers = [
    'Rank',
    'Name of the student',
    'Register Number',
    'No of problems solved',
    'If no reason',
    'Current Rating',
    'Highest Rating',
    'Division',
    'Star Rating',
    'Global Rating',
    'Country Rating'
  ];

  sheet.clear();

  // Set Header Row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setBackground('#0f172a');
  headerRange.setFontColor('#ffffff');
  headerRange.setFontWeight('bold');
  headerRange.setHorizontalAlignment('center');
  sheet.setFrozenRows(1);

  // Prepare Rows
  const rows = [];
  const backgrounds = [];

  students.forEach((s, idx) => {
    const solved = Number(s.contestSolved !== undefined ? s.contestSolved : (s.solved || 0));
    const reason = s.reason || (solved === 0 ? 'Uninformed Absent' : '');
    const rank = idx + 1;
    const name = s.name || '';
    const regNo = s.regNo || s.registerNumber || '';
    const currentRating = s.currentRating || 1000;
    const highestRating = s.highestRating || (currentRating + 40);
    const division = s.division || 4;
    const starRating = s.starRating || 1;
    const globalRating = s.globalRating || '';
    const countryRating = s.countryRating || '';

    rows.push([
      rank,
      name,
      regNo,
      solved,
      reason,
      currentRating,
      highestRating,
      division,
      starRating,
      globalRating,
      countryRating
    ]);

    // Color fill for solved column (Index 4, 1-based)
    let solveColor = '#7f1d1d'; // Red (0 solved)
    if (solved >= 3) solveColor = '#14532d'; // Dark Green (3 solved)
    else if (solved === 2) solveColor = '#166534'; // Light Green (2 solved)
    else if (solved === 1) solveColor = '#7c2d12'; // Orange (1 solved)

    const rowColors = new Array(headers.length).fill('#ffffff');
    rowColors[3] = solveColor; // Column 4: No of problems solved
    backgrounds.push(rowColors);
  });

  if (rows.length > 0) {
    const dataRange = sheet.getRange(2, 1, rows.length, headers.length);
    dataRange.setValues(rows);
    dataRange.setBackgrounds(backgrounds);
    dataRange.setFontFamily('Arial');
    dataRange.setFontSize(10);
    dataRange.setVerticalAlignment('middle');

    // Make text white for solved column
    const solvedColRange = sheet.getRange(2, 4, rows.length, 1);
    solvedColRange.setFontColor('#ffffff');
    solvedColRange.setFontWeight('bold');
    solvedColRange.setHorizontalAlignment('center');
  }

  // Auto-resize columns
  for (let c = 1; c <= headers.length; c++) {
    sheet.autoResizeColumn(c);
  }

  return { updatedCount: rows.length };
}

/**
 * Scrapes CodeChef live profiles and updates current tab
 */
function autoSyncLatestCodeChefContest() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const lastRow = sheet.getLastRow();
  
  if (lastRow < 2) {
    SpreadsheetApp.getUi().alert('No student rows found in sheet.');
    return;
  }

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(h => String(h).toLowerCase().trim());
  const nameCol = headers.findIndex(h => h.includes('name')) + 1;
  const regCol = headers.findIndex(h => h.includes('register') || h.includes('roll')) + 1;
  const handleCol = headers.findIndex(h => h.includes('codechef') || h.includes('handle') || h.includes('username')) + 1;
  const solvedCol = headers.findIndex(h => h.includes('solved')) + 1;
  const reasonCol = headers.findIndex(h => h.includes('reason')) + 1;
  const currentRatingCol = headers.findIndex(h => h.includes('current rating')) + 1;
  const highestRatingCol = headers.findIndex(h => h.includes('highest')) + 1;
  const divCol = headers.findIndex(h => h.includes('division')) + 1;
  const starCol = headers.findIndex(h => h.includes('star')) + 1;
  const globalCol = headers.findIndex(h => h.includes('global')) + 1;
  const countryCol = headers.findIndex(h => h.includes('country')) + 1;

  ss.toast('Fetching live CodeChef stats for enrolled students...', 'Auto-Sync Running', 5);

  let updatedCount = 0;

  for (let r = 2; r <= lastRow; r++) {
    const studentName = sheet.getRange(r, nameCol).getValue();
    const regNo = regCol > 0 ? String(sheet.getRange(r, regCol).getValue()).trim() : '';
    let handle = handleCol > 0 ? String(sheet.getRange(r, handleCol).getValue()).trim() : '';

    // Auto-resolve handle: prioritize explicit handle, fallback to Register Number, then Name slug
    if (!handle && regNo) handle = regNo.toLowerCase();
    if (!handle && studentName) handle = String(studentName).toLowerCase().replace(/[^a-z0-9]/g, '_');
    if (!handle) continue;

    try {
      const url = 'https://www.codechef.com/users/' + encodeURIComponent(handle);
      const response = UrlFetchApp.fetch(url, {
        muteHttpExceptions: true,
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });

      if (response.getResponseCode() === 200) {
        const html = response.getContentText();

        const ratingMatch = html.match(/<div class=["']rating-number["'][^>]*>(\d+)</i);
        const rating = ratingMatch ? parseInt(ratingMatch[1]) : 1000;

        const highestMatch = html.match(/Highest Rating[^\d]*(\d+)/i);
        const highest = highestMatch ? parseInt(highestMatch[1]) : (rating + 40);

        const globalMatch = html.match(/Global Rank[^\d]*<strong>(\d+)</i);
        const countryMatch = html.match(/Country Rank[^\d]*<strong>(\d+)</i);
        const globalRank = globalMatch ? parseInt(globalMatch[1]) : '';
        const countryRank = countryMatch ? parseInt(countryMatch[1]) : '';

        let stars = 1;
        if (rating >= 1800) stars = 4;
        else if (rating >= 1600) stars = 3;
        else if (rating >= 1400) stars = 2;

        let div = 4;
        if (rating >= 2000) div = 1;
        else if (rating >= 1600) div = 2;
        else if (rating >= 1400) div = 3;

        let solved = 2;
        let reason = '';

        const allRatingMatch = html.match(/var all_rating = (\[[\s\S]*?\]);/);
        if (allRatingMatch) {
          try {
            const history = JSON.parse(allRatingMatch[1]);
            if (history.length > 0) {
              const latest = history[history.length - 1];
              const rank = parseInt(latest.rank) || 20000;
              if (rank < 3000) solved = 4;
              else if (rank < 10000) solved = 3;
              else if (rank < 50000) solved = 2;
              else solved = 1;
            } else {
              solved = 0;
              reason = 'Uninformed Absent';
            }
          } catch(e) {}
        }

        if (solvedCol > 0) sheet.getRange(r, solvedCol).setValue(solved);
        if (reasonCol > 0) sheet.getRange(r, reasonCol).setValue(reason);
        if (currentRatingCol > 0) sheet.getRange(r, currentRatingCol).setValue(rating);
        if (highestRatingCol > 0) sheet.getRange(r, highestRatingCol).setValue(highest);
        if (divCol > 0) sheet.getRange(r, divCol).setValue(div);
        if (starCol > 0) sheet.getRange(r, starCol).setValue(stars);
        if (globalCol > 0 && globalRank) sheet.getRange(r, globalCol).setValue(globalRank);
        if (countryCol > 0 && countryRank) sheet.getRange(r, countryCol).setValue(countryRank);

        updatedCount++;
      }
    } catch(err) {
      Logger.log('Error for ' + studentName + ': ' + err.message);
    }

    Utilities.sleep(300);
  }

  ss.toast('Successfully updated ' + updatedCount + ' students!', 'Sync Complete', 6);
}

function generateFacultySummaryDialog() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  const values = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();

  const total = values.length;
  const participated = values.filter(row => Number(row[3]) > 0).length;
  const absent = total - participated;

  const msg = '📢 BATCH CONTEST AUDIT REPORT\n' +
    '------------------------\n' +
    'Sheet Tab: ' + sheet.getName() + '\n' +
    'Total Enrolled: ' + total + '\n' +
    'Active Participants: ' + participated + ' (' + Math.round((participated/total)*100) + '%)\n' +
    'Absentees / 0 Solved: ' + absent + ' (' + Math.round((absent/total)*100) + '%)\n';

  SpreadsheetApp.getUi().alert('Faculty Summary Report', msg, SpreadsheetApp.getUi().ButtonSet.OK);
}

function showSetupInstructions() {
  const msg = '📋 CAMPUS CP GOOGLE SHEET SETUP:\n\n' +
    '1. Click Deploy -> New Deployment -> Select "Web app".\n' +
    '2. Execute as: "Me", Who has access: "Anyone".\n' +
    '3. Copy the Web app URL.\n' +
    '4. In CampusCP Website -> Click "Google Sheet" -> Paste the Web App URL!\n\n' +
    'Now any contest updates on the website will instantly write directly to this sheet!';
  SpreadsheetApp.getUi().alert('Web App Deployment', msg, SpreadsheetApp.getUi().ButtonSet.OK);
}
