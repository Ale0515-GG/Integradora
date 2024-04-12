import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../Actividades/Activi.css'

function ActivityCRUD() {
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(''); // Nuevo estado para almacenar el empleado seleccionado
  const [isEmployeeDataLoaded, setIsEmployeeDataLoaded] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false); // Estado para mostrar u ocultar el formulario
  const [formData, setFormData] = useState({
    nombre: '', // Solo necesitas el nombre de la actividad aquí
    empleadoId: '' // Agregar campo para el ID del empleado
  }); // Estado para almacenar los datos del formulario

  useEffect(() => {
    // Obtener datos de empleados
    axios.get('http://localhost:3001/usuarios')
      .then(response => {
        if (response.data && Array.isArray(response.data.data)) {
          setEmployeeData(response.data.data);
          setIsEmployeeDataLoaded(true);
        } else {
          console.error('Los datos de empleados no son un array:', response.data);
        }
      })
      .catch(error => {
        console.error('Error al obtener datos de empleados:', error);
      });
  }, []);

  // Función para seleccionar un empleado
  const selectEmployee = (employeeId) => {
    const employee = employeeData.find(emp => emp._id === employeeId);
    setSelectedEmployee(employee.nombreempleado);
    setFormData({ ...formData, empleadoId: employeeId });
    setShowForm(true); // Mostrar el formulario cuando se selecciona un empleado
  };

  // Función para asignar actividad a un empleado
  const asignarActividad = () => {
    if (!selectedEmployee) {
      console.error('No se ha seleccionado un empleado.');
      return;
    }

    // Estructura de la petición POST para asignar actividad
    const requestBody = {
      empleadoId: formData.empleadoId,
      nombre: formData.nombre,
      fechaInicio: selectedStartDate,
      fechaFin: selectedEndDate
    };

    // Petición POST para asignar actividad al empleado
    axios.post('http://localhost:3001/activi/actividades', requestBody)
      .then(response => {
        console.log(`Actividad "${formData.nombre}" asignada al empleado ${selectedEmployee}`);
        // Aquí podrías actualizar el estado o realizar otras acciones si es necesario
      })
      .catch(error => {
        console.error('Error al asignar actividad:', error);
      });
  };

  // Función para manejar cambios en el formulario
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    asignarActividad(); // Llamar a la función para asignar actividad al enviar el formulario
    setShowForm(false); // Ocultar el formulario después de enviarlo
  };

  return (
    <div className="Activi-container">
    <h1 className="Activi-title">CRUD de Actividades</h1>
    {isEmployeeDataLoaded ? (
      <div className="Activi-select-container">
        <label className="Activi-select-label">Selecciona un empleado:</label>
        <select className="Activi-select" value={formData.empleadoId} onChange={(e) => selectEmployee(e.target.value)}>
          <option value="">Selecciona un empleado</option>
          {employeeData.map(employee => (
            <option key={employee._id} value={employee._id}>{employee.nombreempleado}</option>
          ))}
        </select>
      </div>
    ) : (
      <p>Cargando datos de empleados...</p>
    )}
  
    {/* Formulario para agregar actividad */}
    {selectedEmployee && showForm && (
      <form className="Activi-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre" className="Activi-form-label">Nombre de la actividad:</label>
          <input type="text" id="nombre" name="nombre" onChange={handleFormChange} className="Activi-input" required />
        </div>
        <div>
          <label className="Activi-form-label">Seleccionar Fecha de Inicio:</label>
          <Calendar onChange={date => setSelectedStartDate(date)} value={selectedStartDate} />
        </div>
        <div>
          <label className="Activi-form-label">Seleccionar Fecha de Fin:</label>
          <Calendar onChange={date => setSelectedEndDate(date)} value={selectedEndDate} />
        </div>
        <button type="submit" className="Activi-button">Agregar</button>
      </form>
    )}
  </div>
  
  );
}

export default ActivityCRUD;
