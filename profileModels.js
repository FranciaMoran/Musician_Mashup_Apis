const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const profileSchema = mongoose.Schema({
  name: {type: String, required: true }, 
  location: { type: String },
  genre: { type: String },
  cell: { type: Number }, 
  email: { type: String }
});

profileSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    location: this.location,
    genre: this.genre,
    cell: this.cell,
    email: this.email
  };
};


const eachProfile = mongoose.model('eachProfile', profileSchema);

module.exports = { eachProfile };