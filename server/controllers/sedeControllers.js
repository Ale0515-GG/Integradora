// sedeControllers.js

import Sede from "../models/sedeModel.js";

export const getSedes = async (req, res) => {
  try {
    const data = await Sede.find({});
    res.json({ success: true, data: data });
  } catch (error) {
    console.error("Error al obtener las sedes:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};

export const getSedeUno = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Sede.findById(id);
    res.json({ success: true, data: data });
  } catch (error) {
    console.error("Error al obtener la sede:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};

export const postSede = async (req, res) => {
  try {
    const data = new Sede(req.body);
    await data.save();
    res.send({ success: true, message: "Sede guardada exitosamente", data: data });
  } catch (error) {
    console.error("Error al guardar la sede:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};

export const putSede = async (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  try {
    const data = await Sede.findOneAndUpdate({ _id: id }, newData, { new: true });
    res.json({ success: true, message: "Datos de la sede actualizados exitosamente", data: data });
  } catch (error) {
    console.error("Error al actualizar los datos de la sede:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};

export const deleteSede = async (req, res) => {
  try {
    const id = req.params.id;
    await Sede.deleteOne({ _id: id });
    res.send({ success: true, message: "La sede se eliminó exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la sede:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};

export const deleteAreaFromSede = async (req, res) => {
  try {
    const { id, areaId } = req.params;
    const sede = await Sede.findById(id);

    if (!sede) {
      return res.status(404).json({ success: false, message: "Sede no encontrada" });
    }

    sede.Areas = sede.Areas.filter(area => area._id != areaId);
    await sede.save();

    res.json({ success: true, message: "Área eliminada de la sede exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el área de la sede:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};
