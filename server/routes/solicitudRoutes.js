import express from 'express';
import { crearSolicitud } from '../controllers/solicitudController.js';

const router = express.Router();

router.post('/HorariosGuardado', crearSolicitud);

export default router;
