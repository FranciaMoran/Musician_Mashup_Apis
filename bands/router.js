'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const {Bands} = require('./models');
const passport = require('passport');
const router = express.Router();
const {User} = require('../users/models');
const jsonParser = bodyParser.json();
const jwtAuth = passport.authenticate('jwt', { session: false });


router.post('/', jwtAuth, jsonParser, (req, res) => {
  const requiredFields = ['bandName'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status().send(message);
    }
  }
   User.findById(req.body.userId)
  .then(user => { 
    Bands
      .create({
        bandName: req.body.bandName,
        members: [user] 
      })
    .then(bands => res.status(201).json(bands.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
  });
});

/*
router.get('/', jwtAuth, jsonParser, (req, res) => {
  return Bands.find()
    .then(bands => res.json(bands.map(bands => bands.serialize())))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
    console.log(res)
}); */
/*
router.get('/', jwtAuth, (req, res) => {
return res.json({
    data: 'test'
  });
});   
*/

router.get('/', jwtAuth, jsonParser, (req, res) => {
   return Bands.find()
    .then(band => res.json(band.map(bands => bands.serialize())))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
    console.log(res);
  });

router.put('/:id', jsonParser, (req, res) => {
  const updated = {};
  const updateableFields =  ['bandName', 'members'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Bands
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(Bands => { 
      res.json(Bands)
    })
    .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});


module.exports = {router};

