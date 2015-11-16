var express = require('express');
var router = express.Router();
var models = require('../models/index');


// get all speakers
router.get('/speakers', function(req, res, next) {
  models.Speaker.findAll({}).then(function(speakers) {
    res.json(speakers);
  });
});

// get single speaker
router.get('/speaker/:id', function(req, res, next) {
  models.Speaker.find({
    where: {
      id: req.params.id
    }
  }).then(function(speaker) {
    res.json(speaker);
  });
});

// add new speaker
router.post('/speakers', function(req, res, next) {
  models.Speaker.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    topic: req.body.topic,
    speaking_date: req.body.speaking_date,
    company: req.body.company
  }).then(function(speaker) {
    res.json(speaker);
  });
});

// update single speaker
router.put('/speaker/:id', function(req, res, next) {
  models.Speaker.find({
    where: {
      id: req.params.id
    }
  }).then(function(speaker) {
    if(speaker){
      speaker.updateAttributes(req.body).then(function(speaker) {
        res.send(speaker);
      });
    }
  });
});

// delete a single speaker
router.delete('/speaker/:id', function(req, res, next) {
  models.Speaker.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(speaker) {
    res.json(speaker);
  });
});

module.exports = router;
