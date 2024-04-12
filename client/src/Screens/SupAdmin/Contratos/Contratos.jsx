import React, { useState } from 'react';
import './Contratos.css'; // Importa el archivo CSS

const Contratos = () => {
  const [contratos, setContratos] = useState([]);

  const [nuevoContrato, setNuevoContrato] = useState({
    area: '',
    sede: '',
    tipoContrato: 1
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoContrato({
      ...nuevoContrato,
      [name]: value
    });
  };

  const handleAgregarContrato = () => {
    setContratos([...contratos, { ...nuevoContrato, id: contratos.length + 1 }]);
    setNuevoContrato({
      area: '',
      sede: '',
      tipoContrato: 1
    });
  };

  const handleEliminarContrato = () => {
    setContratos([]);
  };

  const handleEditarContrato = (id, field, value) => {
    const nuevosContratos = contratos.map(contrato => {
      if (contrato.id === id) {
        return { ...contrato, [field]: value };
      }
      return contrato;
    });
    setContratos(nuevosContratos);
  };

  return (
    <div className="v281_60 contratos-container">
      <div className="v281_61">
        <p className="v281_63">ChronoMagnament</p>
        <div className="v358_4"></div> {/* Aquí se mostrará la imagen */}
      </div>
      <h2>Contratos</h2>
      <div className="v281_68 contratos-table-container">
        <table className="contratos-table">
          <thead>
            <tr>
              <th>Área</th>
              <th>Sede</th>
              <th>Tipo de Contrato</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contratos.map((contrato, index) => (
              <tr key={index}>
                <td>
                  <input type="text" className="contratos-input" value={contrato.area} onChange={(e) => handleEditarContrato(index, 'area', e.target.value)} />
                </td>
                <td>
                  <input type="text" className="contratos-input" value={contrato.sede} onChange={(e) => handleEditarContrato(index, 'sede', e.target.value)} />
                </td>
                <td>
                  <select className="contratos-select" value={contrato.tipoContrato} onChange={(e) => handleEditarContrato(index, 'tipoContrato', parseInt(e.target.value))}>
                    <option value={1}>Tipo 1</option>
                    <option value={2}>Tipo 2</option>
                    <option value={3}>Tipo 3</option>
                  </select>
                </td>
                <td>
                  <button className="action-button eliminar" onClick={() => handleEliminarContrato(index)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="eliminar-todos-contratos">
        <button className="action-button eliminar" onClick={handleEliminarContrato}>Eliminar Todos los Contratos</button>
      </div>
      <div className="nuevo-contrato">
        <h3>Agregar Nuevo Contrato</h3>
        <input type="text" className="contratos-input" name="area" value={nuevoContrato.area} onChange={handleInputChange} placeholder="Área" />
        <input type="text" className="contratos-input" name="sede" value={nuevoContrato.sede} onChange={handleInputChange} placeholder="Sede" />
        <select className="contratos-select" name="tipoContrato" value={nuevoContrato.tipoContrato} onChange={handleInputChange}>
          <option value={1}>Tipo 1</option>
          <option value={2}>Tipo 2</option>
          <option value={3}>Tipo 3</option>
        </select>
        <button className="action-button" onClick={handleAgregarContrato}>Agregar Contrato</button>
      </div>
    </div>
  );
};

export default Contratos;
