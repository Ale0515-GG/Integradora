import mongoose from "mongoose";
const Schema = mongoose.Schema

//schema
const schemaEmpl = new Schema({
    nombreempleado: String,
    usuario:String,
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

export default mongoose.model("empleado", schemaEmpl);
