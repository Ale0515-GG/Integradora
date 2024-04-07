import { Solicitud } from '../models/solicitudModels.js';

// Función para obtener todas las solicitudes
const obtenerSolicitud = async (req, res) => {
  try {
    // Obtener todas las solicitudes de la base de datos
    const solicitudes = await Solicitud.find({});
    
    // Si hay solicitudes, responder con los datos de las solicitudes
    if (solicitudes.length > 0) {
      res.json(solicitudes);
    } else {
      // Si no hay solicitudes, responder con un mensaje de error
      res.status(204).json({ mensaje: 'No se encontraron solicitudes' });
    }
  } catch (error) {
    // Si hay un error en el proceso, responder con un mensaje de error
    console.error('Error al obtener las solicitudes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para crear una nueva solicitud
const crearSolicitud = async (req, res) => {
  try {
    // Crear una nueva instancia de Solicitud con los datos recibidos
    const nuevaSolicitud = new Solicitud(req.body);
    
    // Guardar la solicitud en la base de datos
    await nuevaSolicitud.save();
    
    // Responder con un mensaje de éxito
    res.status(201).json({ mensaje: 'Solicitud guardada correctamente' });
  } catch (error) {
    // Si hay un error en el proceso, responder con un mensaje de error
    console.error('Error al guardar la solicitud:', error);
    res.status(500).json({ error: 'Error al guardar la solicitud' });
  }
};

// Función para actualizar una solicitud existente
const actualizarSolicitud = async (req, res) => {
  try {
    const { tipoContrato } = req.body;
    const { turno } = req.body;

    // Buscar la solicitud por tipo de contrato y actualizar su turno
    const solicitudActualizada = await Solicitud.findOneAndUpdate({ tipoContrato }, { turno }, { new: true });

    if (!solicitudActualizada) {
      return res.status(404).json({ mensaje: 'No se encontró ninguna solicitud con el tipo de contrato especificado' });
    }

    res.status(200).json({ mensaje: 'Solicitud actualizada correctamente', solicitud: solicitudActualizada });
  } catch (error) {
    console.error('Error al actualizar la solicitud:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const eliminarSolicitudes = async (req, res) => {
  try {
    // Eliminar todas las solicitudes de la base de datos
    const resultado = await Solicitud.deleteMany({});
    
    // Verificar si se eliminaron solicitudes
    if (resultado.deletedCount > 0) {
      res.status(200).json({ mensaje: 'Todas las solicitudes han sido eliminadas' });
    } else {
      res.status(404).json({ mensaje: 'No se encontraron solicitudes para eliminar' });
    }
  } catch (error) {
    console.error('Error al eliminar las solicitudes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


export { obtenerSolicitud, crearSolicitud, actualizarSolicitud, eliminarSolicitudes };
