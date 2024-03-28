import React, { useState } from 'react';
import './Horarios.css';

const Horarios = () => {
  const [horarios,] = useState([
    { id: 1, 
      daysOff: 2, 
      shiftTime: 8, 
      shifts: ['7:00 - 15:00', '15:00 - 23:00', '23:00 - 7:00'] },
  ]);

  return (
    <div className="v281_00">
      <div className="v281_61"></div>
      <div className="v281_62"></div>
      <span className="v281_63">Chrono Magnament</span>
      <div className="v358_4"></div>
      <div className="v281_65"></div>
      <div className="v359_46"></div>
      <div className="v281_68"></div>
      <div className="v281_68"></div>
      <div className="v281_124"></div>
      <div className="v359_44"></div>
      <span className="v359_45">Guardar Cambios</span>
      <div className="v281_140"></div>
      <span className="v358_10">Sede</span>
      <span className="v358_11">Área</span>
      <span className="v358_12">Contrato</span>
      <span className="v281_143">Horario</span>
      {horarios.map((horario) => (
        <div key={horario.id}>
          <div>
            <span className="v358_15">Horario {horario.id}</span>
            {/* Moviendo el select aquí dentro */}
            <select className="v359_18">
              {horario.shifts.map((shift, index) => (
                <option key={index} value={shift}>
                  {shift}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Horarios;
