import schemaEmpl from "../models/usuarioModel.js";
import bcrypt from 'bcrypt';

// Función para obtener todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
        const data = await schemaEmpl.find({});
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Función para obtener un usuario por su ID
export const getUsuariosUno = async (req, res) => {
    const { id } = req.params;
    try {
        let data;
        if (id) {
            data = await schemaEmpl.findById(id);
        } else {
            data = await schemaEmpl.find({});
        }
        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Función para crear un nuevo usuario
export const postUsuarios = async (req, res) => {
    try {
        const data = new schemaEmpl(req.body);
        await data.save();
        res.send({ success: true, message: "Dato guardado exitosamente", data: data });
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Función para actualizar un usuario por su ID
export const putUsuarios = async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const data = await schemaEmpl.findByIdAndUpdate(id, newData, { new: true });
        if (!data) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }
        res.json({ success: true, message: "El usuario se actualizó correctamente", data: data });
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Función para eliminar un usuario por su ID
export const deleteUsuarios = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await schemaEmpl.deleteOne({ _id: id });
        res.send({ success: true, message: "El dato se eliminó con éxito", data: data });
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};

// Función para verificar las credenciales de inicio de sesión
export const verificarCredenciales = async (usuario, accesoPlano) => {
    const usuarioEncontrado = await schemaEmpl.findOne({ usuario });
    if (usuarioEncontrado) {
        const match = await bcrypt.compare(accesoPlano, usuarioEncontrado.acceso);
        if (match) {
            return usuarioEncontrado;
        }
    }
    return null;
};

// Función para verificar si existe el usuario
export const verificarUsuarioExistente = async (usuario) => {
    const usuarioEncontrado = await schemaEmpl.findOne({ usuario });
    return usuarioEncontrado ? true : false;
};

// Ruta para iniciar sesión
export const loginUsuario = async (req, res) => {
    const { usuario, acceso } = req.body;
    try {
        const existeUsuario = await verificarUsuarioExistente(usuario);
        if (!existeUsuario) {
            return res.status(404).json({ success: false, message: "El usuario no existe" });
        }
        const usuarioValido = await verificarCredenciales(usuario, acceso);
        if (usuarioValido) {
            res.json({ success: true, message: "Inicio de sesión exitoso" });
        } else {
            res.status(401).json({ success: false, message: "Credenciales incorrectas" });
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};
