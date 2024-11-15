import React, { useState } from 'react';
import '../../styles/Alumno.css';

const AlumnoEditar = ({ alumno, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...alumno });
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [error, setError] = useState(''); // Mensaje de error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.nombre || !formData.apellido || !formData.fecha_nacimiento) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    setLoading(true);
    fetch(`http://127.0.0.1:5000/api/alumnos/${formData.ci_alumno}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al actualizar el alumno');
        }
        return response.json();
      })
      .then(() => {
        onSave(formData); // Actualizar la lista de alumnos
        onClose(); // Cerrar el modal solo si es exitoso
      })
      .catch((error) => {
        console.error("Error al actualizar el alumno:", error);
        setError('Hubo un problema al guardar los cambios.');
      })
      .finally(() => {
        setLoading(false); // Terminar carga
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar Alumno</h2>
        {error && <p className="error-message">{error}</p>}
        <label>CI Alumno</label>
        <input
          type="text"
          name="ci_alumno"
          value={formData.ci_alumno}
          readOnly
        />
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        <label>Apellido</label>
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
        />
        <label>Fecha de Nacimiento</label>
        <input
          type="date"
          name="fecha_nacimiento"
          value={formData.fecha_nacimiento}
          onChange={handleChange}
        />
        <div className="modal-buttons">
          <button onClick={handleSave} disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
          <button onClick={onClose} disabled={loading}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlumnoEditar;
