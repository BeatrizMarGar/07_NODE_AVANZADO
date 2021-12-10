'use strict';

const {User, Anuncios} = require('../models')
const jwt = require('jsonwebtoken')

class LoginController {

    index(req, res, next){
        res.locals.error = ""
        res.render('login');
    }
    /*
    async post(req, res, next){
        try{
        const {email, password} = req.body
            //buscar usuario en db

            const user = await User.findOne({email})

                //si no encuentro, error
                //contraseña mal, error

            if(!user || !(user.comparePassword(password))) {
                //res.locals.error = res.__("Invalid credentials")
                res.locals.error = "Invalid credentials"
                res.render('login')
                return;
            }

            // guardar en sesion que está autenticado
            req.session.userLogged = {
                _id: user._id
            }
            
            //todo ok, zona privada
            res.redirect('/private')

        } catch (err) {
            next(err);
        }
    }
*/
    async JWTPost(req, res, next){
        try{
            const {email, password} = req.body;
            const user = await User.findOne({email})

            
            if(!user || !(user.comparePassword(password))) {
                //res.locals.error = res.__("Invalid credentials")
                res.locals.error = "Invalid credentials"
                res.render('login')
                return;
            } 
            jwt.sign({_id: user._id}, process.env.SECRET_JWT, {
                expiresIn: '2d'
            }, (err, jwtToken) =>{
                if (err) {
                    next(err);
                    return;
                }
                    //res.json({token:jwtToken}) 
                    res.render('anuncios')               
            })

        }
        catch (err){
            next()
        }
    }
}

module.exports = LoginController;