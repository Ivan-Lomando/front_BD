import React, { useState } from 'react';
import '../../styles/Alumno.css';

const TurnoEditar = ({ turno, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...turno });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.hora_inicio || !formData.hora_fin) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    setLoading(true);
    fetch(`http://127.0.0.1:5000/api/turnos/${formData.id_turno}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al actualizar el turno');
        }
        return response.json();
      })
      .then(() => {
        onSave(formData);
        onClose();
      })
      .catch((error) => {
        console.error('Error al actualizar el turno:', error);
        setError('Hubo un problema al guardar los cambios.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar Turno</h2>
        {error && <p className="error-message">{error}</p>}
        <label>ID</label>
        <input type="text" name="id_turno" value={formData.id_turno} readOnly />
        <label>Hora Inicio</label>
        <input
          type="time"
          name="hora_inicio"
          value={formData.hora_inicio}
          onChange={handleChange}
        />
        <label>Hora Fin</label>
        <input
          type="time"
          name="hora_fin"
          value={formData.hora_fin}
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

export default TurnoEditar;
