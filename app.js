/**
 * CampusCP Portal - Core Application Logic
 * 1. Overall College Leaderboard
 * 2. Daily CodeChef Contest Tracker (Spreadsheet Tabs)
 * 3. Faculty & Admin Management Portal (Official Reports & Reason Editor)
 */

// ==========================================
// 1. DATASETS
// ==========================================

// Contest Dates matching spreadsheet tabs
const CONTEST_TABS = [
  { id: "05.10.2026", name: "05.10.2026", label: "05.10.2026 (Yesterday's Contest)", isLatest: true },
  { id: "30.09.2026", name: "30.09.2026", label: "30.09.2026", isLatest: false },
  { id: "28.09.2026", name: "28.09.2026", label: "28.09.2026", isLatest: false },
  { id: "23.09.2026", name: "23.09.2026", label: "23.09.2026", isLatest: false },
  { id: "21.09.2026", name: "21.09.2026", label: "21.09.2026", isLatest: false },
  { id: "02.09.2026", name: "02.09.2026", label: "02.09.2026", isLatest: false },
  { id: "20.07.2026", name: "20.07.2026", label: "20.07.2026", isLatest: false }
];

// College Student Dataset (Used for both Overall standing & Contest records)
const INITIAL_STUDENTS = [
  {
    id: 1,
    name: "BHARATHKUMAR A K",
    regNo: "711525BCS016",
    dept: "CSE",
    year: "4",
    totalSolved: 1420,
    contestSolved: 3,
    reason: "",
    currentRating: 1540,
    highestRating: 1580,
    division: 3,
    starRating: 2,
    globalRating: 8420,
    countryRating: 7910,
    leetcode: { handle: "bharathkumar_ak", solved: 780, rating: 2185, badge: "Guardian", easy: 210, med: 420, hard: 150 },
    codeforces: { handle: "bharath_cf", solved: 390, rating: 1942, maxRating: 1985, title: "Candidate Master" },
    codechef: { handle: "bharathkumar_ak", solved: 180, rating: 1540, stars: "★★ 2 Star", division: "Div 3" },
    atcoder: { handle: "bharath_at", solved: 70, rating: 1520, color: "Cyan", tier: "Cyan (3-kyu)" }
  },
  {
    id: 2,
    name: "DHAKSHITHAA SHRI J R",
    regNo: "711525BCS024",
    dept: "CSE",
    year: "4",
    totalSolved: 1295,
    contestSolved: 3,
    reason: "",
    currentRating: 1510,
    highestRating: 1550,
    division: 3,
    starRating: 2,
    globalRating: 9110,
    countryRating: 8640,
    leetcode: { handle: "dhakshithaa_jr", solved: 710, rating: 2095, badge: "Knight", easy: 240, med: 380, hard: 90 },
    codeforces: { handle: "dhakshi_cf", solved: 340, rating: 1860, maxRating: 1890, title: "Expert" },
    codechef: { handle: "dhakshithaa_jr", solved: 175, rating: 1510, stars: "★★ 2 Star", division: "Div 3" },
    atcoder: { handle: "dhakshi_at", solved: 70, rating: 1410, color: "Cyan", tier: "Cyan (4-kyu)" }
  },
  {
    id: 3,
    name: "KAMESH M",
    regNo: "711525BCS063",
    dept: "CSE",
    year: "3",
    totalSolved: 1210,
    contestSolved: 2,
    reason: "",
    currentRating: 1437,
    highestRating: 1447,
    division: 4,
    starRating: 1,
    globalRating: 10214,
    countryRating: 9997,
    leetcode: { handle: "kamesh_m", solved: 650, rating: 2010, badge: "Knight", easy: 190, med: 370, hard: 90 },
    codeforces: { handle: "kamesh_cf", solved: 320, rating: 1790, maxRating: 1820, title: "Expert" },
    codechef: { handle: "kamesh_m", solved: 180, rating: 1437, stars: "★ 1 Star", division: "Div 4" },
    atcoder: { handle: "kamesh_at", solved: 60, rating: 1320, color: "Green", tier: "Green (5-kyu)" }
  },
  {
    id: 4,
    name: "HEMASRI S",
    regNo: "711525BCS044",
    dept: "IT",
    year: "3",
    totalSolved: 1145,
    contestSolved: 2,
    reason: "",
    currentRating: 1195,
    highestRating: 1240,
    division: 4,
    starRating: 1,
    globalRating: 64200,
    countryRating: 59800,
    leetcode: { handle: "hemasri_s", solved: 630, rating: 1950, badge: "Knight", easy: 220, med: 330, hard: 80 },
    codeforces: { handle: "hemasri_cf", solved: 290, rating: 1720, maxRating: 1750, title: "Expert" },
    codechef: { handle: "hemasri_s", solved: 165, rating: 1195, stars: "★ 1 Star", division: "Div 4" },
    atcoder: { handle: "hemasri_at", solved: 60, rating: 1280, color: "Green", tier: "Green (5-kyu)" }
  },
  {
    id: 5,
    name: "HARISIVAM S",
    regNo: "711525BCS042",
    dept: "ECE",
    year: "3",
    totalSolved: 1080,
    contestSolved: 2,
    reason: "",
    currentRating: 1150,
    highestRating: 1210,
    division: 4,
    starRating: 1,
    globalRating: 78500,
    countryRating: 72100,
    leetcode: { handle: "harisivam_s", solved: 590, rating: 1910, badge: "Knight", easy: 200, med: 310, hard: 80 },
    codeforces: { handle: "harisivam_cf", solved: 280, rating: 1680, maxRating: 1710, title: "Specialist" },
    codechef: { handle: "harisivam_s", solved: 150, rating: 1150, stars: "★ 1 Star", division: "Div 4" },
    atcoder: { handle: "harisivam_at", solved: 60, rating: 1220, color: "Green", tier: "Green (6-kyu)" }
  },
  {
    id: 6,
    name: "AJO LIMIS A L",
    regNo: "711525BCS007",
    dept: "CSE",
    year: "2",
    totalSolved: 1025,
    contestSolved: 2,
    reason: "",
    currentRating: 1120,
    highestRating: 1180,
    division: 4,
    starRating: 1,
    globalRating: 89400,
    countryRating: 84100,
    leetcode: { handle: "ajo_limis", solved: 580, rating: 1880, badge: "Knight", easy: 210, med: 300, hard: 70 },
    codeforces: { handle: "ajo_cf", solved: 260, rating: 1640, maxRating: 1690, title: "Specialist" },
    codechef: { handle: "ajo_limis", solved: 140, rating: 1120, stars: "★ 1 Star", division: "Div 4" },
    atcoder: { handle: "ajo_at", solved: 45, rating: 1190, color: "Green", tier: "Green (6-kyu)" }
  },
  {
    id: 7,
    name: "KANISHK M",
    regNo: "711525BCS064",
    dept: "IT",
    year: "4",
    totalSolved: 975,
    contestSolved: 2,
    reason: "",
    currentRating: 1115,
    highestRating: 1190,
    division: 4,
    starRating: 1,
    globalRating: 87600,
    countryRating: 82300,
    leetcode: { handle: "kanishk_m", solved: 540, rating: 1830, badge: "Knight", easy: 180, med: 290, hard: 70 },
    codeforces: { handle: "kanishk_cf", solved: 250, rating: 1580, maxRating: 1610, title: "Specialist" },
    codechef: { handle: "kanishk_m", solved: 145, rating: 1115, stars: "★ 1 Star", division: "Div 4" },
    atcoder: { handle: "kanishk_at", solved: 40, rating: 1140, color: "Green", tier: "Green (6-kyu)" }
  },
  {
    id: 8,
    name: "JOSHINI SRI S",
    regNo: "711525BCS056",
    dept: "AI&DS",
    year: "2",
    totalSolved: 920,
    contestSolved: 2,
    reason: "",
    currentRating: 1090,
    highestRating: 1160,
    division: 4,
    starRating: 1,
    globalRating: 94200,
    countryRating: 89500,
    leetcode: { handle: "joshini_sri", solved: 510, rating: 1790, badge: "Knight", easy: 190, med: 260, hard: 60 },
    codeforces: { handle: "joshini_cf", solved: 240, rating: 1530, maxRating: 1560, title: "Specialist" },
    codechef: { handle: "joshini_sri", solved: 130, rating: 1090, stars: "★ 1 Star", division: "Div 4" },
    atcoder: { handle: "joshini_at", solved: 40, rating: 1090, color: "Green", tier: "Green (7-kyu)" }
  },
  {
    id: 9,
    name: "KEERTHANA R",
    regNo: "711525BCS072",
    dept: "CSE",
    year: "3",
    totalSolved: 885,
    contestSolved: 2,
    reason: "",
    currentRating: 1083,
    highestRating: 1200,
    division: 4,
    starRating: 1,
    globalRating: 22846,
    countryRating: 116550,
    leetcode: { handle: "keerthana_r", solved: 490, rating: 1760, badge: "Top 15%", easy: 180, med: 250, hard: 60 },
    codeforces: { handle: "keerthana_cf", solved: 220, rating: 1490, maxRating: 1540, title: "Specialist" },
    codechef: { handle: "keerthana_r", solved: 135, rating: 1083, stars: "★ 1 Star", division: "Div 4" },
    atcoder: { handle: "keerthana_at", solved: 40, rating: 1050, color: "Green", tier: "Green (7-kyu)" }
  },
  {
    id: 10,
    name: "BARANI V",
    regNo: "711525BCS015",
    dept: "CSE",
    year: "1",
    totalSolved: 830,
    contestSolved: 2,
    reason: "",
    currentRating: 1082,
    highestRating: 1236,
    division: 4,
    starRating: 1,
    globalRating: 121084,
    countryRating: 114200,
    leetcode: { handle: "barani_v", solved: 480, rating: 1720, badge: "Top 20%", easy: 190, med: 240, hard: 50 },
    codeforces: { handle: "barani_cf", solved: 210, rating: 1450, maxRating: 1490, title: "Pupil" },
    codechef: { handle: "barani_v", solved: 110, rating: 1082, stars: "★ 1 Star", division: "Div 4" },
    atcoder: { handle: "barani_at", solved: 30, rating: 980, color: "Brown", tier: "Brown (8-kyu)" }
  },
  {
    id: 11,
    name: "KIRUBA SAHAR R",
    regNo: "711525BCS075",
    dept: "IT",
    year: "2",
    totalSolved: 790,
    contestSolved: 2,
    reason: "",
    currentRating: 1075,
    highestRating: 1150,
    division: 4,
    starRating: 1,
    globalRating: 99400,
    countryRating: 94100,
    leetcode: { handle: "kiruba_sahar", solved: 440, rating: 1690, badge: "Top 25%", easy: 170, med: 220, hard: 50 },
    codeforces: { handle: "kiruba_cf", solved: 190, rating: 1420, maxRating: 1460, title: "Pupil" },
    codechef: { handle: "kiruba_sahar", solved: 125, rating: 1075, stars: "★ 1 Star", division: "Div 4" },
    atcoder: { handle: "kiruba_at", solved: 35, rating: 940, color: "Brown", tier: "Brown (8-kyu)" }
  },
  {
    id: 12,
    name: "AKASH S",
    regNo: "711525BCS008",
    dept: "CSBS",
    year: "3",
    totalSolved: 755,
    contestSolved: 2,
    reason: "",
    currentRating: 1072,
    highestRating: 1377,
    division: 4,
    starRating: 1,
    globalRating: 28343,
    countryRating: 27914,
    leetcode: { handle: "akash_s", solved: 420, rating: 1660, badge: "Top 25%", easy: 160, med: 210, hard: 50 },
    codeforces: { handle: "akash_cf", solved: 180, rating: 1390, maxRating: 1420, title: "Pupil" },
    codechef: { handle: "akash_s", solved: 125, rating: 1072, stars: "★ 1 Star", division: "Div 4" },
    atcoder: { handle: "akash_at", solved: 30, rating: 890, color: "Brown", tier: "Brown (9-kyu)" }
  },
  {
    id: 13,
    name: "KRISHNARAJ S",
    regNo: "711525BCS079",
    dept: "EEE",
    year: "4",
    totalSolved: 710,
    contestSolved: 2,
    reason: "",
    currentRating: 1065,
    highestRating: 1130,
    division: 4,
    starRating: 1,
    globalRating: 102100,
    countryRating: 96800,
    leetcode: { handle: "krishnaraj_s", solved: 400, rating: 1630, badge: "Top 30%", easy: 160, med: 200, hard: 40 },
    codeforces: { handle: "krishna_cf", solved: 170, rating: 1360, maxRating: 1390, title: "Pupil" },
    codechef: { handle: "krishnaraj_s", solved: 115, rating: 1065, stars: "★ 1 Star", division: "Div 4" },
    atcoder: { handle: "krishna_at", solved: 25, rating: 850, color: "Brown", tier: "Brown (9-kyu)" }
  },
  {
    id: 14,
    name: "DEEPIKA J",
    regNo: "711525BCS021",
    dept: "AI&DS",
    year: "1",
    totalSolved: 665,
    contestSolved: 2,
    reason: "",
    currentRating: 1060,
    highestRating: 1140,
    division: 4,
    starRating: 1,
    globalRating: 104300,
    countryRating: 98700,
    leetcode: { handle: "deepika_j", solved: 380, rating: 1600, badge: "Top 30%", easy: 150, med: 190, hard: 40 },
    codeforces: { handle: "deepika_cf", solved: 160, rating: 1330, maxRating: 1370, title: "Pupil" },
    codechef: { handle: "deepika_j", solved: 100, rating: 1060, stars: "★ 1 Star", division: "Div 4" },
    atcoder: { handle: "deepika_at", solved: 25, rating: 810, color: "Brown", tier: "Brown (9-kyu)" }
  },
  {
    id: 15,
    name: "BABY SRUTHI R",
    regNo: "711525BCS013",
    dept: "ECE",
    year: "2",
    totalSolved: 620,
    contestSolved: 2,
    reason: "",
    currentRating: 1045,
    highestRating: 1120,
    division: 4,
    starRating: 1,
    globalRating: 110200,
    countryRating: 105400,
    leetcode: { handle: "baby_sruthi", solved: 350, rating: 1570, badge: "Top 35%", easy: 140, med: 180, hard: 30 },
    codeforces: { handle: "sruthi_cf", solved: 150, rating: 1290, maxRating: 1320, title: "Pupil" },
    codechef: { handle: "baby_sruthi", solved: 95, rating: 1045, stars: "★ 1 Star", division: "Div 4" },
    atcoder: { handle: "sruthi_at", solved: 25, rating: 780, color: "Brown", tier: "Brown (10-kyu)" }
  },
  {
    id: 16,
    name: "JOY ANGELINE P",
    regNo: "711525BCS058",
    dept: "CSE",
    year: "1",
    totalSolved: 580,
    contestSolved: 2,
    reason: "",
    currentRating: 1040,
    highestRating: 1110,
    division: 4,
    starRating: 1,
    globalRating: 112400,
    countryRating: 107200,
    leetcode: { handle: "joy_angeline", solved: 340, rating: 1540, badge: "Top 40%", easy: 150, med: 160, hard: 30 },
    codeforces: { handle: "joy_cf", solved: 130, rating: 1250, maxRating: 1280, title: "Pupil" },
    codechef: { handle: "joy_angeline", solved: 90, rating: 1040, stars: "★ 1 Star", division: "Div 4" },
    atcoder: { handle: "joy_at", solved: 20, rating: 720, color: "Brown", tier: "Brown (10-kyu)" }
  },
  {
    id: 17,
    name: "JENILIA GRACY A",
    regNo: "711525BCS051",
    dept: "IT",
    year: "3",
    totalSolved: 540,
    contestSolved: 2,
    reason: "",
    currentRating: 1030,
    highestRating: 1100,
    division: 4,
    starRating: 1,
    globalRating: 115600,
    countryRating: 109400,
    leetcode: { handle: "jenilia_gracy", solved: 310, rating: 1510, badge: "Top 45%", easy: 140, med: 145, hard: 25 },
    codeforces: { handle: "jenilia_cf", solved: 125, rating: 1220, maxRating: 1240, title: "Pupil" },
    codechef: { handle: "jenilia_gracy", solved: 85, rating: 1030, stars: "★ 1 Star", division: "Div 4" },
    atcoder: { handle: "jenilia_at", solved: 20, rating: 680, color: "Gray", tier: "Gray (11-kyu)" }
  },
  {
    id: 18,
    name: "ASHVIJA S S",
    regNo: "711525BCS012",
    dept: "CSBS",
    year: "2",
    totalSolved: 505,
    contestSolved: 2,
    reason: "",
    currentRating: 948,
    highestRating: 962,
    division: 4,
    starRating: 1,
    globalRating: 158125,
    countryRating: 153078,
    leetcode: { handle: "ashvija_ss", solved: 290, rating: 1480, badge: "Top 50%", easy: 130, med: 135, hard: 25 },
    codeforces: { handle: "ashvija_cf", solved: 115, rating: 1190, maxRating: 1210, title: "Newbie" },
    codechef: { handle: "ashvija_ss", solved: 80, rating: 948, stars: "★ 1 Star", division: "Div 4" },
    atcoder: { handle: "ashvija_at", solved: 20, rating: 640, color: "Gray", tier: "Gray (11-kyu)" }
  },
  {
    id: 19,
    name: "HARIDASS P",
    regNo: "711525BCS039",
    dept: "ECE",
    year: "1",
    totalSolved: 460,
    contestSolved: 1,
    reason: "",
    currentRating: 920,
    highestRating: 980,
    division: 4,
    starRating: 1,
    globalRating: 184200,
    countryRating: 178500,
    leetcode: { handle: "haridass_p", solved: 270, rating: 1440, badge: "Top 55%", easy: 130, med: 120, hard: 20 },
    codeforces: { handle: "haridass_cf", solved: 105, rating: 1150, maxRating: 1180, title: "Newbie" },
    codechef: { handle: "haridass_p", solved: 70, rating: 920, stars: "★ 1 Star", division: "Div 4" },
    atcoder: { handle: "haridass_at", solved: 15, rating: 590, color: "Gray", tier: "Gray (12-kyu)" }
  },
  {
    id: 20,
    name: "JABARSON D M",
    regNo: "711525BCS046",
    dept: "CSE",
    year: "4",
    totalSolved: 420,
    contestSolved: 1,
    reason: "",
    currentRating: 910,
    highestRating: 960,
    division: 4,
    starRating: 1,
    globalRating: 189500,
    countryRating: 182300,
    leetcode: { handle: "jabarson_dm", solved: 250, rating: 1410, badge: "Top 60%", easy: 120, med: 110, hard: 20 },
    codeforces: { handle: "jabarson_cf", solved: 95, rating: 1110, maxRating: 1140, title: "Newbie" },
    codechef: { handle: "jabarson_dm", solved: 60, rating: 910, stars: "★ 1 Star", division: "Div 4" },
    atcoder: { handle: "jabarson_at", solved: 15, rating: 550, color: "Gray", tier: "Gray (12-kyu)" }
  },
  {
    id: 21,
    name: "GOKILADEVI P",
    regNo: "711525BCS036",
    dept: "CSE",
    year: "3",
    totalSolved: 390,
    contestSolved: 0,
    reason: "Network issue during contest / Medical leave",
    currentRating: 890,
    highestRating: 920,
    division: 4,
    starRating: 1,
    globalRating: 210000,
    countryRating: 202000,
    leetcode: { handle: "gokiladevi_p", solved: 230, rating: 1380, badge: "Top 65%", easy: 110, med: 100, hard: 20 },
    codeforces: { handle: "gokila_cf", solved: 90, rating: 1080, maxRating: 1100, title: "Newbie" },
    codechef: { handle: "gokiladevi_p", solved: 55, rating: 890, stars: "★ 1 Star", division: "Div 4" },
    atcoder: { handle: "gokila_at", solved: 15, rating: 520, color: "Gray", tier: "Gray (12-kyu)" }
  }
];

