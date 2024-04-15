import React from 'react'
import { useNavigate } from 'react-router-dom'; 
import "./NavegacionEmpleado.css";

const Notificaciones = ({ nombreempleado }) => {

      const navigate = useNavigate(); 


  const handleHorarioClick = () => {
      navigate('/Horarios');
    };
  const handleVacacionesClick = () => {
      navigate('/Vaciones');
    };

    const handleDiagraClick = () => {
      navigate('/Diagrama');
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
            <div class="v136_3"></div> 
            <div class="v65_36"></div>
  
            <span class="v65_30" onClick={handleVacacionesClick}>Vacaciones</span>
            <span class="v65_41" onClick={handleHorarioClick}>Horario</span>
            <span class="v65_3" onClick={handleDiagraClick}>Diagrama</span>
            <span class="v65_36" onClick={handleSedesClick}>Sedes</span>
          
            <span class="v65_33"> Buenos días, {nombreempleado}</span>
            <span class="v65_34">¿Tienes dudas? consulta con el dpto.RR.HH</span>
            
       
      </div>
  )
}

export default Notificaciones
