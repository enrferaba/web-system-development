// src/models/cartModel.js
import { query } from "../db/pool.js";

async function getCartByUser(userId) {
  const result = await query(
    `SELECT c.*, img.image_url AS primary_image
     FROM cart_items ci
     JOIN cars c ON c.id = ci.car_id
     LEFT JOIN LATERAL (
       SELECT image_url
       FROM car_images i
       WHERE i.car_id = c.id
       ORDER BY sort_order ASC, id ASC
       LIMIT 1
     ) img ON true
     WHERE ci.user_id=$1
     ORDER BY ci.created_at DESC`,
    [userId],
  );
  return result.rows;
}

async function addToCart(userId, carId) {
  await query(
    "INSERT INTO cart_items (user_id, car_id) VALUES ($1,$2) ON CONFLICT (user_id, car_id) DO NOTHING",
    [userId, carId],
  );
}

async function removeFromCart(userId, carId) {
  await query("DELETE FROM cart_items WHERE user_id=$1 AND car_id=$2", [
    userId,
    carId,
  ]);
}

export default {
  getCartByUser,
  addToCart,
  removeFromCart,
};