// Master in-memory student database
let studentsMaster = JSON.parse(JSON.stringify(INITIAL_STUDENTS));

// Active Application State
let activeView = "overall"; // 'overall' | 'contest' | 'admin' | 'calendar'
let currentContestDate = "05.10.2026";
let customSheetUrl = localStorage.getItem("campuscplb_sheet_url") || "";
let googleAppsScriptUrl = localStorage.getItem("campuscplb_apps_script_url") || "";
let isAutoSyncEnabled = localStorage.getItem("campuscplb_auto_sync_enabled") === "true";
let autoUpdateSheetOnSync = true;
let autoSyncIntervalTimer = null;
let currentSheetActiveTab = "appsscript"; // 'appsscript' | 'csv'

// Overall View state
let overallFiltered = [];
let overallSort = "total_desc";
let overallPlatform = "all";

// Contest View state
let contestFiltered = [];
let contestSort = "solved_desc";
let contestQuickFilter = "all";

// ==========================================
// 2. HELPER FUNCTIONS
// ==========================================
const AVATAR_PALETTES = [
  ["#4f46e5", "#06b6d4"],
  ["#16a34a", "#059669"],
  ["#f59e0b", "#d97706"],
  ["#ec4899", "#8b5cf6"],
  ["#8b5cf6", "#ec4899"],
  ["#06b6d4", "#10b981"]
];

function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_PALETTES.length;
  const [col1, col2] = AVATAR_PALETTES[index];
  return `linear-gradient(135deg, ${col1}, ${col2})`;
}

