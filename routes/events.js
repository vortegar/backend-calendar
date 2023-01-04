const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT } = require("../middleware/validarJWT");
const { getEventos, CrearEvento, actualizaEvento, eliminarEvento } = require("../controllers/events");
const { validarCampos } = require("../middleware/validarCampos");
const { isDate } = require("../helpers/isDate");




const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use( validarJWT );

// Obtener eventos
router.get('/', getEventos );

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ], 
    CrearEvento );

// Actualizar Evento
router.put(
    '/:id',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizaEvento
    );

// Borrar evento
router.delete('/:id', eliminarEvento );

module.exports = router;