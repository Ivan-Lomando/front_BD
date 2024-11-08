// src/pages/TurnosAlta.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/Login&SignUp.css';

const TurnosAlta = () => {
    const [idTurno, setIdTurno] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleAddTurno = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5000/api/turnos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_turno: idTurno,
                    hora_inicio: horaInicio,
                    hora_fin: horaFin
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Turno registrado exitosamente');
                navigate('/ver-turnos'); // Cambia esta ruta según tu configuración
            } else {
                setMessage(data.message || 'Error en el registro');
            }
        } catch (error) {
            setMessage('Error en el servidor');
            console.error('Error en el registro:', error);
        }
    };

    return (
        <form className="form" onSubmit={handleAddTurno}>
            <h1 className="titulo">Registro de Turno</h1>

            <label className="Labels">ID Turno</label>
            <input
                className="inputLandS"
                type="text"
                value={idTurno}
                onChange={(e) => setIdTurno(e.target.value)}
                required
            />

            <label className="Labels">Hora de Inicio</label>
            <input
                className="inputLandS"
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                required
            />

            <label className="Labels">Hora de Fin</label>
            <input
                className="inputLandS"
                type="time"
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
                required
            />

            <div className="LoginButtonSection">
                <div className="group1">
                    <button className="LoginandSignUp-btn" type="submit">Registrar Turno</button>
                </div>
            </div>

            {message && <p>{message}</p>}
        </form>
    );
};

export default TurnosAlta;
