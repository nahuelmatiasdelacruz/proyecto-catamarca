const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAILHOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASSWORD
    }
});

module.exports = {transporter};