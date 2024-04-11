import express from 'express';
import { createActividad, getAllActividades } from '../controllers/activitiController.js';

const router = express.Router();

// Ruta para crear una nueva actividad
router.post('/actividades', createActividad);

// Ruta para obtener todas las actividades
router.get('/', getAllActividades);

export default router;
