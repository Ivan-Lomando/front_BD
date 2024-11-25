import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/Clases.css";

const AgregarAlumnosAClase = () => {
  const { id_clase } = useParams(); // ID de la clase desde la URL
  const navigate = useNavigate();
  const [alumnos, setAlumnos] = useState([]);
  const [equipamientos, setEquipamientos] = useState([]);
  const [ciAlumno, setCiAlumno] = useState("");
  const [alquilados, setAlquilados] = useState(0); // 0 o 1
  const [idEquipamiento, setIdEquipamiento] = useState(null); // Null si no se alquila
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Cargar lista de alumnos
    fetch("http://127.0.0.1:5000/api/alumnos")
      .then((response) => response.json())
      .then((data) => setAlumnos(data))
      .catch(() => setMessage("Error al cargar alumnos"));

    // Cargar lista de equipamientos
    fetch("http://127.0.0.1:5000/api/equipamiento")
      .then((response) => response.json())
      .then((data) => {
        console.log("Equipamientos cargados:", data); // Depuración
        setEquipamientos(data);
      })
      .catch(() => setMessage("Error al cargar equipamientos"));
  }, []);

  const handleAlquiladosChange = (value) => {
    setAlquilados(value);
    if (value === 0) {
      setIdEquipamiento(null); // Resetear el equipamiento si no alquila
    }
  };

  const handleAgregarAlumno = () => {
    if (!ciAlumno) {
      setMessage("Debes seleccionar un alumno.");
      return;
    }

    if (alquilados === 1 && !idEquipamiento) {
      setMessage("Debes seleccionar un equipamiento.");
      return;
    }

    fetch("http://127.0.0.1:5000/api/alumno_clase/registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_clase: parseInt(id_clase), // Asegurar que sea número
        ci_alumno: ciAlumno,
        alquilado: alquilados, // 0 o 1
        id_equipamiento: idEquipamiento, // Null si no se alquila
      }),
    })
      .then((response) => {
        if (response.ok) {
          setMessage("Alumno agregado exitosamente.");
          navigate("/clases");
        } else {
          setMessage("Error al agregar el alumno. Inténtalo de nuevo.");
        }
      })
      .catch(() => setMessage("Error en la conexión con el servidor."));
  };

  return (
    <div className="agregar-alumnos-container">
      <h1>Agregar Alumno a la Clase</h1>
      {message && <p className="error-message">{message}</p>}

      {/* Dropdown de Alumnos */}
      <div className="dropdown-section">
        <label className="label">Seleccionar Alumno:</label>
        <select
          className="dropdown"
          value={ciAlumno}
          onChange={(e) => setCiAlumno(e.target.value)}
        >
          <option value="">Seleccione un alumno</option>
          {alumnos.map((alumno) => (
            <option key={alumno.ci_alumno} value={alumno.ci_alumno}>
              {alumno.nombre} {alumno.apellido}
            </option>
          ))}
        </select>
      </div>

      {/* Radio Buttons para Alquilar Equipamiento */}
      <div className="alquiler-section">
        <label className="label">¿Alquilar Equipamiento?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="alquilados"
              value={1}
              checked={alquilados === 1}
              onChange={() => handleAlquiladosChange(1)}
            />
            Sí
          </label>
          <label>
            <input
              type="radio"
              name="alquilados"
              value={0}
              checked={alquilados === 0}
              onChange={() => handleAlquiladosChange(0)}
            />
            No
          </label>
        </div>
      </div>

      {/* Dropdown de Equipamientos */}
      {alquilados === 1 && (
        <div className="dropdown-section">
          <label className="label">Seleccionar Equipamiento:</label>
          <select
            className="dropdown"
            value={idEquipamiento || ""}
            onChange={(e) => setIdEquipamiento(e.target.value)}
          >
            <option value="">Seleccione un equipamiento</option>
            {equipamientos.map((equipamiento) => (
              <option key={equipamiento.id_equipamiento} value={equipamiento.id_equipamiento}>
                {equipamiento.descripción} - ${equipamiento.costo}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Botones */}
      <div className="button-group">
        <button className="submit-btn" onClick={handleAgregarAlumno}>
          Agregar
        </button>
        <button className="volver-btn" onClick={() => navigate("/clases")}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default AgregarAlumnosAClase;
