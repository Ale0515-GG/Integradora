import mongoose from 'mongoose';

const solicitudSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
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

export { Solicitud };
