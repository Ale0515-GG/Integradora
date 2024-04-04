import React, { useState, useEffect } from "react";
import "./css/mainEH.css"; // Asegúrate de tener el archivo CSS correspondiente
import axios from "axios";
import { Link } from "react-router-dom";

const HorariosVistaE = () => {
  const [empleadosConSolicitudes, setEmpleadosConSolicitudes] = useState([]);
  const [mostrarCombo, setMostrarCombo] = useState(false);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");

  useEffect(() => {
    // Función para cargar las solicitudes pendientes al montarse el componente
    const cargarSolicitudesPendientes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/vistasHE/');
        setEmpleadosConSolicitudes(response.data);
      } catch (error) {
        console.error('Error al obtener las solicitudes de horarios:', error);
      }
    };

    cargarSolicitudesPendientes();
  }, []);

  const handleHorarioChange = (e) => {
    setHorarioSeleccionado(e.target.value);
  };

  const modificarHorario = (empleadoId) => {
    // Aquí realizas una petición al servidor para modificar el horario de un empleado
    axios.patch(`/vistasHE/${empleadoId}`, { tipoContrato: horarioSeleccionado })
      .then(response => {
        setEmpleadosConSolicitudes(prevEmpleados => {
          return prevEmpleados.map(empleado => {
            if (empleado.id === empleadoId) {
              return {
                ...empleado,
                horarioPendiente: {
                  ...empleado.horarioPendiente,
                  tipo: horarioSeleccionado,
                  nuevoHorario: horarioSeleccionado
                }
              };
            } else {
              return empleado;
            }
          });
        });
        setMostrarCombo(false);
        setHorarioSeleccionado("");
      })
      .catch(error => {
        console.error('Error al modificar el horario del empleado:', error);
      });
  };

  const cancelarSolicitud = (empleadoId) => {
    // Aquí realizas una petición al servidor para cancelar la solicitud de horario de un empleado
    axios.delete(`/vistasHE/${empleadoId}`)
      .then(response => {
        setEmpleadosConSolicitudes(prevEmpleados => {
          return prevEmpleados.map(empleado => {
            if (empleado.id === empleadoId) {
              return { ...empleado, horarioPendiente: null };
            } else {
              return empleado;
            }
          });
        });
      })
      .catch(error => {
        console.error('Error al cancelar la solicitud de horario del empleado:', error);
      });
  };

  return (
    <div className="crud-container">
      <div className="crud-header">
        <div className="logo"></div>
        <Link to="/VaEmV" className="regresar"></Link>
        <h1 className="crud-title">Solicitudes Pendientes de Horarios</h1>
      </div>
      <div className="crud-table">
        {empleadosConSolicitudes.length > 0 ? (
          <div>
            {empleadosConSolicitudes.map((empleado) =>
              empleado.horarioPendiente ? (
                <div key={empleado.id} className="crud-row">
                  <div className="crud-name">{empleado.nombre}</div>
                  <div className="crud-department">{empleado.departamento}</div>
                  <div className="crud-sede">{empleado.sede}</div>
                  <div className="crud-horario">
                    Tipo de Horario: {empleado.horarioPendiente.tipo}
                  </div>
                  
                  <div className="crud-editar">
                    {mostrarCombo ? (
                      <div>
                        <select value={horarioSeleccionado} onChange={handleHorarioChange}>
                          <option value="">Seleccionar horario</option>
                          <option value="08:00am (Contrato 1)">Contrato 1 '08:00 am'</option>
                          <option value="09:00am (Contrato 2)">Contrato2  '09:00 am' </option>
                          <option value="10:00am (Contrato 3)">Contrato 3 '10:00 am'</option>
                        </select>
                        <button onClick={() => modificarHorario(empleado.id)}>Guardar</button>
                      </div>
                    ) : (
                      <button onClick={() => setMostrarCombo(true)}>Editar</button>
                    )}
                  </div>

                  <div className="crud-cancelar-solicitud">
                    <button onClick={() => cancelarSolicitud(empleado.id)}>Cancelar Solicitud</button>
                  </div>
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
