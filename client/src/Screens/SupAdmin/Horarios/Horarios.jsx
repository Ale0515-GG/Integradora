import React, { useState } from 'react';
import './Horarios.css'; // Importa el archivo CSS

const Horarios = () => {
  const [empleados, setEmpleados] = useState([
    {
      id: 1,
      nombre: 'Andrea Palomares',
      area: 'Desarrollo de aplicaciones y programas',
      sede: 'Leon Gto',
      dia: '2011-04-25',
      horario: '08:00 - 16:00' 
    },
    {
      id: 2,
      nombre: 'Victor Barrientos',
      area: 'Diseño gráfico',
      sede: 'Ciudad de México',
      dia: '2012-05-15',
      horario: '09:00 - 17:00' 
    }
  ]);

  const [empleadosAceptados, setEmpleadosAceptados] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [idUsuarioSeleccionado, setIdUsuarioSeleccionado] = useState(null);

  const handleEliminar = (id) => {
    const comentario = prompt("Justificación de Eliminación:");
    if(comentario !== null) {
      console.log(`Eliminando registro con ID: ${id}. Motivo: ${comentario}`);
      const nuevosEmpleados = empleados.filter(empleado => empleado.id !== id);
      setEmpleados(nuevosEmpleados);
    }
  };

  const handleAceptar = (id, comentario) => {
    const empleadoAceptado = empleados.find(empleado => empleado.id === id);
    if (empleadoAceptado) {
      setEmpleadosAceptados([...empleadosAceptados, { ...empleadoAceptado, fechaAceptacion: new Date().toISOString().slice(0, 10), comentario }]);
      handleEliminar(id);
      console.log(`Aceptando cambios para el usuario con ID: ${id}`);
    }
  };

  const handleAgregarHorarios = (id, horaEntrada, horaSalida) => {
    const nuevosEmpleados = empleados.map(empleado => {
      if (empleado.id === id) {
        const nuevoHorario = `${horaEntrada} - ${horaSalida}`;
        return { ...empleado, horario: nuevoHorario };
      }
      return empleado;
    });
    setEmpleados(nuevosEmpleados);
    console.log(`Agregando horarios para el usuario con ID: ${id}`);
  };

  const handleGuardarCambios = () => {
    console.log('Cambios guardados');
  };

  const handleSubmitHorarioForm = (event) => {
    event.preventDefault();
    
    const horaEntrada = event.target.horaEntrada.value;
    const horaSalida = event.target.horaSalida.value;
    
    handleAgregarHorarios(idUsuarioSeleccionado, horaEntrada, horaSalida);
    setShowPopup(false);
  };

  return (
    <div className="v281_0">
      <div className="v281_61">
        <p className="v281_63">ChronoMagnament</p>
        <div className="v358_4"></div> {/* Aquí se mostrará la imagen */}
      </div>
      
      <div className="v281_68">
        <h2>Gestión de Horarios</h2>
        <table id="example">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nombre Empleado</th>
              <th>Área</th>
              <th>Sede</th>
              <th>Día</th>
              <th>Horarios Solicitados</th>
              <th>Eliminar</th>
              <th>Aceptar</th>
              <th>Agregar Horarios</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{empleado.nombre}</td>
                <td>{empleado.area}</td>
                <td>{empleado.sede}</td>
                <td>{empleado.dia}</td>
               

                <td>{empleado.horario}</td>
                <td><button className="eliminar" onClick={() => handleEliminar(empleado.id)}>Eliminar</button></td>
                <td><button className="aceptar" onClick={() => { 
                  const comentario = prompt("Justificación para la aceptación del horario:");
                  if(comentario !== null) {
                    handleAceptar(empleado.id, comentario);
                  }
                }}>Aceptar</button></td>
                <td><button className="agregar" onClick={() => { setShowPopup(true); setIdUsuarioSeleccionado(empleado.id); }}>Agregar Horarios</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="v359_1"
          onClick={handleGuardarCambios}
        >
          Guardar Cambios
        </button>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setShowPopup(false)}>&times;</span>
            <h2>Horario</h2>
            <form onSubmit={handleSubmitHorarioForm} className="horario-form">
              <div className="form-group">
                <label htmlFor="horaEntrada">Hora de Entrada:</label>
                <input type="time" id="horaEntrada" name="horaEntrada" required />
              </div>
              <div className="form-group">
                <label htmlFor="horaSalida">Hora de Salida:</label>
                <input type="time" id="horaSalida" name="horaSalida" required />
              </div>
              <div className="button-container">
                <button type="submit" className="btn btn-primary">Agregar</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowPopup(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="v281_0">
        <table id="empleadosAceptados" className="example">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nombre Empleado</th>
              <th>Área</th>
              <th>Sede</th>
              <th>Fecha de Aceptación</th>
              <th>Comentario</th>
            </tr>
          </thead>
          <tbody>
            {empleadosAceptados.map((empleado, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{empleado.nombre}</td>
                <td>{empleado.area}</td>
                <td>{empleado.sede}</td>
                <td>{empleado.fechaAceptacion}</td>
                <td>{empleado.comentario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Horarios;
