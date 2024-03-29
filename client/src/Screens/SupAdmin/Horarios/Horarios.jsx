import React, { useState } from 'react';
import './Horarios.css';

const Horarios = () => {
  const [horarios] = useState([
    { id: 1, 
      daysOff: 2, 
      shiftTime: 8, 
      shifts: ['7:00 - 15:00', '15:00 - 23:00', '23:00 - 7:00'] },
    { id: 2, 
      daysOff: 16, 
      shifts: ['7:00 – 7:00', '19:00 – 19:00'] },
    { id: 3, 
      daysOff: 24, 
      shifts: ['6:00 – 12:00', '12:00 – 18:00', '18:00 - 23:59', '0:00 – 6:00'] }
  ]);

  const [area, setArea] = useState('');
  const [sede, setSede] = useState('');
  const [contrato, setContrato] = useState('');

  const handleGuardarCambios = () => {
    // Aquí puedes agregar la lógica para guardar los cambios
    console.log('Cambios guardados');
  };

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
      <div className="v281_124">
        <div className="input-container" style={{ marginTop: '30px' }}>
          <input
            type="text"
            placeholder="Sede"
            value={sede}
            onChange={(e) => setSede(e.target.value)}
            style={{ marginLeft: '68%', textAlign: 'center', width: '300px' }}
          />
        </div>
        <div className="input-container" style={{ marginTop: '30px' }}>
          <input
            type="text"
            placeholder="Área"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            style={{ marginLeft: '68%', textAlign: 'center', width: '300px' }}
          />
        </div>
        <div className="input-container" style={{ marginTop: '30px' }}>
          <input
            type="text"
            placeholder="Contrato"
            value={contrato}
            onChange={(e) => setContrato(e.target.value)}
            style={{ marginLeft: '68%', textAlign: 'center', width: '300px' }}
          />
        </div>
      </div>

      <div className="v281_140"></div>
      <span className="v281_143">Horario</span>

      {/* Selectores de horarios */}
      {horarios.map((horario, index) => (
        <div className="shift-selector-container" key={index} style={{ top: `${500 + index * 150}px`, left: '18%' }}>
          <select className="v359_18">
            {horario.shifts.map((shift, idx) => (
              <option key={idx} value={shift}>
                {shift}
              </option>
            ))}
          </select>
        </div>
      ))}

      {/* Botón para guardar cambios */}
      <button 
        className="v359_18" 
        style={{ 
          position: 'absolute', 
          top: '800px', // Posicionamos en el 90% del eje Y
          left: '70%', // Posicionamos en el 50% del eje X
          transform: 'translate(-50%, -0%)', // Centramos el botón correctamente
          background: 'rgba(57,126,171,1)',
          color: 'rgba(255,255,255,1)',
          padding: '5px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }} 
        onClick={handleGuardarCambios}
      >
        Guardar Cambios
      </button>
    </div>
  );
}

export default Horarios;
