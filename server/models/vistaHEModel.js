// vistaHEModel.js
import mongoose from 'mongoose';

const vistaHESchema = new mongoose.Schema({
  tipoContrato: String
});

const VistaHE = mongoose.model('VistaHE', vistaHESchema);

export default VistaHE;
