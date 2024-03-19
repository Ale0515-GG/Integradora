const mongoose = require('mongoose');

const solicitudSchema = new mongoose.Schema({
  nombre: String,
  departamento: String,
  tipoContrato: String,
  estado: String,
  historial: [{ accion: String, fecha: Date }],
});

const Solicitud = mongoose.model('Solicitud', solicitudSchema);

module.exports = Solicitud;
