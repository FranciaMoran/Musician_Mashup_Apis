'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {Profiles} = require('./models');
const passport = require('passport');
const router = express.Router();

const jsonParser = bodyParser.json();

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['name'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status().send(message);
    }
  }

   Profiles
    .create({
      name: req.body.name,
      location: req.body.location,
      instrument: req.body.instrument,
      genre: req.body.genre,
      cell: req.body.cell,
      email: req.body.email
    })
    .then(Profiles => res.status(201).json(Profiles.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/', jwtAuth, (req, res) => {
  return res.json({
    Profiles
  });
});


module.exports = {router};

