var express = require('express');
var router = express.Router();

var passport = require('../auth/github.js');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'home' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login' });
});

router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.json('success!');
  });

module.exports = router;
