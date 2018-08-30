'use strict';;
const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
  name: { type: String },
  location: { type: String },
  instrument: { type: String },
  genre: { type: String },
  cell: { type: Number }, 
  email: { type: String }
});

ProfileSchema.methods.serialize = function() {
  return {
    name: this.name || '',
    location: this.location || '',
    instrument: this.instrument || '',
    genre: this.genre || '',
    cell: this.cell || '', 
    email: this.email || ''
  };
};

const Profiles = mongoose.model('Profiles', ProfileSchema);

module.exports = {Profiles};

