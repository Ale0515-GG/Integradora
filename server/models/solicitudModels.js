import mongoose from 'mongoose';

const solicitudSchema = new mongoose.Schema({
  nombre: String,
  descanso: String,
  horario: String,
  estado: String
});

const Solicitud = mongoose.model('Solicitud', solicitudSchema);

export default Solicitud;
