import express from "express";
import { login, me, changePassword } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", protect, me);
router.post("/change-password", protect, changePassword);

export default router;