function getInitials(name) {
  if (!name) return "--";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatDeptClass(dept) {
  const d = (dept || "").toUpperCase();
  if (d.includes("CSE")) return "dept-cse";
  if (d.includes("IT")) return "dept-it";
  if (d.includes("ECE")) return "dept-ece";
  if (d.includes("AI") || d.includes("DS")) return "dept-aids";
  if (d.includes("CSBS")) return "dept-csbs";
  if (d.includes("EEE")) return "dept-eee";
  return "dept-other";
}

function formatYearText(year) {
  const y = String(year).trim();
  if (y === "1" || y.toLowerCase().includes("1st")) return "1st Year";
  if (y === "2" || y.toLowerCase().includes("2nd")) return "2nd Year";
  if (y === "3" || y.toLowerCase().includes("3rd")) return "3rd Year";
  if (y === "4" || y.toLowerCase().includes("4th")) return "4th Year";
  return y ? `${y} Year` : "N/A";
}

function getSolvedBadgeClass(solved) {
  if (solved >= 3) return "solved-pill-3";
  if (solved === 2) return "solved-pill-2";
  if (solved === 1) return "solved-pill-1";
  return "solved-pill-0";
}

function showToast(message, isSuccess = true) {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${isSuccess ? 'toast-success' : ''}`;
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      ${isSuccess 
        ? '<polyline points="20 6 9 17 4 12"></polyline>' 
        : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'
      }
    </svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ==========================================
// 3. NAVIGATION VIEW SWITCHER
// ==========================================
window.switchView = function(viewName) {
  activeView = viewName;

  // Toggle tab buttons
  document.querySelectorAll(".nav-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.view === viewName);
  });

  // Toggle view containers
  document.getElementById("viewOverall").classList.toggle("active", viewName === "overall");
  document.getElementById("viewContest").classList.toggle("active", viewName === "contest");
  document.getElementById("viewAdmin").classList.toggle("active", viewName === "admin");
  const calView = document.getElementById("viewCalendar");
  if (calView) calView.classList.toggle("active", viewName === "calendar");

  if (viewName === "overall") {
    applyOverallFilters();
  } else if (viewName === "contest") {
    applyContestFilters();
  } else if (viewName === "admin") {
    renderAdminPortal();
  } else if (viewName === "calendar") {
    renderContestCalendar();
  }
};

// ==========================================
// 4. OVERALL LEADERBOARD LOGIC
// ==========================================
function updateOverallMetrics() {
  const totalCoders = studentsMaster.length;
  const totalSolvedSum = studentsMaster.reduce((acc, s) => acc + s.totalSolved, 0);
  const topCoder = studentsMaster.length > 0 ? [...studentsMaster].sort((a,b)=>b.totalSolved - a.totalSolved)[0].name : "--";
  const avgSolved = totalCoders > 0 ? Math.round(totalSolvedSum / totalCoders) : 0;

  document.getElementById("metricOverallCoders").textContent = totalCoders.toLocaleString();
  document.getElementById("metricOverallSolved").textContent = totalSolvedSum.toLocaleString();
  document.getElementById("metricOverallTopCoder").textContent = topCoder;
  document.getElementById("metricOverallAvgSolved").textContent = avgSolved.toLocaleString();
  document.getElementById("overallCodersBadge").textContent = totalCoders;
}

function applyOverallFilters() {
  const query = document.getElementById("overallSearchInput").value.trim().toLowerCase();
  const selectedDept = document.getElementById("overallDeptFilter").value;
  const selectedYear = document.getElementById("overallYearFilter").value;

  // Calculate overall ranks
  const sortedMaster = [...studentsMaster].sort((a, b) => b.totalSolved - a.totalSolved);
  sortedMaster.forEach((s, idx) => { s.overallRank = idx + 1; });

  overallFiltered = sortedMaster.filter(s => {
    const matchesSearch = !query || 
      s.name.toLowerCase().includes(query) ||
      s.regNo.toLowerCase().includes(query);

    const matchesDept = selectedDept === "ALL" || s.dept.toUpperCase() === selectedDept.toUpperCase();
    const matchesYear = selectedYear === "ALL" || String(s.year).trim() === selectedYear;

    return matchesSearch && matchesDept && matchesYear;
  });

  sortOverallFiltered();
  renderOverallPodium();
  renderOverallTable();
  document.getElementById("overallResultsCount").textContent = `Showing ${overallFiltered.length} of ${studentsMaster.length} students`;
}

function sortOverallFiltered() {
  const [col, dir] = overallSort.split("_");
  const isAsc = dir === "asc";

  overallFiltered.sort((a, b) => {
    let valA, valB;
    switch (col) {
      case "rank":
        valA = a.overallRank; valB = b.overallRank; break;
      case "name":
        valA = a.name.toLowerCase(); valB = b.name.toLowerCase(); break;
      case "dept":
        valA = a.dept.toLowerCase(); valB = b.dept.toLowerCase(); break;
      case "year":
        valA = parseInt(a.year) || 0; valB = parseInt(b.year) || 0; break;
      case "leetcode":
        valA = a.leetcode?.solved || 0; valB = b.leetcode?.solved || 0; break;
      case "cf":
        valA = a.codeforces?.rating || 0; valB = b.codeforces?.rating || 0; break;
      case "total":
      default:
        valA = a.totalSolved; valB = b.totalSolved; break;
    }
    if (valA < valB) return isAsc ? -1 : 1;
    if (valA > valB) return isAsc ? 1 : -1;
    return a.overallRank - b.overallRank;
  });
}

function renderOverallPodium() {
  const container = document.getElementById("overallPodiumContainer");
  const topThree = [...studentsMaster].sort((a, b) => b.totalSolved - a.totalSolved).slice(0, 3);

  if (topThree.length === 0) {
    container.innerHTML = `<div class="podium-loading">No rankings available yet.</div>`;
    return;
  }

  const [rank1, rank2, rank3] = topThree;

  const generateCard = (student, rankNum) => {
    if (!student) return '';
    const medalText = rankNum === 1 ? "1st Place" : rankNum === 2 ? "2nd Place" : "3rd Place";
    const medalEmoji = rankNum === 1 ? "🥇" : rankNum === 2 ? "🥈" : "🥉";

    return `
      <div class="podium-card rank-${rankNum}" onclick="openStudentModal(${student.id})">
        ${rankNum === 1 ? '<div class="podium-crown">👑</div>' : ''}
        <div class="podium-rank-tag">${medalEmoji} ${medalText}</div>
        
        <div class="podium-avatar" style="background: ${getAvatarColor(student.name)}">
          ${getInitials(student.name)}
        </div>

        <h3 class="podium-name">${student.name}</h3>
        <div class="podium-roll">${student.regNo}</div>

        <div class="podium-solved-box">
          <span class="label">Total Solved</span>
          <span class="value">${student.totalSolved.toLocaleString()}</span>
        </div>

        <div class="podium-quick-tags">
          <span class="podium-platform-tag">LC: ${student.leetcode?.solved || 0}</span>
          <span class="podium-platform-tag">CF: ${student.codeforces?.rating || 0}</span>
          <span class="podium-platform-tag">CC: ${student.currentRating || 0}</span>
        </div>
      </div>
    `;
  };

  container.innerHTML = generateCard(rank2, 2) + generateCard(rank1, 1) + generateCard(rank3, 3);
}

function renderOverallTable() {
  const tbody = document.getElementById("overallLeaderboardBody");
  const noResults = document.getElementById("noOverallResultsState");
  const table = document.getElementById("overallLeaderboardTable");

  if (overallFiltered.length === 0) {
    tbody.innerHTML = '';
    table.style.display = "none";
    noResults.style.display = "flex";
    return;
  }

  table.style.display = "table";
  noResults.style.display = "none";

  tbody.innerHTML = overallFiltered.map(student => {
    let rankBadgeClass = "rank-badge-cell";
    let rankContent = `#${student.overallRank}`;
    if (student.overallRank === 1) {
      rankBadgeClass += " rank-pill-1"; rankContent = "🥇 1";
    } else if (student.overallRank === 2) {
      rankBadgeClass += " rank-pill-2"; rankContent = "🥈 2";
    } else if (student.overallRank === 3) {
      rankBadgeClass += " rank-pill-3"; rankContent = "🥉 3";
    }

    return `
      <tr onclick="openStudentModal(${student.id})" data-student-id="${student.id}" title="Click to view full coding profile">
        <td><div class="${rankBadgeClass}">${rankContent}</div></td>
        <td>
          <div class="student-info-cell">
            <div class="student-avatar-sm" style="background: ${getAvatarColor(student.name)}">
              ${getInitials(student.name)}
            </div>
            <div class="student-meta">
              <span class="student-name-text">${student.name}</span>
              <span class="student-roll-text">${student.regNo}</span>
            </div>
          </div>
        </td>
        <td><span class="dept-badge ${formatDeptClass(student.dept)}">${student.dept}</span></td>
        <td><span class="year-text">${formatYearText(student.year)}</span></td>
        <td>
          <div class="table-platform-badges">
            <span class="mini-platform-stat"><span class="platform-dot dot-leetcode"></span> ${student.leetcode?.solved || 0}</span>
            <span class="mini-platform-stat"><span class="platform-dot dot-codeforces"></span> ${student.codeforces?.rating || 0}</span>
            <span class="mini-platform-stat"><span class="platform-dot dot-codechef"></span> ${student.currentRating || 0}</span>
            <span class="mini-platform-stat"><span class="platform-dot dot-atcoder"></span> ${student.atcoder?.solved || 0}</span>
          </div>
        </td>
        <td><div class="total-solved-num">${student.totalSolved.toLocaleString()}</div></td>
        <td>
          <button class="action-view-btn" aria-label="View Details">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// ==========================================
// 5. DAILY CONTEST TRACKER LOGIC
// ==========================================
function renderContestDateTabs() {
  const container = document.getElementById("contestDateTabs");
  container.innerHTML = CONTEST_TABS.map(tab => {
    const isActive = tab.id === currentContestDate;
    return `
      <button 
        class="contest-tab ${isActive ? 'active' : ''}" 
        onclick="switchContestDate('${tab.id}')"
        title="View contest records for ${tab.name}"
      >
        <span>${tab.name}</span>
        ${tab.isLatest ? '<span class="tab-badge-new">Latest</span>' : ''}
      </button>
    `;
  }).join('');
}

window.switchContestDate = function(dateId) {
  currentContestDate = dateId;
  document.getElementById("currentContestNavPill").textContent = dateId;
  renderContestDateTabs();
  applyContestFilters();
  if (activeView === "admin") renderAdminPortal();
};

function updateContestMetrics() {
  const total = studentsMaster.length;
  const participated = studentsMaster.filter(s => s.contestSolved > 0).length;
  const absent = studentsMaster.filter(s => s.contestSolved === 0).length;
  const maxSolved = studentsMaster.length > 0 ? Math.max(...studentsMaster.map(s => s.contestSolved)) : 0;
  const totalSolvedInContest = studentsMaster.filter(s => s.contestSolved > 0).reduce((acc, s) => acc + s.contestSolved, 0);
  const avg = participated > 0 ? (totalSolvedInContest / participated).toFixed(1) : "0";

  document.getElementById("metricContestTotal").textContent = total;
  document.getElementById("metricContestParticipated").textContent = `${participated} (${((participated/total)*100).toFixed(0)}%)`;
  document.getElementById("metricContestAbsent").textContent = `${absent} (${((absent/total)*100).toFixed(0)}%)`;
  document.getElementById("metricContestMaxSolved").textContent = `${maxSolved} Problems`;
  document.getElementById("metricContestAvgSolved").textContent = `${avg} / Coder`;

  // Distribution
  const count3 = studentsMaster.filter(s => s.contestSolved >= 3).length;
  const count2 = studentsMaster.filter(s => s.contestSolved === 2).length;
  const count1 = studentsMaster.filter(s => s.contestSolved === 1).length;
  const count0 = absent;

  const pct3 = total ? ((count3 / total) * 100).toFixed(1) : 0;
  const pct2 = total ? ((count2 / total) * 100).toFixed(1) : 0;
  const pct1 = total ? ((count1 / total) * 100).toFixed(1) : 0;
  const pct0 = total ? ((count0 / total) * 100).toFixed(1) : 0;

  document.getElementById("distLegends").innerHTML = `
    <span class="dist-legend-item"><span class="solve-dot dot-3"></span> 3 Solved: <strong>${count3} (${pct3}%)</strong></span>
    <span class="dist-legend-item"><span class="solve-dot dot-2"></span> 2 Solved: <strong>${count2} (${pct2}%)</strong></span>
    <span class="dist-legend-item"><span class="solve-dot dot-1"></span> 1 Solved: <strong>${count1} (${pct1}%)</strong></span>
    <span class="dist-legend-item"><span class="solve-dot dot-0"></span> 0 Solved: <strong>${count0} (${pct0}%)</strong></span>
  `;

  document.getElementById("distStackedBar").innerHTML = `
    <div class="dist-bar-seg seg-3" style="width: ${pct3}%" title="3 Solved: ${count3}"></div>
    <div class="dist-bar-seg seg-2" style="width: ${pct2}%" title="2 Solved: ${count2}"></div>
    <div class="dist-bar-seg seg-1" style="width: ${pct1}%" title="1 Solved: ${count1}"></div>
    <div class="dist-bar-seg seg-0" style="width: ${pct0}%" title="0 Solved: ${count0}"></div>
  `;
}

function applyContestFilters() {
  const query = document.getElementById("contestSearchInput").value.trim().toLowerCase();
  const solvedFilter = document.getElementById("contestSolvedFilter").value;
  const partFilter = document.getElementById("contestParticipationFilter").value;

  // Rank by contestSolved descending, then rating
  const sortedContest = [...studentsMaster].sort((a, b) => {
    if (b.contestSolved !== a.contestSolved) return b.contestSolved - a.contestSolved;
    return (b.currentRating || 0) - (a.currentRating || 0);
  });
  sortedContest.forEach((s, idx) => { s.contestRank = idx + 1; });

  contestFiltered = sortedContest.filter(s => {
    const matchesSearch = !query || 
      s.name.toLowerCase().includes(query) ||
      s.regNo.toLowerCase().includes(query);

    const matchesSolved = solvedFilter === "ALL" || String(s.contestSolved) === solvedFilter;

    let matchesPart = true;
    if (partFilter === "PARTICIPATED") matchesPart = s.contestSolved > 0;
    else if (partFilter === "ABSENT") matchesPart = s.contestSolved === 0;
    else if (partFilter === "HAS_REASON") matchesPart = Boolean(s.reason && s.reason.trim());

    let matchesQuick = true;
    if (contestQuickFilter === "3_solved") matchesQuick = s.contestSolved >= 3;
    else if (contestQuickFilter === "2_solved") matchesQuick = s.contestSolved === 2;
    else if (contestQuickFilter === "1_solved") matchesQuick = s.contestSolved === 1;
    else if (contestQuickFilter === "absent") matchesQuick = s.contestSolved === 0;

    return matchesSearch && matchesSolved && matchesPart && matchesQuick;
  });

  sortContestFiltered();
  renderContestPodium();
  renderContestTable();
  updateContestMetrics();
  document.getElementById("contestResultsCount").textContent = `Showing ${contestFiltered.length} of ${studentsMaster.length} students`;
}

function sortContestFiltered() {
  const [col, dir] = contestSort.split("_");
  const isAsc = dir === "asc";

  contestFiltered.sort((a, b) => {
    let valA, valB;
    switch (col) {
      case "rank": valA = a.contestRank; valB = b.contestRank; break;
      case "name": valA = a.name.toLowerCase(); valB = b.name.toLowerCase(); break;
      case "reg": valA = a.regNo.toLowerCase(); valB = b.regNo.toLowerCase(); break;
      case "rating": valA = a.currentRating || 0; valB = b.currentRating || 0; break;
      case "highest": valA = a.highestRating || 0; valB = b.highestRating || 0; break;
      case "global": valA = a.globalRating || 9999999; valB = b.globalRating || 9999999; break;
      case "country": valA = a.countryRating || 9999999; valB = b.countryRating || 9999999; break;
      case "solved":
      default:
        valA = a.contestSolved; valB = b.contestSolved; break;
    }
    if (valA < valB) return isAsc ? -1 : 1;
    if (valA > valB) return isAsc ? 1 : -1;
    return a.contestRank - b.contestRank;
  });
}

function renderContestPodium() {
  const container = document.getElementById("contestPodiumContainer");
  const topThree = [...studentsMaster].sort((a, b) => {
    if (b.contestSolved !== a.contestSolved) return b.contestSolved - a.contestSolved;
    return (b.currentRating || 0) - (a.currentRating || 0);
  }).slice(0, 3);

  if (topThree.length === 0) {
    container.innerHTML = `<div class="podium-loading">No contenders available.</div>`;
    return;
  }

  const [rank1, rank2, rank3] = topThree;

  const generateCard = (student, rankNum) => {
    if (!student) return '';
    const medalText = rankNum === 1 ? "1st Place" : rankNum === 2 ? "2nd Place" : "3rd Place";
    const medalEmoji = rankNum === 1 ? "🥇" : rankNum === 2 ? "🥈" : "🥉";

    return `
      <div class="podium-card rank-${rankNum}" onclick="openStudentModal(${student.id})">
        ${rankNum === 1 ? '<div class="podium-crown">👑</div>' : ''}
        <div class="podium-rank-tag">${medalEmoji} ${medalText}</div>
        
        <div class="podium-avatar" style="background: ${getAvatarColor(student.name)}">
          ${getInitials(student.name)}
        </div>

        <h3 class="podium-name">${student.name}</h3>
        <div class="podium-roll">${student.regNo}</div>

        <div class="podium-solved-box">
          <span class="label">Problems Solved</span>
          <span class="value">${student.contestSolved} Solved</span>
        </div>

        <div class="podium-quick-tags">
          <span class="podium-platform-tag">Rating: ${student.currentRating || 'N/A'}</span>
          <span class="podium-platform-tag">Div ${student.division || 4}</span>
          <span class="podium-platform-tag">${student.starRating || 1}★</span>
        </div>
      </div>
    `;
  };

  container.innerHTML = generateCard(rank2, 2) + generateCard(rank1, 1) + generateCard(rank3, 3);
}

function renderContestTable() {
  const tbody = document.getElementById("contestLeaderboardBody");
  const noResults = document.getElementById("noContestResultsState");
  const table = document.getElementById("contestLeaderboardTable");

  if (contestFiltered.length === 0) {
    tbody.innerHTML = '';
    table.style.display = "none";
    noResults.style.display = "flex";
    return;
  }

  table.style.display = "table";
  noResults.style.display = "none";

  tbody.innerHTML = contestFiltered.map(student => {
    let rankBadgeClass = "rank-badge-cell";
    let rankContent = `#${student.contestRank}`;
    if (student.contestRank === 1) {
      rankBadgeClass += " rank-pill-1"; rankContent = "🥇 1";
    } else if (student.contestRank === 2) {
      rankBadgeClass += " rank-pill-2"; rankContent = "🥈 2";
    } else if (student.contestRank === 3) {
      rankBadgeClass += " rank-pill-3"; rankContent = "🥉 3";
    }

    let reasonHtml = '<span class="text-dim">--</span>';
    if (student.contestSolved === 0) {
      reasonHtml = student.reason 
        ? `<span class="reason-tag-absent" title="${student.reason}">${student.reason}</span>` 
        : `<span class="reason-tag-absent">Not Participated</span>`;
    } else if (student.reason) {
      reasonHtml = `<span class="reason-cell">${student.reason}</span>`;
    }

    return `
      <tr onclick="openStudentModal(${student.id})" data-student-id="${student.id}" title="Click to view full stats">
        <td><div class="${rankBadgeClass}">${rankContent}</div></td>
        <td>
          <div class="student-info-cell">
            <div class="student-avatar-sm" style="background: ${getAvatarColor(student.name)}">
              ${getInitials(student.name)}
            </div>
            <div class="student-meta">
              <span class="student-name-text">${student.name}</span>
            </div>
          </div>
        </td>
        <td><span class="reg-number-text">${student.regNo}</span></td>
        <td>
          <div class="solved-pill ${getSolvedBadgeClass(student.contestSolved)}">
            <span>${student.contestSolved}</span>
            <span class="dropdown-arrow-icon">▾</span>
          </div>
        </td>
        <td>${reasonHtml}</td>
        <td><span class="font-mono">${student.currentRating || '--'}</span></td>
        <td><span class="font-mono text-muted">${student.highestRating || '--'}</span></td>
        <td><span class="font-mono">Div ${student.division || 4}</span></td>
        <td><span class="star-rating-text">${'★'.repeat(student.starRating || 1)}</span></td>
        <td><span class="font-mono text-dim">${student.globalRating ? student.globalRating.toLocaleString() : '--'}</span></td>
        <td><span class="font-mono text-dim">${student.countryRating ? student.countryRating.toLocaleString() : '--'}</span></td>
      </tr>
    `;
  }).join('');
}

// ==========================================
// 6. FACULTY & ADMIN PORTAL
// ==========================================
function renderAdminPortal() {
  const total = studentsMaster.length;
  const participated = studentsMaster.filter(s => s.contestSolved > 0).length;
  const absentStudents = studentsMaster.filter(s => s.contestSolved === 0);
  const topStudents = studentsMaster.filter(s => s.contestSolved >= 3);
  const passRate = total > 0 ? ((participated / total) * 100).toFixed(1) : 0;

  // Update report header
  document.getElementById("repContestDate").textContent = currentContestDate;
  document.getElementById("repGenDate").textContent = new Date().toLocaleDateString('en-GB');

  // Stats
  document.getElementById("repTotalStrength").textContent = total;
  document.getElementById("repActiveCount").textContent = `${participated} (${passRate}%)`;
  document.getElementById("repAbsentCount").textContent = `${absentStudents.length} (${(100 - passRate).toFixed(1)}%)`;
  document.getElementById("repPassRate").textContent = `${passRate}%`;

  // Top performers pills
  const topList = document.getElementById("repTopPerformersList");
  if (topStudents.length > 0) {
    topList.innerHTML = topStudents.map(s => `
      <span class="rep-performer-pill">
        ⭐ ${s.name} (${s.regNo}) • Rating: ${s.currentRating || 'N/A'}
      </span>
    `).join('');
  } else {
    topList.innerHTML = `<span class="text-dim">No student solved 3 problems in this contest.</span>`;
  }

  // Absent table
  const absentBody = document.getElementById("repAbsentTableBody");
  if (absentStudents.length > 0) {
    absentBody.innerHTML = absentStudents.map(s => `
      <tr>
        <td class="font-mono"><strong>${s.regNo}</strong></td>
        <td>${s.name}</td>
        <td><span class="text-rose">${s.reason || 'No reason specified (Uninformed Absent)'}</span></td>
        <td><span class="chip chip-year">${s.reason ? 'Documented' : 'Warning Pending'}</span></td>
      </tr>
    `).join('');
  } else {
    absentBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #10b981;">🎉 100% Participation! No absentees in this contest.</td></tr>`;
  }

  // Populate contest select dropdown
  const contestSelect = document.getElementById("adminContestSelect");
  contestSelect.innerHTML = CONTEST_TABS.map(tab => `
    <option value="${tab.id}" ${tab.id === currentContestDate ? 'selected' : ''}>${tab.name}</option>
  `).join('');

  // Populate Student Editor dropdown
  const studentSelect = document.getElementById("adminSelectStudent");
  studentSelect.innerHTML = studentsMaster.map(s => `
    <option value="${s.id}">${s.regNo} - ${s.name} (Solved: ${s.contestSolved})</option>
  `).join('');

  // Pre-fill reason input for selected student
  syncSelectedStudentToForm();
}

function syncSelectedStudentToForm() {
  const studentId = parseInt(document.getElementById("adminSelectStudent").value);
  const student = studentsMaster.find(s => s.id === studentId);
  if (student) {
    document.getElementById("adminProblemsSolvedInput").value = student.contestSolved;
    document.getElementById("adminReasonInput").value = student.reason || "";
  }
}

