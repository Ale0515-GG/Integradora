import React, { useState, useEffect } from "react";
import "./css/mainEH.css"; // Asegúrate de tener el archivo CSS correspondiente
import { Link } from "react-router-dom";

const HorariosVistaE = () => {
  const [empleadosConSolicitudes, setEmpleadosConSolicitudes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarSolicitudesPendientes();
  }, []);

  const cargarSolicitudesPendientes = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/SolicitudesH/TraerSoli"); 
      console.log();
      if (!response.ok) {
        throw new Error('Error al obtener las solicitudes de horarios');
      }
      const data = await response.json();
      setEmpleadosConSolicitudes(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener las solicitudes de horarios:', error);
      setLoading(false);
    }
  };

  return (
    <div className="crud-container">
      <div className="crud-header">
        <div className="logo"></div>
        <Link to="/VaEmV" className="regresar"></Link>
        <h1 className="crud-title">Solicitudes Pendientes de Horarios</h1>
      </div>
      <div className="crud-table">
        {loading ? (
          <p>Cargando solicitudes pendientes...</p>
        ) : empleadosConSolicitudes.length > 0 ? (
          <div>
            {empleadosConSolicitudes.map((empleado) =>
              empleado.horarioPendiente ? (
                <div key={empleado.id} className="crud-row">
                  {/* Aquí renderiza los detalles del empleado, por ejemplo: */}
                  <p>Tipo de Contrato: {empleado.tipoContrato}</p>
                  <p>Turno: {empleado.turno}</p>
                </div>
              ) : null
            )}
          </div>
        ) : (
          <p>No hay solicitudes pendientes de horarios.</p>
        )}
      </div>
    </div>
  );
};

export default HorariosVistaE;
