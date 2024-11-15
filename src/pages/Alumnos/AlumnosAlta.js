import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../styles/Login&SignUp.css';

const AlumnosAlta = () => {
    const [ciAlumno, setCiAlumno] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Función para manejar el registro de un nuevo alumno
    const handleAddAlumno = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5000/api/alumnos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    ci_alumno: ciAlumno,
                    nombre,
                    apellido,
                    fecha_nacimiento: fechaNacimiento 
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Alumno registrado exitosamente');
                navigate('/'); // Redirigir a la página para ver todos los alumnos
            } else {
                setMessage(data.message || 'Error en el registro');
            }
        } catch (error) {
            setMessage('Error en el servidor');
            console.error('Error en el registro:', error);
        }
    };

    return (
        <form className="form" onSubmit={handleAddAlumno}>
            <h1 className="titulo">Registro de Alumno</h1>

            <label className="Labels">CI Alumno</label>
            <input
                className="inputLandS"
                type="text"
                value={ciAlumno}
                onChange={(e) => setCiAlumno(e.target.value)}
                required
            />

            <label className="Labels">Nombre</label>
            <input
                className="inputLandS"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
            />

            <label className="Labels">Apellido</label>
            <input
                className="inputLandS"
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
            />

            <label className="Labels">Fecha de Nacimiento</label>
            <input
                className="inputLandS"
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                required
            />

            <div className="LoginButtonSection">
                <div className="group1">
                    <button className="LoginandSignUp-btn" type="submit">Registrar Alumno</button>
                </div>
            </div>

            {message && <p>{message}</p>}
        </form>
    );
}

export default AlumnosAlta;