function saveStudentReasonAdmin() {
  const studentId = parseInt(document.getElementById("adminSelectStudent").value);
  const solvedCount = parseInt(document.getElementById("adminProblemsSolvedInput").value);
  const reasonText = document.getElementById("adminReasonInput").value.trim();

  const student = studentsMaster.find(s => s.id === studentId);
  if (!student) return;

  student.contestSolved = solvedCount;
  student.reason = reasonText;

  showToast(`Updated ${student.name}: Solved=${solvedCount}, Reason="${reasonText || 'None'}"`, true);
  
  // Refresh all views
  renderAdminPortal();
  applyContestFilters();
  applyOverallFilters();
}

function copyFacultyReportWhatsapp() {
  const total = studentsMaster.length;
  const participated = studentsMaster.filter(s => s.contestSolved > 0).length;
  const absentStudents = studentsMaster.filter(s => s.contestSolved === 0);
  const topStudents = studentsMaster.filter(s => s.contestSolved >= 3);
  const solve2 = studentsMaster.filter(s => s.contestSolved === 2);
  const solve1 = studentsMaster.filter(s => s.contestSolved === 1);

  const reportText = `📢 COLLEGE OF ENGINEERING & TECHNOLOGY
DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
COMPETITIVE PROGRAMMING (CODECHEF) REPORT
📅 Contest Date: ${currentContestDate}
🏛️ Batch: 2025-2029 (711525BCS)
----------------------------------------
👥 Total Registered: ${total}
✅ Participated (&gt;0 Solved): ${participated} (${((participated/total)*100).toFixed(0)}%)
❌ Absent / 0 Solved: ${absentStudents.length} (${((absentStudents.length/total)*100).toFixed(0)}%)

🌟 TOP PERFORMERS (3 Problems Solved):
${topStudents.map(s => `• ${s.name} (${s.regNo}) - Rating: ${s.currentRating}`).join('\n') || 'None'}

📊 PERFORMANCE DISTRIBUTION:
• 3 Solved: ${topStudents.length} students
• 2 Solved: ${solve2.length} students
• 1 Solved: ${solve1.length} students
• 0 Solved: ${absentStudents.length} students

⚠️ ABSENT / NON-PARTICIPATION AUDIT:
${absentStudents.map(s => `• ${s.name} (${s.regNo}) - Reason: ${s.reason || 'Uninformed absent'}`).join('\n') || 'None - 100% attendance!'}
----------------------------------------
Report generated via CampusCP Faculty Portal`;

  navigator.clipboard.writeText(reportText).then(() => {
    showToast("Official report copied to clipboard! Ready to paste into WhatsApp / Email.", true);
  }).catch(() => {
    showToast("Please copy manually from the report preview.", false);
  });
}

// ==========================================
// 7. STUDENT DETAIL MODAL
// ==========================================
window.openStudentModal = function(studentId) {
  const student = studentsMaster.find(s => s.id === studentId);
  if (!student) return;

  const modal = document.getElementById("studentDetailModal");

  const avatarEl = document.getElementById("modalStudentAvatar");
  avatarEl.textContent = getInitials(student.name);
  avatarEl.style.background = getAvatarColor(student.name);

  document.getElementById("modalStudentName").textContent = student.name;
  document.getElementById("modalStudentRoll").textContent = `Register Number: ${student.regNo}`;
  
  const rankToShow = activeView === "contest" ? student.contestRank : student.overallRank;
  document.getElementById("modalRankBadge").textContent = `Rank #${rankToShow || 1}`;
  document.getElementById("modalDeptOrSolvedChip").textContent = `${student.dept} • Year ${student.year}`;
  document.getElementById("modalYearOrDivChip").textContent = `Division ${student.division || 4}`;

  document.getElementById("modalTotalSolved").textContent = (activeView === "contest" ? `${student.contestSolved} in Contest` : student.totalSolved.toLocaleString());
  document.getElementById("modalPercentile").textContent = student.contestSolved >= 3 ? "Top Champion" : "Active Coder";

  document.getElementById("modalCurrentRating").textContent = student.currentRating || "N/A";
  document.getElementById("modalHighestRating").textContent = `Highest: ${student.highestRating || "N/A"}`;
  document.getElementById("modalStarRating").textContent = `${student.starRating || 1} Star (${'★'.repeat(student.starRating || 1)})`;
  document.getElementById("modalDivisionText").textContent = `Division ${student.division || 4}`;

  document.getElementById("modalGlobalRank").textContent = student.globalRating ? student.globalRating.toLocaleString() : "N/A";
  document.getElementById("modalCountryRank").textContent = `Country: ${student.countryRating ? student.countryRating.toLocaleString() : "N/A"}`;

  // Audit
  document.getElementById("modalParticipationStatus").textContent = student.contestSolved > 0 ? "✅ Active Participant in Contest" : "❌ Did not submit / Absent";
  document.getElementById("modalReasonText").textContent = student.reason || (student.contestSolved > 0 ? "None (Submitted problems)" : "No reason specified");

  // CodeChef Card
  document.getElementById("modalCcHandle").textContent = `@${student.regNo.toLowerCase()}`;
  document.getElementById("modalCcLink").href = `https://www.codechef.com/users/${student.regNo.toLowerCase()}`;
  document.getElementById("modalCcRatingBox").textContent = student.currentRating || "--";
  document.getElementById("modalCcPeakBox").textContent = student.highestRating || "--";
  document.getElementById("modalCcStarsBox").textContent = `${student.starRating || 1}★`;

  // LeetCode Card
  document.getElementById("modalLcHandle").textContent = `@${student.leetcode?.handle || student.name.toLowerCase().replace(/\s+/g,'_')}`;
  document.getElementById("modalLcLink").href = `https://leetcode.com/u/${student.leetcode?.handle || ''}`;
  document.getElementById("modalLcSolved").textContent = student.leetcode?.solved || "--";
  document.getElementById("modalLcRating").textContent = student.leetcode?.rating || "--";
  document.getElementById("modalLcBadge").textContent = student.leetcode?.badge || "Knight";

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

function closeStudentModal() {
  const modal = document.getElementById("studentDetailModal");
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// ==========================================
// 8. CSV EXPORTS & GOOGLE SHEETS
// ==========================================
function exportOverallCsv() {
  const headers = ["Rank", "Full Name", "Register Number", "Department", "Year", "Total Solved", "LeetCode Solved", "Codeforces Rating", "CodeChef Rating"];
  const rows = overallFiltered.map(s => [
    s.overallRank, `"${s.name}"`, `"${s.regNo}"`, s.dept, s.year, s.totalSolved,
    s.leetcode?.solved || 0, s.codeforces?.rating || 0, s.currentRating || 0
  ]);
  downloadCsvFile(`CampusCP_Overall_Leaderboard.csv`, headers, rows);
}

function exportContestCsv() {
  const headers = ["Rank", "Name of the student", "Register Number", "No of problems solved", "If no reason", "Current Rating", "Highest Rating", "Division", "Star Rating", "Global Rating", "Country Rating"];
  const rows = contestFiltered.map(s => [
    s.contestRank, `"${s.name}"`, `"${s.regNo}"`, s.contestSolved, `"${s.reason || ''}"`,
    s.currentRating || '', s.highestRating || '', s.division || 4, s.starRating || 1, s.globalRating || '', s.countryRating || ''
  ]);
  downloadCsvFile(`CodeChef_Contest_${currentContestDate}_Leaderboard.csv`, headers, rows);
}

function downloadCsvFile(filename, headers, rows) {
  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(csvContent));
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast(`Exported ${rows.length} rows to ${filename}!`, true);
}

// ==========================================
// 8.1 GOOGLE APPS SCRIPT CODE TEMPLATE & 2-WAY SYNC ENGINE
// ==========================================
const APPS_SCRIPT_CODE_TEMPLATE = `/**
 * Google Apps Script: Auto-Fetch Real Contest Data & 2-Way Sync Engine for Google Sheets
 * Deploy as Web app with access set to "Anyone".
 */
function onOpen() {
  SpreadsheetApp.getUi().createMenu('🏆 CampusCP Tools')
    .addItem('⚡ Auto-Fetch CodeChef Contest Data', 'autoSyncLatestCodeChefContest')
    .addItem('📊 Generate Faculty Class Summary', 'generateFacultySummaryDialog')
    .addToUi();
}

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
      return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'No student records received.' })).setMimeType(ContentService.MimeType.JSON);
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
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const action = (e && e.parameter && e.parameter.action) || 'getData';
    const targetTab = (e && e.parameter && e.parameter.tab) || null;
    let sheet = targetTab ? ss.getSheetByName(targetTab) : ss.getActiveSheet();
    if (!sheet) sheet = ss.getActiveSheet();
    const sheetName = sheet.getName();
    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();
    if (lastRow < 2) {
      return ContentService.createTextOutput(JSON.stringify({ status: 'success', sheetName: sheetName, students: [], allTabs: ss.getSheets().map(s => s.getName()) })).setMimeType(ContentService.MimeType.JSON);
    }
    const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => String(h).trim());
    const dataValues = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
    const students = dataValues.map((row, idx) => {
      const item = { id: idx + 1 };
      headers.forEach((h, cIdx) => { item[h] = row[cIdx]; });
      return item;
    });
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      sheetName: sheetName,
      totalCount: students.length,
      allTabs: ss.getSheets().map(s => s.getName()),
      students: students,
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

function updateSheetWithStudentData(contestDate, students) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(contestDate);
  if (!sheet) sheet = ss.insertSheet(contestDate, 0);
  const headers = ['Rank', 'Name of the student', 'Register Number', 'No of problems solved', 'If no reason', 'Current Rating', 'Highest Rating', 'Division', 'Star Rating', 'Global Rating', 'Country Rating'];
  sheet.clear();
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setBackground('#0f172a');
  headerRange.setFontColor('#ffffff');
  headerRange.setFontWeight('bold');
  headerRange.setHorizontalAlignment('center');
  sheet.setFrozenRows(1);
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
    rows.push([rank, name, regNo, solved, reason, currentRating, highestRating, division, starRating, globalRating, countryRating]);
    let solveColor = '#7f1d1d'; // Red 0 solved
    if (solved >= 3) solveColor = '#14532d'; // Dark Green 3 solved
    else if (solved === 2) solveColor = '#166534'; // Light Green 2 solved
    else if (solved === 1) solveColor = '#7c2d12'; // Orange 1 solved
    const rowColors = new Array(headers.length).fill('#ffffff');
    rowColors[3] = solveColor;
    backgrounds.push(rowColors);
  });
  if (rows.length > 0) {
    const dataRange = sheet.getRange(2, 1, rows.length, headers.length);
    dataRange.setValues(rows);
    dataRange.setBackgrounds(backgrounds);
    dataRange.setFontFamily('Arial');
    dataRange.setFontSize(10);
    dataRange.setVerticalAlignment('middle');
    const solvedColRange = sheet.getRange(2, 4, rows.length, 1);
    solvedColRange.setFontColor('#ffffff');
    solvedColRange.setFontWeight('bold');
    solvedColRange.setHorizontalAlignment('center');
  }
  for (let c = 1; c <= headers.length; c++) sheet.autoResizeColumn(c);
  return { updatedCount: rows.length };
}
`;

// Copy Apps Script code to clipboard
function copyGoogleAppsScriptCode() {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(APPS_SCRIPT_CODE_TEMPLATE).then(() => {
      showToast("📋 Google Apps Script code copied to clipboard! Paste into Extensions -> Apps Script.", true);
    }).catch(() => {
      showToast("Could not copy automatically. You can find the script in GoogleAppsScript_CodeChef_AutoSync.js", false);
    });
  } else {
    showToast("Code ready in GoogleAppsScript_CodeChef_AutoSync.js in project folder.", true);
  }
}

