import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [cartas, setCartas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://db.ygoprodeck.com/api/v7/cardinfo.php")
      .then((response) => {
        setCartas(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener las cartas:", error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCartas = cartas.filter((carta) =>
    carta.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <header className="header">
        <h1>Yu-Gi-Oh! Card Pricer</h1>
      </header>

      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar carta..."
          className="search-input"
        />
      </div>

      <div className="card-list">
        {loading ? (
          <p>Cargando cartas...</p>
        ) : filteredCartas.length > 0 ? (
          filteredCartas.map((carta) => (
            <div key={carta.id} className="card-item">
              <img
                src={carta.card_images[0].image_url}
                alt={`Imagen de ${carta.name}`}
                className="card-image"
                loading="lazy"
              />
              <h2>{carta.name}</h2>
              <p>{carta.type}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron cartas</p>
        )}
      </div>
    </div>
  );
}

export default App;
