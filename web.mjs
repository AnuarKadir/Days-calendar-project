// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getGreeting } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

window.onload = function() {
    // document.querySelector("body").innerText = `${getGreeting()} - there are ${daysData.length} known days`;
}

// web.mjs
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// DOM elements
const monthYearHeading = document.querySelector("h1");
const monthSelect = document.querySelector("#month");
const yearSelect = document.querySelector("#year");
const table = document.querySelector("table");
const prevBtn = document.querySelector("button:nth-of-type(1)");
const nextBtn = document.querySelector("button:nth-of-type(2)");
const goBtn = document.querySelector("button:nth-of-type(3)");

function renderCalendar(month, year) {
  // 1️⃣ Clear old rows (except header)
  table.querySelectorAll("tr:not(:first-child)").forEach(row => row.remove());

  // 2️⃣ Update heading
  monthYearHeading.textContent = `${monthNames[month]} ${year}`;

  // 3️⃣ Calculate first and last day
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 4️⃣ Find Monday-based index
  let startDay = (firstDay.getDay() + 6) % 7; // Monday = 0
  let daysInMonth = lastDay.getDate();

  // 5️⃣ Generate rows
  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");
      if (i === 0 && j < startDay) {
        cell.textContent = "";
      } else if (date > daysInMonth) {
        cell.textContent = "";
      } else {
        cell.textContent = date;
        date++;
      }
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

// Navigation logic
prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});

// Populate dropdowns
monthNames.forEach((name, i) => {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = name;
  monthSelect.appendChild(option);
});
for (let y = 1900; y <= 2100; y++) {
  const option = document.createElement("option");
  option.value = y;
  option.textContent = y;
  yearSelect.appendChild(option);
}

goBtn.addEventListener("click", () => {
  const m = parseInt(monthSelect.value);
  const y = parseInt(yearSelect.value);
  renderCalendar(m, y);
});

// Load initial view
renderCalendar(currentMonth, currentYear);