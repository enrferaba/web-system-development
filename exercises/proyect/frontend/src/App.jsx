// src/App.jsx
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import CarsPage from "./pages/CarsPage.jsx";
import CarDetails from "./pages/CarDetails.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import AdminPage from "./pages/AdminPage.jsx"; // 👈 añade esto arriba
import "./App.css";

const App = () => {
  return (
    <div className="app-shell">
      <Header />
      <main className="page">
        <Routes>
       
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/coches" element={<CarsPage />} />
          <Route path="/anuncios/:slug-:id" element={<CarDetails />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
