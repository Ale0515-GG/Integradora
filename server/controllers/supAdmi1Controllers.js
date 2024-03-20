import Administradores from "../../client/src/Screens/SupAdmin/SupAdm1/SubAdmi1";
import SubAdmi1 from "../models/supAdmi1";

export const getAdministradores = async(req, res) =>{
    try{
        const data = await SubAdmi1.find({});
        res.json({ sucess: true, data:data});
    }catch(error){
        console.error("Error al obtener los administradores", error);
        res.status(500).json({ sucess: false, message: "Error del servidor"});
    }
};

export const getAdministradores1 = async(req, res) =>{
    const {id} =req.params;

    try{
        const data = await SubAdmi1.findById(id);
        res.json({sucess:true, data:data});
    }catch(error) {
        console.error("Error al obtener los administradores", error);
        res.status(500).json({sucess:false, message: "Error del servidor"});
    }
};

export const postAdministradores = async (req, res) => {
try{
    const data = new Administradores(req.body);
    await data.save();
    res.send({ sucess: true,  message: "Administrador guardado exitosamente", data:data});
}catch(error){
    console.error("Error al guardar el administrador", error);
    res.status(500).json({ sucess: false, message: "Error del servidor"});
}
};

export const putAdministradores = async (req, res) =>{
    try{
        const {id, ...rest} = req.body;
        const data = await Administradores.updateOne({_id: id}, rest);
        res.send({ sucess: true, message: "El administrador se actualizo exitosamente", data:data});

    }catch(error){
        console.error("Error al actualizar el administrador", error);
        res.status(500).json({sucess: false, message: "Error del servidor"});
    }
};

export const deleteAdministradores = async (req, res) =>{
    try{
        const id = req.params.id;
        await Administradores.deleteOne({_id: id});
        res.send({ sucess: true, message: "El administrador se eliminó exitosamente"}); 
    }catch(error){
        console.error("Error al eliminar el administrador", error);
        res.status(500).json({sucess: false, message: "Error del servidor"});
    }
};