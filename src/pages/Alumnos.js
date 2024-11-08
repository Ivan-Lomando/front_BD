import React from 'react'
import { useNavigate } from 'react-router-dom'

const Alumnos = () => {
  const navigate = useNavigate()
  
    return (
   <div>
        <button className="dashboard-button" onClick={() => navigate('/alumnos/alta')}>Agregar Alumno</button>
        <button className="dashboard-button" onClick={() => navigate('/')}>Volver</button>
    </div>
  )
}

export default Alumnos