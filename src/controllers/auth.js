const { chequearUsuarioPassword, insertarSesion, hasAllData, sendMailWithHash, createAgent, findUserByHash, habilitarUsuario } = require("../helpers/controllersHelpers");
const path = require("path");
const login = async (req,res) => {
    const {cuil,password} = req.body;
    try{
        const userDataAndToken = await chequearUsuarioPassword(cuil,password);
        return res.json(userDataAndToken);
    }catch(e){
        console.log(e);
        return res.status(400).json({msg: "Hubo un error", error: e.message});
    }
}
const mobileAuth = async (req,res) => {
    const {cuil,marca,modelo,nro_serie,password} = req.body;
    try{
        const userDataAndToken = await chequearUsuarioPassword(cuil,password);
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
    if(!hash) return res.sendFile(path.join(__dirname,"..","client","build","error.html"));
    console.log(hash);
    const user = await findUserByHash(hash);
    console.log(user);
    if (!user) {
        return res.sendFile(path.join(__dirname, "..", "client", "build", "error.html"));
    }
    const userName = `${user.nombres} ${user.apellidos}`;
    return res.render('generatepassword', { userName, userId: user.id });
}
const confirmarPassword = async (req,res) => {
    const {userId, password} = req.body;
    try{
        await habilitarUsuario(userId,password);
        return res.json({msg: "ok"});
    }catch(e){
        return res.status(500).json({msg: "Hubo un error", error: e.message});
    }
}
const agregarPrimerIngreso = async (req, res) => {
    try {
        const userData = req.body;
        const hash = await createAgent(userData);
        await sendMailWithHash(`${userData.nombres} ${userData.apellidos}`, userData.email, hash);
        return res.status(200).json({ msg: "Ok" });
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({ msg: "Hubo un error al crear el ingreso", error: e.message });
    }
}
const subirArchivos = async (req,res) => {

}
const loginController = {
    agregarPrimerIngreso,
    login,
    mobileAuth,
    servirConfirmarRegistro,
    subirArchivos,
    confirmarPassword
}

module.exports = {loginController}