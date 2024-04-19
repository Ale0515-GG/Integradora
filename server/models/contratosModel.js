import mongoose from "mongoose";

const contratoSchema = new mongoose.Schema({
  nombreContrato: {
    type: String,
    required: true,
  },
  fechaInicio: {
    type: Date,
    required: true,
  },
  fechaFin: {
    type: Date,
    required: true,
  },
  diasLaborales: {
    type: Number,
    required: true,
  },
  diasDescanso: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Contrato", contratoSchema);
export default contratoSchema;
