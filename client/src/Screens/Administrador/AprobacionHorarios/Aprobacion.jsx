import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importa el componente Link de React Router
import './css/main.css'; // Importa el archivo de estilos CSS

const Aprobacion = () => {
  // Estado para almacenar las solicitudes
  const [solicitudes, setSolicitudes] = useState([
    {
      id: 1,
      nombre: 'Juan Pérez',
      departamento: 'Ventas',
      tipoContrato: 'Tiempo completo'
    },
    {
      id: 2,
      nombre: 'María López',
      departamento: 'Recursos Humanos',
      tipoContrato: 'Medio tiempo'
    },
    // Agrega más solicitudes de prueba aquí según lo necesites
  ]);

  // Función para aprobar una solicitud
  const aprobarSolicitud = (id) => {
    // Lógica para aprobar la solicitud con el id especificado
    // Por ejemplo, puedes eliminar la solicitud del estado
    setSolicitudes(solicitudes.filter(solicitud => solicitud.id !== id));
  };

  // Función para rechazar una solicitud
  const rechazarSolicitud = (id) => {
    // Lógica para rechazar la solicitud con el id especificado
    // Por ejemplo, puedes eliminar la solicitud del estado
    setSolicitudes(solicitudes.filter(solicitud => solicitud.id !== id));
  };

  return (
    <div className="container">
      <div className="header">
        {/* Agrega el logo envuelto en un Link para redirigir a la página de inicio */}
        <Link to="/Admin" className="logo"></Link>
        <h1 className="title">Lista de Solicitudes Pendientes</h1>
      </div>
      <div className="solicitudes-lista">
        {solicitudes.length > 0 ? (
          <ul>
            {solicitudes.map(solicitud => (
              <li key={solicitud.id} className="solicitud-item">
                <div className="solicitud-info">
                  <p><strong>Nombre:</strong> {solicitud.nombre}</p>
                  <p><strong>DPTO.:</strong> {solicitud.departamento}</p>
                  <p><strong>Tipo de contrato:</strong> {solicitud.tipoContrato}</p>
                </div>
                <div className="botones">
                  <button className="btn-aprobar" onClick={() => aprobarSolicitud(solicitud.id)}>Aprobar</button>
                  <button className="btn-rechazar" onClick={() => rechazarSolicitud(solicitud.id)}>Rechazar</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className='p'>No hay solicitudes pendientes.</p>
        )}
      </div>
    </div>
  );
}

export default Aprobacion;
