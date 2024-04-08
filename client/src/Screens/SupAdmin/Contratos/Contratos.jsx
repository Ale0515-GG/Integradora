import React, { useState } from 'react';
import './Contratos.css'; // Importa el archivo CSS

const Contratos = () => {
  const [contratos, setContratos] = useState([
    {
      id: 1,
      area: 'Desarrollo de aplicaciones y programas',
      sede: 'Leon Gto',
      tipoContrato: 1
    },
    {
      id: 2,
      area: 'Diseño gráfico',
      sede: 'Ciudad de México',
      tipoContrato: 2
    }
  ]);

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

  const handleEliminarContrato = (id) => {
    const nuevosContratos = contratos.filter(contrato => contrato.id !== id);
    setContratos(nuevosContratos);
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
    <div className="contratos-container">
      <div className="contratos-header">
        <p className="contratos-title">ChronoMagnament</p>
        <div className="v358_4"></div> {/* Aquí se mostrará la imagen */}
      </div>
      <h2>Contratos</h2>
      <div className="contratos-table-container">
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
            {contratos.map(contrato => (
              <tr key={contrato.id}>
                <td>
                  <input type="text" className="contratos-input" value={contrato.area} onChange={(e) => handleEditarContrato(contrato.id, 'area', e.target.value)} />
                </td>
                <td>
                  <input type="text" className="contratos-input" value={contrato.sede} onChange={(e) => handleEditarContrato(contrato.id, 'sede', e.target.value)} />
                </td>
                <td>
                  <select className="contratos-select" value={contrato.tipoContrato} onChange={(e) => handleEditarContrato(contrato.id, 'tipoContrato', parseInt(e.target.value))}>
                    <option value={1}>Tipo 1</option>
                    <option value={2}>Tipo 2</option>
                    <option value={3}>Tipo 3</option>
                  </select>
                </td>
                <td>
                  <button className="action-button eliminar" onClick={() => handleEliminarContrato(contrato.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
