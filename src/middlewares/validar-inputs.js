const { hasAllFirstLoginData } = require("../helpers/controllersHelpers");

const primerIngreso = (req,res,next) => {
    const userData = req.body;
    try{
        hasAllFirstLoginData(userData);
        next();
    }catch(e){
        console.log(e.message);
        return res.status(400).json({msg: "Faltan datos para la validación: ", datos: e.message});
    }
}
const nuevaMarcacion = (req,res,next) => {
    const {id_agente,id_dispositivo,sentido,marcacion_tipo,latitud,longitud,dentro_zona,fecha} = req.body;
    if(!id_agente || 
        !id_dispositivo || 
        !marcacion_tipo || 
        !latitud || 
        !longitud ||
        !sentido ||
        (dentro_zona === null || dentro_zona === undefined) ||
        !fecha
        ) return res.status(400).json({msg: "Error: Faltan datos para la marcación"});
    next();
}
const inputValidators = {
    primerIngreso,
    nuevaMarcacion
}
module.exports = {inputValidators}