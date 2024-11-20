import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/LoginRegister.css";

const Register = () => {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:5000/api/login/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, contraseña }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data)); // Guardar información del usuario
        navigate("/dashboard"); // Redirigir al dashboard
      } else {
        setMessage(data.error || "Error al registrar usuario");
      }
    } catch (err) {
      setMessage("Error de conexión con el servidor");
    }
  };

  return (
    <div className="register-container">
      <h2>Registrar Usuario</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Correo:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        <button className="button" type="submit">
          Registrar
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
