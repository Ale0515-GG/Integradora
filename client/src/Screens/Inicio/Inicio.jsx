import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../Inicio/Inicio.css';

const Inicio = () => {
  const navigate = useNavigate(); 

  const handleLoginClick = () => {
    navigate('/IngreSuAd');
  };

  return (
    <div className="v130_66">
      <div className="v130_67">
        <div className="v130_75"></div>
        <div className="v130_71" onClick={handleLoginClick}>Inicia Sesión</div>
      </div>
      <div className="v130_76">
        <div className="v130_77"></div>
        <span className="v130_78">Nuestro objetivo principal es facilitar la gestión temporal y la administración eficiente de horarios de empleados. Buscamos optimizar los procesos administrativos relacionados con el registro de empleados y la asignación de horarios, así permitiendo una coordinación suave y eficaz de tareas y responsabilidades laborales.</span>
      </div>
    </div>
  );
};

export default Inicio;
