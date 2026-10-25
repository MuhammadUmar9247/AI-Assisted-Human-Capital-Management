# PRD - HCM Lite (AI-Assisted Human Capital Management)

## Goal
Build a web-based HCM Lite system for Admin, HR, Employee with AI Assistant. Starts empty; all data created by users. 
Must be demoable in 5 mins, runnable in <10 mins.

## Roles
- Admin: company setup, HR logins, finalize payroll, audit log, announcements
- HR: employees, attendance board/corrections, leave approvals, payroll draft, HR dashboard
- Employee: self-service (check-in/out, leave, payslips, profile)

## Core Modules (9)
1. Auth & Access (JWT + RBAC + scope)
2. Organization Setup (departments, designations, leave types/quotas, holidays, settings)
3. Employees (directory, 360, CSV import/export)
4. Attendance (web check-in/out, rules, corrections)
5. Leave (apply/cancel, balance, approvals)
6. Payroll Lite (structure, monthly run, tax slab, payslip PDF)
7. Dashboards & Analytics (role-based + filters)
8. AI Assistant (chat + tools + smart leave + summaries)
9. Comms & Audit (announcements, notifications, audit log)

## Business Rules (critical)
- Office: 09:00 start, grace 15 min, half-day <5h, weekend Sat-Sun
- Late after 09:15; missing_checkout if no out
- One attendance per employee/day
- Leave working days only (skip weekends/holidays), quotas: annual 14, sick 8, casual 10, unpaid unlimited
- Payroll: Gross = 1.5*basic (HRA 40%, medical 10%). Per-day = gross/working days. Deductions absent+unpaid+0.5*half-days. Joiners/leavers prorate. Tax slabs per brief. Finalized locked.
- Scope: Employee only sees own data. All checks server-side.
- First-run: company + Admin (or env). HR creating employee creates login with temp password -> change on first login.

## AI
- Tools: get_headcount, get_attendance_summary, get_late_comers, get_leave_summary, get_my_leave_balance, get_payroll_summary, search_employees
- Smart leave: natural language -> prefill leave form
- Policy Q&A from rules
- Never direct DB; use scoped services; log in ai_logs; 15s timeout; ~20 req/hr; label AI-generated

## Tech (MERN)
- Frontend: React + Vite + JavaScript + Tailwind CSS + React Router + Axios + Recharts + date-fns + react-hot-toast
- Backend: Node.js + Express + Mongoose + bcryptjs + jsonwebtoken + cors + dotenv + express-validator + multer + json2csv + pdfkit (or puppeteer) + node-cron (optional)
- DB: MongoDB
- AI: OpenRouter/OpenAI compatible (tool calling)

## Deliverables
- Working web app, 3 roles, all 25 items, README <10 min run, hosted link + repo, .env.example
