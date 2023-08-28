const { knex } = require("../configs/db");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req,res) => {
    const {user,password} = req.body;
    if(!user || !password) return res.status(400).json({msg: "Por favor, indique usuario y contraseña"});

    try{
        const usuario = await knex.select("*").from("usuarios").where({user: usuario});
        if(usuario.length === 0) return res.status(400).json({msg: "Usuario o contraseña incorrectos"});
        if(!usuario.status) return res.status(401).json({msg: "Usuario inhabilitado"});
        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if(!validPassword) return res.status(401).json({msg: "Usuario o contraseña incorrectos"});
        const token = await generarJWT(usuario.id);

        // Si todo se comprueba, se retorna un objeto con el usuario y el token
        return res.json({
            msg: "Ok",
            usuario,
            token
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({msg: "Hubo un error en el servidor"});
    }
}

const loginController = {
    login
}

module.exports = {loginController}