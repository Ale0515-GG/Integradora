import React, { useState } from "react";
import axios from "axios";
import "./css/mainSoliH.css";
import { Link } from "react-router-dom";

const SolicitudesPendientes = () => {
  const [turnos, setTurnos] = useState([{ tipoContrato: "", turno: "" }]);
  const [tipoContrato, setTipoContrato] = useState("");

  const handleContratoChange = ({ target: { value } }) => {
    setTipoContrato(value);
    setTurnos([{ tipoContrato: value, turno: "" }]);
  };

  const handleTurnoChange = (index, valor) => {
    const nuevosTurnos = [...turnos];
    nuevosTurnos[index].turno = valor;
    setTurnos(nuevosTurnos);
  };
  
  const handleGuardar = async () => {
    if (!tipoContrato || turnos.some((turno) => !turno.turno)) {
      alert("Por favor selecciona el tipo de contrato y al menos un turno");
      return;
    }
  
    try {
      await Promise.all(turnos.map(async (turno) => {
        await axios.post("http://localhost:3001/SolicitudesH/HorariosGuardado", turno);
      }));
      alert("Solicitud guardada correctamente");
    } catch (error) {
      alert("Error al guardar la solicitud (solo puedes enviar 1 solicitud mensualmente) ");
      console.error("Error al guardar la solicitud:", error);
    }
  };
  
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
            {opcionesContrato.map((contrato) => (
              <option key={contrato.nombre} value={contrato.nombre}>
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

export default SolicitudesPendientes;
