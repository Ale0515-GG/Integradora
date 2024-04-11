import * as solicitudVacacionesControllers from "../controllers/solicitudVacacionesControllers.js";
import express from 'express';
const router = express.Router();

router.get("/", solicitudVacacionesControllers.getSolicitudesVacaciones);
router.post("/create", solicitudVacacionesControllers.postSolicitudVacaciones);
router.put("/update/:id", solicitudVacacionesControllers.putSolicitudVacaciones);
router.delete("/delete/:id", solicitudVacacionesControllers.deleteSolicitudVacaciones);

export { router as routerSolicitudesVacaciones };
