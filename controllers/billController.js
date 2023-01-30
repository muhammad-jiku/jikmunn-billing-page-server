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

const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find({}).sort({ createdAt: -1 }).select({
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });
    res.status(200).json({
      message: 'All bills showing!!',
      data: bills,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'There is a server side error',
      // error: err
    });
  }
};

const getBills = async (req, res) => {
  const { page = 1, limit = 10 } = await req.query;
  try {
    // get total documents in the Bills collection
    const count = await Bill.countDocuments();
    // console.log(page, limit);
    const bills = await Bill.find({})
      .sort({ createdAt: -1 })
      .limit(parseInt(limit) * 1)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .select({
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      });
    res.status(200).json({
      message: 'All bills showing!!',
      data: bills,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'There is a server side error',
      // error: err
    });
  }
};

const updateBill = async (req, res) => {
  const id = await req.params.id;
  const updatedBilldetails = await req.body;
  const opts = { runValidators: true };

  if (mongoose.Types.ObjectId.isValid(id)) {
    try {
      await Bill.findByIdAndUpdate(
        { _id: id },
        {
          $set: updatedBilldetails,
        },
        {
          new: true,
          opts,
        }
      );
      res.status(200).json({
        message: 'Bill details updated successfully',
        data: updatedBilldetails,
      });
    } catch (err) {
      // console.log(err)
      res.status(500).json({
        message: 'There is a server side error',
        // error: err
      });
    }
  } else {
    res.status(500).json({ message: 'There is a server side error!' });
  }
};

const removeBill = async (req, res) => {
  const id = await req.params.id;
  if (mongoose.Types.ObjectId.isValid(id)) {
    try {
      await Bill.findByIdAndDelete({ _id: id });
      res.status(200).json('Bill has been deleted...');
    } catch (err) {
      // console.log(err)
      res.status(500).json({
        message: 'There is a server side error',
        // error: err
      });
    }
  } else {
    res.status(500).json({ message: 'There is a server side error!' });
  }
};

// exporting modules
module.exports = {
  addBill,
  getAllBills,
  getBills,
  updateBill,
  removeBill,
};
