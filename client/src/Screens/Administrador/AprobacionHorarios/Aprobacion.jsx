import React, { useState } from "react";
import "./css/mainH.css";
import { Link } from "react-router-dom";

const Aprobacion = () => {
  // Estado para almacenar las solicitudes
  const [solicitudes, setSolicitudes] = useState([
    {
      nombre: "Francisco Perez",
      departamento: "Administrador",
      tipoContrato: "Trabaja 5 días y descansa 2",
      estado: "pendiente", // Nuevo campo para el estado de la solicitud
      historial: [] // Nuevo campo para el historial de la solicitud
    },
    {
      nombre: "Francisco Perez",
      departamento: "Administrador",
      tipoContrato: "Trabaja 5 días y descansa 2",
      estado: "pendiente",
      historial: []
    },
    // Agrega más solicitudes según lo necesites
  ]);

  // Función para obtener la fecha actual en el formato deseado
  const obtenerFechaActual = () => {
    const fecha = new Date();
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  // Función para aprobar una solicitud
  const aprobarSolicitud = (index) => {
    const newSolicitudes = [...solicitudes];
    const fechaAprobacion = obtenerFechaActual();
    newSolicitudes[index].estado = "aprobado";
    newSolicitudes[index].historial.push({
      accion: "aprobado",
      fecha: fechaAprobacion,
    });
    setSolicitudes(newSolicitudes);
  };

  // Función para rechazar una solicitud
  const rechazarSolicitud = (index) => {
    const newSolicitudes = [...solicitudes];
    const fechaRechazo = obtenerFechaActual();
    newSolicitudes[index].estado = "rechazado";
    newSolicitudes[index].historial.push({
      accion: "rechazado",
      fecha: fechaRechazo,
    });
    setSolicitudes(newSolicitudes);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="logo"></div>
        <Link to="/AproS" className="casita"></Link>
        <h1 className="title">Aprobacion de cambio de Horarios</h1>
      </div>
      <div className="table">
        {solicitudes.length > 0 ? (
          <div>
            {solicitudes.map((solicitud, index) => (
              <div key={index} className="row">
                <div className="name">{solicitud.nombre}</div>
                <div className="department">{solicitud.departamento}</div>
                <div className="contractType">{solicitud.tipoContrato}</div>
                <div className="status">{solicitud.estado}</div>
                <div className="date">
                  {solicitud.historial.length > 0 &&
                    solicitud.historial[solicitud.historial.length - 1].fecha}
                </div>
                {/* Mostrar botones solo si el estado es "pendiente" */}
                {solicitud.estado === "pendiente" && (
                  <>
                    <button
                      style={{
                        padding: "5px 10px",
                        fontSize: "14px",
                        maxWidth: "100px",
                      }}
                      className="button reject"
                      onClick={() => rechazarSolicitud(index)}
                    >
                      Rechazar
                    </button>
                    <button
                      style={{
                        padding: "5px 10px",
                        fontSize: "14px",
                        maxWidth: "100px",
                      }}
                      className="button approve"
                      onClick={() => aprobarSolicitud(index)}
                    >
                      Aprobar
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No hay solicitudes pendientes.</p>
        )}
      </div>
    </div>
  );
};

export default Aprobacion;
