const { response } = require('express');
const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario');


const obtenerUsuarios = async ( req, res = response) => {

    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query ),
    ]);

    res.json({
        total,
        usuarios
    });

}


const crearUsuario = async (req, res = response) => {

    const { nombre, edad, correo, password, celular , desc, rol } = req.body;

    const usuario = new Usuario({ nombre, edad, correo, password, celular, desc, rol });

    const salt = bcrypt.genSaltSync();

    usuario.password = bcrypt.hashSync( password, salt );

    await usuario.save();

    res.json({
        usuario
    });
}


const actualizarUsuario = async ( req, res = response) => {

    const { id } = req.params

    const { _id, estado, correo, password, edad, google, ...resto } = req.body;

    if( password ){
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt );
    }

    const usuaio = await Usuario.findByIdAndUpdate( id, resto, { new: true } );

    res.json( usuaio );


} 

const borrarUsuario = async ( req, res = response ) => {

    const { id } = req.params;

    const usuarioBorrado = await Usuario.findByIdAndUpdate( id, { estado: false }, {new: true });
    
    res.json( usuarioBorrado );


}


module.exports = {
    actualizarUsuario,
    borrarUsuario,
    crearUsuario,
    obtenerUsuarios
}