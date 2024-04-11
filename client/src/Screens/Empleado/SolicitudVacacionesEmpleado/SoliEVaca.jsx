import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./mainEV.css"; // Importa tu archivo CSS de estilos
import { Link } from "react-router-dom";

const SolicitudesVacacionesVista = () => {
  const [fechasSeleccionadas, setFechasSeleccionadas] = useState([]);
  const [error, setError] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Estado para mostrar el formulario de solicitud
  const [historialSolicitudes, setHistorialSolicitudes] = useState([]); // Estado para almacenar el historial de solicitudes
  const [empleado, setEmpleado] = useState(null); // Estado para almacenar los datos del empleado

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
        // Agrega los demás datos de la solicitud aquí si es necesario
      });

      setError("");
      obtenerHistorialSolicitudes(); // Actualizar el historial después de guardar una solicitud
      setMostrarFormulario(false); // Ocultar el formulario después de guardar o modificar la solicitud
      setFechasSeleccionadas([]); // Limpiar las fechas seleccionadas
    } catch (error) {
      console.error("Error al solicitar las vacaciones:", error.message);
      setError("Error al solicitar las vacaciones");
    }
  };
  
  const obtenerHistorialSolicitudes = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/solicitudVacaciones");
      setHistorialSolicitudes(response.data.data); // Suponiendo que el servidor devuelve un objeto con una propiedad 'data' que contiene el historial de solicitudes
    } catch (error) {
      console.error('Error al obtener el historial de solicitudes:', error.message);
      // Aquí puedes manejar el error de acuerdo a tus necesidades
    }
  };

  useEffect(() => {
    obtenerHistorialSolicitudes();
    // Simulando la carga de los datos del empleado
    const empleadoSimulado = {
      nombreempleado: 'Alejandra',
      sede: 'UTNG',
      area: 'RH'
      // Agrega más datos del empleado según sea necesario
    };
    setEmpleado(empleadoSimulado);
  }, []);

  const solicitarVacaciones = () => {
    setMostrarFormulario(true);
    setFechasSeleccionadas([]); // Limpiar las fechas seleccionadas al solicitar nuevas vacaciones
  };

  // Función para eliminar una solicitud
  const eliminarSolicitud = async (solicitudId) => {
    try {
      await Axios.delete(`http://localhost:3001/solicitudVacaciones/delete/${solicitudId}`);
      setError('');
      obtenerHistorialSolicitudes(); // Actualizar el historial después de eliminar una solicitud
    } catch (error) {
      console.error('Error al eliminar la solicitud:', error.message);
      setError('Error al eliminar la solicitud');
    }
  };

  return (
    <div className="solicitudes-container">
      <div className="solicitudes-header">
        <div className="logo"></div>
        <Link to="/NavegacionEmpleado" className="regresar"></Link>
        <h1 className="solicitudes-title">Solicitud de Vacaciones</h1>
      </div>

      {empleado && (
        <div className="empleado-info">
          <h2>Datos del Empleado</h2>
          <p><strong>Nombre:</strong> {empleado.nombreempleado}</p>
          <p><strong>Sede:</strong> {empleado.sede}</p>
          <p><strong>Área:</strong> {empleado.area}</p>
          {/* Agrega más campos del empleado según sea necesario */}
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
