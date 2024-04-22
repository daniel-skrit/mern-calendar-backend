const { response } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const {generarJWT} = require("../helpers/jwt")

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email: email });

    if (usuario) {
      return res
        .status(400)
        .json({ ok: false, msg: "Un usuario con este correo ya eciste" });
    }
    usuario = new Usuario(req.body);
    //Encryptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();
    
    // Generar JWT 
    const token = await generarJWT( usuario.id, usuario.name )

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const iniciarSesion = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email: email });

    if (!usuario) {
      return res
        .status(400)
        .json({ ok: false, msg: "Un usuaro coon con ese correo no existe" });
    }

    //confirmar los passwords
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Incorrect password",
      });
    }

    // Generar JWT 
    const token = await generarJWT( usuario.id, usuario.name )

    res.json({
      ok: true,
      msg: "login",
      uid: usuario.id,
      name: usuario.name,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const revalidarToken = async (req, res = response) => {
  const {uid, name }= req;
  const token = await generarJWT( uid, name )

  res.json({ ok: true, token });
};

module.exports = {
  crearUsuario: crearUsuario,
  iniciarSesion: iniciarSesion,
  revalidarToken: revalidarToken,
};
