// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import InstructoresAlta from './pages/InstructoresAlta';
import Instructores from './pages/Instructores';
import TurnosAlta from './pages/TurnosAlta';
import Turnos from './pages/Turnos';
import Actividades from './pages/Actividades';
import AlumnosAlta from './pages/AlumnosAlta';
import Alumnos from './pages/Alumnos';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                
                {/* Rutas para Alta */}
                <Route path="/instructores/alta" element={<InstructoresAlta />} />
                <Route path="/turnos/alta" element={<TurnosAlta />} />
                <Route path="/alumnos/alta" element={<AlumnosAlta />} />
                
                {/* Rutas para Ver */}
                <Route path="/instructores" element={<Instructores/>} />
                <Route path="/turnos" element={<Turnos />} />
                <Route path="/actividades" element={<Actividades/>} />



                <Route path="/alumnos" element={<Alumnos/>} />
            </Routes>
        </Router>
    );
}

export default App;
