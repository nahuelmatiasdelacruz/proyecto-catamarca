require('dotenv').config();

const generateBody = (name, hash) => {
    const serverURL = process.env.SERVERURL || '138.219.43.175';
    const bodyMail = `
    <div style="font-family: 'Montserrat', sans-serif;">
        <div style="width: 100%; background-color: #337ab7; text-align: center; padding: 10px;">
            <img src="http://${serverURL}/logo_catamarca.png" alt="Logo Catamarca" style="max-height: 50px; width:auto;"/>
        </div>
        <div style="padding: 10px; text-align: center;">
            <h2 style="color: #337ab7;">Hola ${name}</h2>
            <p style="margin-bottom: 16px;">Recibimos su solicitud de registro en Catamarca Presentismo. <br> Utilice el enlace a continuación para crear su contraseña.</p>
            <a href="http://${serverURL}/api/auth/confirmarregistro?hash=${hash}" style="font-weight: bold; padding: 12px 24px; border: 1px solid #337ab7; border-radius: 4px; background-color: #337ab7; color: #ffffff; text-decoration: none;">Confirmar registro</a>
            <p style="margin-top: 16px;">Si usted no ha realizado esta operación, por favor desestime este correo.</p>
        </div>
        <div style="width: 100%; background-color: #337ab7; text-align: center; padding: 10px;">
            <img src="http://${serverURL}/logo_trabajo.png" alt="Logo Catamarca" style="max-height: 50px; width:auto;"/>
        </div>
    </div>
    `;

    return bodyMail;
}

module.exports = {generateBody}