import schemaEmpl from "../models/empleadoModel"

//read
export const getUsuarios = async(req,res)=>{
    try{
        const data = await userModel.find({})
        res.json({success:true, data:data})
    }catch(error){
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
}


//create data // save data in mondodb
export const postUsuarios = async(req,res)=> {
    try{
        console.log(req.body)
        const data = new userModel(req.body)
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
        const data = await userModel.updateOne({_id: id},rest)
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
        const data = await userModel.deleteOne({_id: id})
        res.send({success: true, message: "El dato se elimino con exito", data : data}) 
    }catch(error){
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ success: false, message: "Error del servidor" });
    }
}
