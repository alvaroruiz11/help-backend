const Usuario = require('../models/usuario');
const Role = require('../models/role');


const existeEmail =  async ( correo = '' ) => {

    const existe = await Usuario.findOne({ correo });

    if( existe ){
        throw new Error(`El correo ${ correo }, ya existe`);
    }

}

const existeNumeroCelular = async ( celular = '' ) => {

    const existeNumero = await Usuario.findOne({ celular });

    if( existeNumero ){
        throw new Error(`El numero ${ numero }, ya se encuentra registrado`);
    }

}

const existePorId = async ( id = '' ) => {


    const existeID = await Usuario.findById( id );

    if( !existeID ){
        throw new Error(`El ID ${ id }, no existe en la DB`);
    }

}


const existeRol = async ( rol = '' ) => {

    const existeRoles = await Role.findOne({ rol });

    if( !existeRoles ){
        throw new Error(`El rol ${ rol }, no existe en la DB`);
    }

}






module.exports = {
    existeEmail,
    existeNumeroCelular,
    existePorId,
    existeRol
}