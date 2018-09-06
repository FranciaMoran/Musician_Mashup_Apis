'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const should = chai.should();
const {router} = require('../users/router');
const {User} = require('../users/models');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);
const expect = chai.expect;

/////////////////////////////////////////////////

describe('POST in users', function () {
    it('should add a new user', function () {

      const newUser = {
      username: faker.commerce.color(), 
      password: faker.random.number(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      name: faker.name.firstName(),
      location: faker.address.city(),
      instrument: faker.name.jobTitle(),
      genre: faker.name.title(),
      cell: faker.random.number(),
      email: faker.internet.email()
      };

      return chai.request(router)
        .post('/users')
        .send(newUser)
        .then(function (res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'id', 'username', 'password', 'firstName', 'lastName', 'name', 'location', 'instrument', 'genre', 'cell', 'email');
          res.body.id.should.not.be.null;
          res.body.username.should.equal(newUser.username);
          res.body.password.should.equal(newUser.password);
          res.body.firstName.should.equal(newUser.firstName);
          res.body.lastName.should.equal(newUser.lastName);
          res.body.name.should.equal(newUser.name);
          res.body.location.should.equal(newUser.location);
          res.body.instrument.should.equal(newUser.instrument);
          res.body.genre.should.equal(newUser.genre);
          res.body.cell.should.equal(newUser.cell);
          res.body.email.should.equal(newUser.email);
          return User.findById(res.body.id);
        })
        .then(function (post) {
          post.username.should.equal(newUser.username);
          post.password.should.equal(newUser.password);
          post.firstName.should.equal(newUser.firstName);
          post.lastName.should.equal(newUser.lastName);
          post.name.should.equal(newUser.name);
          post.location.should.equal(newUser.location);
          post.instrument.should.equal(newUser.instrument);
          post.genre.should.equal(newUser.genre);
          post.cell.should.equal(newUser.cell);
          post.email.should.equal(newUser.email);
        });
    });
  });
