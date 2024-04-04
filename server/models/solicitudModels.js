import mongoose from 'mongoose';

const solicitudSchema = new mongoose.Schema({
  tipoContrato: {
    type: String,
    required: false
  },
  turno: {
    type: String,
    required: false
  }
});

const Solicitud = mongoose.model('Solicitud', solicitudSchema);

export default Solicitud;
