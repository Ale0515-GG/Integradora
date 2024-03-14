import React, { useState } from 'react';
import './css/main.css';
import { Link } from 'react-router-dom';

const Aprobacion = () => {
  // Estado para almacenar las solicitudes
  const [solicitudes, setSolicitudes] = useState([
    {
      nombre: 'Angela Ramirez',
      departamento: 'Administrador',
      tipoContrato: 'Trabaja 5 días y descansa 2'
    },
    // Agrega más solicitudes según lo necesites
  ]);

  // Función para aprobar una solicitud
  const aprobarSolicitud = (index) => {
    // Lógica para aprobar la solicitud en el índice especificado
    // Por ejemplo, puedes eliminar la solicitud del estado
    const newSolicitudes = [...solicitudes];
    newSolicitudes.splice(index, 1);
    setSolicitudes(newSolicitudes);
  };

  // Función para rechazar una solicitud
  const rechazarSolicitud = (index) => {
    // Lógica para rechazar la solicitud en el índice especificado
    // Por ejemplo, puedes eliminar la solicitud del estado
    const newSolicitudes = [...solicitudes];
    newSolicitudes.splice(index, 1);
    setSolicitudes(newSolicitudes);
  };

  return (
    <div className="container">
      <div className="header">
      <Link to="/Admin" className="logo"></Link>
        <h1 className="title">Solicitud de Horarios</h1>
        
      </div>
      <div className="table">
        {solicitudes.length > 0 ? (
          <div>
            {solicitudes.map((solicitud, index) => (
              <div key={index} className="row">
                <div className="name">{solicitud.nombre}</div>
                <div className="department">{solicitud.departamento}</div>
                <div className="contractType">{solicitud.tipoContrato}</div>
                <button className="button reject" onClick={() => rechazarSolicitud(index)}>Rechazar</button>
                <button className="button approve" onClick={() => aprobarSolicitud(index)}>Aprobar</button>
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
