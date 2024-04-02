import React, { useState } from "react";
import "./mainEV.css"; // Asegúrate de tener el archivo CSS correspondiente
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const SolicitudesVacaciones = () => {
  // Estado para almacenar la lista de empleados con sus solicitudes pendientes de vacaciones
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
    // Agrega más empleados según lo necesites
  ]);

  // Estado para controlar la visibilidad del calendario de selección de fechas
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  // Estado para almacenar las fechas seleccionadas
  const [fechasSeleccionadas, setFechasSeleccionadas] = useState([]);

  // Función para manejar la selección de fechas en el calendario
  const handleDateChange = (date) => {
    setFechasSeleccionadas(date);
  };

  // Función para modificar las fechas de vacaciones pendientes de un empleado
  const modificarVacaciones = (empleadoId) => {
    // Convertir las fechas seleccionadas a cadenas de texto antes de actualizar el estado
    const fechasTexto = fechasSeleccionadas.map(date => date.toISOString().split('T')[0]);

    // Actualizar el estado de las fechas seleccionadas como cadenas de texto
    setSolicitudesVacaciones(
      solicitudesVacaciones.map((empleado) =>
        empleado.id === empleadoId
          ? { ...empleado, vacacionesPendientes: { ...empleado.vacacionesPendientes, dias: fechasTexto } }
          : empleado
      )
    );

    // Resetear el estado
    setMostrarCalendario(false);
    setFechasSeleccionadas([]);
  };

  // Función para cancelar una solicitud de vacaciones
  const cancelarSolicitud = (empleadoId) => {
    // Aquí iría la lógica para eliminar la solicitud de vacaciones de la base de datos
    // Por ahora, simplemente actualizamos el estado local del componente para eliminar la solicitud
    setSolicitudesVacaciones(
      solicitudesVacaciones.map((empleado) =>
        empleado.id === empleadoId ? { ...empleado, vacacionesPendientes: null } : empleado
      )
    );
  };

  return (
    <div className="container">
      <div className="header">
        <div className="logo"></div>
        <Link to="/SoliHEmple" className="casita"></Link>
        <h1 className="title">Solicitudes Pendientes de Vacaciones</h1>
      </div>
      <div className="table">
        {solicitudesVacaciones.length > 0 ? (
          <div>
            {solicitudesVacaciones.map((empleado) =>
              empleado.vacacionesPendientes ? (
                <div key={empleado.id} className="row">
                  <div className="name">{empleado.nombre}</div>
                  <div className="department">{empleado.departamento}</div>
                  <div className="sede">{empleado.sede}</div>
                  <div className="dias-vacaciones">
                    Dias de Vacaciones:
                    {empleado.vacacionesPendientes.dias.map((dia) => (
                      <span key={dia}> {dia} </span>
                    ))}
                  </div>
                  <div className="acciones">
                    {mostrarCalendario ? (
                      <div>
                        <Calendar onChange={handleDateChange} value={fechasSeleccionadas} selectRange />
                        <div className="boton-container">
                          <button onClick={() => modificarVacaciones(empleado.id)}>Guardar</button>
                        </div>
                      </div>
                    ) : (
                      <div className="boton-container">
                        <button onClick={() => setMostrarCalendario(true)}>Editar</button>
                      </div>
                    )}
                    <div className="boton-container">
                      <button onClick={() => cancelarSolicitud(empleado.id)}>Cancelar Solicitud</button>
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

export default SolicitudesVacaciones;
