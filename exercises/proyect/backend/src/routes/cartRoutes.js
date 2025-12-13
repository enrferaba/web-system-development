// src/routes/cartRoutes.js
import { Router } from "express";
import {
  addToCart,
  listCart,
  removeFromCart,
} from "../controllers/cartController.js";

const router = Router();

router.get("/", listCart);
router.post("/", addToCart);
router.delete("/:carId", removeFromCart);

export default router;
