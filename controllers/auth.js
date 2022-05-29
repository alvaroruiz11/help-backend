const { response } = require('express');
const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    const usuario = await Usuario.findOne({ correo });

    if( !usuario ){
        return res.status( 401 ).json({
            msg:'Usuario / Password - usuario no existe DB'
        })
    }

    if( !usuario.estado ){
        return res.status( 401 ).json({
            msg:'Usuario / Password - estado: false'
        })
    }

    const validarPassword = bcrypt.compareSync( password, usuario.password );

    if( !validarPassword ){
        return res.status( 401 ).json({
            msg:'Usuario / Password - password incorrecto'
        })
    }

    const token = await generarJWT( usuario.id );

    res.json({
        usuario,
        token
    })

}




module.exports = {
    login
}