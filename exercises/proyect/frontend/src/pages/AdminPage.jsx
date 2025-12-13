// src/pages/AdminPage.jsx
import { useEffect, useState } from "react";
import { createCar, updateCar, deleteCar, fetchCars } from "../services/cars.js";
import "./AdminPage.css";

const EMPTY_FORM = {
  id: "",
  make: "",
  model: "",
  version: "",
  year: "",
  price: "",
  mileage_km: "",
  doors: "",
  color: "",
  fuel_type: "",
  transmission: "",
  power_hp: "",
  description: "",
};

const FIELD_DEFS = [
  { name: "id", label: "ID (para editar)" },
  { name: "make", label: "Marca" },
  { name: "model", label: "Modelo" },
  { name: "version", label: "Versión" },
  { name: "year", label: "Año" },
  { name: "price", label: "Precio (€)" },
  { name: "mileage_km", label: "Kilometraje (km)" },
  { name: "doors", label: "Puertas" },
  { name: "color", label: "Color" },
  { name: "fuel_type", label: "Combustible" },
  { name: "transmission", label: "Transmisión" },
  { name: "power_hp", label: "Potencia (cv)" },
];

const AdminPage = () => {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  // ---------- CARGAR COCHES ----------
  const loadCars = async () => {
    try {
      const res = await fetchCars({});
      setCars(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error cargando coches:", err);
      setCars([]);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  // ---------- FORMULARIO ----------
  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const loadToForm = (car) => {
    if (!car) return;
    setForm({
      id: car.id ?? "",
      make: car.make ?? "",
      model: car.model ?? "",
      version: car.version ?? "",
      year: car.year ?? "",
      price: car.price ?? "",
      mileage_km: car.mileage_km ?? "",
      doors: car.doors ?? "",
      color: car.color ?? "",
      fuel_type: car.fuel_type ?? "",
      transmission: car.transmission ?? "",
      power_hp: car.power_hp ?? "",
      description: car.description ?? "",
    });
    setEditing(true);
  };

  // ---------- CREAR ----------
  const handleCreate = async () => {
    setLoading(true);
    try {
      await createCar(form);
      alert("Coche creado");
      setForm(EMPTY_FORM);
      setEditing(false);
      loadCars();
    } catch (err) {
      console.error(err);
      alert("Error creando coche");
    }
    setLoading(false);
  };

  // ---------- EDITAR ----------
  const handleUpdate = async () => {
    if (!form.id) return alert("Debes introducir el ID del coche que quieres editar");
    setLoading(true);
    try {
      await updateCar(form.id, form);
      alert("Coche actualizado");
      setForm(EMPTY_FORM);
      setEditing(false);
      loadCars();
    } catch (err) {
      console.error(err);
      alert("Error actualizando coche");
    }
    setLoading(false);
  };

  // ---------- BORRAR ----------
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres borrar este coche?")) return;
    try {
      await deleteCar(id);
      alert("Coche eliminado");
      loadCars();
    } catch (err) {
      console.error(err);
      alert("Error borrando coche");
    }
  };

  const handleCancel = () => {
    setForm(EMPTY_FORM);
    setEditing(false);
  };

  return (
    <div className="admin-wrapper">
      <h1 className="admin-title">Administración de coches</h1>

      <div className="admin-grid">
        {/* ---------- COLUMNA IZQUIERDA: FORM ---------- */}
        <section className="admin-card admin-form">
          <h2 className="admin-card-title">
            {editing ? "Editar coche" : "Crear coche"}
          </h2>

          <div className="admin-fields">
            {FIELD_DEFS.map((field) => (
              <div className="admin-field" key={field.name}>
                <label className="admin-label" htmlFor={field.name}>
                  {field.label}
                </label>
                <input
                  id={field.name}
                  className="admin-input"
                  type="text"
                  value={form[field.name] ?? ""}
                  onChange={(e) => updateField(field.name, e.target.value)}
                />
              </div>
            ))}

            <div className="admin-field">
              <label className="admin-label" htmlFor="description">
                Descripción
              </label>
              <textarea
                id="description"
                className="admin-textarea"
                rows={3}
                value={form.description ?? ""}
                onChange={(e) => updateField("description", e.target.value)}
              />
            </div>
          </div>

          <div className="admin-actions">
            {!editing ? (
              <button
                className="admin-btn primary"
                onClick={handleCreate}
                disabled={loading}
              >
                Crear coche
              </button>
            ) : (
              <>
                <button
                  className="admin-btn primary"
                  onClick={handleUpdate}
                  disabled={loading}
                >
                  Guardar cambios
                </button>
                <button className="admin-btn ghost" onClick={handleCancel}>
                  Cancelar
                </button>
              </>
            )}
          </div>
        </section>

        {/* ---------- COLUMNA DERECHA: LISTA ---------- */}
        <section className="admin-card admin-list-card">
          <h2 className="admin-card-title">Coches existentes</h2>

          {cars.length === 0 ? (
            <p className="admin-empty">No hay coches o falló la carga.</p>
          ) : (
            <div className="admin-list">
              {cars.map((car) => (
                <div key={car.id} className="admin-item">
                  <div className="admin-item-info">
                    <strong>
                      {car.make} {car.model}
                    </strong>
                    <span className="admin-item-meta">
                      ID: {car.id} · Año {car.year} · {car.price} €
                    </span>
                  </div>
                  <div className="admin-item-actions">
                    <button
                      className="admin-btn ghost"
                      onClick={() => loadToForm(car)}
                    >
                      Editar
                    </button>
                    <button
                      className="admin-btn danger"
                      onClick={() => handleDelete(car.id)}
                    >
                      Borrar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
