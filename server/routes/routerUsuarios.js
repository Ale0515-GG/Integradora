
import * as usuarioControllers from "../controllers/usuarioControllers.js";
import express from 'express';
import multer from 'multer';


const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get("/", usuarioControllers.getUsuarios);
router.get("/:id", usuarioControllers.getUsuariosUno);
router.post("/create", usuarioControllers.postUsuarios);
router.put("/update/:id", usuarioControllers.putUsuarios);
router.delete("/delete/:id", usuarioControllers.deleteUsuarios);
router.post("/usuarios/login", usuarioControllers.loginUsuario);
router.post("/login", usuarioControllers.loginUsuario);
router.post("/subirEmpleados", upload.single('archivo'), usuarioControllers.subirEmpleados);

export { router as routerUsuarios };
