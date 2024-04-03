import React, { useState } from 'react';
import './Horarios.css'; // Importa el archivo CSS

const Horarios = () => {
  const [empleados, setEmpleados] = useState([
    {
      id: 1,
      nombre: 'Andrea Palomares',
      area: 'Desarrollo de aplicaciones y programas',
      sede: 'Leon Gto',
      dia: '2011-04-25',
    },
    {
      id: 2,
      nombre: 'Victor Barrientos',
      area: 'Diseño gráfico',
      sede: 'Ciudad de México',
      dia: '2012-05-15'
    }
  ]);

  const [empleadosAceptados, setEmpleadosAceptados] = useState([]);

  const handleEliminar = (id) => {
    const nuevosEmpleados = empleados.filter(empleado => empleado.id !== id);
    setEmpleados(nuevosEmpleados);
    console.log(`Eliminando registro con ID: ${id}`);
  };

  const handleAceptar = (id) => {
    const empleadoAceptado = empleados.find(empleado => empleado.id === id);
    if (empleadoAceptado) {
      setEmpleadosAceptados([...empleadosAceptados, { ...empleadoAceptado, fechaAceptacion: new Date().toISOString().slice(0, 10) }]);
      handleEliminar(id); // Eliminar empleado de la lista principal
      console.log(`Aceptando cambios para el usuario con ID: ${id}`);
    }
  };

  const handleAgregarHorarios = (id) => {
    console.log(`Agregando horarios para el usuario con ID: ${id}`);
  };

  const handleModificarHorarios = (id) => {
    console.log(`Modificando horarios para el usuario con ID: ${id}`);
  };

  const handleGuardarCambios = () => {
    console.log('Cambios guardados');
  };

  return (
    <div className="v281_0">
      <div className="v281_61">
        <p className="v281_63">ChronoMagnament</p>
      </div>
      
      <div className="v281_68">
        <h2>Gestión de Horarios/Contratos</h2>
        <table id="example">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nombre Empleado</th>
              <th>Área</th>
              <th>Sede</th>
              <th>Día</th>
              <th>Eliminar</th>
              <th>Aceptar</th>
              <th>Agregar Horarios</th>
              <th>Modificar Horarios</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{empleado.nombre}</td>
                <td>{empleado.area}</td>
                <td>{empleado.sede}</td>
                <td>{empleado.dia}</td>
                <td><button className="eliminar" onClick={() => handleEliminar(empleado.id)}>Eliminar</button></td>
                <td><button className="aceptar" onClick={() => handleAceptar(empleado.id)}>Aceptar</button></td>
                <td><button className="agregar" onClick={() => handleAgregarHorarios(empleado.id)}>Agregar Horarios</button></td>
                <td><button className="modificar" onClick={() => handleModificarHorarios(empleado.id)}>Modificar Horarios</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="v359_1"
          onClick={handleGuardarCambios}
        >
          Guardar Cambios
        </button>
      </div>

      {/* Tabla de empleados aceptados */}
      <div className="v281_0">
        <h2>Empleados Aceptados:</h2>
        <table id="empleadosAceptados" className="example">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nombre Empleado</th>
              <th>Área</th>
              <th>Sede</th>
              <th>Fecha de Aceptación</th>
            </tr>
          </thead>
          <tbody>
            {empleadosAceptados.map((empleado, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{empleado.nombre}</td>
                <td>{empleado.area}</td>
                <td>{empleado.sede}</td>
                <td>{empleado.fechaAceptacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Horarios;
