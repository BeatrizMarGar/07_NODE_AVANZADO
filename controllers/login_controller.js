'use strict';

const {User} = require('../models')

class LoginController {

    index(req, res, next){
        res.locals.error = ""
        res.render('login');
    }
    
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
}

module.exports = LoginController;