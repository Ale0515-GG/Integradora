import vacacionesSchema from "../models/solicitudVacacionesModel.js";

export const getSolicitudesVacaciones = async (req, res) => {
    try {
        const data = await vacacionesSchema.find({});
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Error al obtener las solicitudes de vacaciones:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

export const postSolicitudVacaciones = async (req, res) => {
  try {
    const { fechas, nombreempleado, sede, area, status } = req.body;

    const nuevaSolicitud = new vacacionesSchema({
      fechaIni: new Date(fechas[0]), // Fecha de inicio de las vacaciones
      fechaTer: new Date(fechas[fechas.length - 1]), // Fecha de fin de las vacaciones
      nombreempleado, // Nombre del empleado
      sede, // Sede
      area, // Área
      status, // Estado de la solicitud
    });

    await nuevaSolicitud.save();

    res.send({ success: true, message: "Solicitud de vacaciones guardada exitosamente", data: nuevaSolicitud });
  } catch (error) {
    console.error("Error al crear la solicitud de vacaciones:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};


export const putSolicitudVacaciones = async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const data = await vacacionesSchema.findByIdAndUpdate(id, newData, { new: true });
        if (!data) {
            return res.status(404).json({ success: false, message: "Solicitud de vacaciones no encontrada" });
        }
        res.json({ success: true, message: "La solicitud de vacaciones se actualizó correctamente", data: data });
    } catch (error) {
        console.error("Error al actualizar la solicitud de vacaciones:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};


export const deleteSolicitudVacaciones = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await vacacionesSchema.deleteOne({ _id: id });
        res.send({ success: true, message: "La solicitud de vacaciones se eliminó con éxito", data: data });
    } catch (error) {
        console.error("Error al eliminar la solicitud de vacaciones:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

export const getHistorialSolicitudesVacaciones = async (req, res) => {
  try {
    const historial = await vacacionesSchema.find({}).sort({ fechaRealizada: -1 });
    res.json({ success: true, data: historial });
  } catch (error) {
    console.error("Error al obtener el historial de solicitudes de vacaciones:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};