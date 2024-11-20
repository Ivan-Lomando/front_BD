// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import InstructoresAlta from './pages/Instructores/InstructoresAlta';
import Instructores from './pages/Instructores/Instructores';
import TurnosAlta from './pages/Turnos/TurnosAlta';
import Turnos from './pages/Turnos/Turnos';
import Actividades from './pages/Actividades/Actividades';
import AlumnosAlta from './pages/Alumnos/AlumnosAlta';
import Alumnos from './pages/Alumnos/Alumnos';
import Clases from './pages/Clases/Clases';
import AltaClases from './pages/Clases/AltaClases';
import AgregarAlumnosAClase from './pages/Alumnos/AgregarAlumnosAClase';
import Equipamiento from './pages/Equipamiento/Equipamiento';
import Consultas from './pages/Consultas/Consultas';
import Login from './pages/login/Login';
import Register from './pages/login/Register';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                
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
                <Route path='/equipamiento' element={<Equipamiento/>}/>
                <Route path='/consultas' element={<Consultas/>}/>



                <Route path="/alumnos" element={<Alumnos/>} />

                <Route path="/clases/:id_clase/alumnos" element={<AgregarAlumnosAClase />} />
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
