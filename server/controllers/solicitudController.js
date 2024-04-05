import Solicitud from '../models/solicitudModels.js';

// Función para obtener una solicitud por su ID
const obtenerSolicitud = async (req, res) => {
  try {
    // Obtener el ID de la solicitud de los parámetros de la solicitud
    const { id } = req.params;

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
    // Generar un ID único para la nueva solicitud
    const idUnico = uuidv4();

    // Validar los datos de la solicitud
    const { error } = solicitudSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Crear una nueva instancia de Solicitud con el ID único
    const nuevaSolicitud = new Solicitud({ ...req.body, id: idUnico });
    
    // Guardar la solicitud en la base de datos
    await nuevaSolicitud.save();
    
    // Responder con un mensaje de éxito
    res.status(201).json({ mensaje: 'Solicitud guardada correctamente', id: idUnico });
  } catch (error) {
    // Si hay un error en el proceso, responder con un mensaje de error
    console.error('Error al guardar la solicitud:', error);
    res.status(500).json({ error: 'Error al guardar la solicitud' });
  }
};

export { obtenerSolicitud , crearSolicitud };
