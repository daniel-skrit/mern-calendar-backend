/*
    Event routes
    /api/events
 */

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events.js");

const { validarJWT } = require("../middlewares/validar-jwt.js");
const { validarCampos } = require("../middlewares/validar-campos.js");
const { isDate } = require("../helpers/isDate.js");
// Todas tiene que pasar por la validacion del JWT

router.use(validarJWT);

// Obtener eventos
router.get("/", getEventos);

// Craer un nuevo evento
router.post(
  "/",
  [
    check("title", "El titlo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalizacion es obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEvento
);

// Actualizar Evento
router.put("/:id", actualizarEvento);

// borrar evento
router.delete("/:id", eliminarEvento);

module.exports = router;
