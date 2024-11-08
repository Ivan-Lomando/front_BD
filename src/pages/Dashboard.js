// src/pages/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="dashboard">
            <h1>Administración de la Escuela de Deportes</h1>
            <div className="button-container">
                {/* Botones para ABM */}
                <button className="dashboard-button" onClick={() => navigate('/instructores/alta')}>Agregar Instructor</button>
                <button className="dashboard-button" onClick={() => navigate('/turnos/alta')}>Agregar Turno</button>
                <button className="dashboard-button" onClick={() => navigate('/alumnos/alta')}>Agregar Alumno</button>

                {/* Botones para Ver */}
                <button className="dashboard-button" onClick={() => navigate('/instructores/ver')}>Ver Instructores</button>
                <button className="dashboard-button" onClick={() => navigate('/turnos/ver')}>Ver Turnos</button>
                <button className="dashboard-button" onClick={() => navigate('/actividades/ver')}>Ver Actividades</button>
                <button className="dashboard-button" onClick={() => navigate('/alumnos/ver')}>Ver Alumnos</button>
            </div>
        </div>
    );
}
