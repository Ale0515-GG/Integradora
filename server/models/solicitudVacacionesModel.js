import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define el esquema para la solicitud de vacaciones
const vacacionesSchema = new Schema({
  fechaIni: Date,
  fechaTer: Date,
  fechaRealizada: { type: Date, default: Date.now }, // Fecha en que se realizó la solicitud, se establece automáticamente
  nombreempleado: String,
  sede: String,
  area: String,
  status: String,
}, {
  timestamps: true // Registra automáticamente los campos createdAt y updatedAt
});

// Exporta el modelo de solicitud de vacaciones
export default mongoose.model("Vacaciones", vacacionesSchema);
