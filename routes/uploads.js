const { Router } = require('express');

const { actulizarImagenCloudinary } = require('../controllers/uploads');
const { validarArchivo } = require('../middlewares/validar-archivo');

const router = Router();


router.put('/:id', validarArchivo , actulizarImagenCloudinary );



module.exports = router;