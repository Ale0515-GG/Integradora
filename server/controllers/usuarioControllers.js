import schemaEmpl from "../models/usuarioModel.js"


//read
export const getUsuarios = async(req,res)=>{
    try{
        const data = await schemaEmpl.find({})
        res.json({success:true, data:data})
    }catch(error){
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
}

//read
export const getUsuariosUno = async (req, res) => {
    const { id } = req.params; // Obtener el parámetro id de la solicitud

    try {
        let data;

        if (id) {
            // Si se proporciona un ID, buscar solo ese usuario
            data = await schemaEmpl.findById(id);
        } else {
            // Si no se proporciona un ID, buscar todos los usuarios
            data = await schemaEmpl.find({});
        }

        res.json({ success: true, data: data });
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
}



//create data // save data in mondodb
export const postUsuarios = async(req,res)=> {
    try{
        console.log(req.body)
        const data = new schemaEmpl(req.body)
        await data.save()

        res.send({success:true, message: "Dato guardado exitosamente", data : data})
    }catch(error){
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
}

//update date
export const putUsuarios = async(req,res)=> {
    try{
        console.log(req.body)
        const { id,...rest} = req.body
        console.log(rest)
        const data = await schemaEmpl.updateOne({_id: id},rest)
        res.send({success: true, message: "El dato se actualizo con exito", data : data})
    }catch(error){
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
}

//Delete date
export const deleteUsuarios = async(req,res)=> {
    try{
        const id = req.params.id
        console.log(id)
        const data = await schemaEmpl.deleteOne({_id: id})
        res.send({success: true, message: "El dato se elimino con exito", data : data}) 
    }catch(error){
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
}



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
}

// Función para verificar si existe el usuario
export const verificarUsuarioExistente = async (acceso) => {
    const usuarioEncontrado = await schemaEmpl.findOne({ acceso });
    return usuarioEncontrado ? true : false;
}