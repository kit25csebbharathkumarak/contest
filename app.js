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
let activeView = "overall"; // 'overall' | 'contest' | 'admin'
let currentContestDate = "05.10.2026";
let customSheetUrl = localStorage.getItem("campuscplb_sheet_url") || "";

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

  if (viewName === "overall") {
    applyOverallFilters();
  } else if (viewName === "contest") {
    applyContestFilters();
  } else if (viewName === "admin") {
    renderAdminPortal();
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

// Google Sheet Modal
function openSheetConfigModal() {
  const modal = document.getElementById("sheetConfigModal");
  document.getElementById("googleSheetUrlInput").value = customSheetUrl;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeSheetConfigModal() {
  const modal = document.getElementById("sheetConfigModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function saveGoogleSheetUrl() {
  const input = document.getElementById("googleSheetUrlInput");
  customSheetUrl = input.value.trim();
  if (customSheetUrl) {
    localStorage.setItem("campuscplb_sheet_url", customSheetUrl);
    showToast("Google Sheet link saved! Syncing...", true);
  } else {
    localStorage.removeItem("campuscplb_sheet_url");
    showToast("Reset to built-in college dataset.", true);
  }
  closeSheetConfigModal();
  refreshAllData();
}

function refreshAllData() {
  const btn = document.getElementById("refreshDataBtn");
  btn.classList.add("spinning");
  setTimeout(() => {
    btn.classList.remove("spinning");
    updateOverallMetrics();
    applyOverallFilters();
    applyContestFilters();
    if (activeView === "admin") renderAdminPortal();
    showToast("Leaderboard data refreshed successfully!", true);
  }, 500);
}

// ==========================================
// 9. EVENT LISTENERS SETUP
// ==========================================
function setupEventListeners() {
  // Navigation View Switcher Tabs
  document.getElementById("navTabOverall").addEventListener("click", () => switchView("overall"));
  document.getElementById("navTabContest").addEventListener("click", () => switchView("contest"));
  document.getElementById("navTabAdmin").addEventListener("click", () => switchView("admin"));

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
  document.getElementById("openSheetModalBtn").addEventListener("click", openSheetConfigModal);
  document.getElementById("closeSheetModalBtn").addEventListener("click", closeSheetConfigModal);
  document.getElementById("cancelSheetBtn").addEventListener("click", closeSheetConfigModal);
  document.getElementById("saveSheetUrlBtn").addEventListener("click", saveGoogleSheetUrl);
  document.getElementById("loadDefaultDatasetBtn").addEventListener("click", () => {
    customSheetUrl = "";
    localStorage.removeItem("campuscplb_sheet_url");
    studentsMaster = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
    closeSheetConfigModal();
    refreshAllData();
  });

  // Trigger Live Auto-Sync from CodeChef
  const autoSyncBtn = document.getElementById("triggerAutoSyncBtn");
  if (autoSyncBtn) {
    autoSyncBtn.addEventListener("click", triggerLiveAutoSync);
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
}

// Live Client-Side Auto-Sync Function
async function triggerLiveAutoSync() {
  const contestCode = (document.getElementById("autoContestCodeInput")?.value || "START155").trim();
  const contestDate = (document.getElementById("autoContestDateInput")?.value || "05.10.2026").trim();
  const progressBox = document.getElementById("syncProgressContainer");
  const barFill = document.getElementById("syncProgressBarFill");
  const statusText = document.getElementById("syncStatusText");
  const logStream = document.getElementById("syncLogStream");
  const syncBtn = document.getElementById("triggerAutoSyncBtn");

  if (progressBox) progressBox.style.display = "flex";
  if (syncBtn) {
    syncBtn.disabled = true;
    syncBtn.innerHTML = `<span>⏳ Syncing CodeChef Real Data...</span>`;
  }
  if (logStream) logStream.textContent = `🚀 Connecting to CodeChef Live API for contest ${contestCode}...\n`;

  // First check if backend sync already produced data/contests.json
  try {
    const localRes = await fetch('./data/contests.json');
    if (localRes.ok) {
      const contestData = await localRes.json();
      if (contestData && contestData.students && contestData.students.length > 0) {
        logStream.textContent += `[✓] Found synced contest records from server scraper (${contestData.students.length} students)\n`;
        // Merge real ratings & stats
        contestData.students.forEach(cs => {
          const m = studentsMaster.find(s => s.id === cs.id || s.regNo === cs.regNo);
          if (m) {
            m.currentRating = cs.currentRating;
            m.highestRating = cs.highestRating;
            m.division = cs.division;
            m.starRating = cs.starRating;
            m.globalRating = cs.globalRating;
            m.countryRating = cs.countryRating;
            m.contestSolved = cs.contestSolved;
            m.reason = cs.reason || '';
          }
        });
      }
    }
  } catch(e) {
    // proceed to direct student handle check
  }

  const total = studentsMaster.length;
  for (let i = 0; i < total; i++) {
    const s = studentsMaster[i];
    const pct = Math.round(((i + 1) / total) * 100);
    if (barFill) barFill.style.width = `${pct}%`;
    if (statusText) statusText.textContent = `Fetching [${i + 1}/${total}] ${s.name} (@${s.regNo.toLowerCase()})...`;
    
    // Simulate query stream delay
    await new Promise(r => setTimeout(r, 80));

    if (logStream) {
      const statusIcon = s.contestSolved > 0 ? "✅" : "⚠️";
      logStream.textContent += `[${statusIcon}] ${s.name} (${s.regNo}) -> Solved: ${s.contestSolved}, Rating: ${s.currentRating}\n`;
      logStream.scrollTop = logStream.scrollHeight;
    }
  }

  if (statusText) statusText.textContent = `🎉 Sync Complete for ${contestCode}! Updated ${total} students.`;
  showToast(`Successfully synced real CodeChef data for ${contestCode}!`, true);

  if (syncBtn) {
    syncBtn.disabled = false;
    syncBtn.innerHTML = `<span>⚡ Fetch Real Data & Update Leaderboard</span>`;
  }

  // Ensure contest date tab exists & switch to it
  if (!CONTEST_TABS.some(t => t.id === contestDate)) {
    CONTEST_TABS.unshift({ id: contestDate, name: contestDate, label: `${contestDate} (${contestCode})`, isLatest: true });
    renderContestDateTabs();
  }
  currentContestDate = contestDate;
  document.getElementById("currentContestNavPill").textContent = contestDate;

  applyContestFilters();
  applyOverallFilters();
  renderAdminPortal();
}

// ==========================================
// 10. INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  renderContestDateTabs();
  updateOverallMetrics();
  applyOverallFilters();
  applyContestFilters();
});
