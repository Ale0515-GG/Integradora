import express from 'express';
import { crearSolicitud } from '../controllers/solicitudController.js';
import {obtenerSolicitud } from '../controllers/solicitudController.js'

const router = express.Router();

router.post('/HorariosGuardado', crearSolicitud);
router.get('/TraerSoli', obtenerSolicitud);

export default router;
