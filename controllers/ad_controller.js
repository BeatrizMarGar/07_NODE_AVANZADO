'use strict';

const {Anuncio} = require('../models/Anuncio')
require('../lib/connectMongoose')
const mongoose = require ('mongoose')
const {Ad} = require('../models/index')

class AdController {

    index(req, res, next){
        res.locals.error = ""
        res.render('newad');
    }

    async post(req, res, next){
        try{
            const {nombre, venta, precio, foto, tags} = req.body
            const result = await Ad.insertMany({nombre, venta, precio, foto, tags})
            res.redirect('/anuncios') //sustituir por redirección a página de anuncios

        } catch (err) {
            next(err);
        }
    }
}


module.exports = AdController;