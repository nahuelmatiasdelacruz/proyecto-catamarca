const { knex } = require("../configs/db");
const jwt = require('jsonwebtoken');

const validarJwt = async (req,res,next) => {
    const token = req.header("x-token");
    if(!token) return res.status(400).json({msg: "No hay token en la petición"});
    try{
        const{uid} = jwt.verify(token,process.env.TOKENKEY);
        const usuario = await knex.select("*").from("usuarios").where({id: uid});
        if(!usuario) return res.status(400).json({msg: "No existe el usuario"});
        if(!usuario.status) return res.status(400).json({msg: "Usuario inhabilitado"});
        req.usuario = usuario;
        next();
    }catch(e){
        res.status(500).json({msg: "Token no valido"});
    }
}

module.exports = {validarJwt};