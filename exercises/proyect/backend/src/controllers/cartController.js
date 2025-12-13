// src/controllers/cartController.js
import cartModel from "../models/cartModel.js";

const DEFAULT_USER_ID = 1;

export const listCart = async (req, res, next) => {
  try {
    const items = await cartModel.getCartByUser(DEFAULT_USER_ID);
    res.json(items);
  } catch (err) {
    next(err);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { carId } = req.body;
    if (!carId) {
      return res.status(400).json({ error: "carId requerido" });
    }
    await cartModel.addToCart(DEFAULT_USER_ID, carId);
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    await cartModel.removeFromCart(DEFAULT_USER_ID, req.params.carId);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
