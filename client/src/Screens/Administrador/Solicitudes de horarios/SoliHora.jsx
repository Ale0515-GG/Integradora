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
      turnos: ["7:00 - 12:00", "12:00 - 17:00", "18:00 - 23:59"],
    },
    { nombre: "Por Turnos", turnos: ["7:00 - 19:00", "19:00 - 7:00"] },
  ];

  const isGuardarDisabled =
    !tipoContrato || !turnos.every((turno) => turno.turno);

  return (
    <body className="bodySH">
    <div >
      <div className="rectangulo-imagenes">
        <div className="titleH">Solicitud de horarios</div>
        <div className="crud-container">
          <div style={{ position: "absolute", top: "4px", left: "29px" }}>
            <div className="logo"></div>
          </div>
        </div>
        <Link to="/SoliHEmple" className="regresar"></Link>
      </div>
      <div className="info-adicional">
      <h2>Información sobre los contratos</h2>
      <table className="tabla-info">
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Turnos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Si trabaja 5 días y descansa 2</td>
            <td>
              <ul>
                <li>7:00 – 15:00</li>
                <li>15:00 – 23:00</li>
                <li>23:00 – 7:00</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>Si trabaja 1 día y descansa 2</td>
            <td>
              <ul>
                <li>7:00 – 7:00</li>
                <li>19:00 – 19:00</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>Si trabaja 6 días y descansa 1</td>
            <td>
              <ul>
                <li>7:00 – 12:00</li>
                <li>12:00 – 17:00</li>
                <li>18:00 - 23:59</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
        <div className="info-empleado">
        <div>
          <p>Selecciona correctamente el tipo de contrato que deses y selecciona bien tu turno, solo podras mandar 1 solicitud por mes</p>
        </div>
        <div>
          <label className="contrato">Tipo de Contrato:</label>
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
    
    </body>
  );
};

export default SolicitudesPendientes;
