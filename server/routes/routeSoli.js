const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solisControllers');

router.get('/', solicitudController.getAllSolicitudes);
router.post('/aprobar', solicitudController.aprobarSolicitud);
router.post('/rechazar', solicitudController.rechazarSolicitud);

module.exports = router;
