const mongoose = require('mongoose');

// Definir el esquema para los empleados
const empleadoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  sede: {
    type: String,
    required: true
  },
  dia: {
    type: Date,
    required: true
  }
});

// Definir el esquema para los empleados aceptados
const empleadoAceptadoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  sede: {
    type: String,
    required: true
  },
  fechaAceptacion: {
    type: Date,
    required: true,
    default: Date.now
  }
});

// Crear modelos basados en los esquemas
const Empleado = mongoose.model('Empleado', empleadoSchema);
const EmpleadoAceptado = mongoose.model('EmpleadoAceptado', empleadoAceptadoSchema);

module.exports = { Empleado, EmpleadoAceptado };
