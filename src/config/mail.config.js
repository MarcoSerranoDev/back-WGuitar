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
      <div id="email___content">
          <h2>Hola ${name}</h2>
          <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
          <a
              href="http://localhost:4000/api/v1/user/confirm/${token}"
              target="_blank"
          >Confirmar Cuenta</a>
      </div>
    `;
};

module.exports = {
  sendEmail,
  getTemplate,
};
