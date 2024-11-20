import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Alumno.css'; // Utilizamos los mismos estilos de Alumno.css
import InstructorEditar from './InstructorEditar';

const Instructores = () => {
  const navigate = useNavigate();
  const [instructores, setInstructores] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/instructores')
      .then((response) => response.json())
      .then((data) => setInstructores(data))
      .catch((error) => {
        console.error('Error al cargar los instructores:', error);
        setMessage('Error al cargar los instructores');
      });
  }, []);

  const handleDelete = (ciInstructor) => {
    if (window.confirm('¿Estás seguro de eliminar este instructor?')) {
      fetch(`http://127.0.0.1:5000/api/instructores/${ciInstructor}`, {
        method: 'DELETE',
      })
        .then(() => {
          setInstructores(
            instructores.filter((instructor) => instructor.ci_instructor !== ciInstructor)
          );
          setMessage('Instructor eliminado exitosamente');
        })
        .catch((error) => {
          console.error('Error al eliminar el instructor:', error);
          setMessage('Error al eliminar el instructor');
        });
    }
  };

  return (
    <div className="alumnos-container">
      <h1 className="titulo">Gestión de Instructores</h1>
      <div className="alumnos-buttons">
        <button className="agregar-btn" onClick={() => navigate('/instructores/alta')}>
          Agregar Instructor
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
              <th>CI</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {instructores.length > 0 ? (
              instructores.map((instructor) => (
                <tr key={instructor.ci_instructor}>
                  <td>{instructor.ci_instructor}</td>
                  <td>{instructor.nombre}</td>
                  <td>{instructor.apellido}</td>
                  <td className="table-actions">
                    <button
                      className="edit-btn"
                      onClick={() => setSelectedInstructor(instructor)}
                    >
                      Editar
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(instructor.ci_instructor)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No hay instructores registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedInstructor && (
        <InstructorEditar
          instructor={selectedInstructor}
          onClose={() => setSelectedInstructor(null)}
          onSave={(updatedInstructor) => {
            setInstructores(
              instructores.map((instructor) =>
                instructor.ci_instructor === updatedInstructor.ci_instructor
                  ? updatedInstructor
                  : instructor
              )
            );
            setSelectedInstructor(null);
            setMessage('Instructor actualizado exitosamente');
          }}
        />
      )}
    </div>
  );
};

export default Instructores;

