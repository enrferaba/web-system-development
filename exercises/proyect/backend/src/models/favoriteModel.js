// src/models/favoriteModel.js
import { query } from "../db/pool.js";

async function getFavoritesByUser(userId) {
  const result = await query(
    `SELECT c.*, img.image_url AS primary_image
     FROM favorites f
     JOIN cars c ON c.id = f.car_id
     LEFT JOIN LATERAL (
       SELECT image_url
       FROM car_images ci
       WHERE ci.car_id = c.id
       ORDER BY sort_order ASC, id ASC
       LIMIT 1
     ) img ON true
     WHERE f.user_id=$1
     ORDER BY f.created_at DESC`,
    [userId],
  );
  return result.rows;
}

async function addFavorite(userId, carId) {
  await query(
    "INSERT INTO favorites (user_id, car_id) VALUES ($1,$2) ON CONFLICT (user_id, car_id) DO NOTHING",
    [userId, carId],
  );
}

async function removeFavorite(userId, carId) {
  await query("DELETE FROM favorites WHERE user_id=$1 AND car_id=$2", [
    userId,
    carId,
  ]);
}

export default {
  getFavoritesByUser,
  addFavorite,
  removeFavorite,
};
