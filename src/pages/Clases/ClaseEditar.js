import React, { useState, useEffect } from "react";
import "../../styles/Clases.css";

const ClaseEditar = ({ clase, onSave, onClose }) => {
  const [idClase, setIdClase] = useState(clase.id_clase || "");
  const [ciInstructor, setCiInstructor] = useState(clase.ci_instructor || "");
  const [idActividad, setIdActividad] = useState(clase.id_actividad || "");
  const [idTurno, setIdTurno] = useState(clase.id_turno || "");
  const [dictada, setDictada] = useState(clase.dictada ? 1 : 0);
  const [grupal, setGrupal] = useState(clase.grupal ? 1 : 0);
  const [instructores, setInstructores] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
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

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/clases/${idClase}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_clase: idClase,
          ci_instructor: ciInstructor,
          id_actividad: idActividad,
          id_turno: idTurno,
          dictada: dictada,
          grupal: grupal,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Clase actualizada exitosamente");
        onSave({
          id_clase: idClase,
          ci_instructor: ciInstructor,
          id_actividad: idActividad,
          id_turno: idTurno,
          dictada: dictada,
          grupal: grupal,
        });
        onClose();
      } else {
        setMessage(data.message || "Error al actualizar la clase");
      }
    } catch (error) {
      setMessage("Error en el servidor");
      console.error("Error al actualizar la clase:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <form onSubmit={handleSave}>
          <h2>Editar Clase</h2>
          {message && <p className="error-message">{message}</p>}

          <label>Instructor:</label>
          <select
            value={ciInstructor}
            onChange={(e) => setCiInstructor(e.target.value)}
            required
          >
            {instructores.map((instructor) => (
              <option key={instructor.ci_instructor} value={instructor.ci_instructor}>
                {instructor.nombre} {instructor.apellido}
              </option>
            ))}
          </select>

          <label>Actividad:</label>
          <select
            value={idActividad}
            onChange={(e) => setIdActividad(e.target.value)}
            required
          >
            {actividades.map((actividad) => (
              <option key={actividad.id_actividad} value={actividad.id_actividad}>
                {actividad.descripcion}
              </option>
            ))}
          </select>

          <label>Turno:</label>
          <select
            value={idTurno}
            onChange={(e) => setIdTurno(e.target.value)}
            required
          >
            {turnos.map((turno) => (
              <option key={turno.id_turno} value={turno.id_turno}>
                {turno.hora_inicio} - {turno.hora_fin}
              </option>
            ))}
          </select>

          <label>Clase Dictada</label>
          <input
            type="checkbox"
            checked={dictada === 1}
            onChange={(e) => setDictada(e.target.checked ? 1 : 0)}
          />

          <label>Clase Grupal</label>
          <input
            type="checkbox"
            checked={grupal === 1}
            onChange={(e) => setGrupal(e.target.checked ? 1 : 0)}
          />

          <div className="modal-buttons">
            <button className="save-btn" type="submit">
              Guardar
            </button>
            <button className="cancel-btn" type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClaseEditar;