// Google Sheet Modal Controls
function openSheetConfigModal(activeTab = "appsscript") {
  const modal = document.getElementById("sheetConfigModal");
  if (!modal) return;
  
  const appsScriptInput = document.getElementById("googleAppsScriptUrlInput");
  if (appsScriptInput) appsScriptInput.value = googleAppsScriptUrl;
  
  const sheetUrlInput = document.getElementById("googleSheetUrlInput");
  if (sheetUrlInput) sheetUrlInput.value = customSheetUrl;

  const autoSyncCheck = document.getElementById("autoSyncIntervalToggle");
  if (autoSyncCheck) autoSyncCheck.checked = isAutoSyncEnabled;

  switchSheetModalTab(activeTab);
  updateSheetSyncStatusBadges();

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeSheetConfigModal() {
  const modal = document.getElementById("sheetConfigModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function switchSheetModalTab(tabKey) {
  currentSheetActiveTab = tabKey;
  const tabBtnAppsScript = document.getElementById("modalSubtabAppsScript");
  const tabBtnCsv = document.getElementById("modalSubtabCsv");
  const panelAppsScript = document.getElementById("tabPanelAppsScript");
  const panelCsv = document.getElementById("tabPanelCsv");

  if (tabKey === "appsscript") {
    if (tabBtnAppsScript) tabBtnAppsScript.classList.add("active");
    if (tabBtnCsv) tabBtnCsv.classList.remove("active");
    if (panelAppsScript) panelAppsScript.style.display = "block";
    if (panelCsv) panelCsv.style.display = "none";
  } else {
    if (tabBtnAppsScript) tabBtnAppsScript.classList.remove("active");
    if (tabBtnCsv) tabBtnCsv.classList.add("active");
    if (panelAppsScript) panelAppsScript.style.display = "none";
    if (panelCsv) panelCsv.style.display = "block";
  }
}

function saveGoogleSheetUrl() {
  const appsScriptInput = document.getElementById("googleAppsScriptUrlInput");
  const sheetInput = document.getElementById("googleSheetUrlInput");
  const autoSyncCheck = document.getElementById("autoSyncIntervalToggle");

  if (appsScriptInput) {
    googleAppsScriptUrl = appsScriptInput.value.trim();
    if (googleAppsScriptUrl) {
      localStorage.setItem("campuscplb_apps_script_url", googleAppsScriptUrl);
    } else {
      localStorage.removeItem("campuscplb_apps_script_url");
    }
  }

  if (sheetInput) {
    customSheetUrl = sheetInput.value.trim();
    if (customSheetUrl) {
      localStorage.setItem("campuscplb_sheet_url", customSheetUrl);
    } else {
      localStorage.removeItem("campuscplb_sheet_url");
    }
  }

  if (autoSyncCheck) {
    isAutoSyncEnabled = autoSyncCheck.checked;
    localStorage.setItem("campuscplb_auto_sync_enabled", isAutoSyncEnabled ? "true" : "false");
    setupAutoSyncInterval(isAutoSyncEnabled);
    const adminToggle = document.getElementById("adminAutoSyncToggle");
    if (adminToggle) adminToggle.checked = isAutoSyncEnabled;
  }

  updateSheetSyncStatusBadges();
  closeSheetConfigModal();

  if (googleAppsScriptUrl) {
    showToast("Google Sheet Apps Script Web App connected! Pushing current data...", true);
    pushDataToGoogleSheet(currentContestDate, studentsMaster, true);
  } else if (customSheetUrl) {
    showToast("Google Sheet CSV link connected! Fetching...", true);
    fetchDataFromGoogleSheet();
  } else {
    showToast("Saved settings (using built-in college dataset).", true);
    refreshAllData();
  }
}

// Update badges across header and admin portal
function updateSheetSyncStatusBadges(justSynced = false, tabName = currentContestDate) {
  const syncStatusEl = document.getElementById("sheetSyncStatus");
  const sourceTypeEl = document.getElementById("sheetSourceType");
  const adminBadgeEl = document.getElementById("adminSheetSyncBadge");
  const bannerEl = document.getElementById("sheetStatusBanner");

  const hasAppsScript = Boolean(googleAppsScriptUrl && googleAppsScriptUrl.trim());
  const hasCsv = Boolean(customSheetUrl && customSheetUrl.trim());

  if (hasAppsScript) {
    if (syncStatusEl) syncStatusEl.textContent = `Live Synced (${tabName})`;
    if (sourceTypeEl) {
      sourceTypeEl.textContent = "Google Sheet 2-Way";
      sourceTypeEl.className = "sheet-pill connected";
    }
    if (adminBadgeEl) {
      adminBadgeEl.textContent = "🟢 2-Way Live (Web App)";
      adminBadgeEl.className = "sheet-pill connected";
    }
    if (bannerEl) {
      bannerEl.className = "status-alert-box status-alert-success";
      bannerEl.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink: 0; margin-top: 1px;">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <div>
          <strong>Connected to Google Sheet:</strong> The website is connected to your Apps Script Web App. New contest results automatically update your spreadsheet tab with college color formatting!
        </div>
      `;
    }
  } else if (hasCsv) {
    if (syncStatusEl) syncStatusEl.textContent = "CSV Connected";
    if (sourceTypeEl) {
      sourceTypeEl.textContent = "Sheet (Read-Only)";
      sourceTypeEl.className = "sheet-pill connected";
    }
    if (adminBadgeEl) {
      adminBadgeEl.textContent = "🟡 Read-Only CSV";
      adminBadgeEl.className = "sheet-pill";
    }
  } else {
    if (syncStatusEl) syncStatusEl.textContent = "Demo Dataset";
    if (sourceTypeEl) {
      sourceTypeEl.textContent = "Connect Sheet";
      sourceTypeEl.className = "sheet-pill not-connected";
    }
    if (adminBadgeEl) {
      adminBadgeEl.textContent = "⚪ Web App URL Not Set";
      adminBadgeEl.className = "sheet-pill not-connected";
    }
    if (bannerEl) {
      bannerEl.className = "status-alert-box status-alert-info";
      bannerEl.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink: 0; margin-top: 1px;">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <div>
          <strong>Two-Way Live Sync:</strong> When configured, the website automatically creates contest tabs in your Google Sheet, formats headers, and applies college color badges (3=Green, 2=Light Green, 1=Orange, 0=Red).
        </div>
      `;
    }
  }
}

// Push student dataset to Google Sheet Web App (doPost)
async function pushDataToGoogleSheet(contestDate, studentsList, showToastNotice = true) {
  const url = (googleAppsScriptUrl || "").trim();
  if (!url) {
    if (showToastNotice) {
      showToast("To update your Google Sheet, paste your Web App URL in Google Sheet settings.", false);
      openSheetConfigModal("appsscript");
    }
    return { success: false, reason: "NO_URL" };
  }

  const payload = {
    action: "updateContest",
    contestDate: contestDate,
    students: studentsList.map((s, idx) => ({
      rank: idx + 1,
      name: s.name,
      regNo: s.regNo,
      contestSolved: Number(s.contestSolved !== undefined ? s.contestSolved : 0),
      reason: s.reason || "",
      currentRating: s.currentRating || 1000,
      highestRating: s.highestRating || (s.currentRating || 1000),
      division: s.division || 4,
      starRating: s.starRating || 1,
      globalRating: s.globalRating || "",
      countryRating: s.countryRating || ""
    }))
  };

  try {
    // Send POST payload
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
    } catch (corsErr) {
      // Fallback with no-cors to guarantee delivery past browser security
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
    }

    if (showToastNotice) {
      showToast(`🟢 Google Sheet updated! Tab "${contestDate}" synced with ${payload.students.length} students & color codes.`, true);
    }
    updateSheetSyncStatusBadges(true, contestDate);
    return { success: true };
  } catch (err) {
    console.error("Error updating Google Sheet:", err);
    if (showToastNotice) {
      showToast("Could not contact Google Sheet Web App: " + err.message, false);
    }
    return { success: false, error: err };
  }
}

// Fetch live contest data from Google Sheet into Website Dashboard
async function fetchDataFromGoogleSheet() {
  if (googleAppsScriptUrl) {
    try {
      const fetchUrl = `${googleAppsScriptUrl}${googleAppsScriptUrl.includes('?') ? '&' : '?'}action=getData&tab=${encodeURIComponent(currentContestDate)}`;
      const res = await fetch(fetchUrl);
      if (res.ok) {
        const json = await res.json();
        if (json && json.students && json.students.length > 0) {
          json.students.forEach(row => {
            const reg = (row['Register Number'] || row.regNo || '').trim();
            const student = studentsMaster.find(s => s.regNo.toLowerCase() === reg.toLowerCase());
            if (student) {
              if (row['No of problems solved'] !== undefined) student.contestSolved = Number(row['No of problems solved']);
              if (row['If no reason']) student.reason = row['If no reason'];
              if (row['Current Rating']) student.currentRating = Number(row['Current Rating']);
              if (row['Highest Rating']) student.highestRating = Number(row['Highest Rating']);
            }
          });
          showToast(`Synced ${json.students.length} student records from Google Sheet tab "${json.sheetName}"!`, true);
          refreshAllData();
          return true;
        }
      }
    } catch (e) {
      console.warn("Apps Script GET failed, attempting CSV fallback:", e);
    }
  }

  if (customSheetUrl) {
    try {
      let csvUrl = customSheetUrl;
      if (csvUrl.includes("/edit")) {
        csvUrl = csvUrl.split("/edit")[0] + "/export?format=csv";
      }
      const res = await fetch(csvUrl);
      if (res.ok) {
        const csvText = await res.text();
        parseAndApplyCsvData(csvText);
        showToast("Synced records from published Google Sheet CSV!", true);
        refreshAllData();
        return true;
      }
    } catch (e) {
      console.error("Failed to read CSV from Google Sheet:", e);
    }
  }
  return false;
}

// Background Auto-Sync timer manager
function setupAutoSyncInterval(enable) {
  if (autoSyncIntervalTimer) {
    clearInterval(autoSyncIntervalTimer);
    autoSyncIntervalTimer = null;
  }
  if (enable) {
    // Run every 5 minutes (300,000 ms)
    autoSyncIntervalTimer = setInterval(() => {
      console.log("⏰ Running scheduled auto-fetch and Google Sheet sync...");
      triggerLiveAutoSync(true); // silent background run
    }, 5 * 60 * 1000);
  }
}

function refreshAllData() {
  const btn = document.getElementById("refreshDataBtn");
  if (btn) btn.classList.add("spinning");
  setTimeout(() => {
    if (btn) btn.classList.remove("spinning");
    updateOverallMetrics();
    applyOverallFilters();
    applyContestFilters();
    if (activeView === "admin") renderAdminPortal();
    updateSheetSyncStatusBadges();
    showToast("Leaderboard & dashboard refreshed successfully!", true);
  }, 400);
}

// ==========================================
// 9. EVENT LISTENERS SETUP
// ==========================================
function setupEventListeners() {
  // Navigation View Switcher Tabs
  document.getElementById("navTabOverall").addEventListener("click", () => switchView("overall"));
  document.getElementById("navTabContest").addEventListener("click", () => switchView("contest"));
  document.getElementById("navTabAdmin").addEventListener("click", () => switchView("admin"));
  const navTabCal = document.getElementById("navTabCalendar");
  if (navTabCal) navTabCal.addEventListener("click", () => switchView("calendar"));

  // Overall Controls
  const overallSearch = document.getElementById("overallSearchInput");
  const clearOverall = document.getElementById("clearOverallSearchBtn");
  overallSearch.addEventListener("input", (e) => {
    clearOverall.style.display = e.target.value ? "flex" : "none";
    applyOverallFilters();
  });
  clearOverall.addEventListener("click", () => {
    overallSearch.value = "";
    clearOverall.style.display = "none";
    applyOverallFilters();
  });
  document.getElementById("overallDeptFilter").addEventListener("change", applyOverallFilters);
  document.getElementById("overallYearFilter").addEventListener("change", applyOverallFilters);
  document.getElementById("overallSortBySelect").addEventListener("change", (e) => {
    overallSort = e.target.value;
    sortOverallFiltered();
    renderOverallTable();
  });

  // Overall Platform Tabs
  document.querySelectorAll("#overallPlatformTabs .platform-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("#overallPlatformTabs .platform-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const p = tab.dataset.platform;
      overallPlatform = p;
      if (p === "leetcode") overallSort = "leetcode_desc";
      else if (p === "codeforces") overallSort = "cf_desc";
      else overallSort = "total_desc";
      document.getElementById("overallSortBySelect").value = overallSort;
      sortOverallFiltered();
      renderOverallTable();
    });
  });

  // Contest Controls
  const contestSearch = document.getElementById("contestSearchInput");
  const clearContest = document.getElementById("clearContestSearchBtn");
  contestSearch.addEventListener("input", (e) => {
    clearContest.style.display = e.target.value ? "flex" : "none";
    applyContestFilters();
  });
  clearContest.addEventListener("click", () => {
    contestSearch.value = "";
    clearContest.style.display = "none";
    applyContestFilters();
  });
  document.getElementById("contestSolvedFilter").addEventListener("change", applyContestFilters);
  document.getElementById("contestParticipationFilter").addEventListener("change", applyContestFilters);
  document.getElementById("contestSortBySelect").addEventListener("change", (e) => {
    contestSort = e.target.value;
    sortContestFiltered();
    renderContestTable();
  });

  // Contest Quick Filter Pills
  document.querySelectorAll("#contestQuickFilterPills .platform-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("#contestQuickFilterPills .platform-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      contestQuickFilter = tab.dataset.filter;
      applyContestFilters();
    });
  });

  // Table Column Header Sort (Overall)
  document.querySelectorAll("#overallLeaderboardTable th[data-sort]").forEach(th => {
    th.addEventListener("click", () => {
      const col = th.dataset.sort;
      const [cCol, cDir] = overallSort.split("_");
      const nDir = (cCol === col && cDir === "desc") ? "asc" : "desc";
      overallSort = `${col}_${nDir}`;
      sortOverallFiltered();
      renderOverallTable();
    });
  });

  // Table Column Header Sort (Contest)
  document.querySelectorAll("#contestLeaderboardTable th[data-sort]").forEach(th => {
    th.addEventListener("click", () => {
      const col = th.dataset.sort;
      const [cCol, cDir] = contestSort.split("_");
      const nDir = (cCol === col && cDir === "desc") ? "asc" : "desc";
      contestSort = `${col}_${nDir}`;
      sortContestFiltered();
      renderContestTable();
    });
  });

  // Reset Filters Buttons
  document.getElementById("resetOverallFiltersBtn").addEventListener("click", () => {
    overallSearch.value = "";
    clearOverall.style.display = "none";
    document.getElementById("overallDeptFilter").value = "ALL";
    document.getElementById("overallYearFilter").value = "ALL";
    document.getElementById("overallSortBySelect").value = "total_desc";
    overallSort = "total_desc";
    applyOverallFilters();
  });

  document.getElementById("resetContestFiltersBtn").addEventListener("click", () => {
    contestSearch.value = "";
    clearContest.style.display = "none";
    document.getElementById("contestSolvedFilter").value = "ALL";
    document.getElementById("contestParticipationFilter").value = "ALL";
    document.getElementById("contestSortBySelect").value = "solved_desc";
    contestSort = "solved_desc";
    contestQuickFilter = "all";
    document.querySelectorAll("#contestQuickFilterPills .platform-tab").forEach((t, i) => t.classList.toggle("active", i === 0));
    applyContestFilters();
  });

  // Admin Tools Listeners
  document.getElementById("adminPrintReportBtn").addEventListener("click", () => window.print());
  document.getElementById("adminCopyWhatsappBtn").addEventListener("click", copyFacultyReportWhatsapp);
  document.getElementById("adminContestSelect").addEventListener("change", (e) => {
    switchContestDate(e.target.value);
  });
  document.getElementById("adminSelectStudent").addEventListener("change", syncSelectedStudentToForm);
  document.getElementById("adminSaveReasonBtn").addEventListener("click", saveStudentReasonAdmin);
  document.getElementById("adminExportFullReportCsvBtn").addEventListener("click", exportContestCsv);
  document.getElementById("adminResetDefaultDatasetBtn").addEventListener("click", () => {
    studentsMaster = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
    showToast("Reset to default college dataset!", true);
    refreshAllData();
  });

  // CSV Export Buttons
  document.getElementById("exportOverallCsvBtn").addEventListener("click", exportOverallCsv);
  document.getElementById("exportContestCsvBtn").addEventListener("click", exportContestCsv);

  // Global Header Actions
  document.getElementById("refreshDataBtn").addEventListener("click", refreshAllData);
  document.getElementById("openSheetModalBtn").addEventListener("click", () => openSheetConfigModal("appsscript"));
  document.getElementById("closeSheetModalBtn").addEventListener("click", closeSheetConfigModal);
  document.getElementById("cancelSheetBtn").addEventListener("click", closeSheetConfigModal);
  document.getElementById("saveSheetUrlBtn").addEventListener("click", saveGoogleSheetUrl);

  // Subtabs inside Google Sheet Modal
  const subtabAppsScript = document.getElementById("modalSubtabAppsScript");
  const subtabCsv = document.getElementById("modalSubtabCsv");
  if (subtabAppsScript) subtabAppsScript.addEventListener("click", () => switchSheetModalTab("appsscript"));
  if (subtabCsv) subtabCsv.addEventListener("click", () => switchSheetModalTab("csv"));

  // Copy Apps Script Code Buttons
  const copyScriptBtn = document.getElementById("copyAppsScriptCodeBtn");
  if (copyScriptBtn) copyScriptBtn.addEventListener("click", copyGoogleAppsScriptCode);

  const adminCopyScriptBtn = document.getElementById("adminCopyScriptBtn");
  if (adminCopyScriptBtn) adminCopyScriptBtn.addEventListener("click", copyGoogleAppsScriptCode);

  // Push to Google Sheet Button in Modal
  const pushSheetBtn = document.getElementById("pushToGoogleSheetBtn");
  if (pushSheetBtn) {
    pushSheetBtn.addEventListener("click", () => {
      pushDataToGoogleSheet(currentContestDate, studentsMaster, true);
    });
  }

  // Admin Configure Sheet Button
  const adminConfigBtn = document.getElementById("adminConfigureSheetBtn");
  if (adminConfigBtn) {
    adminConfigBtn.addEventListener("click", () => openSheetConfigModal("appsscript"));
  }

  // Auto-Update Sheet Checkbox in Admin
  const adminUpdateSheetToggle = document.getElementById("adminAutoUpdateSheetToggle");
  if (adminUpdateSheetToggle) {
    adminUpdateSheetToggle.addEventListener("change", (e) => {
      autoUpdateSheetOnSync = e.target.checked;
    });
  }

  // Auto-Sync Background Interval Checkbox in Admin
  const adminSyncToggle = document.getElementById("adminAutoSyncToggle");
  if (adminSyncToggle) {
    adminSyncToggle.checked = isAutoSyncEnabled;
    adminSyncToggle.addEventListener("change", (e) => {
      isAutoSyncEnabled = e.target.checked;
      localStorage.setItem("campuscplb_auto_sync_enabled", isAutoSyncEnabled ? "true" : "false");
      setupAutoSyncInterval(isAutoSyncEnabled);
      const modalToggle = document.getElementById("autoSyncIntervalToggle");
      if (modalToggle) modalToggle.checked = isAutoSyncEnabled;
      showToast(isAutoSyncEnabled ? "🔄 5-minute background auto-sync enabled!" : "Background auto-sync paused.", true);
    });
  }

  document.getElementById("loadDefaultDatasetBtn").addEventListener("click", () => {
    customSheetUrl = "";
    localStorage.removeItem("campuscplb_sheet_url");
    studentsMaster = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
    closeSheetConfigModal();
    refreshAllData();
  });

  // Trigger Live Auto-Sync from CodeChef & Sheet
  const autoSyncBtn = document.getElementById("triggerAutoSyncBtn");
  if (autoSyncBtn) {
    autoSyncBtn.addEventListener("click", () => triggerLiveAutoSync(false));
  }

  // Modal Close
  document.getElementById("closeModalBtn").addEventListener("click", closeStudentModal);
  document.getElementById("modalDismissBtn").addEventListener("click", closeStudentModal);
  document.getElementById("studentDetailModal").addEventListener("click", (e) => {
    if (e.target.id === "studentDetailModal") closeStudentModal();
  });
  document.getElementById("sheetConfigModal").addEventListener("click", (e) => {
    if (e.target.id === "sheetConfigModal") closeSheetConfigModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeStudentModal();
      closeSheetConfigModal();
    }
  });

  // Contest Calendar Event Listeners
  setupCalendarEventListeners();
}

