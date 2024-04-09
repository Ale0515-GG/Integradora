import React from 'react'
import { useNavigate } from 'react-router-dom'; 
import './css/main.css'

const Notificaciones = () => {

      const navigate = useNavigate(); 

  const handleUsuarioClick = () => {
    navigate('/SubAdmi1');
  };

  const handleSedesClick = () => {
      navigate('/AgregarSede');
    };

  return (
    <div class="v60_3">
            <div class="v65_8"></div>
            <div class="v65_10"></div>
            <span class="v65_11">Chrono Magnament </span>
            <div class="v65_13"></div><span class="v65_14"></span>
            <div class="v65_16"></div>
            <div class="v65_17"></div>
            <div class="v65_18" onClick={handleSedesClick}></div>
            <div class="v65_24"></div>
            <div class="v136_3"></div>
            <div class="v65_36"></div>
            <div class="v65_22"></div>
            <div class="v65_21" onClick={handleUsuarioClick}></div>
            <span class="v65_19" onClick={handleSedesClick}>Sedes</span>
            <span class="v65_27" onClick={handleUsuarioClick}>Usuarios </span><span
                  class="v65_30">Vacaciones</span><span class="v139_8">Contrato</span><span
                  class="v65_41">Horario</span>
            <div class="v65_26"></div>
            <div class="v65_29"></div>
            <span class="v65_33"> Buenos días </span>
            <span class="v65_34">¿Tienes dudas? consulta con el dpto.RR.HH</span>
            
            <div class="v65_40"></div>
            
            <div class="v136_7"></div>
      </div>
  )
}

export default Notificaciones
