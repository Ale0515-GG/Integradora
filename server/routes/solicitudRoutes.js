import express from 'express';
import Solicitud from '../models/solicitudModels.js';

const router = express.Router();

router.post('/solicitudes', async (req, res) => {
  try {
    const nuevaSolicitud = new Solicitud(req.body);
    await nuevaSolicitud.save();
    res.status(201).json({ mensaje: 'Solicitud guardada correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router; // Exportar el router utilizando la sintaxis de ECMAScript
