// external imports
const mongoose = require('mongoose');

// internal imports
const userSchema = require('../schemas/userSchema');

const User = new mongoose.model('People', userSchema);

// exporting module
module.exports = User;
