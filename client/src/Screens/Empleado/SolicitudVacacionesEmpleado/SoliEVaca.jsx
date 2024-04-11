import React, { useState } from "react";
import "./mainEV.css"; // Asegúrate de tener el archivo CSS correspondiente
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


const SolicitudesVacacionesVista = () => {
  const [solicitudesVacaciones, setSolicitudesVacaciones] = useState([
    {
      id: 1,
      nombre: "Juan Perez",
      departamento: "Desarrollo",
      sede: "Dolores Hidalgo",
      vacacionesPendientes: {
        id: 1,
        dias: ["2024-04-15", "2024-04-21"],
        estado: "pendiente",
      },
    },
    {
      id: 2,
      nombre: "María García",
      departamento: "Ventas",
      sede: "Dolores Hidalgo",
      vacacionesPendientes: null,
      },
  ]);

  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [fechasSeleccionadas, setFechasSeleccionadas] = useState([]);

  const handleDateChange = (date) => {
    setFechasSeleccionadas(date);
  };

  

  const modificarVacaciones = (empleadoId) => {
    const fechasTexto = fechasSeleccionadas.map((date) =>
      date.toISOString().split("T")[0]
    );

    setSolicitudesVacaciones(
      solicitudesVacaciones.map((empleado) =>
        empleado.id === empleadoId
          ? {
              ...empleado,
              vacacionesPendientes: {
                ...empleado.vacacionesPendientes,
                dias: fechasTexto,
              },
            }
          : empleado
      )
    );

    setMostrarCalendario(false);
    setFechasSeleccionadas([]);
  };

  const cancelarSolicitud = (empleadoId) => {
    // Implementa la lógica para cancelar la solicitud de vacaciones al backend
    console.log("Cancelando la solicitud de vacaciones para el empleado con ID:", empleadoId);
    // Aquí deberías enviar una solicitud al backend para cancelar la solicitud de vacaciones
    // y actualizar el estado en consecuencia
  };

  return (
    <div className="solicitudes-container">
      <div className="solicitudes-header">
        <div className="logo"></div>
        <Link to="/NavegacionEmpleado" className="regresar"></Link>
        <h1 className="solicitudes-title">Solicitud de Vacaciones</h1>
      </div>
      
      <div className="solicitudes-table">
        {solicitudesVacaciones.length > 0 ? (
          <div>
            {solicitudesVacaciones.map((empleado) =>
              empleado.vacacionesPendientes ? (
                <div key={empleado.id} className="solicitudes-row">
                  <div className="solicitudes-name">{empleado.nombre}</div>
                  <div className="solicitudes-department">{empleado.departamento}</div>
                  <div className="solicitudes-sede">{empleado.sede}</div>
                  <div className="solicitudes-dias-vacaciones">
                    Dias de Vacaciones:
                    {empleado.vacacionesPendientes.dias.map((dia) => (
                      <span key={dia}> {dia} </span>
                    ))}
                  </div>
                  <div className="solicitudes-acciones">
                    {mostrarCalendario ? (
                      <div>
                        <Calendar onChange={handleDateChange} value={fechasSeleccionadas} selectRange />
                        <div className="boton-container">
                          <button className="solicitud-boton" onClick={() => modificarVacaciones(empleado.id)}>Guardar</button>
                        </div>
                      </div>
                    ) : (
                      <div className="boton-container">
                        <button className="solicitud-boton" onClick={() => setMostrarCalendario(true)}>Editar</button>
                      </div>
                    )}
                    <div className="boton-container">
                      <button className="solicitud-boton" onClick={() => cancelarSolicitud(empleado.id)}>Cancelar Solicitud</button>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        ) : (
          <p>No hay empleados con solicitudes pendientes de vacaciones.</p>
        )}
      </div>
    </div>
  );
};

export default SolicitudesVacacionesVista;
