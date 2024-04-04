import React, { useState } from "react";
import "./css/mainEH.css"; // Asegúrate de tener el archivo CSS correspondiente
import { Link } from "react-router-dom";

const CrudEmpleados = () => {
  // Estado para almacenar la lista de empleados con sus solicitudes pendientes
  const [empleadosConSolicitudes, setEmpleadosConSolicitudes] = useState([
    {
      id: 1,
      nombre: "Juan Perez",
      departamento: "Desarrollo",
      sede: "Dolores Hidalgo",
      horarioPendiente: {
        id: 1,
        tipo: "10:00am (Contrato 3)",
        estado: "pendiente",
      },
    },
    {
      id: 2,
      nombre: "María García",
      departamento: "Ventas",
      sede: "Dolores Hidalgo",
      horarioPendiente: null, // Este empleado no tiene solicitudes pendientes
    },
    // Agrega más empleados según lo necesites
  ]);

  // Estado para controlar la visibilidad del combo de opciones de horario
  const [mostrarCombo, setMostrarCombo] = useState(false);

  // Estado para almacenar el horario seleccionado
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");

  // Función para manejar la selección de un nuevo horario
  const handleHorarioChange = (e) => {
    setHorarioSeleccionado(e.target.value);
  };

  // Función para modificar el horario pendiente de un empleado
  const modificarHorario = (empleadoId) => {
    // Aquí iría la lógica para modificar el horario en la base de datos
    // Por ahora, simplemente actualizamos el estado local del componente
    setEmpleadosConSolicitudes(
      empleadosConSolicitudes.map((empleado) =>
        empleado.id === empleadoId
          ? {
              ...empleado,
              horarioPendiente: {
                ...empleado.horarioPendiente,
                tipo: horarioSeleccionado, // Actualizamos el tipo de horario
                nuevoHorario: horarioSeleccionado, // También actualizamos el nuevo horario
              },
            }
          : empleado
      )
    );
    // Resetear el estado
    setMostrarCombo(false);
    setHorarioSeleccionado("");
  };

  // Función para cancelar la solicitud de horario
  const cancelarSolicitud = (empleadoId) => {
    // Aquí iría la lógica para cancelar la solicitud de horario en la base de datos
    // Por ahora, simplemente actualizamos el estado local del componente para eliminar la solicitud
    setEmpleadosConSolicitudes(
      empleadosConSolicitudes.map((empleado) =>
        empleado.id === empleadoId ? { ...empleado, horarioPendiente: null } : empleado
      )
    );
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
          <p>No hay empleados con solicitudes pendientes de horarios.</p>
        )}
      </div>
    </div>
  );
};

export default CrudEmpleados;
