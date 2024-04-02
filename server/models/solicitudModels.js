const mongoose = require('mongoose');

const solicitudSchema = new mongoose.Schema({
  dia: String,
  horaInicio: String,
  horaFin: String
});

const Solicitud = mongoose.model('Solicitud', solicitudSchema);

module.exports = Solicitud;
