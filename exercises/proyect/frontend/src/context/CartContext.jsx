// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { addToCart, fetchCart, removeFromCart } from "../services/cart.js";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await fetchCart();
        setItems(data);
      } catch (error) {
        console.error("Error cargando carrito:", error);
      }
    };

    load();
  }, []);

  const addItem = async (carId) => {
    await addToCart(carId);
    const { data } = await fetchCart();
    setItems(data);
  };

  const removeItem = async (carId) => {
    await removeFromCart(carId);
    setItems((prev) => prev.filter((car) => car.id !== carId));
  };

  const total = items.reduce((sum, car) => sum + (car.price || 0), 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