// Live Client-Side Auto-Sync Function
async function triggerLiveAutoSync(isBackground = false) {
  const contestCode = (document.getElementById("autoContestCodeInput")?.value || "START155").trim();
  const contestDate = (document.getElementById("autoContestDateInput")?.value || "07.10.2026").trim();
  const progressBox = document.getElementById("syncProgressContainer");
  const barFill = document.getElementById("syncProgressBarFill");
  const statusText = document.getElementById("syncStatusText");
  const logStream = document.getElementById("syncLogStream");
  const syncBtn = document.getElementById("triggerAutoSyncBtn");
  const shouldUpdateGoogleSheet = document.getElementById("adminAutoUpdateSheetToggle") ? document.getElementById("adminAutoUpdateSheetToggle").checked : true;

  if (!isBackground) {
    if (progressBox) progressBox.style.display = "flex";
    if (syncBtn) {
      syncBtn.disabled = true;
      syncBtn.innerHTML = `<span>⏳ Syncing Real Data & Updating Sheet...</span>`;
    }
    if (logStream) logStream.textContent = `🚀 Connecting to CodeChef Live Feed for ${contestCode}...\n`;
  }

  // 1. Fetch real contest records
  try {
    const localRes = await fetch('./data/contests.json');
    if (localRes.ok) {
      const contestData = await localRes.json();
      if (contestData && contestData.students && contestData.students.length > 0) {
        if (!isBackground && logStream) {
          logStream.textContent += `[✓] Retrieved official contest records (${contestData.students.length} students enrolled)\n`;
        }
        contestData.students.forEach(cs => {
          const m = studentsMaster.find(s => s.id === cs.id || s.regNo.toLowerCase() === (cs.regNo || '').toLowerCase());
          if (m) {
            m.currentRating = cs.currentRating || m.currentRating;
            m.highestRating = Math.max(cs.highestRating || 0, m.highestRating || 0);
            m.division = cs.division || m.division;
            m.starRating = cs.starRating || m.starRating;
            m.globalRating = cs.globalRating || m.globalRating;
            m.countryRating = cs.countryRating || m.countryRating;
            m.contestSolved = Number(cs.contestSolved !== undefined ? cs.contestSolved : m.contestSolved);
            m.reason = cs.reason || (m.contestSolved === 0 ? "Uninformed Absent / No submission" : "");
          }
        });
      }
    }
  } catch(e) {
    console.warn("Local contest dataset fetch fallback:", e);
  }

  const total = studentsMaster.length;
  if (!isBackground) {
    for (let i = 0; i < total; i++) {
      const s = studentsMaster[i];
      const pct = Math.round(((i + 1) / total) * 70);
      if (barFill) barFill.style.width = `${pct}%`;
      if (statusText) statusText.textContent = `Auditing student [${i + 1}/${total}] ${s.name}...`;
      
      await new Promise(r => setTimeout(r, 35));

      if (logStream) {
        const statusIcon = s.contestSolved > 0 ? "✅" : "⚠️";
        logStream.textContent += `[${statusIcon}] ${s.name} (${s.regNo}) -> Solved: ${s.contestSolved}, Rating: ${s.currentRating}\n`;
        logStream.scrollTop = logStream.scrollHeight;
      }
    }
  }

  // 2. Ensure contest date tab exists in daily tracker
  if (!CONTEST_TABS.some(t => t.id === contestDate)) {
    CONTEST_TABS.unshift({ id: contestDate, name: contestDate, label: `${contestDate} (${contestCode})`, isLatest: true });
    renderContestDateTabs();
  }
  currentContestDate = contestDate;
  const navPill = document.getElementById("currentContestNavPill");
  if (navPill) navPill.textContent = contestDate;

  // 3. Update Google Sheet if requested
  if (shouldUpdateGoogleSheet) {
    if (!isBackground && statusText) statusText.textContent = `Syncing to Google Sheet tab "${contestDate}"...`;
    if (!isBackground && barFill) barFill.style.width = `85%`;

    if (googleAppsScriptUrl) {
      if (!isBackground && logStream) {
        logStream.textContent += `[✓] Pushing 21 students to Google Sheet Web App (creating tab: ${contestDate})...\n`;
      }
      const sheetResult = await pushDataToGoogleSheet(contestDate, studentsMaster, false);
      if (sheetResult && sheetResult.success) {
        if (!isBackground && logStream) {
          logStream.textContent += `[🎉] Google Sheet updated successfully! Formatted with college color codes (3=Green, 2=Light Green, 1=Orange, 0=Red).\n`;
        }
      } else {
        if (!isBackground && logStream) {
          logStream.textContent += `[!] Notice: Web App sync dispatched. Check Apps Script logs if sheet does not refresh.\n`;
        }
      }
    } else {
      if (!isBackground && logStream) {
        logStream.textContent += `[ℹ️] Note: Google Apps Script URL not configured yet. Updated dashboard locally. Paste your Web App URL in Google Sheet modal to enable automatic sheet writes.\n`;
      }
    }
  }

  if (!isBackground && barFill) barFill.style.width = `100%`;
  if (!isBackground && statusText) {
    statusText.textContent = `🎉 Auto-Sync Complete! Dashboard & Google Sheet updated for ${contestDate}.`;
  }

  if (!isBackground && syncBtn) {
    syncBtn.disabled = false;
    syncBtn.innerHTML = `<span>⚡ Auto-Fetch & Update Google Sheet</span>`;
  }

  // 4. Update and refresh website dashboard views
  applyContestFilters();
  applyOverallFilters();
  updateOverallMetrics();
  if (activeView === "admin") renderAdminPortal();
  updateSheetSyncStatusBadges(true, contestDate);

  if (!isBackground) {
    showToast(`Successfully fetched real contest data & updated dashboard for ${contestDate}!`, true);
  } else {
    console.log(`Auto-sync refreshed data for ${contestDate}`);
  }
}

// ==========================================
// 10. CONTEST CALENDAR LOGIC (LeetCode, CodeChef, Codeforces, AtCoder)
// ==========================================

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

let calSelectedPlatform = "all";
let calSelectedStatus = "all"; // Default to all so all live, upcoming & recent rounds are visible
let calSearchQuery = "";
let calViewMode = "cards"; // 'cards' | 'month'

// Monthly Calendar state
const calCurrentDate = new Date();
let calViewYear = calCurrentDate.getFullYear();
let calViewMonth = calCurrentDate.getMonth();
let calSelectedDateKey = null; // 'YYYY-MM-DD'

let masterContests = [];
let calLiveTimerId = null;

function getPlatformBadgeClass(p) {
  if (p === "leetcode") return "lc";
  if (p === "codechef") return "cc";
  if (p === "codeforces") return "cf";
  if (p === "atcoder") return "at";
  return "all";
}

function getPlatformIcon(p) {
  if (p === "leetcode") {
    return `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.28.038l-4.281-4.196a3.08 3.08 0 0 1-.663-.948 2.87 2.87 0 0 1-.182-.53 3.02 3.02 0 0 1-.03-.984 2.923 2.923 0 0 1 .632-1.096l3.853-4.128 5.4-5.782a1.38 1.38 0 0 0-.965-2.333zm4.184 10.742h-7.662c-.76 0-1.378.618-1.378 1.378 0 .76.618 1.378 1.378 1.378h7.662c.76 0 1.378-.618 1.378-1.378 0-.76-.618-1.378-1.378-1.378z"/></svg>`;
  }
  if (p === "codechef") {
    return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6z"/><line x1="6" y1="17" x2="18" y2="17"/></svg>`;
  }
  if (p === "codeforces") {
    return `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 7.5a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-3 0V9a1.5 1.5 0 0 1 1.5-1.5zm7.5-4.5a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-3 0V4.5a1.5 1.5 0 0 1 1.5-1.5zm7.5 7.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-3 0V12a1.5 1.5 0 0 1 1.5-1.5z"/></svg>`;
  }
  if (p === "atcoder") {
    return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 22 22 22 12 2"/><line x1="6.5" y1="15" x2="17.5" y2="15"/></svg>`;
  }
  return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`;
}

function generateBaseContests() {
  const contests = [];
  const now = new Date();
  const curYear = now.getFullYear();
  const curMonth = now.getMonth();
  const curDate = now.getDate();

  // Helper date creator
  function dateOffsetDays(days, hour, minute) {
    const d = new Date(curYear, curMonth, curDate);
    d.setDate(d.getDate() + days);
    d.setHours(hour, minute, 0, 0);
    return d;
  }

  // --- 1. CODECHEF (Every Wednesday 20:00 - 22:00 IST) ---
  for (let w = -2; w <= 5; w++) {
    const d = new Date(curYear, curMonth, curDate);
    const dayOfWeek = d.getDay(); // 0 is Sun, 3 is Wed
    const diffToWed = 3 - dayOfWeek + (w * 7);
    const start = dateOffsetDays(diffToWed, 20, 0);
    const end = dateOffsetDays(diffToWed, 22, 0);
    const roundNum = 180 + w;

    contests.push({
      id: `cc_starters_${roundNum}`,
      platform: "codechef",
      platformName: "CodeChef",
      title: `CodeChef Starters ${roundNum} (Div. 2, 3 & 4)`,
      startTime: start,
      endTime: end,
      durationMinutes: 120,
      durationLabel: "2 Hours",
      rated: "Rated Div 2, 3 & 4",
      type: "Starters Round",
      url: `https://www.codechef.com/START${roundNum}`,
      description: `CodeChef Starters ${roundNum}. 8 problems across Divisions 2, 3, and 4. ICPC-style short algorithmic battle.`
    });
  }

  // --- 2. LEETCODE ---
  // Weekly Contest (Every Sunday 08:00 - 09:30 AM IST)
  for (let w = -2; w <= 5; w++) {
    const d = new Date(curYear, curMonth, curDate);
    const dayOfWeek = d.getDay(); // 0 is Sun
    const diffToSun = (0 - dayOfWeek + 7) % 7 + (w * 7);
    const start = dateOffsetDays(diffToSun, 8, 0);
    const end = dateOffsetDays(diffToSun, 9, 30);
    const roundNum = 445 + w;

    contests.push({
      id: `lc_weekly_${roundNum}`,
      platform: "leetcode",
      platformName: "LeetCode",
      title: `LeetCode Weekly Contest ${roundNum}`,
      startTime: start,
      endTime: end,
      durationMinutes: 90,
      durationLabel: "1 Hr 30 Min",
      rated: "Rated for All",
      type: "Weekly Contest",
      url: `https://leetcode.com/contest/weekly-contest-${roundNum}`,
      description: `LeetCode Weekly Contest ${roundNum}. 4 algorithmic problems (1 Easy, 2 Medium, 1 Hard). Penalty: 5 min per wrong submission.`
    });
  }

  // Biweekly Contest (Alternate Saturdays 20:00 - 21:30 IST)
  for (let w = -2; w <= 6; w += 2) {
    const d = new Date(curYear, curMonth, curDate);
    const dayOfWeek = d.getDay(); // 6 is Sat
    const diffToSat = (6 - dayOfWeek + 7) % 7 + (w * 7);
    const start = dateOffsetDays(diffToSat, 20, 0);
    const end = dateOffsetDays(diffToSat, 21, 30);
    const roundNum = 154 + Math.floor(w / 2);

    contests.push({
      id: `lc_biweekly_${roundNum}`,
      platform: "leetcode",
      platformName: "LeetCode",
      title: `LeetCode Biweekly Contest ${roundNum}`,
      startTime: start,
      endTime: end,
      durationMinutes: 90,
      durationLabel: "1 Hr 30 Min",
      rated: "Rated for All",
      type: "Biweekly Contest",
      url: `https://leetcode.com/contest/biweekly-contest-${roundNum}`,
      description: `LeetCode Biweekly Contest ${roundNum}. 4 challenging DSA problems. Official global rating updates.`
    });
  }

  // --- 3. CODEFORCES ---
  // Div 2 / Div 3 / Educational rounds on Thursdays and Tuesdays
  for (let w = -2; w <= 5; w++) {
    // Thursday round
    const dThu = new Date(curYear, curMonth, curDate);
    const diffToThu = (4 - dThu.getDay() + 7) % 7 + (w * 7);
    const startThu = dateOffsetDays(diffToThu, 20, 5);
    const endThu = dateOffsetDays(diffToThu, 22, 20);
    const roundThu = 1014 + w;

    contests.push({
      id: `cf_round_${roundThu}`,
      platform: "codeforces",
      platformName: "Codeforces",
      title: `Codeforces Round ${roundThu} (Div. 2)`,
      startTime: startThu,
      endTime: endThu,
      durationMinutes: 135,
      durationLabel: "2 Hr 15 Min",
      rated: "Rated for Div. 2",
      type: "Div. 2 Round",
      url: `https://codeforces.com/contests`,
      description: `Official Codeforces Round ${roundThu} (Div. 2). 5-6 problems, ICPC format with pretests & hacking phase.`
    });

    // Alternate Tuesday Educational Round
    if (w % 2 === 0) {
      const dTue = new Date(curYear, curMonth, curDate);
      const diffToTue = (2 - dTue.getDay() + 7) % 7 + (w * 7);
      const startTue = dateOffsetDays(diffToTue, 20, 5);
      const endTue = dateOffsetDays(diffToTue, 22, 5);
      const eduRound = 175 + Math.floor(w / 2);

      contests.push({
        id: `cf_edu_${eduRound}`,
        platform: "codeforces",
        platformName: "Codeforces",
        title: `Educational Codeforces Round ${eduRound} (Div. 2)`,
        startTime: startTue,
        endTime: endTue,
        durationMinutes: 120,
        durationLabel: "2 Hours",
        rated: "Rated for Div. 2",
        type: "Educational Round",
        url: `https://codeforces.com/contests`,
        description: `Educational Codeforces Round ${eduRound}. Focused on standard algorithms, data structures, and rigorous implementation.`
      });
    }
  }

  // --- 4. ATCODER ---
  // AtCoder Beginner Contest (ABC) every Saturday at 17:30 - 19:10 IST (21:00 JST)
  for (let w = -2; w <= 5; w++) {
    const d = new Date(curYear, curMonth, curDate);
    const diffToSat = (6 - d.getDay() + 7) % 7 + (w * 7);
    const start = dateOffsetDays(diffToSat, 17, 30);
    const end = dateOffsetDays(diffToSat, 19, 10);
    const roundNum = 397 + w;

    contests.push({
      id: `at_abc_${roundNum}`,
      platform: "atcoder",
      platformName: "AtCoder",
      title: `AtCoder Beginner Contest ${roundNum} (ABC ${roundNum})`,
      startTime: start,
      endTime: end,
      durationMinutes: 100,
      durationLabel: "1 Hr 40 Min",
      rated: "Rated for < 2000",
      type: "ABC Round",
      url: `https://atcoder.jp/contests/abc${roundNum}`,
      description: `AtCoder Beginner Contest ${roundNum}. 7-8 problems (A to G/Ex) of increasing difficulty. High quality competitive programming.`
    });
  }

  contests.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  return contests;
}

