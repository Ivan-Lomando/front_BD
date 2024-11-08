// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import InstructoresAlta from './pages/InstructoresAlta';
import InstructoresVer from './pages/InstructoresVer';
import TurnosAlta from './pages/TurnosAlta';
import TurnosVer from './pages/TurnosVer';
import ActividadesAlta from './pages/ActividadesAlta';
import ActividadesVer from './pages/ActividadesVer';
import AlumnosAlta from './pages/AlumnosAlta';
import AlumnosVer from './pages/AlumnosVer';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                
                {/* Rutas para Alta */}
                <Route path="/instructores/alta" element={<InstructoresAlta />} />
                <Route path="/turnos/alta" element={<TurnosAlta />} />
                <Route path="/actividades/alta" element={<ActividadesAlta />} />
                <Route path="/alumnos/alta" element={<AlumnosAlta />} />
                
                {/* Rutas para Ver */}
                <Route path="/instructores/ver" element={<InstructoresVer />} />
                <Route path="/turnos/ver" element={<TurnosVer />} />
                <Route path="/actividades/ver" element={<ActividadesVer />} />
                <Route path="/alumnos/ver" element={<AlumnosVer />} />
            </Routes>
        </Router>
    );
}

export default App;
