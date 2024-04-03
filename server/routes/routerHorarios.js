const express = require('express');
const router = express.Router();
const { Empleado, EmpleadoAceptado } = require('./models');

// Ruta para obtener todos los empleados
router.get('/empleados', async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.json(empleados);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para agregar un nuevo empleado
router.post('/empleados', async (req, res) => {
  const empleado = new Empleado({
    nombre: req.body.nombre,
    area: req.body.area,
    sede: req.body.sede,
    dia: req.body.dia
  });

  try {
    const nuevoEmpleado = await empleado.save();
    res.status(201).json(nuevoEmpleado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta para eliminar un empleado por ID
router.delete('/empleados/:id', async (req, res) => {
  try {
    await Empleado.findByIdAndRemove(req.params.id);
    res.json({ message: 'Empleado eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para obtener todos los empleados aceptados
router.get('/empleados-aceptados', async (req, res) => {
  try {
    const empleadosAceptados = await EmpleadoAceptado.find();
    res.json(empleadosAceptados);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para agregar un empleado aceptado
router.post('/empleados-aceptados', async (req, res) => {
  const empleadoAceptado = new EmpleadoAceptado({
    nombre: req.body.nombre,
    area: req.body.area,
    sede: req.body.sede,
    fechaAceptacion: req.body.fechaAceptacion
  });

  try {
    const nuevoEmpleadoAceptado = await empleadoAceptado.save();
    res.status(201).json(nuevoEmpleadoAceptado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
