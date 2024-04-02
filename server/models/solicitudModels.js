import mongoose from 'mongoose';

const solicitudSchema = new mongoose.Schema({
  dia: String,
  horaInicio: String,
  horaFin: String
});

const Solicitud = mongoose.model('Solicitud', solicitudSchema);

export default Solicitud;
