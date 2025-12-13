import { useCart } from "../context/CartContext.jsx";

const CartPage = () => {
  const { items, removeItem, total } = useCart();

  return (
    <div className="section">
      <h2>Carrito</h2>
      {items.length === 0 ? (
        <p className="muted">No tienes coches en el carrito.</p>
      ) : (
        <div className="grid" style={{ gap: "12px" }}>
          {items.map((car) => {
            const image = car.primary_image || "https://via.placeholder.com/300x200?text=AutoHub";
            return (
              <div
                key={car.id}
                className="card"
                style={{ display: "grid", gridTemplateColumns: "160px 1fr auto", gap: "12px" }}
              >
                <img
                  src={image}
                  alt={car.make}
                  style={{ width: "100%", borderRadius: "10px", objectFit: "cover", height: "100%" }}
                />
              <div>
                <h3 style={{ margin: 0 }}>
                  {car.make} {car.model}
                </h3>
                <p className="muted">
                  {car.year} • {car.mileage_km.toLocaleString()} km • {car.fuel_type}
                </p>
                <strong>{car.price.toLocaleString()} €</strong>
              </div>
                <button className="btn ghost" onClick={() => removeItem(car.id)}>
                  Eliminar
                </button>
              </div>
            );
          })}
          <div style={{ textAlign: "right", marginTop: "8px" }}>
            <p className="muted">Total</p>
            <h2>{total.toLocaleString()} €</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
