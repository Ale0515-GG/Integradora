import express from "express";
import * as supAdmi1Controllers from "../controllers/supAdmi1Controllers.js";

const router = express.Router();

router.get("/", supAdmi1Controllers.getAdministradores );
router.get("/:id", supAdmi1Controllers.getAdministradores1);
router.post("/create", supAdmi1Controllers.postAdministradores);
router.put("/update/:id", supAdmi1Controllers.putAdministradores);
router.delete("/delete/:id", supAdmi1Controllers.deleteAdministradores);

export { router as routerSupAdmi1 };