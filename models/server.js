const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.path = {
            auth:     '/api/auth',
            usuarios: '/api/usuarios'
        }

        this.connectionDB();

        this.middlewares();

        this.router();

    }

    async connectionDB(){

        await dbConnection();

    }

    middlewares(){

        this.app.use( cors() );
        
        this.app.use( express.static('public') );

        this.app.use( express.json() );
    }

    router(){
        this.app.use( this.path.auth, require('../routes/auth'));
        this.app.use( this.path.usuarios, require('../routes/usuarios'));
    }

    lister(){
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en el puerto ${ this.port }`);
        });
    }


}


module.exports = Server;