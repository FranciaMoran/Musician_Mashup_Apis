'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const {Bands} = require('./bands');
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
        memberOne: user.name,
        userId: user.id
      })
    .then(bands => res.status(201).json(bands.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
  });
});



router.get('/', jwtAuth, jsonParser, (req, res) => {
  Bands
    .find({ userId: req.user.id })
    .then(bands => {
      res.json(bands.map(band => band.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went terribly wrong' });
    });
});




 


router.put('/:id', jwtAuth, jsonParser, (req, res) => {
  const updated = {};
  const updateableFields =  ['bandName'];
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





router.delete('/:id', jwtAuth, jsonParser, (req, res) => {
  Bands.findById(req.params.id)
  .then(bands => bands.remove().then(() => res.json({success: true})))
  .catch(err => res.status(404).json({success: false}))
});


module.exports = {router};

