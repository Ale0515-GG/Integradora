const express = require('express');
const router = express.Router();
const Solicitud = require('../models/Solicitud');

router.post('/solicitudes', async (req, res) => {
  try {
    const nuevaSolicitud = new Solicitud(req.body);
    await nuevaSolicitud.save();
    res.status(201).json({ mensaje: 'Solicitud guardada correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export { router as solictudRoutes };
