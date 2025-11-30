import express from "express";
import {
  createEmployee,
  listEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller.js";
import { auth } from "../middlewares/auth.js";
import { allow } from "../middlewares/roles.js";

const router = express.Router();

router.use(auth);

router.get("/", listEmployees); // admin: all, supervisor: their own
router.post("/", allow("admin", "supervisor"), createEmployee);
router.get("/:id", allow("admin", "supervisor"), getEmployee);
router.put("/:id", allow("admin", "supervisor"), updateEmployee);
router.delete("/:id", allow("admin"), deleteEmployee);

export default router;
