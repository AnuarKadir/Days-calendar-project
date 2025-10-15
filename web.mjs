// This file handles the web page functionality
// It uses the functions from common.mjs to display the calendar

import { getCommemorationForDate } from "./common.mjs";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// DOM elements
const monthYearHeading = document.querySelector("h1");
const monthSelect = document.querySelector("#month");
const yearSelect = document.querySelector("#year");
const table = document.querySelector("table");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const goBtn = document.querySelector("#goBtn");

let daysData = [];

// Using fetch to load the JSON file
async function loadDaysData() {
  try {
    const response = await fetch("./days.json");
    daysData = await response.json();
    // After loading data, render the initial calendar
    renderCalendar(currentMonth, currentYear);
  } catch (error) {
    console.error("Error loading days.json:", error);
    daysData = [];
  }
}

function renderCalendar(month, year) {
  if (daysData.length === 0) return;
  // Clear old rows (except header)
  const tbody = table.tBodies[0] || table.createTBody();
  tbody.innerHTML = "";

  // Update heading
  monthYearHeading.textContent = `${monthNames[month]} ${year}`;

  // Update the dropdown selectors
  monthSelect.value = month;
  yearSelect.value = year;

  //Calculate first and last day
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  //Find Monday-based index
  let startDay = (firstDay.getDay() + 6) % 7; // Monday = 0
  let daysInMonth = lastDay.getDate();

  //Generate rows
  // We need up to 6 rows to show all possible days
  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    // Each row has 7 cells (one for each day of the week)
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");
      cell.classList.add("cell");
      if (i === 0 && j < startDay) {
        cell.classList.add("muted");
      } else if (date > daysInMonth) {
        cell.classList.add("muted");
      } else {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        dayDiv.textContent = date;
        cell.appendChild(dayDiv);
        // Check for commemorations on this date
        const commemoration = getCommemorationForDate(
          daysData,
          year,
          month,
          date
        );
        if (commemoration) {
          const commDiv = document.createElement("div");
          commDiv.classList.add("badge");
          commDiv.textContent = commemoration.name;
          cell.appendChild(commDiv);
        }
        date++;
      }

      row.appendChild(cell);
    }
    tbody.appendChild(row);

    // Stop creating rows if we've finished all days
    if (date > daysInMonth) break;
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
  currentMonth = parseInt(monthSelect.value);
  currentYear = parseInt(yearSelect.value);
  renderCalendar(currentMonth, currentYear);
});

// Load initial view
loadDaysData();
