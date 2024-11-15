import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/Clases.css';
import ClaseEditar from './ClaseEditar';

const Clases = () => {
  const [clases, setClases] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedClase, setSelectedClase] = useState(null);  // Estado para manejar la clase seleccionada
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/clases")
      .then((response) => response.json())
      .then((data) => setClases(data))
      .catch((error) => {
        console.error("Error al cargar las clases:", error);
        setMessage("Error al cargar las clases");
      });
  }, []);

  const handleDelete = (idClase) => {
    if (window.confirm("¿Estás seguro de eliminar esta clase?")) {
      fetch(`http://127.0.0.1:5000/api/clases/${idClase}`, { method: "DELETE" })
        .then(() => {
          setClases(clases.filter((clase) => clase.id_clase !== idClase));
          setMessage("Clase eliminada exitosamente");
        })
        .catch((error) => {
          console.error("Error al eliminar la clase:", error);
          setMessage("Error al eliminar la clase");
        });
    }
  };

  const handleEdit = (clase) => {
    setSelectedClase(clase);  // Establecer la clase seleccionada
  };

  const handleCloseModal = () => {
    setSelectedClase(null);  // Cerrar el modal
  };

  const handleSaveClase = (updatedClase) => {
    setClases(clases.map((clase) =>
      clase.id_clase === updatedClase.id_clase ? updatedClase : clase
    ));
    setMessage('Clase actualizada exitosamente');
  };

  return (
    <div className="clases-container">
      <h1>Gestión de Clases</h1>
      <div className="clases-buttons">
        <button className="agregar-btn" onClick={() => navigate("/clases/alta")}>
          Agregar Clase
        </button>
        <button className="volver-btn" onClick={() => navigate("/")}>
          Volver
        </button>
      </div>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>ID Clase</th>
            <th>Instructor</th>
            <th>Actividad</th>
            <th>Turno</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clases.length > 0 ? (
            clases.map((clase) => (
              <tr key={clase.id_clase}>
                <td>{clase.id_clase}</td>
                <td>{clase.ci_instructor}</td>
                <td>{clase.id_actividad}</td>
                <td>{clase.id_turno}</td>
                <td>
                  <button onClick={() => handleEdit(clase)}>Editar</button>
                  <button onClick={() => handleDelete(clase.id_clase)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay clases registradas</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal para editar la clase */}
      {selectedClase && (
        <ClaseEditar
          clase={selectedClase}
          onSave={handleSaveClase}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Clases;