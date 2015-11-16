var flash = require('connect-flash');
var express = require('express');
var router = express.Router();

var passport = require('../auth/github.js');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'home', user: req.user });
});

router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/',
    failureFlash : true
  }),
  function(req, res, next) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
