# ERD (High-Level)

## Core
- User: {email, passwordHash, role:[admin|hr|employee], employeeId, mustChangePassword, active, lastLogin}
- CompanySettings: {companyName, officeStartTime:'09:00', graceMinutes:15, weekend:[0,6], officeLat,lng,radiusMeters:150,...}
- Department: {name, code, active}
- Designation: {name, code, departmentId, active}
- LeaveType: {name, code, annualQuota, sickQuota, casualQuota, unpaidAllowed:true, active}
- Holiday: {date, name, recurring}
- Employee: {empCode, firstName,lastName,email,phone,departmentId,designationId,joinDate,leaveDate,status,managerId,salary:{basic,hra,medical,other,net?}, userId}
- Attendance: {employeeId, date, checkInAt, checkOutAt, source:web|camera, location:{lat,lng}, status:present|late|half_day|absent|missing_checkout, hoursWorked, lateMinutes, corrections:[]}
- LeaveRequest: {employeeId, leaveTypeId, startDate,endDate, days, reason, status:pending|approved|rejected|cancelled, approvedBy, approvedAt, comment}
- LeaveBalance: {employeeId, year, leaveTypeId, quota, used, pending, remaining}
- PayrollRun: {month, year, status:draft|finalized, generatedBy, finalizedBy, finalizedAt, items:[], totals:{...}}
- Payslip: {payrollRunId, employeeId, earnings:{...}, deductions:{...}, gross, net, tax, pdfPath}
- Announcement: {title, body, audience:all|hr|employee, createdBy, createdAt}
- Notification: {userId, type, title, message, read, link}
- AuditLog: {actorId, actorRole, action, entity, entityId, ip, userAgent, before, after, at}
- AiLog: {userId, role, query, toolsUsed:[], responseSummary, latencyMs, ip, at}
