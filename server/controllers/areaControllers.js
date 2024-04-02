import Area from "../models/areaModel.js";

export const getAreas = async (req, res) => {
  try {
    const data = await Area.find({});
    res.json({ success: true, data: data });
  } catch (error) {
    console.error("Error al obtener las áreas:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};

export const getAreaUno = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Area.findById(id);
    res.json({ success: true, data: data });
  } catch (error) {
    console.error("Error al obtener el área:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};

export const postArea = async (req, res) => {
  try {
    const data = new Area(req.body);
    await data.save();
    res.send({ success: true, message: "Área guardada exitosamente", data: data });
  } catch (error) {
    console.error("Error al guardar el área:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};

export const putArea = async (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  try {
    const data = await Area.findOneAndUpdate({ _id: id }, newData, { new: true });
    res.json({ success: true, message: "Datos del área actualizados exitosamente", data: data });
  } catch (error) {
    console.error("Error al actualizar los datos del área:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};

export const deleteArea = async (req, res) => {
  try {
    const id = req.params.id;
    await Area.deleteOne({ _id: id });
    res.send({ success: true, message: "El área se eliminó exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el área:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};
