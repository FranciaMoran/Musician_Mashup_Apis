'use strict';;
const mongoose = require('mongoose');

const BandSchema = mongoose.Schema({
  bandName: { type: String },
  memberOne: { type: String },
  userId: { type: String }
});

BandSchema.methods.serialize = function() {
  return {
    bandName: this.bandName || '',
    memberOne: this.memberOne || '',
    userId: this.userId || '', 
    _id: this._id || ''
  };
};

const Bands = mongoose.model('Bands', BandSchema);

module.exports = {Bands};
