import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Horarios.css'; // Importa el archivo CSS

const Horarios = () => {
  const [empleados, setEmpleados] = useState([]);
  const [empleadosAceptados, setEmpleadosAceptados] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [idUsuarioSeleccionado, setIdUsuarioSeleccionado] = useState(null); // Agrega esta línea
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarSolicitudesPendientes();
  }, []);

  const cargarSolicitudesPendientes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/SolicitudesH/TraerSoli");
      if (response.status !== 200) {
        throw new Error('Error al obtener las solicitudes de horarios, hubo un problema en el servidor, favor de contactar a su administrador.');
      }
      const empleadosConTurno = response.data.map(empleado => ({
        ...empleado,
        horario: empleado.turno
      }));
      setEmpleados(empleadosConTurno);
    } catch (error) {
      console.error('Error al obtener las solicitudes de horarios:', error);
    }
  };
 
  const handleEliminar = async (id) => {
    const comentario = prompt("Justificación de Eliminación:");
    if (comentario !== null) {
      try {
        const response = await axios.delete(`http://localhost:3001/SolicitudesH/borrar/${id}`, {
          data: { comentario }
        });
        if (response.status === 200) {
          console.log(`Eliminando registro con ID: ${id}. Motivo: ${comentario}`);
          const nuevosEmpleados = empleados.filter(empleado => empleado.id !== id);
          setEmpleados(nuevosEmpleados);
          await cancelarSolicitud(id);
          alert('Solicitud eliminada correctamente');
        } else {
          throw new Error('Error al eliminar el registro, por favor inténtalo de nuevo.');
        }
      } catch (error) {
        console.error('Error al eliminar el registro:', error);
        alert('Error al eliminar el registro');
      }
    }
  };
  
  const cancelarSolicitud = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/SolicitudesH/borrar/${id}`);
      cargarSolicitudesPendientes();
    } catch (error) {
      console.error('Error al cancelar la solicitud:', error);
      alert('Error al cancelar la solicitud');
    }
  };
  
  const handleAceptar = async (id, comentario) => {
    try {
      const response = await axios.post(`http://localhost:3001/SolicitudesH/Aceptar/${id}`, { comentario });
      if (response.status === 200) {
        const empleado = empleados.find(emp => emp.id === id);
        if (empleado) {
          setEmpleadosAceptados([...empleadosAceptados, { ...empleado, fechaAceptacion: new Date().toISOString().slice(0, 10), comentario }]);
          handleEliminar(id);
          alert('Solicitud aceptada correctamente');
        }
      } else {
        throw new Error('Error al aceptar la solicitud, por favor inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al aceptar la solicitud:', error);
      alert('Error al aceptar la solicitud');
    }
  };

  const handleAgregarHorarios = (id, horaEntrada, horaSalida) => {
    const index = empleados.findIndex(empleado => empleado.id === id);
    if (index !== -1) {
      const nuevosEmpleados = [...empleados];
      nuevosEmpleados[index].horario = `${horaEntrada} - ${horaSalida}`;
      setEmpleados(nuevosEmpleados);
      alert(`Horarios agregados para el empleado: ${nuevosEmpleados[index].nombre}`);
    }
  };

  const handleGuardarCambios = () => {
    alert('Cambios guardados');
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
      <div className="menu">
        <div className="dropdown-container">
          {/* Menú desplegable */}
        </div>
      </div>
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
              <th>Horario Solicitado</th>
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