// src/components/CarAdminPanel.jsx
import { useState } from "react";
import {
  createCar,
  updateCarService,
  deleteCarService,
} from "../services/cars.js";

const initialForm = {
  id: "",
  make: "",
  model: "",
  year: "",
  price: "",
  mileage_km: "",
  doors: "4",
  color: "",
  fuel_type: "gasolina",
};

function CarAdminPanel({ onChange }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const buildPayload = () => ({
    make: form.make,
    model: form.model,
    year: Number(form.year),
    price: Number(form.price),
    mileage_km: Number(form.mileage_km || 0),
    doors: Number(form.doors || 4),
    color: form.color || "gris",
    fuel_type: form.fuel_type || "gasolina",
    // el backend rellena slug, transmission, power_hp, description, imágenes…
  });

  const reset = () => {
    setForm(initialForm);
    onChange?.(); // avisar al padre para que recargue la lista
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      await createCar(buildPayload());
      setStatus("Coche creado correctamente.");
      reset();
    } catch (err) {
      console.error(err);
      setStatus(err.response?.data?.error || "Error al crear coche");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!form.id) {
      setStatus("Para editar necesitas indicar el ID del coche.");
      return;
    }
    setStatus("");
    try {
      await updateCarService(form.id, buildPayload());
      setStatus("Coche actualizado correctamente.");
      reset();
    } catch (err) {
      console.error(err);
      setStatus(err.response?.data?.error || "Error al actualizar coche");
    }
  };

  const handleDelete = async () => {
    if (!form.id) {
      setStatus("Para borrar necesitas indicar el ID del coche.");
      return;
    }
    if (!window.confirm(`¿Seguro que quieres borrar el coche con id ${form.id}?`)) return;

    setStatus("");
    try {
      await deleteCarService(form.id);
      setStatus("Coche borrado correctamente.");
      reset();
    } catch (err) {
      console.error(err);
      setStatus(err.response?.data?.error || "Error al borrar coche");
    }
  };

  return (
    <div className="card" style={{ marginTop: "1rem" }}>
      <h3 style={{ marginTop: 0, marginBottom: "0.5rem" }}>Admin coches</h3>
      <p className="muted" style={{ fontSize: "0.8rem", marginBottom: "0.8rem" }}>
        Panel rápido para crear, editar o borrar coches. Para editar o borrar,
        introduce el <strong>ID</strong> del coche.
      </p>

      <form className="grid" style={{ gap: "0.6rem" }} onSubmit={handleCreate}>
        <div>
          <div className="label">ID (para editar / borrar)</div>
          <input
            className="input"
            type="number"
            value={form.id}
            onChange={(e) => handleChange("id", e.target.value)}
            placeholder="Ej: 7"
          />
        </div>

        <div>
          <div className="label">Marca</div>
          <input
            className="input"
            value={form.make}
            onChange={(e) => handleChange("make", e.target.value)}
            placeholder="Audi"
          />
        </div>

        <div>
          <div className="label">Modelo</div>
          <input
            className="input"
            value={form.model}
            onChange={(e) => handleChange("model", e.target.value)}
            placeholder="A3"
          />
        </div>

        <div className="filters-row">
          <div style={{ flex: 1 }}>
            <div className="label">Año</div>
            <input
              className="input"
              type="number"
              value={form.year}
              onChange={(e) => handleChange("year", e.target.value)}
              placeholder="2024"
            />
          </div>
          <div style={{ flex: 1 }}>
            <div className="label">Precio (€)</div>
            <input
              className="input"
              type="number"
              value={form.price}
              onChange={(e) => handleChange("price", e.target.value)}
              placeholder="25000"
            />
          </div>
        </div>

        <div className="filters-row">
          <div style={{ flex: 1 }}>
            <div className="label">Km</div>
            <input
              className="input"
              type="number"
              value={form.mileage_km}
              onChange={(e) => handleChange("mileage_km", e.target.value)}
              placeholder="5000"
            />
          </div>
          <div style={{ flex: 1 }}>
            <div className="label">Puertas</div>
            <input
              className="input"
              type="number"
              value={form.doors}
              onChange={(e) => handleChange("doors", e.target.value)}
              placeholder="5"
            />
          </div>
        </div>

        <div>
          <div className="label">Color</div>
          <input
            className="input"
            value={form.color}
            onChange={(e) => handleChange("color", e.target.value)}
            placeholder="negro"
          />
        </div>

        <div>
          <div className="label">Combustible</div>
          <select
            className="input"
            value={form.fuel_type}
            onChange={(e) => handleChange("fuel_type", e.target.value)}
          >
            <option value="electrico">Eléctrico</option>
            <option value="hibrido_enchufable">Híbrido enchufable</option>
            <option value="hibrido">Híbrido</option>
            <option value="gasolina">Gasolina</option>
            <option value="diesel">Diésel</option>
          </select>
        </div>

        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginTop: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            className="btn"
            onClick={handleCreate}
          >
            Crear coche
          </button>
          <button
            type="button"
            className="btn ghost"
            onClick={handleUpdate}
          >
            Guardar cambios
          </button>
          <button
            type="button"
            className="btn ghost"
            style={{ borderColor: "#ff4d4f" }}
            onClick={handleDelete}
          >
            Borrar coche
          </button>
        </div>

        {status && (
          <p className="muted" style={{ marginTop: "0.4rem" }}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
}

export default CarAdminPanel;
