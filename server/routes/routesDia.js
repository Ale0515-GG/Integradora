

// routes/horariosRoutes.js
import express from 'express';
import { obtenerHorarios } from '../controllers/diaController.js';

const router = express.Router();

router.get('/xd', obtenerHorarios);


export default router;
