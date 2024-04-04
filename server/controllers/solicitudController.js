import Solicitud from '../models/solicitudModels.js';

const crearSolicitud = async (req, res) => {
  try {
    const nuevaSolicitud = new Solicitud(req.body);
    await nuevaSolicitud.save();
    res.status(201).json({ mensaje: 'Solicitud guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar la solicitud:', error);
    res.status(500).json({ error: 'Error al guardar la solicitud' });
  }
};

export { crearSolicitud };
