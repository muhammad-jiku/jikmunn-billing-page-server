const mongoose = require('mongoose');

const Bill = require('../models/Bill');

const addBill = async (req, res) => {
  const { name, email, phone, paidAmount } = await req.body;
  try {
    const newBill = await new Bill({
      name: name,
      email: email,
      phone: phone,
      paidAmount: parseFloat(paidAmount),
    });
    const savedBill = await newBill.save();
    console.log(savedBill);
    res.status(200).json({
      message: 'Bill added successfully!!',
      data: savedBill,
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      message: 'There is a server side error!',
      // error: err
    });
  }
};

// exporting modules
module.exports = {
  addBill,
};
