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
                <div>
                    <button className="dashboard-button" onClick={() => navigate('/alumnos')}>Alumnos</button>
                </div>
                <div>
                    <button className="dashboard-button" onClick={() => navigate('/instructores')}>Instructores</button>
                </div>
                <div>
                    <button className="dashboard-button" onClick={() => navigate('/turnos')}>Turnos</button>
                </div>  
                <div>
                    <button className="dashboard-button" onClick={() => navigate('/actividades')}>Actividades</button>
                </div>
                <div>
                    <button className="dashboard-button" onClick={() => navigate('/clases')}>Clases</button>
                </div>
            </div>
        </div>
    );
}
