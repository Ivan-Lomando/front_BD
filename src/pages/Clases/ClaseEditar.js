import React, { useState, useEffect } from "react";
import '../../styles/Clases.css';

const ClaseEditar = ({ clase, onSave, onClose }) => {
  const [formData, setFormData] = useState({ ...clase });
  const [instructores, setInstructores] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setFormData({ ...clase });

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
      .catch((error) => {
        setMessage("Error al cargar los datos.");
      });
  }, [clase]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = () => {
    fetch(`http://127.0.0.1:5000/api/clases/${formData.id_clase}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al actualizar la clase");
        }
        return response.json();
      })
      .then(() => {
        setMessage("Clase actualizada exitosamente");
        onSave(formData);  // Actualiza la lista de clases
        onClose();  // Cierra el modal
      })
      .catch(error => {
        setMessage("Error al actualizar la clase");
        console.error(error);
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar Clase</h2>
        {message && <p>{message}</p>}
        
        {/* Select para los instructores */}
        <label>Instructor:</label>
        <select
          name="ci_instructor"
          value={formData.ci_instructor}
          onChange={handleChange}
        >
          {instructores.map((instructor) => (
            <option key={instructor.ci_instructor} value={instructor.ci_instructor}>
              {instructor.nombre} {instructor.apellido}
            </option>
          ))}
        </select>

        {/* Select para las actividades */}
        <label>Actividad:</label>
        <select
          name="id_actividad"
          value={formData.id_actividad}
          onChange={handleChange}
        >
          {actividades.map((actividad) => (
            <option key={actividad.id_actividad} value={actividad.id_actividad}>
              {actividad.descripcion}
            </option>
          ))}
        </select>

        {/* Select para los turnos */}
        <label>Turno:</label>
        <select
          name="id_turno"
          value={formData.id_turno}
          onChange={handleChange}
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
          name="dictada"
          checked={formData.dictada}
          onChange={() => setFormData(prevData => ({ ...prevData, dictada: !prevData.dictada }))}
        />

        <label>Clase Grupal</label>
        <input
          type="checkbox"
          name="grupal"
          checked={formData.grupal}
          onChange={() => setFormData(prevData => ({ ...prevData, grupal: !prevData.grupal }))}
        />

        <div className="modal-buttons">
          <button onClick={handleSave}>Guardar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ClaseEditar;
