#Days Calendar Project

A small web app that renders a month view calendar and highlights special (“commemorative”) days from days.json.
It also includes a Node script to generate an iCalendar (.ics) file with all commemorations from 2020–2030.

#Features

Month view with navigation (Previous/Next + jump to Month/Year)

Weeks start on Monday (Mon–Sun)

Special days shown as blue badges inside the relevant date cell

“Today” is highlighted automatically when the shown month = current month

Reusable date logic in common.mjs (shared by the web UI and the iCal generator)

Simple tests for the core date helpers using Node’s built-in test runner

##Quick Start

Requirements

Node.js 18+

npm

##Install


npm install

##Run the web app (local dev server)


npm start


Then open: http://localhost:3000

(We use http-server so ES modules load correctly.)

##Run tests


npm test


Tests use Node’s built-in test runner and live in common.test.mjs.

Generate the iCal file
node generate-ical.mjs

This creates days.ics in the project root with one all-day VEVENT per commemorative day per year from 2020 to 2030 (no recurrence rules). 
The date rules come from common.mjs.

##Import into Google Calendar

Open Google Calendar (web).

→ Settings → Import & export.

Choose days.ics → pick a destination calendar → Import.