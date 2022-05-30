const { request ,response } = require('express');
const fs = require('fs');
const path = require('path');

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const { subirArchivo } = require('../helpers/subir-achivo');

const Usuario = require('../models/usuario');



const actulizarImagen = async ( req = request, res = response ) => {

    const { id } = req.params;

    const nombre = await subirArchivo( req.files, undefined, undefined );
    
    const usuario = await Usuario.findById( id );

    if( usuario.img ){
        const pathImagen = path.join( __dirname,'../uploads', usuario.img );
        if( fs.existsSync( pathImagen ) ){
            fs.unlinkSync( pathImagen );
        } 
    }

    usuario.img = nombre;

    usuario.save();

    res.json({
        usuario
    });

}
const actulizarImagenCloudinary = async ( req = request, res = response ) => {

    const { id } = req.params;
    
    const usuario = await Usuario.findById( id );

    
    if( usuario.img ){
        const nombreArr = usuario.img.split('/');
        const nombreImg = nombreArr[ nombreArr.length - 1 ];
        const [ public_id ] = nombreImg.split('.');
        cloudinary.uploader.destroy( public_id );
        
    }
    
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    
    usuario.img = secure_url;

    usuario.save();

    res.json({
        usuario
    });

}


module.exports = {
    actulizarImagen,
    actulizarImagenCloudinary
}