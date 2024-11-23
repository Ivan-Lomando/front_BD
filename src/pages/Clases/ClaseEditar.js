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
    // Cargar los datos iniciales para los selectores
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
    setMessage(""); // Limpiar mensajes previos

    try {
      // 1. Cambiar el instructor
      if (ciInstructor !== clase.ci_instructor) {
        const instructorResponse = await fetch(`http://127.0.0.1:5000/api/clases/${idClase}/instructor`,    
          { 
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ci_instructor: ciInstructor }),
          });

        if (!instructorResponse.ok) {
          const errorData = await instructorResponse.json();
          throw new Error(errorData.error || "Error al cambiar el instructor.");
        }
      }

      // 2. Cambiar la actividad
      if (idActividad !== clase.id_actividad) {
        const actividadResponse = await fetch(`http://127.0.0.1:5000/api/clases/${idClase}/actividad`, 
          {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_actividad: idActividad }),
        });

        if (!actividadResponse.ok) {
          const errorData = await actividadResponse.json();
          throw new Error(errorData.error || "Error al cambiar la actividad.");
        }
      }

      // 3. Cambiar el turno
      if (idTurno !== clase.id_turno) {
        const turnoResponse = await fetch(`http://127.0.0.1:5000/api/clases/${idClase}/turno/${idTurno}`, 
          {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!turnoResponse.ok) {
          const errorData = await turnoResponse.json();
          throw new Error(errorData.error || "Error al cambiar el turno.");
        }
      }

      // 4. Cambiar el tipo de clase (grupal o individual)
      if (grupal !== (clase.grupal ? 1 : 0)) {
        const tipoResponse = await fetch(`http://127.0.0.1:5000/api/clases/${idClase}/tipo`, 
          {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ grupal: grupal === 1 }),
        });

        if (!tipoResponse.ok) {
          const errorData = await tipoResponse.json();
          throw new Error(errorData.error || "Error al cambiar el tipo de clase.");
        }
      }

      // 5. Cambiar el estado de la clase (dictada o no)
      if (dictada !== (clase.dictada ? 1 : 0)) {
        const estadoResponse = await fetch(`http://127.0.0.1:5000/api/clases/${idClase}/estado`, 
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dictada: dictada === 1 }),
        });

        if (!estadoResponse.ok) {
          const errorData = await estadoResponse.json();
          throw new Error(errorData.error || "Error al cambiar el estado de la clase.");
        }
      }

      // Si todos los fetch son exitosos
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
    } catch (error) {
      setMessage(error.message);
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



