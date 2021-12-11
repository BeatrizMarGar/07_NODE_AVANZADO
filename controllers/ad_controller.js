'use strict';

const {Anuncio} = require('../models/Anuncio')
require('../lib/connectMongoose')
const mongoose = require ('mongoose')
const {Ad} = require('../models/index')
const sharp = require('sharp')
const fs = require('fs')

class AdController {

    index(req, res, next){
        res.locals.error = ""
        res.render('newad');
    }

    async post(req, res, next){
        try{
            const {nombre, venta, precio, foto, tags} = req.body
            const result = await Ad.insertMany({nombre, venta, precio, foto, tags})
            let fot = foto
            console.log("!!!!!! " + fot)
            let name = 'subi_' + fot
            fs.writeFileSync(name)
            //fs.writeFileSync(name, fot.buffer)
            console.log("!!!!!name " + name)
            const buff = fs.readFileSync(name)
            const nueva = sharp(buff).resize(400, 200).png()
            const redimen = await nueva.toBuffer()
            fs.writeFileSync('thumbnail.jpg', redimen)
           res.redirect('/')
         //  res.download(foto)

        } catch (err) {
            next(err);
        }
    }
}


module.exports = AdController;