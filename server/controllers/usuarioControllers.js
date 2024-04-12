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

// Login
export const login = async (req, res) => {
    const { usuario, acceso } = req.body;

    try {
        const user = await UsuarioModel.findOne({ usuario });

        if (!user || user.acceso !== acceso) {
            return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
        }

        res.json({ 
            success: true, 
            message: "Inicio de sesión exitoso", 
            tipoUsuario: user.tipoUsuario,
            usuario: {
                nombreempleado: user.nombreempleado,
                correo: user.correo,
                numero: user.Numero_Empleado,
                area: user.area,
                sede: user.sede,
                contrato: user.Contrato
            }
        });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
};





import fs from 'fs';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' }); // Directorio donde se guardarán los archivos temporales

export const subirEmpleados = async (req, res) => {
    try {
        // Verificar si se cargó un archivo
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No se ha proporcionado ningún archivo" });
        }

        const rutaArchivo = req.file.path; // Ruta del archivo temporal
        const datosCrudos = fs.readFileSync(rutaArchivo);
        const empleados = JSON.parse(datosCrudos);

        // Iterar sobre los empleados y guardarlos en la base de datos
        for (const empleado of empleados) {
            // Crear un nuevo objeto de empleado con campos vacíos si faltan datos
            const nuevoEmpleado = new schemaEmpl({
                nombreempleado: empleado.nombreempleado || '',
                usuario: empleado.usuario || '',
                tipoUsuario: empleado.tipoUsuario || '',
                acceso: empleado.acceso || '', // Supongo que la contraseña se guarda en el campo "Contrasena"
                apellidoP: empleado.apellidoP || '',
                apellidoM: empleado.apellidoM || '',
                correo: empleado.correo || '',
                rol: empleado.rol || '',
                sede: empleado.sede || '',
                area: empleado.area || '',
                sexo: empleado.sexo || false, // Supongo que es un booleano
                cumpleanos: empleado.cumpleanos || null,
                tipoTurno: empleado.tipoTurno || 0, // Supongo que es un número
            });

            // Guardar el empleado en la base de datos
            await nuevoEmpleado.save();
        }

        // Eliminar el archivo temporal después de procesarlo
        fs.unlinkSync(rutaArchivo);

        res.json({ success: true, message: "Carga masiva de empleados completada exitosamente" });
    } catch (error) {
        console.error("Error al cargar empleados:", error);
        res.status(500).json({ success: false, message: "Error del servidor al cargar empleados" });
    }
};
