const {knex} = require("../configs/db");
const axios = require("axios");
const { formatDates } = require("../helpers/controllersHelpers");

const getMarcaciones = async (req,res) => {
    try{
        let result = await knex.raw(`
        SELECT
            TO_CHAR(marcaciones.fecha, 'DD-MM-YYYY') AS fecha,
            TO_CHAR(marcaciones.fecha, 'HH24:MI') AS hora,
            marcaciones.id,
            marcaciones.fecha,
            marcaciones.sentido,
            marcaciones.dentro_zona,
            marcaciones.marcacion_tipo,
            marcaciones.latitud,
            marcaciones.longitud,
            marcaciones.direccion,
          agentes.apellidos || ' ' || agentes.nombres AS nombre_completo_agente,
          dispositivos.marca || ' ' || dispositivos.modelo AS marca_modelo_dispositivo
        FROM
          sigap.marcaciones
        JOIN
          sigap.agentes ON marcaciones.id_agente = agentes.id
        JOIN
          sigap.dispositivos ON marcaciones.id_dispositivo = dispositivos.id
        WHERE
          sigap.marcaciones.registro_activo = 1;
        `)
        const finalResult = formatDates(result.rows);
        return res.json(finalResult);
    }catch(e){
        console.log(e);
        return res.status(500).json({msg: "Hubo un error al buscar las marcaciones", error: e.message});
    }
}
const addMarcacion = async (req,res) => {
    const {id_agente,id_dispositivo,sentido,marcacion_tipo,latitud,longitud,dentro_zona,fecha} = req.body;
    const direccion = await getAdress(latitud,longitud);
    const id_usuario = req.usuario[0].id;
    if(!id_agente || 
        !id_dispositivo || 
        !marcacion_tipo || 
        !latitud || 
        !longitud ||
        !sentido ||
        !dentro_zona ||
        !fecha
        ) return res.status(400).json({msg: "Error: Faltan datos para la marcación"});
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
const getAdress = async (lat,long) => {
    try{
        const {data} = await axios.get(`https://discover.search.hereapi.com/v1/revgeocode?at=${lat},${long}&apiKey=${process.env.GEOAPIKEY}`);
        return data.items[0].title;
    }catch(e){
        console.log(e)
        return "Error: No Street"
    }
}
const marcacionesController = {
    getMarcaciones,
    addMarcacion,
    editarMarcacion
}

module.exports = {marcacionesController};