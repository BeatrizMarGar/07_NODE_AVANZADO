'use strict';

const Jimp = require('jimp')
const { Responder } = require('cote')
const requester = new Requester({name: 'thumbnailConverter'})

const img_measures = {
    height: 100,
    width: 100,
}


//requester.on('new_thumbnail', async(req, res) =>{
    
    Jimp.read('../bea_circulo.png', function (err, test){
        try{
            test.resize(img_measures.width, img_measures.height)
                .quality(50)
                .write('../thumb' + "./new.jpg")
        }catch (err){
            throw err;
        }
    })
//})
