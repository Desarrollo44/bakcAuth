const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const protegerRuta = require('../middleware/auth.Middleware');

const opciones = {
    allowedRoles: ["1", "2"],
}

router.post('/login',authController.login);

router.get('/ruta1', protegerRuta(opciones), authController.protegida);
router.get('/ruta2', protegerRuta(opciones), authController.protegida);
router.get('/ruta3', protegerRuta(opciones), authController.protegida);

module.exports = router;
