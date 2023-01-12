const User = require("../models/user.model");
const { v4: uuidv4 } = require("uuid");
const { getToken, getTokenData } = require("../config/jwt.config");
const { getTemplate, sendEmail } = require("../config/mail.config.js");

const singUp = async (req, res) => {
  try {
    //Otencion data usuario
    const { name, email, phone, state, town } = req.body;

    //Verificacion de usuario existente
    let user = (await User.findOne({ email })) || null;
    if (user !== null) {
      return res.status(401).json({
        success: false,
        msg: "Usuario existente",
      });
    }

    //Generacion de codigo
    const code = uuidv4();

    //Creacion de nuevo usuario
    user = new User({ name, email, phone, state, town, code });

    //Generamos token
    const token = getToken({ email, code });

    //Generacion de template
    const template = getTemplate(name, token);

    //Enviamos correo
    await sendEmail(email, "Confirmacion correo", template);

    //Guardamos al usuario
    await user.save();

    res.json({
      success: true,
      msg: "Registado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      msg: "Bad Register",
    });
  }
};

const confirm = async (req, res) => {
  try {
    //Obtener token
    const { token } = req.params;

    //Verificar la data
    const data = await getTokenData(token);
    if (data === null) {
      return res.status(400).json({
        success: false,
        msg: "Error al obtener data",
      });
    }

    const { email, code } = data.data;

    //Verificar existencia del usuario
    const user = (await User.findOne({ email })) || null;
    if (user === null) {
      return res.status(400).json({
        success: false,
        msg: "Usuario no existente",
      });
    }
    //Verificar codigo

    if (code !== user.code) {
      return res.redirect("/error.html");
    }

    //Actualizar usuario

    user.status = "VERIFIED";
    await user.save();

    //Redireccionar a confirmacion

    return res
      .status(200)
      .redirect("https://hermesmusicclub.mx/pages/confirmacionbabilon");
  } catch (error) {
    console.error;
    return res.status(400).json({
      success: false,
      msg: "Error al confirmar usuario",
    });
  }
};

module.exports = {
  singUp,
  confirm,
};
