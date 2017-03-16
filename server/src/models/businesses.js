import mongoose from 'mongoose';

const Business = new mongoose.Schema({
  name: String,
  usersGoing: [
    {
      userId: String,
      expireDate: Number,
    },
  ],
});

module.exports = mongoose.model('Business', Business);
