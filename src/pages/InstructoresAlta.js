// src/pages/InstructoresAlta.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/Login&SignUp.css';

const InstructoresAlta = () => {
    const [ciInstructor, setCiInstructor] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleAddInstructor = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5000/api/instructores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ci_instructor: ciInstructor,
                    nombre,
                    apellido
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Instructor registrado exitosamente');
                navigate('/ver-instructores'); // Cambia esta ruta según tu configuración
            } else {
                setMessage(data.message || 'Error en el registro');
            }
        } catch (error) {
            setMessage('Error en el servidor');
            console.error('Error en el registro:', error);
        }
    };

    return (
        <form className="form" onSubmit={handleAddInstructor}>
            <h1 className="titulo">Registro de Instructor</h1>

            <label className="Labels">CI Instructor</label>
            <input
                className="inputLandS"
                type="text"
                value={ciInstructor}
                onChange={(e) => setCiInstructor(e.target.value)}
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

            <div className="LoginButtonSection">
                <div className="group1">
                    <button className="LoginandSignUp-btn" type="submit">Registrar Instructor</button>
                </div>
            </div>

            {message && <p>{message}</p>}
        </form>
    );
};

export default InstructoresAlta;
