// src/pages/Home.jsx
import { Link } from "react-router-dom";
import CarShowcase from "../components/CarShowcase.jsx";

const Home = () => {
  return (
    <div className="section">
      <div
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "1.2fr 1fr",
          alignItems: "center",
        }}
      >
        <div>
          <p className="pill">Concesionario digital</p>
          <h1 style={{ margin: "8px 0 12px", fontSize: "32px" }}>
            Encuentra tu próximo coche premium en AutoHub
          </h1>
          <p className="muted">
            Busca, compara y guarda tus favoritos. Añade al carrito y continúa cuando quieras.
          </p>
          <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
            <Link to="/coches" className="cta">
              Ver coches
            </Link>
          </div>
        </div>

        <CarShowcase />
      </div>
    </div>
  );
};

export default Home;
