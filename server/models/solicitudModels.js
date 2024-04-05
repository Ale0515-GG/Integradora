import { fabClasses } from '@mui/material';
import mongoose from 'mongoose';

const solicitudSchema = new mongoose.Schema({
  id: {
    type: String,
    required:true,
    unique: true
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

export default Solicitud;
