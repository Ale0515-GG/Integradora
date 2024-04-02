import mongoose from "mongoose";

const Schema = mongoose.Schema;

const areasSchema = new Schema({
    Nombre: String,
    Tipo: String,
    Administradores: [
        { Id_Admin: Number }
    ],
    sedes: [
        {
            Tipo: String,
            NombreArea: String
        }
    ],
    Empleados:
    [
        {id:Number}
    ]
}, {
  timestamps: true
});

export default mongoose.model("area", areasSchema);
