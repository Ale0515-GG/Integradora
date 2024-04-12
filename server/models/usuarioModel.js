import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema

//schema
const schemaEmpl = new Schema({
    nombreempleado: String,
    usuario:String,
    tipoUsuario:String,
    acceso:String,//este apartado es la contraseña password es en donde se guarda es con ese nombre
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

schemaEmpl.pre('save', async function (next) {
    if (!this.isModified('acceso')) {
        return next();
    }
    try {
        const hashedPassword = await bcrypt.hash(this.acceso, 10);
        this.acceso = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

export default mongoose.model("empleados", schemaEmpl);
