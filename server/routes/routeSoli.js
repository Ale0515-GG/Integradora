import express from "express";
import * as solicitudController from '../controllers/solisControllers.js';

const router = express.Router();

router.get('/', solicitudController.getAllSolicitudes);
router.post('/aprobar', solicitudController.aprobarSolicitud);
router.post('/rechazar', solicitudController.rechazarSolicitud);

export default router; // Exportar el router como valor predeterminado
