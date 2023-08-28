

const getMarcaciones = (req,res) => {
    res.json({msg: "Marcaciones OK"});
}
const addMarcacion = (req,res) => {
    res.json({msg: "Marcacion agregada"});
}

const marcacionesController = {
    getMarcaciones,
    addMarcacion
}

module.exports = {marcacionesController};