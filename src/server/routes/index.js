var flash = require('connect-flash');
var express = require('express');
var router = express.Router();

var passport = require('../auth/github.js');


router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'home',
    user: req.user,
    messages: res.locals.sessionFlash
  });
});

module.exports = router;
