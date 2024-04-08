import express from 'express';
import { actualizarSolicitud, crearSolicitud,eliminarSolicitudes } from '../controllers/solicitudController.js';
import { obtenerSolicitud } from '../controllers/solicitudController.js';

const router = express.Router();

router.post('/HorariosGuardado', crearSolicitud);
router.get('/TraerSoli', obtenerSolicitud);
router.put('/updateS', actualizarSolicitud);
router.delete('/borrar', eliminarSolicitudes);

export default router;
