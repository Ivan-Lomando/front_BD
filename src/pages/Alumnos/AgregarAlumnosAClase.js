import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/Clases.css";

const AgregarAlumnosAClase = () => {
  const { id_clase } = useParams(); // ID de la clase desde la URL
  const navigate = useNavigate();
  const [alumnos, setAlumnos] = useState([]);
  const [equipamientos, setEquipamientos] = useState([]);
  const [clases, setClases] = useState([]); // Todas las clases
  const [clase, setClase] = useState(null); // Clase seleccionada
  const [ciAlumno, setCiAlumno] = useState('');
  const [alquilados, setAlquilados] = useState(0); // 0 o 1
  const [idEquipamiento, setIdEquipamiento] = useState(null); // Null si no se alquila
  const [message, setMessage] = useState("");

  // Cargar datos iniciales
  useEffect(() => {
    // Cargar todas las clases y filtrar la clase actual
    fetch("http://127.0.0.1:5000/api/clases")
      .then((response) => response.json())
      .then((data) => {
        setClases(data);
        const selectedClase = data.find((clase) => clase.id_clase === parseInt(id_clase));
        setClase(selectedClase || null);
      })
      .catch(() => setMessage("Error al cargar las clases"));

    // Cargar lista de alumnos
    fetch("http://127.0.0.1:5000/api/alumnos")
      .then((response) => response.json())
      .then((data) => setAlumnos(data))
      .catch(() => setMessage("Error al cargar alumnos"));

    // Cargar lista de equipamientos
    fetch("http://127.0.0.1:5000/api/equipamiento")
      .then((response) => response.json())
      .then((data) => setEquipamientos(data))
      .catch(() => setMessage("Error al cargar equipamientos"));
  }, [id_clase]);

  const handleAlquiladosChange = (value) => {
    setAlquilados(value);
    if (value === 1 && clase) {
      // Buscar equipamiento relacionado con la actividad de la clase
      const equipamiento = equipamientos.find(
        (e) => e.id_actividad === clase.id_actividad
      );
      setIdEquipamiento(equipamiento ? equipamiento.id_equipamiento : null);
    } else {
      setIdEquipamiento(null); // Si no alquila, id_equipamiento será null
    }
  };

  const handleAgregarAlumno = () => {
    if (!ciAlumno) {
      setMessage("Debes seleccionar un alumno.");
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
        alquilado: alquilados, // Enviar 0 o 1
        id_equipamiento: idEquipamiento, // Enviar null si no se alquila
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
      {message && <p>{message}</p>}

      <div>
        <label>Seleccionar Alumno:</label>
        <select
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

      <div>
        <label>Alquilar Equipamiento:</label>
        <div>
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

      <button onClick={handleAgregarAlumno}>Agregar</button>
      <button onClick={() => navigate("/clases")}>Volver</button>
    </div>
  );
};

export default AgregarAlumnosAClase;
