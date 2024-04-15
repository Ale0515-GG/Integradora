import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { routerArea } from "./routes/routerArea.js";
import { routerUsuarios } from './routes/routerUsuarios.js';
import { routerSede } from './routes/routerSede.js';
import solicitudRoutes from './routes/solicitudRoutes.js'; // Usar import en lugar de require
import diaRoute from './routes/routesDia.js'
import actividadRoutes from './routes/activitiRoute.js';
import { routerSolicitudesVacaciones } from "./routes/routerSolicitudVacaciones.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Cadena de conexión a MongoDB Atlas (reemplaza <usuario>, <contraseña> y <basededatos>)
const uri = 'mongodb+srv://mayra:Tx1xnowEWqYRYc1O@<cluster>.smyne7t.mongodb.net/gatitos?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(error => console.error('Error al conectar a MongoDB Atlas:', error));

app.use('/usuarios', routerUsuarios);
app.use('/sede', routerSede);
app.use('/activi', actividadRoutes)
app.use('/solicitudVacaciones', routerSolicitudesVacaciones);
app.use('/area', routerArea);
app.use('/dia', diaRoute)
app.use('/SolicitudesH', solicitudRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
