const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.path = {
            auth:     '/api/auth',
            buscar:     '/api/buscar',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads'
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

        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    router(){
        this.app.use( this.path.auth, require('../routes/auth'));
        this.app.use( this.path.buscar, require('../routes/buscar'));
        this.app.use( this.path.usuarios, require('../routes/usuarios'));
        this.app.use( this.path.uploads, require('../routes/uploads'));
    }

    lister(){
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en el puerto ${ this.port }`);
        });
    }


}


module.exports = Server;