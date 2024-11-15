import React, { useState } from 'react';
import '../../styles/Alumno.css'; // Utilizamos los mismos estilos de Alumno.css

const InstructorEditar = ({ instructor, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...instructor });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.nombre || !formData.apellido) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    setLoading(true);
    fetch(`http://127.0.0.1:5000/api/instructores/${formData.ci_instructor}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al actualizar el instructor');
        }
        return response.json();
      })
      .then(() => {
        onSave(formData);
        onClose();
      })
      .catch((error) => {
        console.error('Error al actualizar el instructor:', error);
        setError('Hubo un problema al guardar los cambios.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar Instructor</h2>
        {error && <p className="error-message">{error}</p>}
        <label>CI Instructor</label>
        <input
          type="text"
          name="ci_instructor"
          value={formData.ci_instructor}
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

export default InstructorEditar;
