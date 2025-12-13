// src/controllers/carsController.js
import carModel from "../models/carModel.js";
import { createCarSchema, updateCarSchema } from "../db/carSchemas.js";

const normalizeCarBody = (body) => ({
  ...body,
  price: body.price !== undefined ? Number(body.price) : undefined,
  year: body.year !== undefined ? Number(body.year) : undefined,
  mileage_km:
    body.mileage_km !== undefined ? Number(body.mileage_km) : undefined,
  doors: body.doors !== undefined ? Number(body.doors) : undefined,
  power_hp: body.power_hp !== undefined ? Number(body.power_hp) : undefined,
});

export const listCars = async (req, res, next) => {
  try {
    const cars = await carModel.getCars(req.query);
    res.json(cars);
  } catch (err) {
    next(err);
  }
};

export const countCars = async (req, res, next) => {
  try {
    const count = await carModel.countCars(req.query);
    res.json({ count });
  } catch (err) {
    next(err);
  }
};

export const getCarById = async (req, res, next) => {
  try {
    const car = await carModel.getCarById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: "Coche no encontrado" });
    }
    res.json(car);
  } catch (err) {
    next(err);
  }
};

export const getCarBySlug = async (req, res, next) => {
  try {
    const car = await carModel.getCarBySlug(req.params.slug);
    if (!car) {
      return res.status(404).json({ error: "Coche no encontrado" });
    }
    res.json(car);
  } catch (err) {
    next(err);
  }
};

export const listMakes = async (req, res, next) => {
  try {
    const makes = await carModel.listMakes(req.query.q);
    res.json(makes);
  } catch (err) {
    next(err);
  }
};

export const listModels = async (req, res, next) => {
  try {
    const models = await carModel.listModels({
      make: req.query.make,
      q: req.query.q,
    });
    res.json(models);
  } catch (err) {
    if (err.status === 400) {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};

export const createCar = async (req, res, next) => {
  try {
    const parsed = createCarSchema.parse(normalizeCarBody(req.body));
    const car = await carModel.createCar(parsed);
    res.status(201).json(car);
  } catch (err) {
    if (err.name === "ZodError") {
      return res
        .status(400)
        .json({ error: err.errors.map((e) => e.message).join(", ") });
    }
    next(err);
  }
};

export const updateCar = async (req, res, next) => {
  try {
    const parsed = updateCarSchema.parse(normalizeCarBody(req.body));
    const car = await carModel.updateCar(req.params.id, parsed);
    if (!car) {
      return res.status(404).json({ error: "Coche no encontrado" });
    }
    res.json(car);
  } catch (err) {
    if (err.name === "ZodError") {
      return res
        .status(400)
        .json({ error: err.errors.map((e) => e.message).join(", ") });
    }
    next(err);
  }
};

export const deleteCar = async (req, res, next) => {
  try {
    const ok = await carModel.deleteCar(req.params.id);
    if (!ok) {
      return res.status(404).json({ error: "Coche no encontrado" });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
