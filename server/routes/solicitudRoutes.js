import express from 'express';
import { crearSolicitud } from '../controllers/solicitudController.js';
import {obtenerSolicitudes } from '../controllers/solicitudController.js'

const router = express.Router();

router.post('/HorariosGuardado', crearSolicitud);
router.get('/TraerSoli', obtenerSolicitudes);

export default router;
