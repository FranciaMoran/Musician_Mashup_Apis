'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const should = chai.should();
const express = require('express');
const router = express.Router();
const {User} = require('../users/models');
const { app, runServer, closeServer } = require('../server')
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);
const expect = chai.expect;



function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

describe('POST in users', function () {

  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

afterEach(function () {
    return tearDownDb();
  });


  after(function () {
    return closeServer();
  });

    it('should add a new user', function () {

      const newUser = {
      username: faker.commerce.color(), 
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      location: faker.address.city(),
      instrument: faker.name.jobTitle(),
      genre: faker.name.title(),
      cell: faker.random.number(),
      email: faker.internet.email()
      };
      return chai.request(app)
        .post('/api/users')
        .send(newUser)
        .then(function (res) { 
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'id', 'username', 'firstName', 'lastName', 'location', 'instrument', 'genre', 'cell', 'email');
          res.body.id.should.not.be.null;
          res.body.username.should.equal(newUser.username);
          res.body.firstName.should.equal(newUser.firstName);
          res.body.lastName.should.equal(newUser.lastName);
          res.body.location.should.equal(newUser.location);
          res.body.instrument.should.equal(newUser.instrument);
          res.body.genre.should.equal(newUser.genre);
          res.body.cell.should.equal(newUser.cell);
          res.body.email.should.equal(newUser.email);
          return User.findById(res.body.id);
        })
        .then(function (post) {
          post.username.should.equal(newUser.username);
          post.firstName.should.equal(newUser.firstName);
          post.lastName.should.equal(newUser.lastName);
          post.location.should.equal(newUser.location);
          post.instrument.should.equal(newUser.instrument);
          post.genre.should.equal(newUser.genre);
          post.cell.should.equal(newUser.cell);
          post.email.should.equal(newUser.email);
          return post.validatePassword(newUser.password)
           .then(function (isValidPassword){
          isValidPassword.should.equal(true);
         })
        })
    });
  });


