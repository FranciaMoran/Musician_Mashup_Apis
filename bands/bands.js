'use strict';;
const mongoose = require('mongoose');

const BandSchema = mongoose.Schema({
  bandName: { type: String },
  memberOne: { type: String },
  members: [
  { type: String }
  ],
  userId: { type: String },
});

BandSchema.methods.serialize = function() {
  return {
    bandName: this.bandName || '',
    memberOne: this.memberOne || '',
    members: this.members || '',
    userId: this.userId || '', 
    _id: this.id || ''
  };
};

const Bands = mongoose.model('Bands', BandSchema);

module.exports = {Bands};
