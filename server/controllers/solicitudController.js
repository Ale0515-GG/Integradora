import Solicitud from '../models/solicitudModels.js';

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

export { crearSolicitud };
