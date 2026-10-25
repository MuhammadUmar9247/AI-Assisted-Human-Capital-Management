import express from "express";
import { protect } from "../middlewares/auth.js";
import { authorize } from "../middlewares/rbac.js";
import { generatePayroll, getPayrollRuns, finalizePayroll } from "../controllers/payroll.controller.js";

const router = express.Router();

router.post("/generate", protect, authorize("admin","hr"), generatePayroll);
router.get("/", protect, getPayrollRuns);
router.put("/:id/finalize", protect, authorize("admin"), finalizePayroll);

export default router;
