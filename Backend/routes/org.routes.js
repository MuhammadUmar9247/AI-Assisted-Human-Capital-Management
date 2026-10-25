import express from "express";
import { protect } from "../middlewares/auth.js";
import { authorize } from "../middlewares/rbac.js";
import { getSettings, updateSettings, getDepartments, createDepartment, getDesignations, createDesignation, getLeaveTypes, createLeaveType, getHolidays, createHoliday } from "../controllers/org.controller.js";

const router = express.Router();

router.get("/settings", protect, getSettings);
router.put("/settings", protect, authorize("admin"), updateSettings);
router.get("/departments", protect, getDepartments);
router.post("/departments", protect, authorize("admin","hr"), createDepartment);
router.get("/designations", protect, getDesignations);
router.post("/designations", protect, authorize("admin","hr"), createDesignation);
router.get("/leave-types", protect, getLeaveTypes);
router.post("/leave-types", protect, authorize("admin","hr"), createLeaveType);
router.get("/holidays", protect, getHolidays);
router.post("/holidays", protect, authorize("admin","hr"), createHoliday);

export default router;
