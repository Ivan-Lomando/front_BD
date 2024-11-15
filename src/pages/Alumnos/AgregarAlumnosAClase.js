import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../../styles/Clases.css';

const AgregarAlumnosAClase = () => {
  const { id_clase } = useParams();
  const navigate = useNavigate();
  const [alumnos, setAlumnos] = useState([]);
  const [selectedAlumnos, setSelectedAlumnos] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/alumnos")
      .then((response) => response.json())
      .then((data) => setAlumnos(data))
      .catch((error) => setMessage("Error al cargar alumnos"));
  }, []);

  const handleAgregarAlumnos = () => {
    // Enviar los datos a la API para agregar los alumnos a la clase
    fetch("http://127.0.0.1:5000/api/alumno_clase/registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_clase: id_clase,
        alumnos: selectedAlumnos,
      }),
    })
      .then(() => {
        setMessage("Alumnos agregados exitosamente");
        navigate("/clases");
      })
      .catch((error) => setMessage("Error al agregar alumnos"));
  };

  return (
    <div className="agregar-alumnos-container">
      <h1>Agregar Alumnos a la Clase</h1>
      {message && <p>{message}</p>}
      <div>
        <label>Seleccionar Alumnos:</label>
        <select
          multiple
          value={selectedAlumnos}
          onChange={(e) =>
            setSelectedAlumnos(Array.from(e.target.selectedOptions, (option) => option.value))
          }
        >
          {alumnos.map((alumno) => (
            <option key={alumno.ci_alumno} value={alumno.ci_alumno}>
              {alumno.nombre} {alumno.apellido}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAgregarAlumnos}>Agregar</button>
      <button onClick={() => navigate("/clases")}>Volver</button>
    </div>
  );
};

export default AgregarAlumnosAClase;
