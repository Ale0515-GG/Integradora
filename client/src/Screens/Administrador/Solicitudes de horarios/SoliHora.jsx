import React, { useState } from 'react';
import axios from 'axios';
import './css/main.css'
const HorarioEmpleado = () => {
  // Estado para almacenar los horarios del empleado
  const [horarios, setHorarios] = useState([
    { dia: 'Lunes', horaInicio: '', horaFin: '' },
    { dia: 'Martes', horaInicio: '', horaFin: '' },
    { dia: 'Miércoles', horaInicio: '', horaFin: '' },
    { dia: 'Jueves', horaInicio: '', horaFin: '' },
    { dia: 'Viernes', horaInicio: '', horaFin: '' }
  ]);

  // Función para manejar cambios en las horas de inicio y fin
  const handleHoraChange = (index, campo, valor) => {
    const nuevosHorarios = [...horarios];
    nuevosHorarios[index][campo] = valor;
    setHorarios(nuevosHorarios);
  };

  // Función para manejar el clic en el botón guardar
  const handleGuardar = () => {
    // Aquí puedes enviar los horarios al servidor
    axios.post('/api/solicitudes', horarios)
      .then(response => {
        console.log('Horarios guardados:', response.data);
      })
      .catch(error => {
        console.error('Error al guardar los horarios:', error);
      });
  };

  // Opciones para los horarios disponibles
  const opcionesInicio = ['08:00', '09:00', '10:00'];
  const opcionesFin = ['16:00', '17:00', '18:00'];

  return (
    <div>
      <div className="rectangulo-imagenes">
        {/* Aquí van las imágenes */}
      </div>
      <div className="info-empleado">
        <div>
          <p>Area: [Área del empleado]</p>
          <p>Sede: [Sede del empleado]</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>Día</th>
              <th>Hora inicio</th>
              <th>Hora fin</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map((horario, index) => (
              <tr key={index}>
                <td>{horario.dia}</td>
                <td>
                  <select
                    value={horario.horaInicio}
                    onChange={(e) => handleHoraChange(index, 'horaInicio', e.target.value)}
                  >
                    {opcionesInicio.map((hora, i) => (
                      <option key={i} value={hora}>{hora}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={horario.horaFin}
                    onChange={(e) => handleHoraChange(index, 'horaFin', e.target.value)}
                  >
                    {opcionesFin.map((hora, i) => (
                      <option key={i} value={hora}>{hora}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleGuardar}>Guardar</button>
      </div>
    </div>
  );
};

export default HorarioEmpleado;
