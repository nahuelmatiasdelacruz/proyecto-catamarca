const { knex } = require("../configs/db");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");
const crypto = require("crypto");
const { transporter } = require("../configs/mailerConfig");
const dayjs = require("dayjs");
const { generateBody } = require("./mailContent");
const { default: axios } = require("axios");

const hasAllFirstLoginData = (userData) => {
    if (!userData.cuil) throw new Error("CUIL faltante - El nombre del campo debe ser: \n cuil");
    if (!userData.email) throw new Error("Correo electrónico faltante - El nombre del campo debe ser: \n email");
    if (!userData.nombres) throw new Error("Nombres faltantes - El nombre del campo debe ser: \n nombres");
    if (!userData.apellidos) throw new Error("Apellidos faltantes - El nombre del campo debe ser: \n apellidos");
    if (!userData.fecha_nacimiento) throw new Error("Fecha de nacimiento faltante - El nombre del campo debe ser: \n fecha_nacimiento");
    if (!userData.telefono) throw new Error("Teléfono faltante - El nombre del campo debe ser: \n telefono");
    return true;
}

const insertarSesion = async (userData) => {
    if(!userData.marca || !userData.modelo || !userData.nro_serie) throw new Error("Faltan datos del dispositivo");
    const result = await knex.raw(`CALL sigap.sp_sesion_ins(${userData.user_id},'${userData.marca}','${userData.modelo}','${userData.nro_serie}',null);`);
    return result.rows[0].p_id_dispositivo;
}

const chequearUsuarioPassword = async (cuil, password) => {
    if (!cuil || !password) throw new Error("Por favor, indique usuario y contraseña");

    const usuario = await knex.select('id', 'password','registro_activo')
    .from('sigap.usuarios')
    .where({ username: cuil });

    if (usuario.length === 0) throw new Error("Usuario o contraseña incorrectos");
    if (usuario[0].registro_activo !== 1) throw new Error("Usuario inhabilitado");

    const validPassword = bcryptjs.compareSync(password, usuario[0].password);
    if (!validPassword) throw new Error("Usuario o contraseña incorrectos");

    const token = await generarJWT(usuario[0].id);

    return {
        username: usuario[0].username,
        user_id: usuario[0].id,
        token
    };
}
const sendMailWithHash = async (name, mail, hash) => {
    try {
        await transporter.sendMail({
            from: process.env.MAILUSER,
            to: mail,
            subject: `Confirmación de registro: ${name} - Gobierno de Catamarca`,
            html: generateBody(name, hash)
        });
    } catch (error) {
        console.error('Error enviando email:', error);
    }
}

const createUser = async (data) => {

}
const habilitarUsuario = async (userId,password) => {
    try{
        await knex("sigap.agentes").where({id: userId}).update({
                hash: null,
                registro_activo: 1
            });
        const salt = bcryptjs.genSaltSync();
        const hashPassword = bcryptjs.hashSync(password,salt);
        const user = await knex.select("documento").from("sigap.agentes").where({id: userId});
        await knex("sigap.usuarios").insert({id: userId,username: user[0].documento, password: hashPassword});
    }catch(e){
        console.log(e);
        throw new Error(e.message);
    }
}
const createAgent = async (data) => {
    try{
        const userDataToDb = {
            apellidos: data.apellidos,
            nombres: data.nombres,
            id_documento_tipo: 1,
            documento: data.cuil,
            fecha_nacimiento: data.fecha_nacimiento,
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
const formatOnlyDate = (date) => {
    const start = `${dayjs(date).format("YYYY-MM-DD")}T00:00:000Z`;
    const end = `${dayjs(date).format("YYYY-MM-DD")}T23:59:000Z`;
    const objToReturn = {
        start,
        end
    }
    return objToReturn;
}

const getAdress = async (lat,long) => {
    try{
        const {data} = await axios.get(`https://discover.search.hereapi.com/v1/revgeocode?at=${lat},${long}&apiKey=${process.env.GEOAPIKEY}`);
        return data.items[0].title;
    }catch(e){
        console.log(e)
        return "Error: No Street"
    }
}
module.exports = {
    formatDates,
    findUserByHash,
    hasAllFirstLoginData,
    insertarSesion,
    chequearUsuarioPassword,
    habilitarUsuario,
    sendMailWithHash,
    formatOnlyDate,
    createUser,
    createAgent,
    getAdress
}