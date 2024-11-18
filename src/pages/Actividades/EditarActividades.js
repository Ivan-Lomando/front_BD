import React, { useState } from 'react';
import '../../styles/Actividades.css';

const EditarActividades = ({ actividad, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...actividad });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.descripcion || !formData.costo) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    setLoading(true);
    fetch(`http://127.0.0.1:5000/api/actividades/${formData.id_actividad}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al actualizar la actividad');
        }
        return response.json();
      })
      .then(() => {
        onSave(formData);
        onClose();
      })
      .catch((error) => {
        console.error('Error al actualizar la actividad:', error);
        setError('Hubo un problema al guardar los cambios.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar Actividad</h2>
        {error && <p className="error-message">{error}</p>}
        <label>ID Actividad</label>
        <input
          type="text"
          name="id_actividad"
          value={formData.id_actividad}
          readOnly
        />
        <label>Descripción</label>
        <input
          type="text"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        />
        <label>Costo</label>
        <input
          type="number"
          name="costo"
          value={formData.costo}
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

export default EditarActividades;
