import Solicitud from '../models/solicitudModels.js';

// Función para obtener todas las solicitudes de horarios
const obtenerSolicitudes = async (req, res) => {
  try {
    // Obtener todas las solicitudes de la base de datos
    const solicitudes = await Solicitud.find({}, { tipoContrato: 1, turno: 1 }); // Obtener solo los campos 'tipoContrato' y 'turno'
    res.json(solicitudes);
  } catch (error) {
    console.error('Error al obtener las solicitudes de horarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para crear una nueva solicitud
const crearSolicitud = async (req, res) => {
  try {
    // Validar los datos de la solicitud
    const { error } = Solicitud.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Crear una nueva instancia de Solicitud
    const nuevaSolicitud = new Solicitud(req.body);
    
    // Guardar la solicitud en la base de datos
    await nuevaSolicitud.save();
    
    // Responder con un mensaje de éxito
    res.status(201).json({ mensaje: 'Solicitud guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar la solicitud:', error);
    res.status(500).json({ error: 'Error al guardar la solicitud' });
  }
};

export { obtenerSolicitudes, crearSolicitud };
