export const scopeEmployee = (req, res, next) => {
  // For employee routes, ensure they only access own data
  if (req.user.role === "employee") {
    if (!req.user.employeeId) return res.status(403).json({ message: "No employee profile linked" });
    // attach scope
    req.scope = { employeeId: req.user.employeeId };
  } else {
    req.scope = {}; // admin/hr see all
  }
  next();
};
