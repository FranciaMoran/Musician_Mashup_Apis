'use strict';;
const mongoose = require('mongoose');
const {UserSchema} = require('../users/models');

const BandSchema = mongoose.Schema({
  bandName: { type: String },
  members: {
   type: [UserSchema]
  }
});

BandSchema.methods.serialize = function() {
  return {
    bandName: this.bandName || '',
    members: this.members || ''
  };
};

const Bands = mongoose.model('Bands', BandSchema);

module.exports = {Bands};
