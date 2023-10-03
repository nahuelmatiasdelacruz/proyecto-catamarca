const {knex} = require("../configs/db");

const getMarcaciones = (req,res) => {
    res.status(200).json({msg: "ok"});
}

const addMarcacion = (req,res) => {
    res.status(200).json({})
}

const marcacionesMobile = {
    getMarcaciones,
    addMarcacion
}