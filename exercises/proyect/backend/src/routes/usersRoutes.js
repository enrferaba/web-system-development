// src/routes/usersRoutes.js
import { Router } from "express";
import {
  listUsers,
  getUserById,
  createUser,
} from "../controllers/usersController.js";

const router = Router();

router.get("/", listUsers);
router.get("/:id", getUserById);
router.post("/", createUser);

export default router;
