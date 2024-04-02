import Solicitud from '../models/solicitudModel.js';

export const obtenerSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Solicitud.find();
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const crearSolicitud = async (req, res) => {
  const solicitud = new Solicitud({
    nombre: req.body.nombre,
    descanso: req.body.descanso,
    horario: req.body.horario,
    estado: req.body.estado
  });

  try {
    const nuevaSolicitud = await solicitud.save();
    res.status(201).json(nuevaSolicitud);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const eliminarSolicitud = async (req, res) => {
  try {
    await Solicitud.findByIdAndRemove(req.params.id);
    res.json({ message: 'Solicitud eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
