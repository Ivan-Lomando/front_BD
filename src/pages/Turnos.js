import React from 'react'
import { useNavigate } from 'react-router-dom'

const Turnos = () => {
  const navigate = useNavigate()
    return (
        
        <div>
            <button className="dashboard-button" onClick={() => navigate('/turnos/alta')}>Agregar Turno</button>
            <button className="dashboard-button" onClick={() => navigate('/')}>Volver</button>
        </div>
  )
}

export default Turnos