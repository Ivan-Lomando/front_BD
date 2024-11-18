import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Actividades.css';
import EditarActividades from './EditarActividades';

const Actividades = () => {
  const navigate = useNavigate();
  const [actividades, setActividades] = useState([]);
  const [selectedActividad, setSelectedActividad] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Cargar actividades al montar el componente
    fetch('http://127.0.0.1:5000/api/actividades')
      .then((response) => response.json())
      .then((data) => setActividades(data))
      .catch((error) => {
        console.error('Error al cargar las actividades:', error);
        setMessage('Error al cargar las actividades');
      });
  }, []);

  const handleSave = (updatedActividad) => {
    setActividades(
      actividades.map((actividad) =>
        actividad.id_actividad === updatedActividad.id_actividad
          ? updatedActividad
          : actividad
      )
    );
    setSelectedActividad(null);
    setMessage('Actividad actualizada exitosamente.');
  };

  return (
    <div className="actividades-container">
      <h1 className="titulo">Gestión de Actividades</h1>
      <div className="actividades-buttons">
        <button className="volver-btn" onClick={() => navigate('/')}>
          Volver
        </button>
      </div>
      {message && <p className="error-message">{message}</p>}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Costo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {actividades.length > 0 ? (
              actividades.map((actividad) => (
                <tr key={actividad.id_actividad}>
                  <td>{actividad.id_actividad}</td>
                  <td>{actividad.descripcion}</td>
                  <td>{actividad.costo}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => setSelectedActividad(actividad)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No hay actividades registradas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedActividad && (
        <EditarActividades
          actividad={selectedActividad}
          onClose={() => setSelectedActividad(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Actividades;
