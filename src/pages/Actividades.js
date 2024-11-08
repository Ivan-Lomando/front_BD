import React from 'react'
import { useNavigate } from 'react-router-dom'

const Actividades = () => {
  const navigate = useNavigate()
    return (
    <div>
        <div>Actividades</div>
        <button className="dashboard-button" onClick={() => navigate('/')}>Volver</button>
    </div>
  )
}

export default Actividades