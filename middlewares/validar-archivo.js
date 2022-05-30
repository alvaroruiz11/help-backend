

const validarArchivo = ( req, res, next ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        return res.status(400).send('No hay archivo en la peticion');
    }

    next();

}


module.exports = {
    validarArchivo
}