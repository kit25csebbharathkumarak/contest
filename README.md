# 🏆 CampusCP - Competitive Programming Portal & Live Contest Automation

A comprehensive, dark-themed competitive programming web app for college students and faculty. Built strictly using **HTML5, Vanilla CSS, and JavaScript (ES6+)**.

---

## ⚡ Automated Real Contest Data Fetching

The portal now features **3 ways to automatically fetch real contest data** (problems solved, ratings, ranks, absentees) right after any contest finishes:

### 1. 🤖 Automated GitHub Actions (Runs After Every Contest)
- File: [`.github/workflows/auto-contest-sync.yml`](.github/workflows/auto-contest-sync.yml)
- **Automatic Schedule**: Runs every **Wednesday at 22:45 IST** (right after CodeChef Starters finishes at 22:30 IST).
- **What it does**:
  1. Queries CodeChef's live rankings and profiles for all enrolled college students.
  2. Extracts real problems solved, current rating, highest rating, star rating, global rank, and country rank.
  3. Automatically flags students who did not submit as **"Uninformed Absent"** (`solved: 0`).
  4. Automatically commits and updates [`data/contests.json`](data/contests.json) and [`sample-sheet-data.csv`](sample-sheet-data.csv).
  5. Can also be triggered manually anytime under the GitHub **Actions** tab &rarr; **Run workflow**.

### 2. ⚡ Live Auto-Fetch Engine in the Faculty & Admin Portal
- Located inside the web app: **Faculty & Admin Portal &rarr; Real Contest Auto-Fetch Engine**.
- Enter any contest code (e.g. `START155`, `START154`) and click **"⚡ Fetch Real Data & Update Leaderboard"**.
- Displays a real-time progress bar and log stream as it syncs all student handles and updates rankings immediately.

### 3. 📑 Google Sheets Auto-Sync (Apps Script)
- File: [`GoogleAppsScript_CodeChef_AutoSync.js`](GoogleAppsScript_CodeChef_AutoSync.js)
- For faculty who maintain the Google Sheet:
  1. In Google Sheets, click **Extensions &rarr; Apps Script**.
  2. Paste the code from `GoogleAppsScript_CodeChef_AutoSync.js` and click **Save**.
  3. Reload your sheet to get the **"🏆 Contest Tools"** menu with **"⚡ Auto-Fetch CodeChef Contest Data"**.
  4. Set a weekly time trigger in Apps Script to populate the sheet automatically every Wednesday night!

---

## 🌟 The 3 Main Views

Switch between views anytime using the top navigation bar:

### 1. 📊 Overall Leaderboard (`#viewOverall`)
- **College-Wide Rankings**: Total problems solved across platforms (LeetCode, Codeforces, CodeChef, AtCoder).
- **Hall of Fame**: Visual top 3 champions podium with Gold 🥇, Silver 🥈, and Bronze 🥉 awards.
- **Search & Filters**: Search by Name or Roll Number; filter by Department (CSE, IT, ECE, AI&DS, CSBS, EEE) and Year (1st–4th Year).
- **Platform Focus Tabs**: Overall Standing, LeetCode Focus, Codeforces Focus, CodeChef Focus, and AtCoder Focus.

### 2. ⚡ Daily Contest Tracker (`#viewContest`)
- **Direct Match with Your College Spreadsheet**:
  - Replicates your bottom date tabs (`05.10.2026`, `30.09.2026`, `28.09.2026`, `23.09.2026`, etc.).
  - Preserves all spreadsheet columns:
    - `Rank`
    - `Name of the student`
    - `Register Number`
    - `No of problems solved` (3 Dark Green, 2 Light Green, 1 Orange, 0 Red)
    - `If no reason` (Absence reason tracking)
    - `Current Rating` & `Highest Rating`
    - `Division` (Div 3, Div 4)
    - `Star Rating` (★, ★★)
    - `Global Rank` & `Country Rank`
- **Class Contest Breakdown Bar**: Visual indicator showing the percentage of students solving 3, 2, 1, or 0 problems.

### 3. 🛡️ Faculty & Admin Portal (`#viewAdmin`)
- **Official Class Performance Audit**:
  - Automatically calculates pass rate, attendance %, and top performers list for any contest date.
  - **1-Click Print Official PDF Report**: Produces a print-ready document formatted for HOD/Principal review with signature blocks.
  - **1-Click Copy WhatsApp Announcement**: Copies a clean summary ready to send to student/faculty groups.
- **Student Absence Reason & Status Editor**:
  - Faculty can select any student, update their contest solved count, and record their explanation for "If no reason" (e.g. Medical leave, Hackathon OD, Network issues).
  - Automatically syncs and updates the live tables and reports across all views.
- **Data Export & Spreadsheet Sync**:
  - Connect your Google Sheet, export contest CSVs, or reset to original dataset.

### 4. 📅 CP Contest Calendar (`#viewCalendar`)
- **4 Major Platforms Supported**: **LeetCode**, **CodeChef**, **Codeforces**, and **AtCoder**.
- **Real-Time Live Countdown Timers**:
  - Ticking seconds countdowns for upcoming and live contests.
  - Live Indian Standard Time (IST) digital clock banner.
  - Imminent contest spotlight with large `DAYS : HRS : MIN : SEC` countdown.
- **Dual Display Modes**:
  - **Cards Grid View**: Detailed contest cards with platform brand badges, duration, rating tier, live status pill, official contest entry links, and 1-click Google Calendar sync.
  - **Month Matrix View**: Interactive monthly calendar matrix highlighting today, with clickable day cells and color-coded contest chips.
- **1-Click Google Calendar Integration**:
  - Pre-fills event title, start/end timestamps in UTC/IST, description, and direct link.
- **One-Click .ICS Calendar Export**:
  - Export all upcoming rounds into a standard `.ics` file for Google Calendar, Apple Calendar, and Microsoft Outlook.
- **Official Live API Integration**:
  - Fetches upcoming rounds directly from Codeforces API with offline fallback.

---

## 🚀 Running Locally

The app is currently running live on:
👉 **`http://localhost:3000`**

To launch manually:
```bash
python -m http.server 3000
```
or
```bash
npx serve .
```
