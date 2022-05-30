const { Router } = require('express');
const { buscarUsuario } = require('../controllers/buscar');


const router = Router();


router.get('/:termino', buscarUsuario );


module.exports = router;

