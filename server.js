'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const { router: profilesRouter } = require('./profiles');
const { router: bandsRouter } = require('./bands');



mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');

const app = express();

app.use(morgan('common'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);
app.use('/api/profiles/', profilesRouter);
app.use('/api/bands/', bandsRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });

 app.get('/api/*', (req, res) => {
   res.json({ok: true});
 });

 
app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'testing'
  });
});





////////////////////////////////////////////
/*

app.put('/dashboard/:id', jsonParser, (req, res) => {

  const updated = {};
  const updateableFields =  ['name', 'location', 'genre', 'cell', 'email'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  eachProfile
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })

    .then(updatedLog => { 
      eachProfile
        .find()
        .then(logs => {
          res.json(logs.map(log => log.serialize()));
        })
    })
    .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});


*/

/////////////////////////////
/*


app.post('/dashboard', jsonParser, (req, res) => {
  const requiredFields = ['name'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status().send(message);
    }
  }

 eachProfile
    .create({
      name: req.body.name,
      location: req.body.location,
      genre: req.body.genre,
      cell: req.body.cell, 
      email: req.body.email
    })
    .then(eachProfile => res.status(201).json(eachProfile.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    });

});


*/
///////////////////////////////////////////////////////////////








app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

let server;

function runServer(databaseUrl, port = PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
