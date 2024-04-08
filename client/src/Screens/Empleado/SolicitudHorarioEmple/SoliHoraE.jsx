import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/mainEH.css"; // Asegúrate de tener el archivo CSS correspondiente
import { Link } from "react-router-dom";

const HorariosVistaE = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedTurno, setEditedTurno] = useState("");
  const [opcionesContrato, setOpcionesContrato] = useState([]);

  useEffect(() => {
    cargarSolicitudesPendientes();
    cargarOpcionesContrato();
  }, []);

  const cargarSolicitudesPendientes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3001/SolicitudesH/TraerSoli");
      if (response.status !== 200) {
        throw new Error('Error al obtener las solicitudes de horarios, hubo un problema en el servidor, favor de contactar a su administrador.');
      }
      setSolicitudes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener las solicitudes de horarios:', error);
      setLoading(false);
    }
  };

  const cargarOpcionesContrato = () => {
    // Aquí cargas tus opciones de contrato desde el servidor o desde un archivo
    setOpcionesContrato([
      {
        nombre: "Tiempo Completo",
        turnos: ["7:00 - 15:00", "15:00 - 23:00", "23:00 - 7:00"],
      },
      {
        nombre: "Medio Tiempo",
        turnos: ["7:00 - 12:00", "12:00 - 17:00", "17:00 - 22:00"],
      },
      { nombre: "Por Turnos", turnos: ["7:00 - 19:00", "19:00 - 7:00"] },
    ]);
  };

  const handleTurnoChange = (index, valor) => {
    const nuevasSolicitudes = [...solicitudes];
    nuevasSolicitudes[index].turno = valor;
    setSolicitudes(nuevasSolicitudes);
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditedTurno(solicitudes[index].turno); // Establecer el turno editado inicialmente
  };

  const cancelEdit = () => {
    setEditingIndex(-1);
    setEditedTurno("");
  };

  const saveChanges = async (index) => {
    try {
      const updatedSolicitud = solicitudes[index];
      updatedSolicitud.turno = editedTurno;
      await axios.put(`http://localhost:3001/SolicitudesH/updateS`, updatedSolicitud);
      setEditingIndex(-1);
      cargarSolicitudesPendientes();
      alert("Solicitud actualizada correctamente");
    } catch (error) {
      console.error("Error al actualizar la solicitud:", error);
      alert("Error al actualizar la solicitud");
    }
  };

  const cancelarSolicitud = async (index) => {
    try {
      const solicitud = solicitudes[index];
      await axios.delete(`http://localhost:3001/SolicitudesH/borrar`);
      cargarSolicitudesPendientes(); // Actualizar la lista de solicitudes después de la cancelación
      alert('Solicitud cancelada correctamente');
    } catch (error) {
      console.error('Error al cancelar la solicitud:', error);
      alert('Error al cancelar la solicitud');
    }
  };
  return (
    <body className="VisE">
    <div className="VistaE">
      <div className="VistaE-header">
        <div className="logo"></div>
        <h1 className="VistaE-title">Solicitudes Pendientes</h1>
        <Link to="/SolicitudesH" className="regresar"></Link>
      </div>
      
      <div className="VistaE-table">
        {loading ? (
          <p>Cargando solicitudes pendientes...</p>
        ) : solicitudes.length > 0 ? (
          <div>
            {solicitudes.map((solicitud, index) => (
              <div key={index} className="VistaE-row">
                {editingIndex === index ? (
                  <div className="VistaE-row">
                    <select
                      value={editedTurno}
                      onChange={(e) => setEditedTurno(e.target.value)}
                    >
                      <option value="">Seleccionar turno</option>
                      {opcionesContrato.map((contrato) => (
                        solicitud.tipoContrato === contrato.nombre &&
                        contrato.turnos.map((turno, i) => (
                          <option key={i} value={turno}>
                            {turno}
                          </option>
                        ))
                      ))}
                    </select>
                    <div className="VistaE-boton-container">
                      <button className="VistaE-editar" onClick={() => saveChanges(index)}>Guardar</button>
                      <button className="VistaE-cancelar-solicitud" onClick={() => cancelEdit(index)}>Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <div className="VistaE-row">
                    <div className="VistaE-datos">
                      <div className="VistaE-tipo-contrato">
                        <p>Tipo de Contrato: {solicitud.tipoContrato}</p>
                      </div>
                      <div className="VistaE-turno">
                        <p>Turno: {solicitud.turno}</p>
                      </div>
                    </div>
                    <div className="VistaE-botones">
                      <button className="VistaE-editar" onClick={() => startEdit(index)}>Editar</button>
                      <button className="VistaE-cancelar-solicitud" onClick={() => cancelarSolicitud(index)}>Cancelar Solicitud</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No hay solicitudes pendientes de horarios.</p>
        )}
      </div>
    </div>
    </body>
  );
}  
export default HorariosVistaE;
