import React, { useState } from 'react';
import '../SolicitudVacaciones/SoliVaca.css';

const SoliVaca = () => {
  // Estado para almacenar el historial de solicitudes de vacaciones
  const [historial, setHistorial] = useState([]);

  // Estado para los datos del formulario de solicitud de vacaciones
  const [formData, setFormData] = useState({
    nombre: '',
    fechaInicio: '',
    fechaFin: '',
    comentario: ''
  });

  // Estado para almacenar errores de validación
  const [errors, setErrors] = useState({});

  // Manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Validar el formulario antes de enviar
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
      valid = false;
    }

    if (!formData.fechaInicio.trim()) {
      newErrors.fechaInicio = 'La fecha de inicio es requerida';
      valid = false;
    }

    if (!formData.fechaFin.trim()) {
      newErrors.fechaFin = 'La fecha de fin es requerida';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Manejar envío del formulario de solicitud de vacaciones
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar el formulario
    if (!validateForm()) {
      return;
    }

    // Crear objeto de solicitud con los datos del formulario y la fecha actual
    const solicitud = {
      nombre: formData.nombre,
      fechaInicio: formData.fechaInicio,
      fechaFin: formData.fechaFin,
      comentario: formData.comentario,
      fechaSolicitud: new Date().toLocaleDateString()
    };

    // Agregar la solicitud al historial
    setHistorial([...historial, solicitud]);

    // Limpiar el formulario y los errores
    setFormData({
      nombre: '',
      fechaInicio: '',
      fechaFin: '',
      comentario: ''
    });
    setErrors({});
  };

  return (
    <div className="v206_2">
      <div className="v206_3"></div>
      <span className="v206_4">Solicitud de Vacaciones</span>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
        />
        {errors.nombre && <span style={{ color: 'red' }}>{errors.nombre}</span>}
        <label htmlFor="fechaInicio">Fecha de inicio:</label>
        <input
          type="date"
          id="fechaInicio"
          name="fechaInicio"
          value={formData.fechaInicio}
          onChange={handleInputChange}
        />
        {errors.fechaInicio && <span style={{ color: 'red' }}>{errors.fechaInicio}</span>}
        <label htmlFor="fechaFin">Fecha de fin:</label>
        <input
          type="date"
          id="fechaFin"
          name="fechaFin"
          value={formData.fechaFin}
          onChange={handleInputChange}
        />
        {errors.fechaFin && <span style={{ color: 'red' }}>{errors.fechaFin}</span>}
        <label htmlFor="comentario">Comentario:</label>
        <textarea
          id="comentario"
          name="comentario"
          value={formData.comentario}
          onChange={handleInputChange}
        ></textarea>
        <button type="submit">Enviar solicitud</button>
      </form>

      <div className="v206_13">
        <h2>Historial de Solicitudes</h2>
        <ul>
          {historial.map((solicitud, index) => (
            <li key={index}>
              <strong>Nombre:</strong> {solicitud.nombre}<br />
              <strong>Fecha de inicio:</strong> {solicitud.fechaInicio}<br />
              <strong>Fecha de fin:</strong> {solicitud.fechaFin}<br />
              <strong>Comentario:</strong> {solicitud.comentario}<br />
              <strong>Fecha de solicitud:</strong> {solicitud.fechaSolicitud}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SoliVaca;
