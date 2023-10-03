const {knex} = require("../configs/db");
const axios = require("axios");
const { formatDates, getAdress } = require("../helpers/controllersHelpers");
const { queryMarcacionesGenerales } = require("../helpers/queryStrings");

const getMarcaciones = async (req,res) => {
    try{
        let result = await knex.raw(queryMarcacionesGenerales);
        const finalResult = formatDates(result.rows);
        console.log(finalResult);
        return res.json(finalResult);
    }catch(e){
        console.log(e);
        return res.status(500).json({msg: "Hubo un error al buscar las marcaciones", error: e.message});
    }
}

const addMarcacion = async (req,res) => {
    const {id_agente,id_dispositivo,sentido,marcacion_tipo,latitud,longitud,dentro_zona,fecha} = req.body;
    const direccion = await getAdress(latitud,longitud);
    const id_usuario = req.usuario.id;
    try{
        await knex.raw(`call sigap.sp_marcaciones_ins(:id_agente,:fecha,:id_dispositivo,:sentido,:marcacion_tipo,:latitud,:longitud,:direccion,:dentro_zona,:id_usuario,null);`,{
            id_agente,
            fecha,
            id_dispositivo,
            sentido,
            marcacion_tipo,
            latitud,
            longitud,
            direccion,
            dentro_zona,
            id_usuario
        });
        return res.status(200).json({msg: "Marcación agregada con éxito"});
    }catch(e){
        console.log(e);
        return res.status(500).json({msg: "Hubo un error al agregar la marcación"});
    }
}
const editarMarcacion = async (req,res) => {
    res.status(200).json({msg: "Marcacion editada correctamente"});
}

const checkAllMarkData = () => {
    
}
const borrarMarcacion = async (req,res) => {
    
}
const marcacionesController = {
    getMarcaciones,
    addMarcacion,
    editarMarcacion,
    borrarMarcacion,
}

module.exports = {marcacionesController};