var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.userLogged){
    res.redirect('/login')
    return;
  }
  res.render('private', { title: 'nodepop login' });
});

module.exports = router;