import React, { useState } from "react";
import axios from "axios";
import "./css/mainSoliH.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const HorarioEmpleado = () => {
  // Estado para almacenar los turnos y tipo de contrato
  const [turnos, setTurnos] = useState([{ tipoContrato: "", turno: "" }]);

  // Estado para almacenar el tipo de contrato seleccionado
  const [tipoContrato, setTipoContrato] = useState("");

  // Función para manejar cambios en el tipo de contrato
  const handleContratoChange = (e) => {
    const selectedContrato = e.target.value;
    setTipoContrato(selectedContrato);
    // Reiniciar los turnos cuando cambie el tipo de contrato
    setTurnos([{ tipoContrato: selectedContrato, turno: "" }]);
  };

  // Función para manejar cambios en los turnos
  const handleTurnoChange = (index, valor) => {
    const nuevosTurnos = [...turnos];
    nuevosTurnos[index].turno = valor;
    setTurnos(nuevosTurnos);
  };

  // Función para manejar el clic en el botón guardar
  const handleGuardar = () => {
    // Verificar si se han seleccionado el tipo de contrato y al menos un turno
    if (!tipoContrato || turnos.some((turno) => !turno.turno)) {
      toast.error(
        "Por favor selecciona el tipo de contrato y al menos un turno",
        {
          position: "top-center",
        }
      );
      return;
    }

    // Enviar la solicitud al servidor
    axios
      .post("http://localhost:3001/SolicitudesH/HorariosGuardado", {
        tipoContrato,
        turnos,
      })
      .then((response) => {
        // Muestra un mensaje de éxito
        toast.success("Solicitud guardada correctamente", {
          position: "top-center",
        });
      })
      .catch((error) => {
        // Muestra un mensaje de error
        toast.error("Error al guardar los turnos", {
          position: "top-center",
        });
        console.error("Error al guardar los turnos:", error);
      });
  };

  // Opciones para los tipos de contrato y sus turnos correspondientes
  const opcionesContrato = [
    {
      nombre: "Tiempo Completo",
      turnos: ["7:00 - 15:00", "15:00 - 23:00", "23:00 - 7:00"],
    },
    {
      nombre: "Medio Tiempo",
      turnos: ["7:00 - 12:00", "12:00 - 17:00", "17:00 - 22:00"],
    },
    { nombre: "Por Turnos", turnos: ["7:00 - 19:00", "19:00 - 7:00"] },
  ];

  // Verificar si ambos campos están seleccionados
  const isGuardarDisabled =
    !tipoContrato || !turnos.every((turno) => turno.turno);

  return (
    <div>
      <div className="rectangulo-imagenes">
      <div className="title">Solicitud de horarios</div>
        <div className="crud-container">
          <div style={{ position: "absolute", top: "4px", left: "29px" }}>
            <div className="logo"></div>
          </div>
          
        </div>
        
        <Link to="/SoliHEmple" className="regresar"></Link>
      </div>
      <div className="info-empleado">
        <div>
          <p>Área: [Área del empleado]</p>
          <p>Sede: [Sede del empleado]</p>
        </div>
        <div>
          <label htmlFor="contrato">Tipo de Contrato:</label>
          <select id="contrato" onChange={handleContratoChange}>
            <option value="">Seleccionar tipo de contrato</option>
            {opcionesContrato.map((contrato, index) => (
              <option key={index} value={contrato.nombre}>
                {contrato.nombre}
              </option>
            ))}
          </select>
        </div>
        {tipoContrato && (
          <table className="tablaC">
            <thead>
              <tr>
                <th>Turnos Disponibles</th>
              </tr>
            </thead>
            <tbody>
              {turnos.map((turno, index) => (
                <tr key={index}>
                  <td>
                    <select
                      value={turno.turno}
                      onChange={(e) => handleTurnoChange(index, e.target.value)}
                    >
                      <option value="">Seleccionar turno</option>
                      {opcionesContrato
                        .find((c) => c.nombre === tipoContrato)
                        .turnos.map((turno, i) => (
                          <option key={i} value={turno}>
                            {turno}
                          </option>
                        ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button
          className="custom-button"
          onClick={handleGuardar}
          disabled={isGuardarDisabled}
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default HorarioEmpleado;
