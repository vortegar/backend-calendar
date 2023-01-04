/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/ 
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validarCampos');
const { crearUsuario, loginUsarion, revalidarUsuario } = require('../controllers/auth');
const { validarJWT } = require('../middleware/validarJWT');


const router = Router();


router.post(
    '/new',
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ], 
    crearUsuario
);

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ], 
    loginUsarion 
    );

router.get('/renew', validarJWT, revalidarUsuario );





module.exports = router;