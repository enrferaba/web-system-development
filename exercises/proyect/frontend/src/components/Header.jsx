// src/components/Header.jsx
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { useCart } from "../context/CartContext.jsx";

const Header = () => {
  const { favorites } = useFavorites();
  const { items } = useCart();
  const favCount = favorites.length;
  const cartCount = items.length;

  return (
    <header className="topbar">
      <div className="brand">
        <Link to="/home">AutoHub</Link>
      </div>

      <nav className="main-nav">
        <NavLink to="/home">Inicio</NavLink>
        <NavLink to="/coches">Coches</NavLink>
        <NavLink to="/admin">Administrar</NavLink> {/* NUEVO */}
      </nav>

      <div className="top-actions">
        <Link to="/favoritos" className="btn ghost badge-wrapper">
          <span>Favoritos ({favCount})</span>
          <span className="badge">{favCount}</span>
        </Link>
        <Link to="/carrito" className="btn primary badge-wrapper">
          <span>Carrito ({cartCount})</span>
          <span className="badge">{cartCount}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
