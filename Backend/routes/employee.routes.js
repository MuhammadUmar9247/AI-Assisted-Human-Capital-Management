import express from "express";
import { protect } from "../middlewares/auth.js";
import { authorize } from "../middlewares/rbac.js";
import { listEmployees, getEmployee, registerEmployee, updateEmployee } from "../controllers/employee.controller.js";

const router = express.Router();

router.get("/", protect, listEmployees);
router.get("/:id", protect, getEmployee);
router.post("/", protect, authorize("admin","hr"), registerEmployee);
router.put("/:id", protect, authorize("admin","hr"), updateEmployee);

export default router;
