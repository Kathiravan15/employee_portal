import express from "express";
import { login, createSupervisor } from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.js";
import { allow } from "../middlewares/roles.js";

const router = express.Router();

router.post("/login", login);

// admin-only: create supervisors
router.post("/create-supervisor", auth, allow("admin"), createSupervisor);

export default router;
