//import "./FiltersPanel.css";


const COLORS = ["blanco", "negro", "gris", "rojo", "azul"];
const FUEL_TYPES = [
  { label: "Eléctrico", value: "electrico" },
  { label: "Híbrido enchufable", value: "hibrido_enchufable" },
  { label: "Híbrido", value: "hibrido" },
  { label: "Gasolina", value: "gasolina" },
  { label: "Diésel", value: "diesel" },
];

const FiltersPanel = ({ filters, onChange, onClear }) => {
  const toggleFuel = (value) => {
    const list = filters.fuel_types || [];
    if (list.includes(value)) {
      onChange("fuel_types", list.filter((f) => f !== value));
    } else {
      onChange("fuel_types", [...list, value]);
    }
  };

  const setDoors = (value) => onChange("doors_group", value);

  return (
    <div className="card filters-panel">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0 }}>Filtros</h3>
        <button className="btn ghost" onClick={onClear}>
          Quitar filtros
        </button>
      </div>

      <div style={{ width: "100%" }}>
        <div className="label">Precio</div>
        <div className="filters-row">
          <input
            className="input"
            type="number"
            placeholder="Mín."
            value={filters.min_price || ""}
            onChange={(e) => onChange("min_price", e.target.value)}
          />
          <input
            className="input"
            type="number"
            placeholder="Máx."
            value={filters.max_price || ""}
            onChange={(e) => onChange("max_price", e.target.value)}
          />
        </div>
      </div>

      <div>
        <div className="label">Año</div>
        <div className="filters-row">
          <input
            className="input"
            type="number"
            placeholder="Desde"
            value={filters.min_year || ""}
            onChange={(e) => onChange("min_year", e.target.value)}
          />
          <input
            className="input"
            type="number"
            placeholder="Hasta"
            value={filters.max_year || ""}
            onChange={(e) => onChange("max_year", e.target.value)}
          />
        </div>
      </div>

      <div>
        <div className="label">Color</div>
        <select className="input" value={filters.color || ""} onChange={(e) => onChange("color", e.target.value)}>
          <option value="">Cualquier color</option>
          {COLORS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="label">N° Puertas</div>
        <div className="door-toggle fancy">
          {[
            { label: "Todos", value: "" },
            { label: "2 puertas", value: "2_3" },
            { label: "4/5 puertas", value: "4_5" },
            { label: "6/7 puertas", value: "6_7" },
          ].map((item) => (
            <button
              key={item.value || "all"}
              className={filters.doors_group === item.value ? "active" : ""}
              onClick={() => setDoors(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="label">Tipo de combustible</div>
        <div className="chips">
          {FUEL_TYPES.map((f) => (
            <button
              key={f.value}
              className="btn ghost"
              style={{ borderColor: filters.fuel_types?.includes(f.value) ? "#4fd1c5" : "rgba(255,255,255,0.2)" }}
              onClick={() => toggleFuel(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FiltersPanel;
