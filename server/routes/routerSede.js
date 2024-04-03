// routerSede.js

import express from "express";
import * as sedeControllers from "../controllers/sedeControllers.js";

const router = express.Router();

router.get("/", sedeControllers.getSedes);
router.get("/:id", sedeControllers.getSedeUno);
router.post("/create", sedeControllers.postSede);
router.put("/update/:id", sedeControllers.putSede);
router.delete("/delete/:id", sedeControllers.deleteSede);
router.delete("/deleteArea/:id/:areaId", sedeControllers.deleteAreaFromSede);

export { router as routerSede };
