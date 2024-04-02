const Solicitud = require('../models/Solicitud');

exports.crearSolicitud = async (req, res) => {
  try {
    const nuevaSolicitud = new Solicitud(req.body);
    await nuevaSolicitud.save();
    res.status(201).json({ mensaje: 'Solicitud guardada correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
