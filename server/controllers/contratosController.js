import Contrato from '../models/contratosModel.js';

export const getContratos = async (req, res) => {
  try {
    const data = await Contrato.find({});
    res.json({ success: true, data: data });
  } catch (error) {
    console.error("Error al obtener los contratos:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};

export const getContratoById = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Contrato.findById(id);
    res.json({ success: true, data: data });
  } catch (error) {
    console.error("Error al obtener el contrato:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};



export const agregarContrato = async (req, res) => {
  try {
    const nuevoContrato = new Contrato(req.body);
    const contratoGuardado = await nuevoContrato.save();
    res.status(201).json({ success: true, data: contratoGuardado });
  } catch (error) {
    console.error("Error al agregar un contrato:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};


export const actualizarContrato = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    const contratoActualizado = await Contrato.findByIdAndUpdate(id, newData, { new: true });
    res.json({ success: true, message: "Contrato actualizado exitosamente", data: contratoActualizado });
  } catch (error) {
    console.error("Error al actualizar el contrato:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};

export const eliminarContrato = async (req, res) => {
  const { id } = req.params;

  try {
    const contratoEliminado = await Contrato.findByIdAndDelete(id);
    res.json({ success: true, message: "Contrato eliminado exitosamente", data: contratoEliminado });
  } catch (error) {
    console.error("Error al eliminar el contrato:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};
