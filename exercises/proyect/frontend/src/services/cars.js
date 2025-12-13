// src/services/cars.js
import api from "./api.js";

// --- Lectura de coches (lista, detalle, filtros) ---
export const fetchCars = (params = {}) => api.get("/cars", { params });
export const fetchCarCount = (params = {}) => api.get("/cars/count", { params });
export const fetchCarById = (id) => api.get(`/cars/${id}`);
export const fetchCarBySlug = (slug) => api.get(`/cars/slug/${slug}`);
export const fetchMakes = (q) => api.get("/cars/makes", { params: { q } });
export const fetchModels = (make, q) =>
  api.get("/cars/models", { params: { make, q } });

// --- CRUD para la página de administración ---
export const createCar = (carData) => api.post("/cars", carData);

export const updateCar = (id, carData) => api.put(`/cars/${id}`, carData);

export const deleteCar = (id) => api.delete(`/cars/${id}`);
