# 🏆 CampusCP - Competitive Programming Portal & Faculty Admin Dashboard

A comprehensive, dark-themed competitive programming web app for college students and faculty. Built strictly using **HTML5, Vanilla CSS, and JavaScript (ES6+)**.

---

## 🌟 The 3 Main Views

Switch between views anytime using the top navigation bar:

### 1. 📊 Overall Leaderboard (`#viewOverall`)
- **College-Wide Rankings**: Total problems solved across platforms (LeetCode, Codeforces, CodeChef, AtCoder).
- **Hall of Fame (Overall)**: Top 3 champions podium with Gold 🥇, Silver 🥈, and Bronze 🥉 spotlights.
- **Search & Filters**: Search by Name or Roll No; filter by Department (CSE, IT, ECE, AI&DS, CSBS, EEE) and Year (1st–4th Year).
- **Platform Focus Tabs**: Overall Standing, LeetCode Focus, Codeforces Focus, CodeChef Focus, and AtCoder Focus.

### 2. ⚡ Daily Contest Tracker (`#viewContest`)
- **Direct Match with Your College Spreadsheet**:
  - Replicates your bottom date tabs (`05.10.2026`, `30.09.2026`, `28.09.2026`, `23.09.2026`, etc.).
  - Preserves all spreadsheet columns:
    - `Rank`
    - `Name of the student`
    - `Register Number`
    - `No of problems solved` (Color-coded pills: 3 Dark Green, 2 Light Green, 1 Orange, 0 Red)
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
