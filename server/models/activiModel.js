import mongoose from 'mongoose';

const actividadSchema = new mongoose.Schema({
  empleado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado',
    required: false
  },
  nombre: {
    type: String,
    required: false
  },
  fechaInicio: {
    type: Date,
    required: false
  },
  fechaFin: {
    type: Date,
    required: false
  }
});

const Actividad = mongoose.model('Actividad', actividadSchema);

export default Actividad;
