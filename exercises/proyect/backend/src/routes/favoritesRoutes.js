// src/routes/favoritesRoutes.js
import { Router } from "express";
import {
  addFavorite,
  listFavorites,
  removeFavorite,
} from "../controllers/favoritesController.js";

const router = Router();

router.get("/", listFavorites);
router.post("/", addFavorite);
router.delete("/:carId", removeFavorite);

export default router;
