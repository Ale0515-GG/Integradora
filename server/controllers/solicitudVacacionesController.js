import Vacaciones from "../models/solicitudVacacionesModel.js";

// Función para obtener todas las solicitudes de vacaciones
export const getSolicitudesVacaciones = async (req, res) => {
    try {
        const data = await Vacaciones.find({});
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Error al obtener las solicitudes de vacaciones:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Función para crear una nueva solicitud de vacaciones
export const postSolicitudVacaciones = async (req, res) => {
    try {
        const data = new Vacaciones(req.body);
        await data.save();
        res.send({ success: true, message: "Solicitud de vacaciones guardada exitosamente", data: data });
    } catch (error) {
        console.error("Error al crear la solicitud de vacaciones:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Función para actualizar una solicitud de vacaciones por su ID
export const putSolicitudVacaciones = async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const data = await Vacaciones.findByIdAndUpdate(id, newData, { new: true });
        if (!data) {
            return res.status(404).json({ success: false, message: "Solicitud de vacaciones no encontrada" });
        }
        res.json({ success: true, message: "La solicitud de vacaciones se actualizó correctamente", data: data });
    } catch (error) {
        console.error("Error al actualizar la solicitud de vacaciones:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Función para eliminar una solicitud de vacaciones por su ID
export const deleteSolicitudVacaciones = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Vacaciones.deleteOne({ _id: id });
        res.send({ success: true, message: "La solicitud de vacaciones se eliminó con éxito", data: data });
    } catch (error) {
        console.error("Error al eliminar la solicitud de vacaciones:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};
