import React from 'react';
import './Horarios.css';

const Horarios = () => {
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
      <div className="v281_68"></div>
      <div className="v281_68"></div>
      <div className="v281_124">
        {/* Campos eliminados */}
      </div>

      {/* Tabla */}
      <table
        id="example"
        className="display nowrap"
        style={{
          width: '50%',
          textAlign: 'center',
          position: 'absolute',
          top: '400px',
          left: '50%', // Centrado horizontal
          transform: 'translateX(-50%)', // Centrado horizontal
        }}
      >
        <thead>
          <tr>
            <th>No.</th>
            <th>Nombre Empleado</th>
            <th>Área</th>
            <th>Sede</th>
            <th>Día</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Andrea Palomares</td>
            <td>Desarrollo de aplicaciones y programas</td>
            <td>Leon Gto</td>
            <td>2011-04-25</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Kim Taehyung</td>
            <td>Desarrollo de apps para dispositivos móviles</td>
            <td>Leon Gto</td>
            <td>2011-07-25</td>
          </tr>
        </tbody>
      </table>

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
};

export default Horarios;
