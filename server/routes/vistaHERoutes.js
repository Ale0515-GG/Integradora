// vistaHERoutes.js
import express from 'express';
import { getAllVistasHE, createVistaHE, updateVistaHE, deleteVistaHE } from '../controllers/vistaHEController.js';

const router = express.Router();

router.get('/', getAllVistasHE);
router.post('/', createVistaHE);
router.patch('/:id', updateVistaHE);
router.delete('/:id', deleteVistaHE);

export default router;
