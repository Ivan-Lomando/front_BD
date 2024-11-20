import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Alumno.css';
import TurnoEditar from './TurnoEditar';

const Turnos = () => {
  const navigate = useNavigate();
  const [turnos, setTurnos] = useState([]);
  const [selectedTurno, setSelectedTurno] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/turnos')
      .then((response) => response.json())
      .then((data) => setTurnos(data))
      .catch((error) => {
        console.error('Error al cargar los turnos:', error);
        setMessage('Error al cargar los turnos');
      });
  }, []);

  const handleDelete = (idTurno) => {
    if (window.confirm('¿Estás seguro de eliminar este turno?')) {
      fetch(`http://127.0.0.1:5000/api/turnos/${idTurno}`, { method: 'DELETE' })
        .then(() => {
          setTurnos(turnos.filter((turno) => turno.id_turno !== idTurno));
          setMessage('Turno eliminado exitosamente');
        })
        .catch((error) => {
          console.error('Error al eliminar el turno:', error);
          setMessage('Error al eliminar el turno');
        });
    }
  };

  return (
    <div className="alumnos-container">
      <h1 className="titulo">Gestión de Turnos</h1>
      <div className="alumnos-buttons">
        <button className="agregar-btn" onClick={() => navigate('/turnos/alta')}>
          Agregar Turno
        </button>
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
              <th>Hora Inicio</th>
              <th>Hora Fin</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {turnos.length > 0 ? (
              turnos.map((turno) => (
                <tr key={turno.id_turno}>
                  <td>{turno.id_turno}</td>
                  <td>{turno.hora_inicio}</td>
                  <td>{turno.hora_fin}</td>
                  <td className="table-actions">
                    <button
                      className="edit-btn"
                      onClick={() => setSelectedTurno(turno)}
                    >
                      Editar
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(turno.id_turno)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No hay turnos registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedTurno && (
        <TurnoEditar
          turno={selectedTurno}
          onClose={() => setSelectedTurno(null)}
          onSave={(updatedTurno) => {
            setTurnos(
              turnos.map((turno) =>
                turno.id_turno === updatedTurno.id_turno ? updatedTurno : turno
              )
            );
            setSelectedTurno(null);
            setMessage('Turno actualizado exitosamente');
          }}
        />
      )}
    </div>
  );
};

export default Turnos;
