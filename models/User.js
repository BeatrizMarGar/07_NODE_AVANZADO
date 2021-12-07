'use strict';

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//creamos esquema
const userSchema = mongoose.Schema({
    email: {type: String, unique: true},
    password: String
})

userSchema.statics.hashPassword = function(password_lit){
    return bcrypt.hash(password_lit, 7)

}

//no usar arrow por el this estático
userSchema.methods.comparePassword = function(password_lit){
    return bcrypt.compare(password_lit, this.password)
}

//creamos modelo
const User = mongoose.model('User', userSchema)

//exporto modelo

module.exports = User