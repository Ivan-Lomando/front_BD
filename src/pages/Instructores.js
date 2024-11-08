import React from 'react'
import { useNavigate } from 'react-router-dom'

const Instructores = () => {
  const navigate = useNavigate()
    return (
    <div>
        <button className="dashboard-button" onClick={() => navigate('/instructores/alta')}>Agregar Instructor</button>
        <button className="dashboard-button" onClick={() => navigate('/')}>Volver</button>
    </div>
  )
}

export default Instructores