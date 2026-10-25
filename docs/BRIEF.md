SAYLANI HACKATHON Â· CHALLENGE BRIEF
HCM LiteAI-assisted Human Capital Management
for Admin, HR and Employees
42
Present
5
On leave
3
Late
Attendance by department Trend
AI Who is on leave today?
5 employees: 3 casual, 2 sick
Camera check-in
Inside office area
Face detected
Check in
Admin HR Employee 9 modules Â· AI built in
24 October 2026
Zaitoon Ashraf IT Park
Submit on lms.saylaniit.com

-- 1 of 7 --

SAYLANI HACKATHON
24 October 2026
Zaitoon Ashraf IT Park
HCM Lite â€” Challenge Brief
Build an AI-assisted HR system for Admin, HR and Employees
Saylani Hackathon â€” HCM Lite Brief Page 1 of 6
1 The challenge
At the Saylani Hackathon, build HCM Lite: a web-based Human Capital Management system for the daily work of an HR
team, with an AI assistant that answers questions from real data. There is no pre-loaded or dummy data: the system starts
empty, Admin sets up the company, HR registers employees, and every number comes from what people do in the app.
Team Date & venue Work Data AI
4 people (2 backend, 2
frontend)
24 Oct 2026,
Zaitoon Ashraf IT
Park
25 functionalities
across 9 modules
Starts empty; created by Admin,
HR and employees in the app
Any hosted LLM API with tool
calling (free tier is enough)
Teams must ship
â€¢ A web app with three roles (Admin, HR, Employee), each with its own menu, data scope and dashboard.
â€¢ Core HR flows end to end: employees, web check-in/out, leave with approval, monthly payroll with payslips.
â€¢ Analytics on the data entered in the app and an AI assistant, dashboard summaries and a smart leave form.
â€¢ A web app is required. A mobile app with camera attendance is optional and earns bonus points (Section 5).
â€¢ A 5-minute live demo and a README a judge can run in under 10 minutes. Any language, framework or database is allowed.
Figure 1 â€” Module tree
HCM Lite
9 modules
M1 Auth & Access JWT login Â· 3 roles Â· role + data-scope guard
M2 Organization Setup Departments Â· designations Â· leave types Â· holidays Â· rules Â· users
M3 Employees Directory & search Â· Employee 360 Â· CSV import / export
M4 Attendance Web check-in / out Â· status rules Â· corrections Â· camera + location (optional)
M5 Leave Apply Â· balance Â· overlap & holiday checks Â· approval inbox
M6 Payroll Lite Salary structure Â· monthly run Â· tax slab Â· payslip PDF
M7 Dashboards & Analytics Admin / HR / Employee Â· KPIs Â· trends Â· insights
M8 AI Assistant Chat with tools Â· dashboard summary Â· smart leave Â· policy Q&A
M9 Comms & Audit Announcements Â· notifications Â· audit log

-- 2 of 7 --

