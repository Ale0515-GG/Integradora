const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose') 

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080


const userModel=mongoose.model("gatos",schemaData)

mongoose.connect("mongodb://127.0.0.1:27017/gatos")
.then(()=>{
    console.log("conectado a DB")
    app.listen(PORT,()=>console.log("El sevidor esta funcionando"))
})
.catch((err)=>console.log(err))


