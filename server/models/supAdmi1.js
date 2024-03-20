import mongoose from "mongoose";
const Schema = mongoose.Schema

//schema
const schemaSupAdmi = new Schema({
    nombreempleado: String,
    tipoUsuario:String,
    acceso:String,
    apellidoP: String,
    apellidoM: String,
    correo: String,
    rol: String,
    sede: String,
    area: String,
    sexo: Boolean,
    cumpleanos:Date,
    tipoTurno: Number,
},{
    timestamps: true
})

export default mongoose.model("administradores", schemaSupAdmi);
