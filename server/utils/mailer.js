const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "no-reply@seemarise.com",
        pass: "Viraj@1983",
    },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(message, cb) {
    const info = await transporter.sendMail(message);
    cb(info);
}

module.exports = sendMail;
