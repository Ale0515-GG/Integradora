import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./mainEV.css"; // Importa tu archivo CSS de estilos
import { Link } from "react-router-dom";

const SolicitudesVacacionesVista = () => {
  const [fechasSeleccionadas, setFechasSeleccionadas] = useState([]);
  const [error, setError] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false); 
  const [historialSolicitudes, setHistorialSolicitudes] = useState([]);
  const [empleado, setEmpleado] = useState(null);
  const [mostrarModificar, setMostrarModificar] = useState(false); 
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
  const [fechaIni, setFechaIni] = useState(null);
  const [fechaTer, setFechaTer] = useState(null);

  const handleDateChange = (date) => {
    setFechasSeleccionadas(date);
  };

  const guardarSolicitud = async () => {
    try {
      const fechasTexto = fechasSeleccionadas.map((date) =>
        date.toISOString().split("T")[0]
      );

      await Axios.post("http://localhost:3001/solicitudVacaciones/create", {
        fechas: fechasTexto,
      });

      setError("");
      obtenerHistorialSolicitudes(); 
      setMostrarFormulario(false); 
      setFechasSeleccionadas([]); 
    } catch (error) {
      console.error("Error al solicitar las vacaciones:", error.message);
      setError("Error al solicitar las vacaciones");
    }
  };
  
  const obtenerHistorialSolicitudes = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/solicitudVacaciones");
      setHistorialSolicitudes(response.data.data); 
    } catch (error) {
      console.error('Error al obtener el historial de solicitudes:', error.message);
    }
  };

  useEffect(() => {
    obtenerHistorialSolicitudes();
    const empleadoSimulado = {
      nombreempleado: 'Alejandra',
      sede: 'UTNG',
      area: 'RH'
    };
    setEmpleado(empleadoSimulado);
  }, []);


  const solicitarVacaciones = () => {
    setMostrarFormulario(true);
    setFechasSeleccionadas([]);
    setMostrarModificar(false); 
  };

  const modificarSolicitud = async () => {
    try {
      console.log("Fecha de inicio seleccionada:", fechaIni);
      console.log("Fecha de fin seleccionada:", fechaTer);
      console.log("Solicitud seleccionada:", solicitudSeleccionada);

      if (solicitudSeleccionada) {
        const id = solicitudSeleccionada._id;
        const fechasTexto = [fechaIni.toISOString().split("T")[0], fechaTer.toISOString().split("T")[0]];
  
        await Axios.put(
          `http://localhost:3001/solicitudVacaciones/update/${id}`,
          { fechas: fechasTexto }
        );
  
        setError("");
        await obtenerHistorialSolicitudes(); // Esperar a que se complete la actualización antes de obtener el historial
        setMostrarFormulario(false); 
        setFechasSeleccionadas([]); 
        setMostrarModificar(false); 
      }
    } catch (error) {
      console.error("Error al modificar la solicitud:", error.message);
      setError("Error al modificar la solicitud");
    }
  };
  
  const seleccionarSolicitud = (solicitud) => {
    setSolicitudSeleccionada(solicitud); 
    setFechaIni(new Date(solicitud.fechaIni)); 
    setFechaTer(new Date(solicitud.fechaTer)); 
    setMostrarModificar(true); 
  };
  
  const eliminarSolicitud = async (solicitudId) => {
    try {
      await Axios.delete(`http://localhost:3001/solicitudVacaciones/delete/${solicitudId}`);
      setError('');
      obtenerHistorialSolicitudes();
    } catch (error) {
      console.error('Error al eliminar la solicitud:', error.message);
      setError('Error al eliminar la solicitud');
    }
  };

  return (
    <div className="solicitudes-container">
      <div className="solicitudes-header">
      <div className="logo-container">
        <div className="logo"></div></div>
        <Link to="/" className="regresar"></Link>
        <h1 className="solicitudes-title">Solicitud de Vacaciones</h1>
      </div>

      {empleado && (
        <div className="empleado-info">
          <h2>Datos del Empleado</h2>
          <p><strong>Nombre:</strong> {empleado.nombreempleado}</p>
          <p><strong>Sede:</strong> {empleado.sede}</p>
          <p><strong>Área:</strong> {empleado.area}</p>
        </div>
      )}

      <div className="boton-container">
        <button className="solicitud-boton" onClick={solicitarVacaciones}>Solicitar vacaciones</button>
      </div>

      {mostrarFormulario && (
        <div className="solicitud-formulario">
          <Calendar onChange={handleDateChange} value={fechasSeleccionadas} selectRange />
          <div className="boton-container">
            <button className="solicitud-boton" onClick={guardarSolicitud}>Guardar</button>
          </div>
        </div>
      )}

      {mostrarModificar && (
        <div className="modificar-formulario">
          <h2>Modificar Solicitud</h2>
          <label>Fecha de Inicio:</label>
          <Calendar onChange={setFechaIni} value={fechaIni} />
          <label>Fecha de Fin:</label>
          <Calendar onChange={setFechaTer} value={fechaTer} />
          <div className="boton-container">
            <button className="solicitud-boton" onClick={modificarSolicitud}>Modificar</button>
          </div>
        </div>
      )}

      {historialSolicitudes.length > 0 && (
        <div className="historial-container">
          <h2>Historial de Solicitudes</h2>
          <table className="solicitudes-table">
            <thead>
              <tr>
                <th>Empleado</th>
                <th>Sede</th>
                <th>Área</th>
                <th>Fecha inicio</th>
                <th>Fecha término</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {historialSolicitudes.map((solicitud) => (
                <tr key={solicitud._id}>
                  <td>{solicitud.nombreempleado}</td>
                  <td>{solicitud.sede}</td>
                  <td>{solicitud.area}</td>
                  <td>{solicitud.fechaIni}</td>
                  <td>{solicitud.fechaTer}</td>
                  <td>
                    <button onClick={() => seleccionarSolicitud(solicitud)}>Modificar</button>
                    <button onClick={() => eliminarSolicitud(solicitud._id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SolicitudesVacacionesVista;

