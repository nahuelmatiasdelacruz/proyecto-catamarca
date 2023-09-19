const {knex} = require("../configs/db");

const getMarcaciones = async (req,res) => {
    const {id} = req.usuario;
    try{
        const result = await knex.select("*").from("sigap.marcaciones").where({registro_activo: 1,id});
        return res.json({msg: "ok", data: result.data});
    }catch(e){
        console.log(e);
        return res.status(500).json({msg: "Error en la busqueda de marcaciones", error: e.message});
    }
}
const addMarcacion = (req,res) => {
    res.status(200).json({})
}
const marcacionesMobileController = {
    getMarcaciones,
    addMarcacion
}

module.exports = {marcacionesMobileController}