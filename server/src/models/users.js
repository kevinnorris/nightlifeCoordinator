import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

// Define schema
const User = new mongoose.Schema({
  github: {
    id: String,
    displayName: String,
    username: String,
  },
  local: {
    email: String,
    password: String,
  },
});

// Methods
User.methods.generateHash = password => (
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
);

User.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// Create model and expose it
module.exports = mongoose.model('User', User);
