'use strict';

//Añado control de sesiones
const session = require('express-session')
const session_auth = require('./lib/AuthSession')
const jwtAuth = require('./lib/AuthJwt')

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const LoginController = require('./controllers/login_controller')
const AdController = require('./controllers/ad_controller')
/* jshint ignore:start */
const db = require('./lib/connectMongoose');
/* jshint ignore:end */



// Cargamos las definiciones de todos nuestros modelos
require('./models/Anuncio');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Global Template variables
app.locals.title = 'NodePop';


//internalización con i18n
// -------- TODO pasar configuracion a archivo en lib
const i18n = require('./lib/i18nConfig');
const MongoStore = require('connect-mongo');
app.use(i18n.init);



//setup de sesiones del website
app.use(session({
  name: 'nodeapi-session',
  secret: '^Z_J-Vb4:}Zncn3:8^4mTZN',
  saveUninitialized: true, //crea sesiones en blanco 
  resave: false, //no almacena sesiones "repetidas"
  cookie: {
    maxAge: 1000* 60 * 60 * 24 * 2 // 2 días de inactividad
  },
  store: MongoStore.create({mongoUrl: process.env.MONGDB_URL})
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next()
})

const loginController = new LoginController()
const adController = new AdController()

//Autenticación

app.post("/api/authenticate", loginController.JWTPost)
//app.use('/anuncios', session_auth, require('./routes/apiv1/anuncios'));
//app.use('/anuncios', require('./routes/apiv1/anuncios'));

// Web

app.use('/change-locale', require('./routes/change_loc'));
app.get('/api/login', loginController.index); //controlador
app.post('/api//login', loginController.post)
app.get('/logout', loginController.logout)
app.use('/', session_auth, require('./routes/anuncios'));
app.use('api/anuncios', require('./routes/apiv1/anuncios'));

//publicar anuncio

app.post('/newad', adController.post)
app.get('/newad', adController.index); 
/*
app.use('/private', require('./routes/private'));
app.post('/newad', adController.post)
app.get('/newad', adController.index); 

// API v1
app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));
*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  
  if (err.array) { // validation error
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = isAPI(req) ?
      { message: 'not valid', errors: err.mapped()}
      : `not valid - ${errInfo.param} ${errInfo.msg}`;
  }

  // establezco el status a la respuesta
  err.status = err.status || 500;
  res.status(err.status);

  // si es un 500 lo pinto en el log
  if (err.status && err.status >= 500) console.error(err);
  
  // si es una petición al API respondo JSON...
  if (isAPI(req)) {
    res.json({ success: false, error: err.message });
    return;
  }

  // ...y si no respondo con HTML...

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

function isAPI(req) {
  return req.originalUrl.indexOf('/api') === 0;
}

module.exports = app;