SAYLANI HACKATHON
24 October 2026
Zaitoon Ashraf IT Park
HCM Lite â€” Challenge Brief
Build an AI-assisted HR system for Admin, HR and Employees
Saylani Hackathon â€” HCM Lite Brief Page 2 of 6
2 Access levels: who can do what
Three roles. Access is checked on the server for every request; hiding a button is not enough. The AI assistant always works
with the same access as the person using it.
Admin â€” company level HR â€” people operations Employee â€” self-service
â€¢ Company setup: name, office hours, grace
time, weekend, office location and radius for
camera attendance
â€¢ Departments, designations, leave types and
yearly quotas, public holidays
â€¢ Create, deactivate and reset logins for HR and
employees
â€¢ View every employee, attendance, leave and
payroll record
â€¢ Finalize the monthly payroll prepared by HR
(only Admin can lock it)
â€¢ Company dashboard: headcount, attrition,
payroll cost, average salary
â€¢ Audit log of every important action; post
announcements
â€¢ AI assistant on all company data
â€¢ Register employees (this creates their login);
edit details; optional CSV import and export
â€¢ Set salary structures (basic, allowances)
â€¢ Daily attendance board; approve or reject
attendance corrections
â€¢ Approve or reject leave requests with a
comment
â€¢ Create and review the monthly payroll draft
â€¢ HR dashboard and insights (late-comers,
absenteeism, leave use)
â€¢ AI assistant and dashboard summaries on HR
data
â€¢ Post announcements
â€¢ Check in and check out (web; camera +
location on mobile, optional)
â€¢ Own attendance calendar; request a
correction with reason
â€¢ Apply for or cancel leave, see balance; smart
leave in plain words
â€¢ Download own payslips
â€¢ View own profile; edit phone and address
â€¢ Personal dashboard: hours, late count, leave
left, last payslip
â€¢ AI assistant on own data and company policy
â€¢ Read announcements and notifications
Cannot Cannot Cannot
â€¢ Edit a payroll run after it is finalized
â€¢ Delete or change audit log entries
â€¢ Change company settings, rules or office
location
â€¢ Create Admin users or finalize payroll
â€¢ View the audit log
â€¢ See any other employeeâ€™s data or salary
â€¢ Approve anything, or edit own salary, role or
attendance directly
First run: a fresh install asks for the company name and the Admin account (or reads ADMIN_EMAIL / ADMIN_PASSWORD from the env file). Admin then
creates HR logins; HR registering an employee creates that employeeâ€™s login with a temporary password that must be changed on first sign-in.
3 Business rules
Module Rules that decide whether it works
M1 Auth JWT login, bcrypt passwords. Every API checks role and data scope: an Employee only reads rows with their own
employee_id.
M2 Setup Office start 09:00, grace 15 min, half day under 5 h, weekend Satâ€“Sun, office location + radius (e.g. 150 m). Stored as settings,
applied to new records only.
M3 Employees HR registers each employee with job details and salary; this creates the employeeâ€™s login (temporary password, change on first
sign-in). Server-side search, filters, paging. Optional CSV import has a dry run returning row + field + reason; checks required
fields, unique code/email, valid email, known dept, ISO date, salary > 0.
M4 Attendance Server stamps the time. One record per employee per day (second check-in = 409). Late after 09:15; half_day under 5 h;
absent if no record and no approved leave; missing_checkout if no check-out.
M5 Leave Working days only (skip weekends, holidays). Quotas annual 14, sick 8, casual 10; unpaid unlimited. Overlap or over-balance
= 422.
M6 Payroll Gross = 1.5 Ã— basic (HRA 40%, medical 10%). Per day = gross Ã· working days; deduct absent + unpaid + 0.5 Ã— half days.
Prorate joiners/leavers. Tax slab on gross Ã— 12 (illustrative): 0 to 600k; 5% to 1.2M; 30k + 15% to 2.4M; 210k + 25% to 3.6M;
510k + 35% above. Admin finalizes; finalized runs are locked.
M7 Dashboards All numbers computed on the server (database aggregation) and filterable by date range and department (see Section 7).
M9 Comms & Audit Announcements on all dashboards, in-app notifications, audit log with actor, action, entity, before/after JSON.

-- 3 of 7 --

Saylani Hackathon â€” HCM Lite Brief Page 3 of 6
4 AI Assistant (M8)
Use any hosted LLM API that supports tool calling. The AI explains and assists; the database is the only source of truth.
Feature Who How it works
Ask the assistant All roles Chat panel â†’ POST /ai/chat. The model picks a tool, the backend runs it with the userâ€™s scope, the model
writes the answer. Tools: get_headcount, get_attendance_summary, get_late_comers,
get_leave_summary, get_my_leave_balance, get_payroll_summary, search_employees.
Dashboard summary Admin, HR â€˜Summarizeâ€™ sends the KPI JSON for the current filters; returns 3â€“5 insight bullets using only those
numbers.
Smart leave Employee â€œNeed next Monday and Tuesday off for a weddingâ€ â†’ JSON {type, start, end, reason} â†’ pre-filled form.
The user confirms.
Policy Q&A; All roles Rules from Section 3 sit in the system prompt; the model answers only from them or says it does not know.
Guardrails
â€¢ API key only in a backend env variable (AI_API_KEY); the browser never calls the AI provider.
â€¢ The model never queries the database directly. Tools reuse the same services and permission checks as the REST API.
â€¢ The AI never saves data on its own. JSON output is validated; on failure retry once, then show the normal form.
â€¢ 15 s timeout and a friendly fallback, about 20 requests per user per hour, every call logged in ai_logs. Answers carry an
â€˜AI-generatedâ€™ label.
Live test questions judges will ask
As Question Good answer
HR How many active employees are in {department}? Â· Who came late most often this
month? Â· What is this monthâ€™s attendance rate?
Same numbers as the dashboard
Employee How many sick leaves do I have left this year? Own balance after approved leaves
Employee What is {colleague}â€™s salary? Politely refuses
Employee I need next Monday and Tuesday off for my sisterâ€™s wedding Pre-filled casual leave, correct dates
5 Optional: mobile app and camera attendance
The web app is required. A mobile app is optional and earns bonus points. Its key feature: mark attendance with the
camera, accepted only when a face is detected and the phone is inside the company location set by Admin. The same
camera check can also run in the web app on a laptop or phone browser.
Open camera
front camera,
live preview
Detect face
exactly one face
in the frame
Get location
GPS lat / lng
+ accuracy
Send to server
time is set
by the server
Server checks
distance â‰¤ radius,
attendance rules
Saved
source = camera,
status shown
â€¢ Reject the check-in if no face or more than one face is found, if the location is outside the radius, or if GPS accuracy is worse than 100
m.
â€¢ The server calculates the distance to the office (Haversine formula) and decides; the phone only sends data. Admin sets office lat / lng
and radius.
â€¢ Store the result, not a full photo, unless the company asks for one; tell users what is captured. A failed check falls back to an HR
correction.
â€¢ Extra bonus: match the face to the employeeâ€™s enrolled face (face descriptors) and a simple liveness check such as a blink.
Free libraries
Platform Library What it gives you
Web (MERN / React) face-api.js (maintained fork: @vladmandic/face-api) Face detection, landmarks and face descriptors for
matching, in the browser
MediaPipe Face Detector (@mediapipe/tasks-vision) Fast real-time face detection from the webcam
TensorFlow.js face-detection
(@tensorflow-models/face-detection)
Lightweight face detection model; works with browser
Geolocation API for location
React Native react-native-vision-camera +
react-native-vision-camera-face-detector
Camera with real-time on-device face detection
@react-native-ml-kit/face-detection Detect faces in a captured photo on the device
expo-camera + expo-location Easiest Expo setup for taking the photo and reading GPS
Server (Node) geolib isPointWithinRadius() for the office geofence check
All listed libraries are free and open source. Expo needs a development build for the ML Kit based face libraries.

