'use strict';

require('dotenv').config()

require('./lib/connectMongoose')
const {Ad, User} = require('./models/index')
const mongoose = require ('mongoose')

async function main() {
    //inicio la coleccion de anuncios
    await initAds()
    //inicio la coleccion de usuarios
    await initUsers()
    mongoose.connection.close()   
}

//controlamos los posibles errores de la funcion
main().catch ( err => console.log(err))

async function initAds(){
    //base de datos vacia, estado inicial
    const { deletedCount } = await Ad.deleteMany();
    console.log(`Eliminados ${deletedCount} anuncios`)

    const result = await Ad.insertMany([
        {
            name: "User1",
            age: 27
        },
        {
            name: "User2",
            age: 38,
        }
    ])
    console.log(`Insertados ${result.length} anuncios`)
}

async function initUsers(){
    //base de datos vacia, estado inicial
    const { deletedCount } = await User.deleteMany();
    console.log(`Eliminados ${deletedCount} usuarios`)

    const result = await User.insertMany([
        {
            email: "admin@example.com",
            password: await User.hashPassword('1234')
        },
        {
            email: "User2",
            password: await User.hashPassword('1234')
        }
    ])
    console.log(`Insertados ${result.length} usuarios`)
}