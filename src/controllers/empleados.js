const {knex} = require("../configs/db");

const getEmpleados = async (req,res) => {
    try{
        const result = await knex.select("*").from("sigap.agentes").where({registro_activo: 1});
        return res.json(result);
    }catch(e){
        console.log(e.message);
        return res.status(500).json({msg: "Hubo un error al buscar los empleados", error: e.message});
    }
}
const getEmpleadosByQuery = async (req,res) => {
    try{
        const query = req.query.find;
        const isNumeric = /^\d+$/.test(query);
        if(isNumeric){
            const empleadosByCuil = await knex.select("id","nombres","apellidos")
                .from("sigap.agentes")
                .whereLike("documento",`%${query}%`)
                .andWhere({registro_activo: 1,});
            return res.json(empleadosByCuil);
        }else{
            const empleadosByApellido = await knex.select("id","nombres","apellidos")
                .from("sigap.agentes")
                .whereLike("apellidos",`%${query}%`)
                .andWhere({registro_activo: 1,});
            return res.json(empleadosByApellido);
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({msg: "Hubo un error al buscar los empleados en la query"})
    }
}
const empleadosController = {
    getEmpleados,
    getEmpleadosByQuery
}

module.exports = {empleadosController}