export const auditLog = async (AuditLog, data) => {
  try {
    await AuditLog.create(data);
  } catch (e) {
    console.error("audit log failed", e.message);
  }
};
