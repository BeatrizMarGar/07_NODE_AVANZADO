'use strict';

const {Anuncio} = require('../models/Anuncio')
require('../lib/connectMongoose')
const mongoose = require ('mongoose')
const {Ad} = require('../models/index')
const sharp = require('sharp')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const multer = require('multer')
const thumbnailRequester = require("../routes/thumbnailRequester")
const { Buffer } = require('buffer')

const storage = multer.diskStorage({
	destination: "./public/images/",
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage: storage });

class AdController {

    index(req, res, next){
        res.locals.error = ""
        res.render('newad');
    }

    async post(req, res, next) {
        console.log("!!!!!!!! ahora")
      try {
          
        const {nombre, venta, precio, foto, tags} = req.body
            const fileData = req.body.foto.path;
            const productData = {...req.body, foto: fileData}
            console.log(fileData,productData)
            const anuncio = new Anuncio(productData)
            /*
            fs.writeFile('./public/images/anuncios/' + anuncioData.foto, data, function(err){
                if (err){
                    console.log(err)
                }
            })
            thumbnailRequester(anuncioData.foto);
            console.log(anuncioData.foto)
            res.status(201)*/
        } catch (err) {
            next(err);
        }
    }
/*
    async post(req, res, next){
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!")
        try{
            const {nombre, venta, precio, foto, tags} = req.body

            const result = await Ad.insertMany({nombre, venta, precio, foto, tags})
            fs.writeFile(foto, "", function(err){
                if(err){
                  console.log(err)
                }
              })
            res.redirect('/')
         //  res.download(foto)

        } catch (err) {
            next(err);
        }
    }
    */
}

module.exports = AdController;