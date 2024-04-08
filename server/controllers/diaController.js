// controllers/horariosController.js
import DiaH from '../models/modelDia.js';

export const obtenerHorarios = async (req, res) => {
  try {
    const horarios = await DiaH.find();
    res.json(horarios);
  } catch (error) {
    console.error('Error al obtener los horarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default {obtenerHorarios};