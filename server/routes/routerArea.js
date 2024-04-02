import express from "express";
import * as areaControllers from "../controllers/areaControllers.js";

const router = express.Router();

router.get("/", areaControllers.getAreas);
router.get("/:id", areaControllers.getAreaUno);
router.post("/create", areaControllers.postArea);
router.put("/update/:id", areaControllers.putArea);
router.delete("/delete/:id", areaControllers.deleteArea);
 
export { router as routerArea };