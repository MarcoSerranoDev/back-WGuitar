const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.NODEMAILER_USER, // generated ethereal user
    pass: process.env.NODEMAILER_PASS, // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (email, subject, html) => {
  try {
    await transporter.sendMail({
      from: `Hermes Music MKT <${process.env.NODEMAILER_USER}>`, // sender address
      to: email, // list of receivers
      subject, // Subject line
      html, // html body
    });
  } catch (error) {
    console.log("Algo no va bien con el email", error);
  }
};

const getTemplate = (name, token) => {
  return `
    <div id="email___content" style="width: 100%; text-align: center;">
        <h2 style="font-size: 3rem; color: #f9bf19;">Hola ${name}</h2>
        <div style="text-align: center; line-height: 7px;">
            <p style="font-size: 1.2rem;">Te has registrado para ganar una guitarra Babilon</p>
            <p style="font-size: 1.2rem;">Para confirmar tu cuenta, ingresa al siguiente enlace:</p>
        </div>
        <a style="background-color: #f9bf19; padding: 10px 20px; border-radius: 10px; color: #fff; text-decoration: none;
        display: block; font-size: 1.2rem; font-weight: 700; cursor: pointer; width: 200px; margin: 20px auto;"
            href="https://back-wguitar-production.up.railway.app/api/v1/user/confirm/${token}" target="_blank">Confirmar
            Cuenta</a>
        <div style="background: #000; padding: 20px">
            <img style="width: 400px; height: 200px; object-fit: cover; margin-right: 20px;"
                src="https://i.ibb.co/sCx2D8z/Babilon-logo-blanco.png" alt="">
            <img style="width: 200px; height: 200px; margin-left: 20px; object-fit: cover;"
                src="https://i.ibb.co/tcvcL0d/LOGO-HMC.png" alt="">
        </div>
    </div>
  `;
};

const getTemplateDj = (name, horario) => {
  return `
      <div id="email___content" style="width: 100%; text-align: center;">
        <h2 style="font-size: 3rem; color: #f9bf19;">Hola ${name}</h2>
        <p style="font-size: 1.2rem;">Has reservado tu prueba para el controlador DJ</p>
        <div style="line-height: 25px;">
            <span style="display: block; font-size: 1.2rem;">Fecha: 15-marzo-2023</span>
            <span style="display: block; font-size: 1.2rem;">Horario: ${horario}</span>
        </div>
        <p style="font-size: 1.2rem;">Presentate 10 min antes con correo de reservacion.</p>
        <div style="background: #000;">
            <img style="width: 200px; height: 200px; margin-left: 20px; object-fit: cover;"
                src="https://i.ibb.co/tcvcL0d/LOGO-HMC.png" alt="">
        </div>
      </div>
  `;
};

module.exports = {
  sendEmail,
  getTemplate,
  getTemplateDj,
};
