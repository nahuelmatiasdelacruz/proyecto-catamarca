const {knex} = require("../configs/db");
const { getAdress } = require("../helpers/controllersHelpers");
const { queryMarcacionesById, queryMarcacionesByDate } = require("../helpers/queryStrings");

const getMarcacionesById = async (req,res) => {
    const id = req.usuario.id;
    let result = [];
    try{
        if(req.query.fecha){
            result = await queryMarcacionesByDate(id,req.query.fecha);
        }else{
            result = await queryMarcacionesById(id);
        }
        return res.json({msg: "ok", data: result});
    }catch(e){
        console.log(e);
        return res.status(500).json({msg: "Error en la busqueda de marcaciones", error: e.message});
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
const marcacionesMobileController = {
    getMarcacionesById,
    addMarcacion
}

module.exports = {marcacionesMobileController}