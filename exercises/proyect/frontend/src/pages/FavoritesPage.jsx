import CarCard from "../components/CarCard.jsx";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { useCart } from "../context/CartContext.jsx";

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const { addItem } = useCart();

  return (
    <div className="section">
      <h2>Mis favoritos</h2>
      {favorites.length === 0 ? (
        <p className="muted">Aún no has guardado coches.</p>
      ) : (
        <div className="car-grid">
          {favorites.map((car) => (
            <CarCard key={car.id} car={car} onAddToCart={addItem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
