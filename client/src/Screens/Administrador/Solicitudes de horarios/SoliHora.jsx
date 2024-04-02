import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SolicitudCambioHorarios = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const cargarSolicitudes = async () => {
    try {
      const response = await axios.get('/api/solicitudes');
      setSolicitudes(response.data);
    } catch (error) {
      console.error('Error al cargar las solicitudes:', error);
    }
  };

  const agregarSolicitud = async () => {
    try {
      const nuevaSolicitud = { /* datos de la nueva solicitud */ };
      await axios.post('/api/solicitudes', nuevaSolicitud);
      cargarSolicitudes();
    } catch (error) {
      console.error('Error al agregar la solicitud:', error);
    }
  };

  const eliminarSolicitud = async (id) => {
    try {
      await axios.delete(`/api/solicitudes/${id}`);
      cargarSolicitudes();
    } catch (error) {
      console.error('Error al eliminar la solicitud:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Solicitudes de Cambio de Horarios</h1>
      <button onClick={agregarSolicitud}>Agregar Solicitud</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descanso</th>
            <th>Horario</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((solicitud, index) => (
            <tr key={index}>
              <td>{solicitud.nombre}</td>
              <td>{solicitud.descanso}</td>
              <td>{solicitud.horario}</td>
              <td>{solicitud.estado}</td>
              <td>
                <button onClick={() => eliminarSolicitud(solicitud._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SolicitudCambioHorarios;
