import * as solicitudVacacionesControllers from "../controllers/solicitudVacacionesController.js";
import express from 'express';
const router = express.Router();

router.post("/create", solicitudVacacionesControllers.postSolicitudVacaciones);
router.put("/update/:id", solicitudVacacionesControllers.putSolicitudVacaciones);
router.delete("/delete/:id", solicitudVacacionesControllers.deleteSolicitudVacaciones);
router.get("/", solicitudVacacionesControllers.getHistorialSolicitudesVacaciones);

export { router as routerSolicitudesVacaciones };
