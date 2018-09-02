'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {Bands} = require('./models');
const passport = require('passport');
const router = express.Router();

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

   Bands
    .create({
      bandName: req.body.bandName
    })
    .then(Bands => res.status(201).json(Bands.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

router.get('/', jwtAuth, (req, res) => {
  return res.json({
    Bands
  });
});


module.exports = {router};

