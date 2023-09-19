const { knex } = require("../configs/db");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");
const crypto = require("crypto");
const { transporter } = require("../configs/mailerConfig");
const dayjs = require("dayjs");
const { generateBody } = require("./mailContent");

const hasAllData = (userData) => {
    if(!userData.cuil ||
        !userData.email ||
        !userData.nombres ||
        !userData.apellidos ||
        !userData.fecha_nacimiento ||
        !userData.dniFrente ||
        !userData.dniDorso ||
        !userData.telefono ||
        !userData.selfie){
            return false;
        }else{
            return true;
        }
}
const insertarSesion = async (userData) => {
    if(!userData.marca || !userData.modelo || !userData.nro_serie) throw new Error("Faltan datos del dispositivo");
    const result = await knex.raw(`CALL sigap.sp_sesion_ins(${userData.user_id},'${userData.marca}','${userData.modelo}','${userData.nro_serie}',null);`);
    return result.rows[0].p_id_dispositivo;
}
const chequearUsuarioPassword = async (user,password) => {
    if(!user || !password) throw new Error("Por favor, indique usuario y contraseña");
    const usuario = await knex.select("*").from("sigap.usuarios").where({username: user});
    if(usuario.length === 0) throw new Error("Usuario o contraseña incorrectos");
    if(usuario[0].registro_activo !== 1) throw new Error("Usuario inhabilitado");
    //const validPassword = bcryptjs.compareSync(password,usuario[0].password);
    //if(!validPassword) return res.status(401).json({msg: "Usuario o contraseña incorrectos"});
    if(usuario[0].password !== password) throw new Error("Usuario o contraseña incorrectos");
    const token = await generarJWT(usuario[0].id);
    return {
        username: usuario[0].username,
        user_id: usuario[0].id,
        token
    }
}
const sendMailWithHash = async (name,mail,hash) => {
    transporter.sendMail({
        from: process.env.MAILUSER,
        to: mail,
        subject: `Confirmación de registro: ${name} - Gobierno de Catamarca`,
        html: generateBody(name,hash)
    });
}
const createUser = async (data) => {

}
const createAgent = async (data) => {
    try{
        const userDataToDb = {
            apellidos: data.apellidos,
            nombres: data.nombres,
            id_documento_tipo: 1,
            documento: data.cuil,
            fecha_nacimiento: new Date(data.fecha_nacimiento),
            hash: generateToken(),
            registro_activo: 0,
        }
        await knex("sigap.agentes").insert(userDataToDb);
        return userDataToDb.hash;
    }catch(e){
        throw new Error(e.message);
    }
}
const generateToken = () => {
    return crypto.randomBytes(32).toString("hex");
}
const findUserByHash = async (hash) => {
    try{
        const user = await knex.select("*").from("sigap.agentes").where({hash});
        console.log(user[0]);
        return user[0];
    }catch(e){
        console.log(e.message);
        throw new Error("Hubo un error al buscar el usuario con hash");
    }
}
const formatDates = (marcaciones) => {
    const formattedDates = marcaciones.map(marcacion => {
        const finalRow = {
            ...marcacion,
            fecha: new dayjs(marcacion.fecha).format("DD-MM-YYYY")
        }
        return finalRow;
    })
    return formattedDates;
}
module.exports = {
    formatDates,
    findUserByHash,
    hasAllData,
    insertarSesion,
    chequearUsuarioPassword,
    sendMailWithHash,
    createUser,
    createAgent
}