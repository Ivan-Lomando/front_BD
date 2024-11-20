import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/logout", {
        method: "POST",
      });

      if (response.ok) {
        localStorage.removeItem("user"); // Eliminar información del usuario
        navigate("/"); // Redirigir al login
      } else {
        // Si no hay sesión activa, también redirigir al login
        navigate("/");
      }
    } catch (err) {
      alert("Error de conexión con el servidor");
      navigate("/"); // Redirigir al login en caso de error de conexión
    }
  };

  return (
    <div className="dashboard">
      <h1>Administración de la Escuela de Deportes</h1>

      <div className="button-container">
        <div>
          <button
            className="dashboard-button"
            onClick={() => navigate("/alumnos")}
          >
            Alumnos
          </button>
        </div>
        <div>
          <button
            className="dashboard-button"
            onClick={() => navigate("/instructores")}
          >
            Instructores
          </button>
        </div>
        <div>
          <button
            className="dashboard-button"
            onClick={() => navigate("/turnos")}
          >
            Turnos
          </button>
        </div>
        <div>
          <button
            className="dashboard-button"
            onClick={() => navigate("/actividades")}
          >
            Actividades
          </button>
        </div>
        <div>
          <button
            className="dashboard-button"
            onClick={() => navigate("/equipamiento")}
          >
            Equipamientos
          </button>
        </div>
        <div>
          <button
            className="dashboard-button"
            onClick={() => navigate("/clases")}
          >
            Clases
          </button>
        </div>
        <div>
          <button
            className="dashboard-button"
            onClick={() => navigate("/consultas")}
          >
            Consultas
          </button>
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
}
