/*
    Rutas de usuarios / auth
    host = /api/auth
 */

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {
  crearUsuario,
  iniciarSesion,
  revalidarToken,
} = require("../controllers/auth.js");
const { validarCampos } = require("../middlewares/validar-campos.js");
const { validarJWT } = require('../middlewares/validar-jwt.js');

// router.get("/", (resp, res) => {
//   res.json({ ok: true });
// });

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracters").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  crearUsuario
);
router.post(
  "/",
  [
    check("email", "El email no es valido").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  iniciarSesion
);
router.post("/renew", validarJWT,  revalidarToken);
module.exports = router;
