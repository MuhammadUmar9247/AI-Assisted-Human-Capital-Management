import express from "express";
import { firstRunStatus, setupCompany } from "../controllers/setup.controller.js";

const router = express.Router();

router.get("/status", firstRunStatus);
router.post("/company", setupCompany);

export default router;
