// src/components/CarCard.jsx
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";
import "./CarCard.css";

const CarCard = ({ car, onAddToCart }) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();

  const isFav = favorites.some((f) => f.id === car.id);
  const detailHref = `/anuncios/${car.slug}-${car.id}`;
  const image = car.primary_image || "https://mlin.es/wp-content/uploads/2024/08/marcas-de-coches-de-lujo-poco-conocidas-e1723484807706.jpg";

  const handleFavorite = async (event) => {
    event.stopPropagation();
    await toggleFavorite(car.id);
  };

  const handleCart = async (event) => {
    event.stopPropagation();
    await onAddToCart(car.id);
  };

  const goToDetails = () => {
    navigate(detailHref);
  };

  return (
    <div className="car-card" onClick={goToDetails} role="button" tabIndex={0}>
      <div className="car-image">
        <img src={image} alt={car.make} />
        <button className={`favorite-btn ${isFav ? "active" : ""}`} onClick={handleFavorite}>
          ♥
        </button>
      </div>

      <div className="car-body">
        <div className="car-title">
          <h3>
            {car.make} {car.model}
          </h3>
          <p className="muted">{car.version}</p>
        </div>

        <div className="car-meta">
          <span className="tag">{car.year}</span>
          <span className="tag">{car.mileage_km.toLocaleString()} km</span>
          <span className="tag">{car.doors} puertas</span>
          <span className="tag">{car.fuel_type}</span>
        </div>

        <div className="car-footer">
          <div>
            <p className="muted">Precio</p>
            <strong>{car.price.toLocaleString()} €</strong>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button className="btn ghost" onClick={handleFavorite}>
              {isFav ? "Quitar" : "Favorito"}
            </button>
            <button className="cta" onClick={handleCart}>
              Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
