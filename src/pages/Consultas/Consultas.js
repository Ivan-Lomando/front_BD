import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Consultas.css";

const Consultas = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConsulta = (endpoint) => {
    setLoading(true);
    setMessage("");
    setData(null);

    fetch(`http://127.0.0.1:5000/api/consultas/${endpoint}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al realizar la consulta");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("No se encontraron resultados para esta consulta.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="consultas-container">
      <h1 className="titulo">Consultas</h1>
      <div className="consultas-buttons">
        <button onClick={() => handleConsulta("ingresos")}>
          Actividades con más ingresos
        </button>
        <button onClick={() => handleConsulta("alumnos")}>
          Actividades con más alumnos
        </button>
        <button onClick={() => handleConsulta("turnos")}>
          Turnos con más clases dictadas
        </button>
        <button onClick={() => navigate("/dashboard")}>Volver</button>
      </div>
      {loading && <p className="loading-message">Cargando...</p>}
      {message && <p className="error-message">{message}</p>}
      {data && (
        <div className="result-container">
          <h2>Resultados</h2>
          <table>
            <thead>
              <tr>
                {Object.keys(data[0] || {}).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  {Object.values(item).map((value, idx) => (
                    <td key={idx}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Consultas;
