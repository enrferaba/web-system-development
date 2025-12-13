// src/pages/CarDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CarCarousel from "../components/CarCarousel.jsx";
import { fetchCarById } from "../services/cars.js";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import "./CarDetails.css";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const { favorites, toggleFavorite } = useFavorites();
  const { addItem } = useCart();

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await fetchCarById(id);
        setCar(data);
      } catch (error) {
        console.error("Error cargando coche:", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return <div className="page-loading">Cargando...</div>;
  }

  if (!car) {
    return <div className="page-loading">Coche no encontrado</div>;
  }

  const isFav = favorites.some((f) => f.id === car.id);

  const handleFav = async () => {
    await toggleFavorite(car.id);
  };

  const handleCart = async () => {
    await addItem(car.id);
  };

  return (
    <div className="grid two-col" style={{ alignItems: "start", gap: "16px" }}>
      <CarCarousel images={car.images} />

      <div className="card">
        <p className="pill">Resumen</p>
        <h2 style={{ margin: "8px 0" }}>
          {car.make} {car.model} {car.version}
        </h2>

        <div className="chips" style={{ margin: "10px 0" }}>
          <span className="tag">{car.year}</span>
          <span className="tag">{car.mileage_km.toLocaleString()} km</span>
          <span className="tag">{car.doors} puertas</span>
          <span className="tag">{car.color}</span>
        </div>

        <h3 style={{ marginTop: "10px" }}>{car.price.toLocaleString()} €</h3>

        <div style={{ display: "flex", gap: "8px", margin: "10px 0" }}>
          <button className="btn ghost" onClick={handleFav}>
            {isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
          </button>
          <button className="cta" onClick={handleCart}>
            Añadir al carrito
          </button>
        </div>

        <div className="detail-grid">
          <div>
            <h4>Motor y consumo</h4>
            <p className="muted">Potencia: {car.power_hp || "N/D"} hp</p>
            <p className="muted">Combustible: {car.fuel_type}</p>
            <p className="muted">Transmisión: {car.transmission || "N/D"}</p>
          </div>
          <div>
            <h4>Descripción</h4>
            <p className="muted">{car.description || "Sin descripción disponible."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
