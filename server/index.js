import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { routerArea } from "./routes/routerArea.js";
import { routerUsuarios } from './routes/routerUsuarios.js';
import { routerSede } from './routes/routerSede.js';
import solicitudRoutes from './routes/solicitudRoutes.js'; // Usar import en lugar de require
;

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/gatitos", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(error => console.error('Error al conectar a MongoDB:', error));

app.use('/usuarios', routerUsuarios);
app.use('/sede', routerSede);

 
app.use('/area', routerArea);

app.use('/SolicitudesH', solicitudRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
