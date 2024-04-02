import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { routerUsuarios } from "./routes/routerUsuarios.js";
import { routerSede } from "./routes/routerSede.js";

import solicitudRouter from './routes/routeSoli.js'; // Usar import en lugar de require
import { routerArea } from "./routes/routerArea.js";




const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/gatitos", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(error => console.error('Error al conectar a MongoDB:', error));

app.use('/usuarios', routerUsuarios);
app.use('/sede', routerSede);

app.use('/soli',solicitudRouter); 
app.use('/area', routerArea)


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
