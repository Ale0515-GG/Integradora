import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    const nuevosEmpleados = empleados.filter(empleado => empleado.id !== id);
    setEmpleados(nuevosEmpleados);
    console.log(`Eliminando registro con ID: ${id}`);
  };

  const handleAceptar = (id) => {
    const empleadoAceptado = empleados.find(empleado => empleado.id === id);
    if (empleadoAceptado) {
      setEmpleadosAceptados([...empleadosAceptados, { ...empleadoAceptado, fechaAceptacion: new Date().toISOString().slice(0, 10) }]);
      handleEliminar(id); // Eliminar empleado de la lista principal
      console.log(`Aceptando cambios para el usuario con ID: ${id}`);
    }
  };

  const handleAgregarHorarios = (id, horaEntrada, horaSalida) => {
    const nuevosEmpleados = empleados.map(empleado => {
      if (empleado.id === id) {
        // Agregar el nuevo horario al empleado actual
        const nuevoHorario = `${horaEntrada} - ${horaSalida}`;
        return { ...empleado, horario: nuevoHorario };
      }
      return empleado;
    });
    setEmpleados(nuevosEmpleados);
    console.log(`Agregando horarios para el usuario con ID: ${id}`);
  };

  const handleModificarHorarios = (id) => {
    console.log(`Modificando horarios para el usuario con ID: ${id}`);
  };

  const handleGuardarCambios = () => {
    console.log('Cambios guardados');
  };

  const handleSubmitHorarioForm = (event) => {
    event.preventDefault();
    
    const horaEntrada = event.target.horaEntrada.value;
    const horaSalida = event.target.horaSalida.value;
    
    handleAgregarHorarios(idUsuarioSeleccionado, horaEntrada, horaSalida);
    setShowPopup(false); // Cerrar el formulario emergente después de enviar los datos
  };

  return (
    <div className="v281_0">
      <div className="v281_61">
        <p className="v281_63">ChronoMagnament</p>
      </div>
      
      <div className="v281_68">
        <h2>Gestión de Horarios/Contratos</h2>
        <table id="example">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nombre Empleado</th>
              <th>Área</th>
              <th>Sede</th>
              <th>Día</th>
              <th>Horarios Solicitados</th> {/* Nueva columna para mostrar horarios */}
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
                <td>{empleado.horario}</td> {/* Mostrar horario en la nueva columna */}
                <td><button className="eliminar" onClick={() => handleEliminar(empleado.id)}>Eliminar</button></td>
                <td><button className="aceptar" onClick={() => handleAceptar(empleado.id)}>Aceptar</button></td>
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

      {/* Formulario emergente para agregar horarios */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setShowPopup(false)}>&times;</span>
            <h2>Agregar Horario</h2>
            <form onSubmit={handleSubmitHorarioForm}>
              <label htmlFor="horaEntrada">Hora de Entrada:</label>
              <input type="time" id="horaEntrada" name="horaEntrada" required /><br/><br/>
              <label htmlFor="horaSalida">Hora de Salida:</label>
              <input type="time" id="horaSalida" name="horaSalida" required /><br/><br/>
              <button type="submit">Agregar</button>
            </form>
          </div>
        </div>
      )}

      {/* Tabla de empleados aceptados */}
      <div className="v281_0">
    
        <table id="empleadosAceptados" className="example">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nombre Empleado</th>
              <th>Área</th>
              <th>Sede</th>
              <th>Fecha de Aceptación</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Horarios;