-- 4 of 7 --

Saylani Hackathon â€” HCM Lite Brief Page 4 of 6
6 Project overview
How the pieces fit together. Teams are free to choose any database (MongoDB, Firebase, PostgreSQL, MySQL or another)
and to model the data as collections or tables however suits their stack.
Figure 2 â€” System overview
Admin
HR
Employee
USERS Web App (Frontend)
Login + role-based menus
Screens for each module
Dashboards & charts
AI chat panel
Responsive, 375 px+
REST
JSON
JWT
Backend API
Auth & role / scope guard
Organization setup
Employees + CSV import
Attendance
Leave
Payroll + payslip PDF
Analytics
AI service (tools)
Comms & audit log
routes â†’ service (rules) â†’ data
Database
any: MongoDB, Firebase,
PostgreSQL, MySQL ...
â€¢ users
â€¢ employees, departments
â€¢ attendance
â€¢ leave requests
â€¢ payroll runs, payslips
â€¢ settings, holidays
â€¢ audit & AI logs
read /
write
First-run setup
creates the Admin account
LLM API
tool calling
key on server only
prompt
+ tools
Figure 3 â€” How data flows between modules
Org setup
office hours, grace time,
quotas, holidays
Attendance & Leave
daily records,
approved leave
Payroll
deductions, tax,
net pay, payslips
Dashboards
KPIs, trends,
insights
AI assistant
answers from the
same services
Rules set in Org setup decide attendance and leave status; attendance and unpaid leave decide payroll deductions; dashboards aggregate all of it; the AI
assistant calls the same services, so its answers always match the dashboards.
Figure 4 â€” How data enters the system (no dummy data)
Admin setup
company, rules,
office location
HR registers
employees, job,
salary
Login created
temporary password,
change on first use
Daily use
check-in, leave,
corrections
HR actions
approvals,
payroll run
Insights
dashboards
and AI answers
Judges start from a fresh install during judging and create the company, a few employees and their activity themselves, then check that dashboards and AI
answers match those records.

-- 5 of 7 --

