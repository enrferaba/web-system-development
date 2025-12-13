// src/routes/carsRoutes.js
import { Router } from "express";
import {
  countCars,
  createCar,
  deleteCar,
  getCarById,
  getCarBySlug,
  listCars,
  listMakes,
  listModels,
  updateCar,
} from "../controllers/carsController.js";

const router = Router();

// Lectura / filtros
router.get("/", listCars);
router.get("/count", countCars);
router.get("/makes", listMakes);
router.get("/models", listModels);
router.get("/slug/:slug", getCarBySlug);
router.get("/:id", getCarById);

// CRUD de coches SIN autenticación (para tu proyecto)
router.post("/", createCar);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

export default router;
