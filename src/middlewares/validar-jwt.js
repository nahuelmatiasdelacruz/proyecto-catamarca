const { knex } = require("../configs/db");
const jwt = require('jsonwebtoken');

const validarJwt = async (req,res,next) => {
    const token = req.header("x-token");
    if(!token) return res.status(400).json({msg: "No hay token en la petición"});
    try{
        const {uid} = jwt.verify(token,process.env.TOKENKEY);
        const usuario = await knex.select("*").from("sigap.usuarios").where({id: uid});
        if(usuario.length <= 0) return res.status(400).json({msg: "No existe el usuario"});
        if(usuario[0].registro_activo !== 1) return res.status(400).json({msg: "Usuario inhabilitado"});
        req.usuario = usuario;
        next();
    }catch(e){
        console.log(e);
        return res.status(400).json({msg: "Error en el servidor", error: e.message});
    }
}

module.exports = {validarJwt};