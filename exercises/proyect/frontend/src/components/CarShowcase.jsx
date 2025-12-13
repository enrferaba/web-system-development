const CarShowcase = () => {
  return (
    <div className="card" style={{ position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 20% 20%, rgba(79,209,197,0.2), transparent 30%)",
          pointerEvents: "none",
        }}
      />
      <img
        src="https://mlin.es/wp-content/uploads/2024/08/marcas-de-coches-de-lujo-poco-conocidas-e1723484807706.jpg"
        alt="car"
        style={{ width: "100%", borderRadius: "12px", objectFit: "cover" }}
      />
      <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div className="pill">Top selección</div>
          <h3 style={{ margin: "6px 0" }}>Audi Q8 Black Line</h3>
          <p className="muted">Híbrido enchufable • 381 cv • 5.000 km</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p className="muted">Desde</p>
          <h2 style={{ margin: 0 }}>98.000 €</h2>
        </div>
      </div>
    </div>
  );
};

export default CarShowcase;
