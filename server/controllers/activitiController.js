import Actividad from '../models/activiModel.js';

// Controlador para crear una nueva actividad
export const createActividad = async (req, res) => {
  try {
    const { empleadoId, nombre, fechaInicio, fechaFin } = req.body;
    const actividad = new Actividad({ empleado: empleadoId, nombre, fechaInicio, fechaFin });
    await actividad.save();
    res.status(201).json({ message: 'Actividad creada correctamente', actividad });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear actividad' });
  }
};

// Controlador para obtener todas las actividades
export const getAllActividades = async (req, res) => {
  try {
    const actividades = await Actividad.find();
    res.status(200).json(actividades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener actividades' });
  }
};
