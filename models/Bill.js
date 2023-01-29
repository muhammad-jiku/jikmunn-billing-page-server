const mongoose = require('mongoose');

const billingSchema = require('../schemas/billingSchema');

const Bill = new mongoose.model('Bill', billingSchema);

// exporting module
module.exports = Bill;
