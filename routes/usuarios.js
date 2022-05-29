const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { crearUsuario, obtenerUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');

const { existeEmail, existeNumeroCelular, existePorId, existeRol } = require('../helpers/validar-db');


const router = Router();



//Obtener usuarios
router.get('/', obtenerUsuarios );

//Crear usuario
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('edad', 'La edad es obligatorio').not().isEmpty(),
    check('correo', 'Tiene que ser un correo').isEmail(),
    check('correo').custom( existeEmail ),
    check('password', 'La contraseña tiene que ser mas que 6 caracteres').isLength({ min: 6 }),
    check('rol').custom( existeRol ),
    check('celular', 'El numero de celular es obligatorio').isLength({ min:8 }),
    check('celular').custom( existeNumeroCelular ),
    check('desc', 'La descripción es obligatorio').not().isEmpty(),
    validarCampos
],  crearUsuario);

//Actulizar usuario
router.put('/:id',[
    check('id','Tiene que ser un ID de mongo').isMongoId(),
    check('id').custom( existePorId ),
    check('rol').custom( existeRol ),
    validarCampos
], actualizarUsuario);

//EliminarUsuario
router.delete('/:id', [
    check('id','Tiene que ser un ID de mongo').isMongoId(),
    check('id').custom( existePorId ),
    validarCampos
], borrarUsuario );






module.exports = router;