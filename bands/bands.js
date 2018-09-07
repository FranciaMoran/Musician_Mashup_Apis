'use strict';;
const mongoose = require('mongoose');

const BandSchema = mongoose.Schema({
  bandName: { type: String },
  memberOne: {type: String}
});

BandSchema.methods.serialize = function() {
  return {
    bandName: this.bandName || '',
    memberOne: this.memberOne || '',
    _id: this.id || ''
  };
};

const Bands = mongoose.model('Bands', BandSchema);

module.exports = {Bands};
