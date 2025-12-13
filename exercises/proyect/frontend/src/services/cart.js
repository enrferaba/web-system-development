import api from "./api.js";

export const fetchCart = () => api.get("/cart");
export const addToCart = (carId) => api.post("/cart", { carId });
export const removeFromCart = (carId) => api.delete(`/cart/${carId}`);
