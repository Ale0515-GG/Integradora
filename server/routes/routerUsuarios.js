import express from "express";
import * as usuarioControllers from "../controllers/usuarioControllers.js";

const router = express.Router();

router.get("/", usuarioControllers.getUsuarios);
router.get("/:id", usuarioControllers.getUsuariosUno);
router.post("/create", usuarioControllers.postUsuarios);
router.put("/update/:id", usuarioControllers.putUsuarios);
router.delete("/delete/:id", usuarioControllers.deleteUsuarios);
router.post("/login", usuarioControllers.loginUsuario);

export { router as routerUsuarios };
