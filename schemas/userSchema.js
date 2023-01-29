const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      minLength: [3, 'Name must be at least 3 letters'],
      maxLength: [100, 'Name is too long'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: [true, 'This user is already in!'],
    },
    password: {
      type: String,
      minLength: [6, 'Password must be at least 3 letters'],
    },
  },
  { timestamps: true }
);

// exporting module
module.exports = userSchema;
