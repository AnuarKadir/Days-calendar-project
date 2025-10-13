/**
 * Converts month name (like "October") to month number (0-11)
 * JavaScript uses 0 for January, 1 for February, etc.
 */
export function getMonthNumber(monthName) {
  const months = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };
  return months[monthName];
}

/**
 * Converts weekday name (like "Tuesday") to weekday number (0-6)
 * JavaScript uses 0 for Sunday, 1 for Monday, etc.
 */
export function getWeekdayNumber(dayName) {
  const weekdays = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  return weekdays[dayName];
}

/**
 * Converts occurrence word (like "second", "last") to a number
 * Positive numbers (1, 2, 3) count from the start of the month
 * Negative numbers (-1) count from the end of the month
 */
export function getOccurrenceNumber(occurrence) {
  const occurrences = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
    last: -1,
  };
  return occurrences[occurrence];
}

/**
 * Calculates which day of the month a commemorative day falls on
 * For example: "second Tuesday in October 2024" returns 8
 *
 * @param {number} year - The year (e.g., 2024)
 * @param {string} monthName - The month name (e.g., "October")
 * @param {string} dayName - The weekday name (e.g., "Tuesday")
 * @param {string} occurrence - Which occurrence (e.g., "second", "last")
 * @returns {number} The day of the month (1-31)
 */
export function calculateCommemorationDate(
  year,
  monthName,
  dayName,
  occurrence
) {
  const month = getMonthNumber(monthName);
  const targetWeekday = getWeekdayNumber(dayName);
  const occurrenceNum = getOccurrenceNumber(occurrence);

  if (occurrenceNum > 0) {
    let date = new Date(year, month, 1);
    let count = 0;

    // Loop through each day of the month
    while (date.getMonth() === month) {
      if (date.getDay() === targetWeekday) {
        count++;
        if (count === occurrenceNum) {
          return date.getDate();
        }
      }
      date.setDate(date.getDate() + 1);
    }
  } else {
    // Count from the END of the month (for "last")
    // Start at the last day of the month
    let date = new Date(year, month + 1, 0);
    let count = 0;

    // Loop backwards through each day of the month
    while (date.getMonth() === month) {
      if (date.getDay() === targetWeekday) {
        count++;
        if (count === Math.abs(occurrenceNum)) {
          return date.getDate();
        }
      }
      date.setDate(date.getDate() - 1);
    }
  }

  return null;
}

/**
 * Checks if there's a commemorative day on a specific date
 *
 * @param {Array} daysData - Array of day objects from days.json
 * @param {number} year - The year
 * @param {number} month - The month (0-11)
 * @param {number} day - The day of the month (1-31)
 * @returns {Object|null} The day object if found, null otherwise
 */

export function getCommemorationForDate(daysData, year, month, day) {
  for (const commemoration of daysData) {
    if (getMonthNumber(commemoration.monthName) === month) {
      const commemorationDay = calculateCommemorationDate(
        year,
        commemoration.monthName,
        commemoration.dayName,
        commemoration.occurrence
      );

      if (commemorationDay === day) {
        return commemoration;
      }
    }
  }

  // No commemoration found for this date
  return null;
}
