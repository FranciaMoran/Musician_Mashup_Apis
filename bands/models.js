'use strict';;
const mongoose = require('mongoose');
//const {UserSchema} = require('../users/models');

const BandSchema = mongoose.Schema({
  bandName: { type: String },
  memberOne: { type: String }
});

BandSchema.methods.serialize = function() {
  return {
    bandName: this.bandName || '',
    memberOne: this.memberOne || ''
  };
};

const Bands = mongoose.model('Bands', BandSchema);

module.exports = {Bands};
