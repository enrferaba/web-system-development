// src/context/FavoritesContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { addFavorite, fetchFavorites, removeFavorite } from "../services/favorites.js";

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await fetchFavorites();
        setFavorites(data);
      } catch (error) {
        console.error("Error cargando favoritos:", error);
      }
    };

    load();
  }, []);

  const toggleFavorite = async (carId) => {
    const exists = favorites.some((car) => car.id === carId);

    if (exists) {
      await removeFavorite(carId);
      setFavorites((prev) => prev.filter((car) => car.id !== carId));
    } else {
      await addFavorite(carId);
      const { data } = await fetchFavorites();
      setFavorites(data);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
