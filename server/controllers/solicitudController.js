import { Solicitud } from '../models/solicitudModels.js';
import axios from "axios";

// Función para obtener una solicitud por su ID
const obtenerSolicitud = async (req, res) => {
  try {
    // Obtener el ID de la solicitud de los parámetros de la solicitud
    

    // Buscar la solicitud por ID en la base de datos
    const solicitud = await Solicitud.find({});

    if (solicitud) {
      // Si se encuentra la solicitud, responder con los datos de la solicitud
      res.json(solicitud);
    } else {
      // Si no se encuentra la solicitud, responder con un mensaje de error
      res.status(204).json({ mensaje: 'No se encontró ninguna solicitud con ese ID' });
    }
  } catch (error) {
    // Si hay un error en el proceso, responder con un mensaje de error
    console.error('Error al obtener la solicitud por ID:', error);
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

export { obtenerSolicitud , crearSolicitud };
