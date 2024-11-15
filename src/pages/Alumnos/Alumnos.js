import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Alumno.css';
import AlumnoEditar from './AlumnoEditar';

const Alumnos = () => {
  const navigate = useNavigate();
  const [alumnos, setAlumnos] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/alumnos')
      .then((response) => response.json())
      .then((data) => setAlumnos(data))
      .catch((error) => {
        console.error('Error al cargar los alumnos:', error);
        setMessage('Error al cargar los alumnos');
      });
  }, []);

  const handleDelete = (ciAlumno) => {
    if (window.confirm('¿Estás seguro de eliminar este alumno?')) {
      fetch(`http://127.0.0.1:5000/api/alumnos/${ciAlumno}`, { method: 'DELETE' })
        .then(() => {
          setAlumnos(alumnos.filter((alumno) => alumno.ci_alumno !== ciAlumno));
          setMessage('Alumno eliminado exitosamente');
        })
        .catch((error) => {
          console.error('Error al eliminar el alumno:', error);
          setMessage('Error al eliminar el alumno');
        });
    }
  };

  return (
    <div className="alumnos-container">
      <h1 className="titulo">Gestión de Alumnos</h1>
      <div className="alumnos-buttons">
        <button className="agregar-btn" onClick={() => navigate('/alumnos/alta')}>
          Agregar Alumno
        </button>
        <button className="volver-btn" onClick={() => navigate('/')}>
          Volver
        </button>
      </div>
      {message && <p className="error-message">{message}</p>}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>CI</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Fecha de Nacimiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.length > 0 ? (
              alumnos.map((alumno) => (
                <tr key={alumno.ci_alumno}>
                  <td>{alumno.ci_alumno}</td>
                  <td>{alumno.nombre}</td>
                  <td>{alumno.apellido}</td>
                  <td>{alumno.fecha_nacimiento}</td>
                  <td className="table-actions">
                    <button
                      className="edit-btn"
                      onClick={() => setSelectedAlumno(alumno)}
                    >
                      Editar
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(alumno.ci_alumno)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No hay alumnos registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedAlumno && (
        <AlumnoEditar
          alumno={selectedAlumno}
          onClose={() => setSelectedAlumno(null)}
          onSave={(updatedAlumno) => {
            setAlumnos(
              alumnos.map((alumno) =>
                alumno.ci_alumno === updatedAlumno.ci_alumno ? updatedAlumno : alumno
              )
            );
            setSelectedAlumno(null);
            setMessage('Alumno actualizado exitosamente');
          }}
        />
      )}
    </div>
  );
};

export default Alumnos;
