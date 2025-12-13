// src/controllers/favoritesController.js
import favoriteModel from "../models/favoriteModel.js";

const DEFAULT_USER_ID = 1;

export const listFavorites = async (req, res, next) => {
  try {
    const favorites = await favoriteModel.getFavoritesByUser(DEFAULT_USER_ID);
    res.json(favorites);
  } catch (err) {
    next(err);
  }
};

export const addFavorite = async (req, res, next) => {
  try {
    const { carId } = req.body;
    if (!carId) {
      return res.status(400).json({ error: "carId requerido" });
    }
    await favoriteModel.addFavorite(DEFAULT_USER_ID, carId);
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const removeFavorite = async (req, res, next) => {
  try {
    await favoriteModel.removeFavorite(DEFAULT_USER_ID, req.params.carId);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
