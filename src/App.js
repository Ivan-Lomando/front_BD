// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import InstructoresAlta from './pages/Instructores/InstructoresAlta';
import Instructores from './pages/Instructores/Instructores';
import TurnosAlta from './pages/Turnos/TurnosAlta';
import Turnos from './pages/Turnos/Turnos';
import Actividades from './pages/Actividades';
import AlumnosAlta from './pages/Alumnos/AlumnosAlta';
import Alumnos from './pages/Alumnos/Alumnos';
import Clases from './pages/Clases/Clases';
import AltaClases from './pages/Clases/AltaClases';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                
                {/* Rutas para Alta */}
                <Route path="/instructores/alta" element={<InstructoresAlta />} />
                <Route path="/turnos/alta" element={<TurnosAlta />} />
                <Route path="/alumnos/alta" element={<AlumnosAlta />} />
                <Route path="/clases/alta" element={<AltaClases />} />
                
                {/* Rutas para Ver */}
                <Route path="/instructores" element={<Instructores/>} />
                <Route path="/turnos" element={<Turnos />} />
                <Route path="/actividades" element={<Actividades/>} />
                <Route path="/clases" element={<Clases/>} />



                <Route path="/alumnos" element={<Alumnos/>} />
            </Routes>
        </Router>
    );
}

export default App;
