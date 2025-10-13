import test from "node:test";
import assert from "node:assert/strict";

import {
  getMonthNumber,
  getWeekdayNumber,
  getOccurrenceNumber,
  calculateCommemorationDate,
} from "./common.mjs";

test("January should be 0", () => {
  assert.equal(getMonthNumber("January"), 0);
});

test("Tuesday should be 2", () => {
  assert.equal(getWeekdayNumber("Tuesday"), 2);
});

test("third should be 3", () => {
  assert.equal(getOccurrenceNumber("third"), 3);
});

// Ada Lovelace Day: second Tuesday of October 2024 -> 8
test("Ada Lovelace Day 2024 -> Oct 8", () => {
  assert.equal(
    calculateCommemorationDate(2024, "October", "Tuesday", "second"),
    8
  );
});

// World Lemur Day: last Friday of October 2024 -> 25
test("World Lemur Day 2024 -> Oct 25", () => {
  assert.equal(
    calculateCommemorationDate(2024, "October", "Friday", "last"),
    25
  );
});
