// vistaHEController.js
import VistaHE from '../models/vistaHEModel.js';

export const getAllVistasHE = async (req, res) => {
  try {
    const vistasHE = await VistaHE.find();
    res.json(vistasHE);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createVistaHE = async (req, res) => {
  const vistaHE = new VistaHE({
    tipoContrato: req.body.tipoContrato
  });

  try {
    const nuevaVistaHE = await vistaHE.save();
    res.status(201).json(nuevaVistaHE);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateVistaHE = async (req, res) => {
  try {
    const vistaHE = await VistaHE.findById(req.params.id);
    if (vistaHE == null) {
      return res.status(404).json({ message: 'VistaHE no encontrada' });
    }
    if (req.body.tipoContrato != null) {
      vistaHE.tipoContrato = req.body.tipoContrato;
    }
    const vistaHEActualizada = await vistaHE.save();
    res.json(vistaHEActualizada);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteVistaHE = async (req, res) => {
  try {
    const vistaHE = await VistaHE.findById(req.params.id);
    if (vistaHE == null) {
      return res.status(404).json({ message: 'VistaHE no encontrada' });
    }
    await vistaHE.remove();
    res.json({ message: 'VistaHE eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
