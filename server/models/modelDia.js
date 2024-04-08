// models/Horario.js
import mongoose from 'mongoose';

const horarioSchema = new mongoose.Schema({
  tipoContrato: { type: String, required: true },
  turno: { type: String, required: true },
});

const DiaH = mongoose.model('Horario', horarioSchema);

export default DiaH;
