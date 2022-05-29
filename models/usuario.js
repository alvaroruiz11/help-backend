const { Schema, model } = require('mongoose');

/**
 * nombre: '',
 * edad: 22
 * correo: 'test@test.com',
 * password: '1312321',
 * img:'https://',
 * desc:'civil',
 * role:'USER_ROLE',
 * estado:true,
 * google: false
 */

const UsuarioSchema = Schema({

    nombre:{
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    edad:{
        type: Number,
        require: [true, 'La edad es obligatorio']
    },
    correo:{
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        require: [true, 'El password es obligatorio']
    },
    celular:{
        type: String,
        require: [true, 'El numero de celular es obligatorio'],
        unique: true
    },
    img:{
        type: String,
    },
    desc:{
        type: String,
        require: [true, 'La descripción es obligatorio']
    },
    rol:{
        type: String,
        require: true
    },
    estado:{
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id , ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}


module.exports = model('Usuario', UsuarioSchema );