import express from "express";
import * as usuarioControllers from "../controllers/usuarioControllers.js"

const router = express.Router();

router.get("/",usuarioControllers.getUsuarios)
router.get("/:id",usuarioControllers.getUsuariosUno)
router.post("/create",usuarioControllers.postUsuarios)
router.put("/update/:id",usuarioControllers.putUsuarios)
router.delete("/delete/:id",usuarioControllers.deleteUsuarios)

// Ruta para iniciar sesión
router.post("/login", async (req, res) => {
    const { usuario, acceso } = req.body;
    try {
        const usuarioValido = await usuarioControllers.verificarCredenciales(usuario, acceso);
        if (usuarioValido) {
            res.json({ success: true, message: "Inicio de sesión exitoso" });
        } else {
            res.status(401).json({ success: false, message: "Credenciales incorrectas" });
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});

// Ruta para verificar si existe el usuario
router.post("/verificarUsuario", async (req, res) => {
    const { usuario } = req.body;
    try {
        const existeUsuario = await usuarioControllers.verificarUsuarioExistente(usuario);
        if (existeUsuario) {
            res.json({ success: true, message: "Usuario encontrado" });
        } else {
            res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al verificar usuario:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
});

export {router as routerUsuarios}