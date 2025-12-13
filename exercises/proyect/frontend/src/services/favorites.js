import api from "./api.js";

export const fetchFavorites = () => api.get("/favorites");
export const addFavorite = (carId) => api.post("/favorites", { carId });
export const removeFavorite = (carId) => api.delete(`/favorites/${carId}`);
