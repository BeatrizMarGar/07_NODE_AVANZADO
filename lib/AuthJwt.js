'use strict';

const jwt = require('jsonwebtoken')

//buscamos el token en cabecera

module.exports = (req, res, next) => {
    const jwtToken = req.get('Authorization') || req.query.token || req.body.token;

    // comprobamoss si hay o no token
    if (!jwtToken){
        const error = new Error('No se detecta token')
        error.status = 401;
        next(error)
        return
    }

    jwt.verify(jwtToken, process.env.SECRET_JWT, (err, payload) => {
        if (err){
            err.message = "token invalido"
            err.status = 401;
            next(err)
            return
        }

        req.apiAuthUserId = payload._id;
        next()
    })
}