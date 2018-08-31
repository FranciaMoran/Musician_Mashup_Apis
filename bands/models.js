'use strict';;
const mongoose = require('mongoose');

const BandSchema = mongoose.Schema({
  bandName: { type: String }
});

BandSchema.methods.serialize = function() {
  return {
    bandName: this.bandName || ''
  };
};

const Bands = mongoose.model('Bands', BandSchema);

module.exports = {Bands};
