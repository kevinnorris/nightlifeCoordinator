import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

// Define schema
const User = new mongoose.Schema({
  github: {
    id: String,
    displayName: String,
    username: String,
    publicRepos: Number,
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

User.methods.validPassword = password => (
  bcrypt.compareSync(password, this.local.password)
);

// Create model and expose it
module.exports = mongoose.model('User', User);
