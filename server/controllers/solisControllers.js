import Solicitud from '../models/sedeModel.js';

export async function getAllSolicitudes(req, res) {
  try {
    const solicitudes = await Solicitud.find();
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function aprobarSolicitud(req, res) {
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
}

export async function rechazarSolicitud(req, res) {
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
}
