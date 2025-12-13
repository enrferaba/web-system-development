import { useEffect, useState } from "react";
import { fetchMakes, fetchModels } from "../services/cars.js";

const SearchBar = ({ make, model, onMakeChange, onModelChange, onSearch, count }) => {
  const [makeOptions, setMakeOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [showMake, setShowMake] = useState(false);
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    const run = async () => {
      if (make.length < 1) {
        setMakeOptions([]);
        return;
      }
      const { data } = await fetchMakes(make);
      setMakeOptions(data);
    };
    run();
  }, [make]);

  useEffect(() => {
    const run = async () => {
      if (!make || model.length < 1) {
        setModelOptions([]);
        return;
      }
      const { data } = await fetchModels(make, model);
      setModelOptions(data);
    };
    run();
  }, [model, make]);

  return (
    <div className="card" style={{ display: "grid", gap: "12px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr auto",
          gap: "12px",
          alignItems: "end",
        }}
      >
        <div style={{ position: "relative" }}>
          <label className="label">Marca</label>
          <input
            className="input"
            placeholder="Audi, Tesla..."
            value={make}
            onChange={(e) => {
              onMakeChange(e.target.value);
              setShowMake(true);
            }}
            onFocus={() => setShowMake(true)}
          />
          {showMake && makeOptions.length > 0 && (
            <div className="card" style={{ position: "absolute", zIndex: 10, width: "100%", marginTop: "4px" }}>
              {makeOptions.map((m) => (
                <div
                  key={m}
                  style={{ padding: "8px", cursor: "pointer" }}
                  onMouseDown={() => {
                    onMakeChange(m);
                    setShowMake(false);
                  }}
                >
                  {m}
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ position: "relative" }}>
          <label className="label">Modelo</label>
          <input
            className="input"
            placeholder="Q8, Model 3..."
            value={model}
            onChange={(e) => {
              onModelChange(e.target.value);
              setShowModel(true);
            }}
            onFocus={() => setShowModel(true)}
          />
          {showModel && modelOptions.length > 0 && (
            <div className="card" style={{ position: "absolute", zIndex: 10, width: "100%", marginTop: "4px" }}>
              {modelOptions.map((m) => (
                <div
                  key={m}
                  style={{ padding: "8px", cursor: "pointer" }}
                  onMouseDown={() => {
                    onModelChange(m);
                    setShowModel(false);
                  }}
                >
                  {m}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <label className="label">Buscar</label>
          <button className="cta" style={{ width: "100%" }} onClick={onSearch}>
            Buscar ({count})
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
