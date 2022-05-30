const { response } = require('express');

const { ObjectId } = require('mongoose').Types;

const Usuario = require('../models/usuario');

const buscarUsuario = async ( req, res = response ) => {

    const { termino } = req.params;

    const esMongoId = ObjectId.isValid( termino );

    if( esMongoId ){
        const usuario = await Usuario.findById( termino );

        return res.json({
            result: ( usuario ) ? [ usuario ] : []
        });
    }
    
    const regex = new RegExp( termino, 'i' );
    const usuario = await Usuario.find({
        $or: [{ nombre: regex }, { desc: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        result: ( usuario ) ? [ usuario ] : []
    })

}


module.exports = {
    buscarUsuario
}