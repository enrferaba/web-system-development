// src/pages/CarsPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FiltersPanel from "../components/FiltersPanel.jsx";
import SearchBar from "../components/SearchBar.jsx";
import CarCard from "../components/CarCard.jsx";
import { fetchCarCount, fetchCars } from "../services/cars.js";
import { useCart } from "../context/CartContext.jsx";

const defaultFilters = {
  search_make: "",
  search_model: "",
  min_price: "",
  max_price: "",
  min_year: "",
  max_year: "",
  color: "",
  doors_group: "",
  fuel_types: [],
  sort_by: "",
};

const CarsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState(() => {
    const initial = { ...defaultFilters };

    for (const key of Object.keys(initial)) {
      if (key === "fuel_types") {
        const val = searchParams.get("fuel_types");
        initial.fuel_types = val ? val.split(",") : [];
      } else {
        initial[key] = searchParams.get(key) || initial[key];
      }
    }

    return initial;
  });

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const { addItem } = useCart();

  const apiParams = useMemo(() => {
    const params = { ...filters };
    if (filters.fuel_types.length) {
      params.fuel_type = filters.fuel_types.join(",");
    }
    delete params.fuel_types;
    return params;
  }, [filters]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [{ data }, countRes] = await Promise.all([
          fetchCars(apiParams),
          fetchCarCount(apiParams),
        ]);
        setCars(data);
        setCount(countRes.data.count);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [apiParams]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => setFilters(defaultFilters);

  const applySearchToUrl = () => {
    const params = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (key === "fuel_types") {
        if (value.length) params.fuel_types = value.join(",");
      } else if (value) {
        params[key] = value;
      }
    });
    setSearchParams(params);
  };

  return (
    <div className="grid two-col" style={{ gap: "16px" }}>
      <FiltersPanel
        filters={filters}
        onChange={updateFilter}
        onClear={clearFilters}
      />

      <div className="grid" style={{ gap: "14px" }}>
        <div className="grid" style={{ gap: "10px" }}>
          <SearchBar
            make={filters.search_make}
            model={filters.search_model}
            onMakeChange={(v) => updateFilter("search_make", v)}
            onModelChange={(v) => updateFilter("search_model", v)}
            onSearch={applySearchToUrl}
            count={count}
          />

          <div
            className="card"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div className="label">Ordenar por</div>
            </div>
            <select
              className="input"
              value={filters.sort_by}
              onChange={(e) => updateFilter("sort_by", e.target.value)}
            >
              <option value="">Relevancia</option>
              <option value="price_asc">Precio ascendente</option>
              <option value="price_desc">Precio descendente</option>
              <option value="year">Año</option>
              <option value="power">Potencia</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="page-loading">Cargando coches...</div>
        ) : (
          <div className="car-grid">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} onAddToCart={addItem} />
            ))}

            {cars.length === 0 && (
              <div className="card" style={{ gridColumn: "1/-1" }}>
                <p className="muted">
                  No encontramos coches con esos filtros o el servidor no ha
                  devuelto resultados.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarsPage;
