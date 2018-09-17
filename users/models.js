'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''},
  location: { type: String },
  instrument: { type: String },
  genre: { type: String },
  cell: { type: Number }, 
  email: { type: String }
});

UserSchema.methods.serialize = function() {
  return {
    username: this.username || '',
    firstName: this.firstName || '',
    lastName: this.lastName || '',
    location: this.location || '',
    instrument: this.instrument || '',
    genre: this.genre || '',
    cell: this.cell || '', 
    email: this.email || '',
    id: this._id
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 5);
};

const User = mongoose.model('User', UserSchema);

module.exports = {User, UserSchema};