Saylani Hackathon â€” HCM Lite Brief Page 5 of 6
7 Metrics and dashboards
Metric Formula
Headcount / attrition Active + probation on end date / exits in period Ã· average headcount Ã— 100
Attendance rate (present + late + missing_checkout + 0.5 Ã— half_day) Ã· (working-day records âˆ’ on_leave)
Late % / absenteeism late Ã· (present + late) / absent days Ã· expected working days, per department
Leave utilization Approved days Ã· quota, per leave type and department
Payroll cost / avg salary Sum of gross and net by month and department / mean gross by department and designation
HR dashboard Admin dashboard Employee dashboard
KPIs: headcount, present, on leave, late today,
pending approvals Â· attendance trend Â·
absenteeism by dept Â· leave by type Â· top 5
late-comers Â· AI summary
KPIs: headcount, attrition YTD, payroll cost, avg
salary Â· headcount by dept Â· payroll cost by dept
Â· gender and tenure Â· audit feed Â· AI summary
Check-in widget Â· hours this week vs 40 h Â· late
count Â· leave balance Â· last payslip Â·
announcements Â· ask my assistant
8 Functionality checklist
25 functionalities and who is allowed to use each one. Manage = create and change, All = see every record, Own = only their
own records, â€” = no access.
# Functionality Admin HR Employee
01 First-run setup: company profile and the Admin account Manage â€” â€”
02 Login, logout, change password; role-based menus and dashboards Own Own Own
03 Company settings: office hours, grace time, weekend, office location and radius Manage View â€”
04 Departments, designations, leave types and quotas, public holidays Manage View â€”
05 Create HR logins; deactivate or reset any login Manage â€” â€”
06 Register an employee (creates their login) and edit details View Manage Own phone &
address
07 Employee directory with search and filters; Employee 360 profile All All Own
08 CSV import with dry-run error report; CSV export â€” Manage â€”
09 Check in and check out on the web â€” Own Own
10 Attendance calendar and daily attendance board All All Own
11 Attendance correction: request and approve View Approve Request
12 Apply for or cancel leave; see balance and history â€” Own Own
13 Approve or reject leave with a comment View Approve â€”
14 Salary structure per employee View Manage â€”
15 Monthly payroll: create and review the draft View Manage â€”
16 Finalize payroll (locks the month) Manage â€” â€”
17 Payslips with PDF download All All Own
18 Dashboards, KPIs, trends and insight lists with filters Company HR Personal
19 AI assistant chat answering from real data All data HR data Own data
20 AI dashboard summary Yes Yes â€”
21 Smart leave: type a sentence, get a pre-filled leave form â€” Own Own
22 Policy Q&A on attendance, leave and payroll rules Yes Yes Yes
23 Announcements Post Post Read
24 In-app notifications (leave decisions, payslips) Own Own Own
25 Audit log of create, update, approve and finalize actions View â€” â€”
Bonus (+10 points): camera attendance with face detection + location (mobile or web; Employee uses it, Admin sets the location) Â·
attrition risk score Â· absence anomaly flags Â· late penalty rule (3 lates = 0.5 day) Â· AI understands Roman Urdu Â· dark mode / PWA.

-- 6 of 7 --

Saylani Hackathon â€” HCM Lite Brief Page 6 of 6
9 Demo and judging
5-minute demo script
â€¢ Start from a fresh install: Admin sets up the company, office hours and location, a department and leave types, then creates an HR
login.
â€¢ HR registers two or three employees; one of them signs in, changes the password and checks in.
â€¢ Employee types a leave request in plain words and confirms the pre-filled form; HR approves it.
â€¢ HR opens the dashboard, clicks Summarize and asks the assistant who is on leave; runs payroll for the month; Admin finalizes it.
â€¢ Employee downloads the payslip and asks for a colleagueâ€™s salary (refused); Admin shows the audit log.
Scoring (100 points + 10 bonus)
Criteria Pts What judges look at
Core HR flows 25 Login per role, employees, check-in, leave approval, payroll run end to end
Data & analytics 20 Dashboards match the records created during judging; filters work; insights are useful
AI features 15 Correct live answers, role scoping, smart leave, summaries, graceful failure
Code quality 15 Module structure, rules in services, validation, tests
UI / UX 10 Clarity, consistency, loading / empty / error states, responsive
Security & RBAC 10 Server-side scope checks, hashed passwords, AI key on server, audit log
Demo & docs 5 Clear 5-minute story; working hosted link; README a judge can follow
Submission
Submit on the Saylani LMS: https://lms.saylaniit.com/
Every student logs in to their own portal and shares two links: the Git repository and the hosted (live) project.
â€¢ Repository link: public, or shared with the judges. README with the stack, how to run it, how to create the first Admin, how to set the
AI key, and what is done and not done.
â€¢ Hosted project link: the live web app opens in a browser and starts from first-run setup, so judges can create the company
themselves. Any free hosting is fine (frontend and backend).
â€¢ Commit .env.example only; never the real AI key or database password. Keep secrets in the hosting providerâ€™s environment
settings.
â€¢ Mobile app (optional): add an APK or Expo link in the README.
Best of Luck!
Build the core first, then make the data and the AI talk. We canâ€™t wait to see what you create.
Saylani Hackathon Â· 24 October 2026 Â· Zaitoon Ashraf IT Park

-- 7 of 7 --

