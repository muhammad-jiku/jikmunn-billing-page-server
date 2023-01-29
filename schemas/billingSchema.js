const mongoose = require('mongoose');

const billingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      minLength: [3, 'Name must be at least 3 letters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
    },
    phone: {
      type: String,
      required: [true, 'Please provide your phone'],
      maxLength: [11, 'Phone Number can not be more than 11 numbers!'],
    },
    paidAmount: {
      type: Number,
      required: [true, 'Please provide bill amount'],
    },
    // totalAmount: {
    //   type: Number,
    //   required: true,
    //   default: 0,
    // },
  },
  { timestamps: true }
);

// exporting module
module.exports = billingSchema;
