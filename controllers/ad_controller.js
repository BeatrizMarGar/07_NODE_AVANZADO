'use strict';

const {Anuncio} = require('../models/Anuncio')


class AdController {

    async post(req, res, next){
        try{
            const {nombre, venta, precio, foto, tags} = req.body
            console.log(nombre)
            console.log(venta)
        
        } catch (err) {
            next(err);
        }
    }
}


module.exports = AdController;