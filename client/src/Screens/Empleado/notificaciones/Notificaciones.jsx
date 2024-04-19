import React from 'react'
import { useNavigate } from 'react-router-dom'; 
import './css/main.css'

const Notificaciones = ({ nombreempleado }) => {

      const navigate = useNavigate(); 



  const handleUsuarioClick = () => {
    navigate('/SubAdmi1');
  };

  const handleSedesClick = () => {
      navigate('/AgregarSede');
    };
  const handleHorarioClick = () => {
      navigate('/SolicitudesH');
    };
  const handleVacacionesClick = () => {
      navigate('/Vacaciones');
    };
  const handleContratosClick = () => {
      navigate('/Contratos');
    };
    const handleGanttClick = () => {
      navigate('/Activiti');
    };

  return (
    <div class="v60_3">
            <div class="v65_8"></div>
            <div clas= "logo" img="./Empleado/notificaciones/images/logo.png"></div>
            <span class="v65_11">Chrono Magnament </span>
            <div class="v65_13"></div><span class="v65_14"></span>
           
            <div class="v65_17"></div>
            <div class="sedes-click" onClick={handleSedesClick}></div>
            <div class="usuario-click" onClick={handleUsuarioClick}></div>
            <span class="sedes2" onClick={handleSedesClick}>Sedes</span>
            <span class="usuario2" onClick={handleUsuarioClick}>Usuarios </span>
            <span class="vacaciones-click" onClick={handleVacacionesClick}>Vacaciones</span>
            <span class="contratos-click" onClick={handleContratosClick}>Contrato</span>
            <span class="horarios2" onClick={handleHorarioClick}>Horario</span>
            <span class="gantt-click" onClick={handleGanttClick}>Actividades</span>
            <div class="gantt2"></div> 
            <div class="v65_26"></div>
            <div class="v65_29"></div>
            <span class="v65_33"> Buenos días, {nombreempleado}</span>
            <span class="v65_34">¿Tienes dudas? consulta con el dpto.RR.HH</span>
            
            <div class="v65_40"></div>
            
            <div class="v136_7"></div>
      </div>
  )
}

export default Notificaciones