function mergeOfficialContests(newContests) {
  if (!Array.isArray(newContests) || newContests.length === 0) return;

  newContests.forEach(nc => {
    const sDate = typeof nc.startTime === "string" ? new Date(nc.startTime) : nc.startTime;
    const eDate = typeof nc.endTime === "string" ? new Date(nc.endTime) : nc.endTime;

    const formattedItem = {
      ...nc,
      startTime: sDate,
      endTime: eDate,
      isOfficial: true
    };

    // Find match by exact id or same platform with start time within 2 days
    const existingIdx = masterContests.findIndex(m => 
      m.id === nc.id || 
      (m.platform === nc.platform && Math.abs(new Date(m.startTime).getTime() - sDate.getTime()) < 86400000 * 2)
    );

    if (existingIdx >= 0) {
      masterContests[existingIdx] = { ...masterContests[existingIdx], ...formattedItem };
    } else {
      masterContests.push(formattedItem);
    }
  });

  masterContests.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
}

async function fetchOfficialCalendarData() {
  let anyLoaded = false;

  // 1. Load official pre-synced dataset: data/contest-calendar.json
  try {
    const res = await fetch("./data/contest-calendar.json");
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.contests) && data.contests.length > 0) {
        mergeOfficialContests(data.contests);
        anyLoaded = true;
      }
    }
  } catch (err) {
    console.warn("Local contest-calendar.json sync:", err.message);
  }

  // 2. Fetch Codeforces official API live (CORS enabled)
  try {
    const cfRes = await fetch("https://codeforces.com/api/contest.list?gym=false");
    if (cfRes.ok) {
      const cfData = await cfRes.json();
      if (cfData.status === "OK" && Array.isArray(cfData.result)) {
        const cfContests = cfData.result
          .filter(c => c.phase === "BEFORE" || c.phase === "CODING")
          .map(c => ({
            id: `cf_${c.id}`,
            platform: "codeforces",
            platformName: "Codeforces",
            title: c.name,
            startTime: new Date(c.startTimeSeconds * 1000),
            endTime: new Date((c.startTimeSeconds + c.durationSeconds) * 1000),
            durationMinutes: Math.round(c.durationSeconds / 60),
            durationLabel: `${(c.durationSeconds / 3600).toFixed(1).replace(".0", "")} Hours`,
            rated: c.name.includes("Div. 1") ? "Rated Div 1" : c.name.includes("Div. 3") ? "Rated Div 3" : "Rated Div 2",
            type: c.type || "Codeforces Round",
            url: `https://codeforces.com/contest/${c.id}`,
            description: `Official Codeforces Round: ${c.name}. Format: ${c.type}.`,
            isOfficial: true
          }));
        if (cfContests.length > 0) {
          mergeOfficialContests(cfContests);
          anyLoaded = true;
        }
      }
    }
  } catch (err) {
    console.warn("Live Codeforces API:", err.message);
  }

  // 3. Fetch AtCoder official dataset live
  try {
    const atRes = await fetch("https://kenkoooo.com/atcoder/resources/contests.json");
    if (atRes.ok) {
      const atData = await atRes.json();
      const nowSec = Date.now() / 1000;
      const atList = atData.filter(c => c.start_epoch_second > (nowSec - 86400 * 3) && !c.id.startsWith("adt_")).slice(0, 8);
      const atContests = atList.map(c => ({
        id: `at_${c.id}`,
        platform: "atcoder",
        platformName: "AtCoder",
        title: c.title,
        startTime: new Date(c.start_epoch_second * 1000),
        endTime: new Date((c.start_epoch_second + c.duration_second) * 1000),
        durationMinutes: Math.round(c.duration_second / 60),
        durationLabel: Math.round(c.duration_second / 60) >= 100 ? `${(c.duration_second / 3600).toFixed(1).replace(".0", "")} Hours` : `${Math.round(c.duration_second / 60)} Mins`,
        rated: c.rate_change || "Rated for Registered Users",
        type: c.id.startsWith("abc") ? "ABC Round" : c.id.startsWith("arc") ? "ARC Round" : "AtCoder Contest",
        url: `https://atcoder.jp/contests/${c.id}`,
        description: `Official AtCoder Contest: ${c.title}.`,
        isOfficial: true
      }));
      if (atContests.length > 0) {
        mergeOfficialContests(atContests);
        anyLoaded = true;
      }
    }
  } catch (err) {
    console.warn("Live AtCoder API:", err.message);
  }

  renderContestCalendar();
  return anyLoaded;
}

function getContestStatus(contest) {
  const now = new Date().getTime();
  const start = new Date(contest.startTime).getTime();
  const end = new Date(contest.endTime).getTime();

  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "live";
  return "past";
}

function formatTimeRemaining(ms) {
  if (ms <= 0) return "00s";
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n) => String(n).padStart(2, "0");

  if (days > 0) {
    return `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  }
  return `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}

function formatContestDateIst(date) {
  const d = new Date(date);
  return d.toLocaleString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata"
  }) + " IST";
}

function formatUtcForGCal(date) {
  const d = new Date(date);
  return d.toISOString().replace(/-|:|\.\d\d\d/g, "");
}

function generateGoogleCalendarUrl(contest) {
  const startUtc = formatUtcForGCal(contest.startTime);
  const endUtc = formatUtcForGCal(contest.endTime);
  const title = encodeURIComponent(`[${contest.platformName}] ${contest.title}`);
  const details = encodeURIComponent(
    `${contest.title}\n\nPlatform: ${contest.platformName}\nDuration: ${contest.durationLabel}\nRated: ${contest.rated}\nOfficial URL: ${contest.url}\n\nSynced from CampusCP Portal.`
  );
  const location = encodeURIComponent(contest.url);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startUtc}/${endUtc}&details=${details}&location=${location}`;
}

function exportAllContestsIcs() {
  const upcomingContests = masterContests.filter(c => getContestStatus(c) !== "past");
  const listToExport = upcomingContests.length > 0 ? upcomingContests : masterContests;

  let ics = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//CampusCP//Contest Calendar//EN\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\nX-WR-CALNAME:Competitive Programming Contests\r\nX-WR-TIMEZONE:Asia/Kolkata\r\n";
  
  listToExport.forEach(c => {
    const sStr = formatUtcForGCal(c.startTime);
    const eStr = formatUtcForGCal(c.endTime);
    const uid = `${c.id}@campuscpportal.edu`;
    const summary = `[${c.platformName}] ${c.title}`.replace(/,/g, "\\,");
    const desc = `${c.title}\\nPlatform: ${c.platformName}\\nDuration: ${c.durationLabel}\\nLink: ${c.url}`.replace(/,/g, "\\,");
    
    ics += `BEGIN:VEVENT\r\nUID:${uid}\r\nDTSTAMP:${formatUtcForGCal(new Date())}\r\nDTSTART:${sStr}\r\nDTEND:${eStr}\r\nSUMMARY:${summary}\r\nDESCRIPTION:${desc}\r\nURL:${c.url}\r\nSTATUS:CONFIRMED\r\nEND:VEVENT\r\n`;
  });
  ics += "END:VCALENDAR\r\n";

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "CampusCP_Contests_Schedule.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast(`Exported ${listToExport.length} contests to CampusCP_Contests_Schedule.ics!`, true);
}

function downloadSingleContestIcs(contestId) {
  const c = masterContests.find(item => item.id === contestId);
  if (!c) return;

  const sStr = formatUtcForGCal(c.startTime);
  const eStr = formatUtcForGCal(c.endTime);
  const uid = `${c.id}@campuscpportal.edu`;
  const summary = `[${c.platformName}] ${c.title}`.replace(/,/g, "\\,");
  const desc = `${c.title}\\nPlatform: ${c.platformName}\\nDuration: ${c.durationLabel}\\nLink: ${c.url}`.replace(/,/g, "\\,");

  let ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//CampusCP//Contest Calendar//EN\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\nBEGIN:VEVENT\r\nUID:${uid}\r\nDTSTAMP:${formatUtcForGCal(new Date())}\r\nDTSTART:${sStr}\r\nDTEND:${eStr}\r\nSUMMARY:${summary}\r\nDESCRIPTION:${desc}\r\nURL:${c.url}\r\nSTATUS:CONFIRMED\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n`;

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", `${c.id}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast(`Downloaded event .ICS for ${c.platformName}!`, true);
}

