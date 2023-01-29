const mongoose = require('mongoose');

const billingSchema = mongoose.Schema(
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
    phone: {
      type: String,
      required: [true, 'Please provide your phone'],
    },
    paidAmount: {
      type: Number,
      required: [true, 'Please provide bill amount'],
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

// exporting module
module.exports = billingSchema;
