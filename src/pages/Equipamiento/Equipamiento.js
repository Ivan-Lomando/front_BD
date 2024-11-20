import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Equipamiento.css';

const Equipamiento = () => {
  const navigate = useNavigate();
  const [equipamientos, setEquipamientos] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Cargar equipamientos al montar el componente
    fetch('http://127.0.0.1:5000/api/equipamiento')
      .then((response) => response.json())
      .then((data) => setEquipamientos(data))
      .catch((error) => {
        console.error('Error al cargar los equipamientos:', error);
        setMessage('Error al cargar los equipamientos');
      });
  }, []);

  return (
    <div className="equipamiento-container">
      <h1 className="titulo">Listado de Equipamiento</h1>
      <div className="equipamiento-buttons">
        <button className="volver-btn" onClick={() => navigate('/dashboard')}>
          Volver
        </button>
      </div>
      {message && <p className="error-message">{message}</p>}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Actividad</th>
              <th>Descripción</th>
              <th>Costo</th>
            </tr>
          </thead>
          <tbody>
            {equipamientos.length > 0 ? (
              equipamientos.map((equipamiento) => (
                <tr key={equipamiento.id_equipamiento}>
                  <td>{equipamiento.id_equipamiento}</td>
                  <td>{equipamiento.id_actividad}</td>
                  <td>{equipamiento.descripción}</td>
                  <td>{equipamiento.costo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No hay equipamientos registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Equipamiento;