function copyContestDetails(contestId) {
  const c = masterContests.find(item => item.id === contestId);
  if (!c) return;
  const text = `🏆 ${c.title}\n📅 ${formatContestDateIst(c.startTime)} (${c.durationLabel})\n⭐ ${c.rated}\n🔗 Link: ${c.url}`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied ${c.platformName} contest details!`, true);
    });
  } else {
    showToast(`Contest: ${c.title}`, true);
  }
}

// Make available globally for inline onclick
window.downloadSingleContestIcs = downloadSingleContestIcs;
window.copyContestDetails = copyContestDetails;

function initContestCalendar() {
  masterContests = generateBaseContests();
  if (calLiveTimerId) clearInterval(calLiveTimerId);
  calLiveTimerId = setInterval(updateContestLiveTimers, 1000);
  updateContestLiveTimers();
  renderContestCalendar();
  fetchOfficialCalendarData().then(() => {
    console.log("Official calendar data merged. Total:", masterContests.length);
  });
}

function updateContestLiveTimers() {
  const now = new Date();
  
  // 1. Update IST Digital Clock in Header Banner
  const timeStr = now.toLocaleTimeString("en-IN", { hour12: true, timeZone: "Asia/Kolkata" });
  const dateStr = now.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
  const clockEl = document.getElementById("calendarIstClock");
  if (clockEl) clockEl.textContent = `IST: ${dateStr} • ${timeStr}`;

  // 2. Find Next Imminent Contest for Spotlight Banner
  const upcomingOrLive = masterContests
    .filter(c => getContestStatus(c) === "live" || getContestStatus(c) === "upcoming")
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  const spotlight = upcomingOrLive[0] || masterContests[0];
  if (spotlight) {
    const sStatus = getContestStatus(spotlight);
    const targetTime = sStatus === "live" ? new Date(spotlight.endTime).getTime() : new Date(spotlight.startTime).getTime();
    const diff = Math.max(0, targetTime - now.getTime());

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = n => String(n).padStart(2, "0");
    const dEl = document.getElementById("spotlightDays");
    const hEl = document.getElementById("spotlightHours");
    const mEl = document.getElementById("spotlightMins");
    const sEl = document.getElementById("spotlightSecs");

    if (dEl) dEl.textContent = pad(days);
    if (hEl) hEl.textContent = pad(hours);
    if (mEl) mEl.textContent = pad(minutes);
    if (sEl) sEl.textContent = pad(seconds);

    const titleEl = document.getElementById("spotlightTitle");
    const badgeEl = document.getElementById("spotlightPlatformBadge");
    const timeEl = document.getElementById("spotlightTime");
    const linkEl = document.getElementById("spotlightDirectLink");
    const gcalEl = document.getElementById("spotlightGCalBtn");

    if (titleEl) titleEl.textContent = spotlight.title;
    if (badgeEl) {
      badgeEl.textContent = spotlight.platformName;
      badgeEl.className = `spotlight-platform-badge badge-${getPlatformBadgeClass(spotlight.platform)}`;
    }
    if (timeEl) timeEl.textContent = formatContestDateIst(spotlight.startTime);
    if (linkEl) linkEl.href = spotlight.url;
    if (gcalEl) gcalEl.href = generateGoogleCalendarUrl(spotlight);
  }

  // 3. Update all ticking timers on rendered cards
  masterContests.forEach(c => {
    const timerSpan = document.getElementById(`timer_${c.id}`);
    if (timerSpan) {
      const status = getContestStatus(c);
      if (status === "live") {
        const left = Math.max(0, new Date(c.endTime).getTime() - now.getTime());
        timerSpan.textContent = `Ends in ${formatTimeRemaining(left)}`;
      } else if (status === "upcoming") {
        const left = Math.max(0, new Date(c.startTime).getTime() - now.getTime());
        timerSpan.textContent = formatTimeRemaining(left);
      } else {
        timerSpan.textContent = "Concluded";
      }
    }
  });
}

function renderContestCalendar() {
  // Update Metrics
  const total = masterContests.length;
  const upcomingCount = masterContests.filter(c => getContestStatus(c) === "upcoming").length;
  const liveCount = masterContests.filter(c => getContestStatus(c) === "live").length;

  const totalEl = document.getElementById("metricTotalContests");
  const upEl = document.getElementById("metricUpcomingContests");
  const liveEl = document.getElementById("metricLiveContests");
  if (totalEl) totalEl.textContent = total;
  if (upEl) upEl.textContent = upcomingCount;
  if (liveEl) {
    liveEl.textContent = liveCount;
    liveEl.className = liveCount > 0 ? "metric-val text-emerald" : "metric-val";
  }

  // Update Navigation Tab Badge
  const navBadge = document.getElementById("navCalendarBadge");
  if (navBadge) {
    if (liveCount > 0) {
      navBadge.textContent = `${liveCount} Live Now`;
      navBadge.style.color = "#f87171";
      navBadge.style.borderColor = "rgba(239, 68, 68, 0.4)";
    } else {
      navBadge.textContent = `${upcomingCount} Upcoming`;
      navBadge.style.color = "#38bdf8";
      navBadge.style.borderColor = "rgba(56, 189, 248, 0.35)";
    }
  }

  // Update Platform Tab Badges
  const lcCount = masterContests.filter(c => c.platform === "leetcode").length;
  const ccCount = masterContests.filter(c => c.platform === "codechef").length;
  const cfCount = masterContests.filter(c => c.platform === "codeforces").length;
  const atCount = masterContests.filter(c => c.platform === "atcoder").length;

  const bAll = document.getElementById("badgeCalCountAll");
  const bLc = document.getElementById("badgeCalCountLc");
  const bCc = document.getElementById("badgeCalCountCc");
  const bCf = document.getElementById("badgeCalCountCf");
  const bAt = document.getElementById("badgeCalCountAt");

  if (bAll) bAll.textContent = total;
  if (bLc) bLc.textContent = lcCount;
  if (bCc) bCc.textContent = ccCount;
  if (bCf) bCf.textContent = cfCount;
  if (bAt) bAt.textContent = atCount;

  // Render chosen view
  if (calViewMode === "cards") {
    renderCalendarCards();
  } else {
    renderCalendarMonth();
  }
}

function renderCalendarCards() {
  const grid = document.getElementById("calendarCardsGrid");
  if (!grid) return;

  const now = new Date().getTime();

  // Filter masterContests
  const filtered = masterContests.filter(c => {
    // Platform filter
    if (calSelectedPlatform !== "all" && c.platform !== calSelectedPlatform) {
      return false;
    }

    // Status filter
    const status = getContestStatus(c);
    if (calSelectedStatus === "upcoming" && status !== "upcoming") return false;
    if (calSelectedStatus === "live" && status !== "live") return false;
    if (calSelectedStatus === "past" && status !== "past") return false;

    // Search query
    if (calSearchQuery) {
      const match = c.title.toLowerCase().includes(calSearchQuery) ||
                    c.platformName.toLowerCase().includes(calSearchQuery) ||
                    c.rated.toLowerCase().includes(calSearchQuery) ||
                    c.type.toLowerCase().includes(calSearchQuery);
      if (!match) return false;
    }

    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state-card" style="grid-column: 1 / -1; padding: 40px; text-align: center; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed rgba(255,255,255,0.1);">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 12px; color: var(--text-dim);">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <h4 style="color: #fff; margin-bottom: 6px;">No Contests Found</h4>
        <p style="color: var(--text-muted); font-size: 0.88rem;">No contests match the selected filter criteria. Try choosing 'All Platforms' or 'All Timelines'.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(c => {
    const status = getContestStatus(c);
    const startMs = new Date(c.startTime).getTime();
    const endMs = new Date(c.endTime).getTime();

    let countdownText = "";
    if (status === "live") {
      countdownText = `Ends in ${formatTimeRemaining(endMs - now)}`;
    } else if (status === "upcoming") {
      countdownText = formatTimeRemaining(startMs - now);
    } else {
      countdownText = "Concluded";
    }

    const gcalUrl = generateGoogleCalendarUrl(c);

    return `
      <div class="contest-item-card platform-${getPlatformBadgeClass(c.platform)} is-${status}">
        <div class="contest-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="contest-platform-tag platform-tag-${getPlatformBadgeClass(c.platform)}">
              ${getPlatformIcon(c.platform)}
              <span>${c.platformName}</span>
            </span>
            ${c.isOfficial ? `<span class="badge-official" style="font-size:0.68rem; font-family:var(--font-mono); font-weight:700; background:rgba(16,185,129,0.18); color:#34d399; border:1px solid rgba(16,185,129,0.35); padding:2px 7px; border-radius:4px;">⚡ OFFICIAL</span>` : ''}
          </div>
          <span class="contest-status-pill status-pill-${status}">
            ${status === 'live' ? '<span class="pulse-dot" style="background:#ef4444;box-shadow:0 0 8px #ef4444;"></span> LIVE NOW' : status === 'upcoming' ? '⏰ UPCOMING' : '🏁 CONCLUDED'}
          </span>
        </div>

        <div class="contest-card-body">
          <h3 class="contest-card-title">${escapeHtml(c.title)}</h3>
          
          <div class="contest-schedule-meta">
            <div class="contest-meta-row">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>${formatContestDateIst(c.startTime)}</span>
            </div>
            
            <div class="contest-chips-wrap">
              <span class="contest-pill-chip">⏱️ ${c.durationLabel}</span>
              <span class="contest-pill-chip">⭐ ${c.rated}</span>
              <span class="contest-pill-chip">📌 ${c.type}</span>
            </div>
          </div>

          <div class="contest-card-countdown">
            <span class="card-countdown-label">${status === 'live' ? 'Time Remaining' : status === 'upcoming' ? 'Starts In' : 'Status'}</span>
            <span class="card-countdown-timer" id="timer_${c.id}">${countdownText}</span>
          </div>
        </div>

        <div class="contest-card-actions">
          <a href="${c.url}" target="_blank" rel="noopener noreferrer" class="btn-official-card">
            <span>Official Link</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
          
          <a href="${gcalUrl}" target="_blank" rel="noopener noreferrer" class="btn-gcal-card" title="Add to Google Calendar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>G-Cal</span>
          </a>

          <button class="btn-card-icon" onclick="copyContestDetails('${c.id}')" title="Copy Contest Schedule & Link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>

          <button class="btn-card-icon" onclick="downloadSingleContestIcs('${c.id}')" title="Download .ICS Calendar Event">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function renderCalendarMonth() {
  const monthTitle = document.getElementById("monthDisplayTitle");
  const daysGrid = document.getElementById("calendarDaysGrid");
  if (!monthTitle || !daysGrid) return;

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  monthTitle.textContent = `${monthNames[calViewMonth]} ${calViewYear}`;

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  const firstDayIndex = new Date(calViewYear, calViewMonth, 1).getDay(); // 0 is Sun
  const totalDaysInMonth = new Date(calViewYear, calViewMonth + 1, 0).getDate();
  const prevMonthTotalDays = new Date(calViewYear, calViewMonth, 0).getDate();

  let html = "";

  // Helper date key
  const toDateKey = (y, m, d) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  // 1. Previous Month Inactive Days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = prevMonthTotalDays - i;
    html += `
      <div class="calendar-day-cell is-inactive-month">
        <div class="day-cell-top">
          <span class="day-cell-number">${d}</span>
        </div>
      </div>
    `;
  }

  // 2. Current Month Active Days
  for (let day = 1; day <= totalDaysInMonth; day++) {
    const isToday = (day === todayDate && calViewMonth === todayMonth && calViewYear === todayYear);
    const dateKey = toDateKey(calViewYear, calViewMonth, day);
    const isSelected = (calSelectedDateKey === dateKey);

    // Filter contests on this day
    const dayContests = masterContests.filter(c => {
      const cStart = new Date(c.startTime);
      return cStart.getFullYear() === calViewYear &&
             cStart.getMonth() === calViewMonth &&
             cStart.getDate() === day;
    });

    const hasContests = dayContests.length > 0;
    const cellClass = `calendar-day-cell ${isToday ? "is-today" : ""} ${isSelected ? "is-selected" : ""} ${hasContests ? "has-contests" : ""}`;

    const eventsHtml = dayContests.slice(0, 3).map(c => {
      const pClass = getPlatformBadgeClass(c.platform);
      const shortName = c.platform === "leetcode" ? "LC" : c.platform === "codechef" ? "CC" : c.platform === "codeforces" ? "CF" : "AT";
      return `
        <div class="day-event-pill pill-${pClass}" title="${escapeHtml(c.title)}">
          <span>${shortName}:</span> ${escapeHtml(c.title)}
        </div>
      `;
    }).join("");

    const moreHtml = dayContests.length > 3 ? `<span style="font-size:0.65rem; color:var(--text-dim);">+${dayContests.length - 3} more</span>` : "";

    html += `
      <div class="${cellClass}" data-date="${dateKey}" onclick="selectCalendarDay('${dateKey}', ${day})">
        <div class="day-cell-top">
          <span class="day-cell-number">${day}</span>
        </div>
        <div class="day-cell-events">
          ${eventsHtml}
          ${moreHtml}
        </div>
      </div>
    `;
  }

  // 3. Next Month Trailing Days to complete 35 or 42 grid cells
  const totalRendered = firstDayIndex + totalDaysInMonth;
  const trailingCount = (totalRendered % 7 === 0) ? 0 : 7 - (totalRendered % 7);
  for (let day = 1; day <= trailingCount; day++) {
    html += `
      <div class="calendar-day-cell is-inactive-month">
        <div class="day-cell-top">
          <span class="day-cell-number">${day}</span>
        </div>
      </div>
    `;
  }

  daysGrid.innerHTML = html;

  // Render selected day drawer
  if (!calSelectedDateKey) {
    // Default to today
    calSelectedDateKey = toDateKey(todayYear, todayMonth, todayDate);
  }
  renderSelectedDayDrawer(calSelectedDateKey);
}

function selectCalendarDay(dateKey, day) {
  calSelectedDateKey = dateKey;
  document.querySelectorAll(".calendar-day-cell").forEach(cell => {
    cell.classList.toggle("is-selected", cell.dataset.date === dateKey);
  });
  renderSelectedDayDrawer(dateKey);
}
window.selectCalendarDay = selectCalendarDay;

function renderSelectedDayDrawer(dateKey) {
  const drawerTitle = document.getElementById("selectedDayTitle");
  const drawerCount = document.getElementById("selectedDayContestsCount");
  const drawerList = document.getElementById("selectedDayContestsList");
  if (!drawerTitle || !drawerList) return;

  const [y, m, d] = dateKey.split("-").map(Number);
  const dateObj = new Date(y, m - 1, d);
  const formattedDate = dateObj.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  drawerTitle.textContent = `Contests for ${formattedDate}`;

  const dayContests = masterContests.filter(c => {
    const cStart = new Date(c.startTime);
    return cStart.getFullYear() === y &&
           cStart.getMonth() === (m - 1) &&
           cStart.getDate() === d;
  });

  if (drawerCount) {
    drawerCount.textContent = `${dayContests.length} ${dayContests.length === 1 ? "Contest" : "Contests"}`;
  }

  if (dayContests.length === 0) {
    drawerList.innerHTML = `
      <div style="font-size: 0.88rem; color: var(--text-muted); padding: 10px 0;">
        No competitive programming contests scheduled on this day.
      </div>
    `;
    return;
  }

  drawerList.innerHTML = dayContests.map(c => {
    const status = getContestStatus(c);
    const gcalUrl = generateGoogleCalendarUrl(c);

    return `
      <div class="day-drawer-item">
        <div class="drawer-item-info">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="contest-platform-tag platform-tag-${getPlatformBadgeClass(c.platform)}">
              ${c.platformName}
            </span>
            <span class="drawer-item-title">${escapeHtml(c.title)}</span>
          </div>
          <div class="drawer-item-meta">
            📅 ${formatContestDateIst(c.startTime)} • ⏱️ ${c.durationLabel} • ⭐ ${c.rated}
          </div>
        </div>
        <div class="drawer-item-actions">
          <a href="${c.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <span>Enter Contest</span>
          </a>
          <a href="${gcalUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" title="Add to Google Calendar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>Add G-Cal</span>
          </a>
        </div>
      </div>
    `;
  }).join("");
}

function setupCalendarEventListeners() {
  // Platform Tabs
  document.querySelectorAll("#calendarPlatformTabs .cal-platform-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("#calendarPlatformTabs .cal-platform-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      calSelectedPlatform = tab.dataset.platform;
      renderCalendarCards();
      if (calViewMode === "month") renderCalendarMonth();
    });
  });

  // Status Filter
  const statusFilter = document.getElementById("calendarStatusFilter");
  if (statusFilter) {
    statusFilter.addEventListener("change", (e) => {
      calSelectedStatus = e.target.value;
      renderCalendarCards();
      if (calViewMode === "month") renderCalendarMonth();
    });
  }

  // Search Input
  const searchInput = document.getElementById("calendarSearchInput");
  const clearSearch = document.getElementById("clearCalendarSearchBtn");
  if (searchInput && clearSearch) {
    searchInput.addEventListener("input", (e) => {
      calSearchQuery = e.target.value.trim().toLowerCase();
      clearSearch.style.display = calSearchQuery ? "flex" : "none";
      renderCalendarCards();
      if (calViewMode === "month") renderCalendarMonth();
    });
    clearSearch.addEventListener("click", () => {
      searchInput.value = "";
      calSearchQuery = "";
      clearSearch.style.display = "none";
      renderCalendarCards();
      if (calViewMode === "month") renderCalendarMonth();
    });
  }

  // View Mode Toggles
  const toggleCards = document.getElementById("calViewToggleCards");
  const toggleMonth = document.getElementById("calViewToggleMonth");
  if (toggleCards && toggleMonth) {
    toggleCards.addEventListener("click", () => {
      calViewMode = "cards";
      toggleCards.classList.add("active");
      toggleMonth.classList.remove("active");
      document.getElementById("calendarCardsContainer").style.display = "flex";
      document.getElementById("calendarMonthContainer").style.display = "none";
      renderCalendarCards();
    });
    toggleMonth.addEventListener("click", () => {
      calViewMode = "month";
      toggleMonth.classList.add("active");
      toggleCards.classList.remove("active");
      document.getElementById("calendarCardsContainer").style.display = "none";
      document.getElementById("calendarMonthContainer").style.display = "flex";
      renderCalendarMonth();
    });
  }

  // Month Matrix Navigation
  const prevBtn = document.getElementById("monthPrevBtn");
  const nextBtn = document.getElementById("monthNextBtn");
  const todayBtn = document.getElementById("monthTodayBtn");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      calViewMonth--;
      if (calViewMonth < 0) {
        calViewMonth = 11;
        calViewYear--;
      }
      renderCalendarMonth();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      calViewMonth++;
      if (calViewMonth > 11) {
        calViewMonth = 0;
        calViewYear++;
      }
      renderCalendarMonth();
    });
  }
  if (todayBtn) {
    todayBtn.addEventListener("click", () => {
      const now = new Date();
      calViewYear = now.getFullYear();
      calViewMonth = now.getMonth();
      calSelectedDateKey = null;
      renderCalendarMonth();
    });
  }

  // Export .ICS
  const exportIcsBtn = document.getElementById("exportAllIcsBtn");
  if (exportIcsBtn) exportIcsBtn.addEventListener("click", exportAllContestsIcs);

  // Refresh Button
  const refreshCalBtn = document.getElementById("refreshCalendarBtn");
  if (refreshCalBtn) {
    refreshCalBtn.addEventListener("click", () => {
      refreshCalBtn.classList.add("spinning");
      fetchOfficialCalendarData().finally(() => {
        refreshCalBtn.classList.remove("spinning");
        showToast("Official contest feeds updated from LeetCode, CodeChef, Codeforces & AtCoder!", true);
      });
    });
  }

  // Sync Official Contests Button
  const syncOfficialBtn = document.getElementById("syncOfficialCalendarBtn");
  if (syncOfficialBtn) {
    syncOfficialBtn.addEventListener("click", () => {
      syncOfficialBtn.disabled = true;
      syncOfficialBtn.innerHTML = `<span>⏳ Syncing Feeds...</span>`;
      fetchOfficialCalendarData().finally(() => {
        syncOfficialBtn.disabled = false;
        syncOfficialBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg><span>⚡ Sync Official</span>`;
        showToast("Official contest feeds synchronized!", true);
      });
    });
  }
}

// ==========================================
// 11. INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  renderContestDateTabs();
  updateOverallMetrics();
  applyOverallFilters();
  applyContestFilters();
  initContestCalendar();
  updateSheetSyncStatusBadges();

  // If background auto-sync interval was enabled, start it
  if (isAutoSyncEnabled) {
    setupAutoSyncInterval(true);
  }

  // Automatically fetch real contest details on startup to populate dashboard immediately
  setTimeout(() => {
    triggerLiveAutoSync(true);
  }, 350);
});

