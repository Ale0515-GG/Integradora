const express = require('express');
const router = express.Router();
const Solicitud = require('../models/solicitud');

// Endpoint para obtener todas las solicitudes
router.get('/aprobaciones', async (req, res) => {
  try {
    const solicitudes = await Solicitud.find();
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint para aprobar una solicitud
router.post('/aprobar', async (req, res) => {
  const { id } = req.body;
  try {
    const solicitud = await Solicitud.findById(id);
    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }
    solicitud.estado = 'aprobado';
    solicitud.historial.push({ accion: 'aprobado', fecha: new Date() });
    await solicitud.save();
    res.json(solicitud);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint para rechazar una solicitud
router.post('/rechazar', async (req, res) => {
  const { id } = req.body;
  try {
    const solicitud = await Solicitud.findById(id);
    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }
    solicitud.estado = 'rechazado';
    solicitud.historial.push({ accion: 'rechazado', fecha: new Date() });
    await solicitud.save();
    res.json(solicitud);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
