import express from "express";
import * as contratoControllers from "../controllers/contratoControllers.js";

const router = express.Router();

router.get("/", contratoControllers.getContratos);
router.get("/:id", contratoControllers.getContratoById);
router.post("/create", contratoControllers.agregarContrato);
router.put("/update/:id", contratoControllers.actualizarContrato);
router.delete("/delete/:id", contratoControllers.eliminarContrato);

export { router as routerContrato };
export default router;