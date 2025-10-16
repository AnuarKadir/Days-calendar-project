// Run this with: node generate-ical.mjs
// Generates a file named days.ics (all-day events for 2020–2030)

import fs from "fs";
import daysData from "./days.json" with { type: "json" };
import { calculateCommemorationDate, getMonthNumber } from "./common.mjs";

function generateICS() {
  let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Commemorative Days Calendar//EN\n`;

  for (const day of daysData) {
    for (let year = 2020; year <= 2030; year++) {
      const dayNumber = calculateCommemorationDate(
        year,
        day.monthName,
        day.dayName,
        day.occurrence
      );


      /* Format date as YYYYMMDD
       Month is 0-based in JS Date, so add 1 and pad with leading zero
       Day is also padded with leading zero
       E.g., 2024-10-08 -> 20241008
       */
      
      const month = String(getMonthNumber(day.monthName) + 1).padStart(2, "0");
      const dayStr = String(dayNumber).padStart(2, "0");
      const date = `${year}${month}${dayStr}`;



     icsContent += `BEGIN:VEVENT\n`;
      icsContent += `SUMMARY:${day.name}\n`;
      icsContent += `DTSTART;VALUE=DATE:${date}\n`;
      icsContent += `DTEND;VALUE=DATE:${date}\n`;
      icsContent += `END:VEVENT\n`;
    }
  }

  icsContent += `END:VCALENDAR\n`;

  fs.writeFileSync("days.ics", icsContent);
  console.log(" days.ics generated successfully!");
}

generateICS();