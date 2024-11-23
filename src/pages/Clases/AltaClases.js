import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Clases.css";

const AltaClases = () => {
  const [idClase, setIdClase] = useState('');
  const [ciInstructor, setCiInstructor] = useState('');
  const [idActividad, setIdActividad] = useState('');
  const [idTurno, setIdTurno] = useState('');
  const [dictada, setDictada] = useState(false);
  const [grupal, setGrupal] = useState(false);
  const [instructores, setInstructores] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar instructores, actividades y turnos
    Promise.all([
      fetch("http://127.0.0.1:5000/api/instructores").then((res) => res.json()),
      fetch("http://127.0.0.1:5000/api/actividades").then((res) => res.json()),
      fetch("http://127.0.0.1:5000/api/turnos").then((res) => res.json()),
    ])
      .then(([instructoresData, actividadesData, turnosData]) => {
        setInstructores(instructoresData);
        setActividades(actividadesData);
        setTurnos(turnosData);
      })
      .catch(() => {
        setMessage("Error al cargar los datos.");
      });
  }, []);

  const handleAddClase = async (e) => {
    e.preventDefault();
    setMessage(""); // Limpiar mensajes previos

    try {
      const response = await fetch('http://127.0.0.1:5000/api/clases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_clase: idClase,
          ci_instructor: ciInstructor,
          id_actividad: idActividad,
          id_turno: idTurno,
          dictada: dictada ? 1 : 0, // Convertir a 0 o 1
          grupal: grupal ? 1 : 0,   // Convertir a 0 o 1
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Clase registrada exitosamente');
        navigate('/clases'); // Redirigir a la lista de clases
      } else {
        setMessage(data.message || 'Error en el registro'); // Mostrar el mensaje de error del backend
      }
    } catch (error) {
      setMessage('Error en el servidor');
      console.error('Error al registrar la clase:', error);
    }
  };

  return (
    <form onSubmit={handleAddClase} className="form">
      <h1>Registrar Clase</h1>

      <label>ID Clase</label>
      <input
        type="text"
        value={idClase}
        onChange={(e) => setIdClase(e.target.value)}
        required
      />

      <label>CI Instructor</label>
      <select
        value={ciInstructor}
        onChange={(e) => setCiInstructor(e.target.value)}
        required
      >
        <option value="">Seleccionar instructor</option>
        {instructores.map((instructor) => (
          <option key={instructor.ci_instructor} value={instructor.ci_instructor}>
            {instructor.nombre} {instructor.apellido}
          </option>
        ))}
      </select>

      <label>ID Actividad</label>
      <select
        value={idActividad}
        onChange={(e) => setIdActividad(e.target.value)}
        required
      >
        <option value="">Seleccionar actividad</option>
        {actividades.map((actividad) => (
          <option key={actividad.id_actividad} value={actividad.id_actividad}>
            {actividad.descripcion}
          </option>
        ))}
      </select>

      <label>ID Turno</label>
      <select
        value={idTurno}
        onChange={(e) => setIdTurno(e.target.value)}
        required
      >
        <option value="">Seleccionar turno</option>
        {turnos.map((turno) => (
          <option key={turno.id_turno} value={turno.id_turno}>
            {turno.hora_inicio} - {turno.hora_fin}
          </option>
        ))}
      </select>

      <label>Clase Dictada</label>
      <input
        type="checkbox"
        checked={dictada}
        onChange={(e) => setDictada(e.target.checked)}
      />

      <label>Clase Grupal</label>
      <input
        type="checkbox"
        checked={grupal}
        onChange={(e) => setGrupal(e.target.checked)}
      />

      <button type="submit">Registrar Clase</button>
      {message && <p className="error-message">{message}</p>}
    </form>
  );
};

export default AltaClases;

