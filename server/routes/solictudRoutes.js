import express from 'express';
import solicitudController from '../controllers/solicitudController';

const router = express.Router();

router.get('/solicitudes', solicitudController.obtenerSolicitudes);
router.post('/solicitudes', solicitudController.crearSolicitud);
router.delete('/solicitudes/:id', solicitudController.eliminarSolicitud);

export default router;
