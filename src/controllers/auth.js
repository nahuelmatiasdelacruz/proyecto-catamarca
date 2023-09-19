const { chequearUsuarioPassword, insertarSesion, hasAllData, sendMailWithHash, createAgent, findUserByHash } = require("../helpers/controllersHelpers");
const path = require("path");
const login = async (req,res) => {
    const {user,password} = req.body;
    try{
        const userDataAndToken = await chequearUsuarioPassword(user,password);
        return res.json(userDataAndToken);
    }catch(e){
        console.log(e);
        return res.status(400).json({msg: "Hubo un error", error: e.message});
    }
}
const mobileAuth = async (req,res) => {
    const {user,marca,modelo,nro_serie,password} = req.body;
    try{
        const userDataAndToken = await chequearUsuarioPassword(user,password);
        const userAndDeviceData = {
            user_id: userDataAndToken.user_id,
            marca,
            modelo,
            nro_serie
        }
        const device_id = await insertarSesion(userAndDeviceData);
        return res.status(200).json({msg: "ok",userAndToken: userDataAndToken, device_id});
    }catch(e){
        console.log(e);
        return res.status(500).json({msg: "Hubo un error en el servidor", error: e.message});
    }
}
const servirConfirmarRegistro = async (req,res) => {
    const hash = req.query.hash;
    console.log(hash);
    if(!hash) res.sendFile(path.join(__dirname,"..","client","build","error.html"));
    const user = await findUserByHash(hash);
    res.sendFile(path.join(__dirname,"..","client","build","confirmation.html"));
}
const agregarPrimerIngreso = async (req,res) => {
    try{
        const userData = req.body;
        if(!hasAllData(userData)) return res.status(400).json({msg: "Faltan datos para el primer ingreso"});
        const hash = await createAgent(userData);
        await sendMailWithHash(`${userData.nombres} ${userData.apellidos}`,userData.email,hash);
    }catch(e){
        console.log(e.message);
        return res.status(500).json({msg: "Hubo un error al crear el ingreso", error: e.message});
    }
    return res.status(200).json({msg: "Ok"});
}
const loginController = {
    agregarPrimerIngreso,
    login,
    mobileAuth,
    servirConfirmarRegistro
}

module.exports = {loginController}