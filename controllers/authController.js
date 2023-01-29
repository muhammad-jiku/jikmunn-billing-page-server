// external imports
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// internal imports
const User = require('../models/User');

// sign-in with email
const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email: email });

    if (!oldUser) {
      return res.status(404).json({ message: 'User does not exist' });
    } else {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        oldUser.password
      );

      if (!isPasswordCorrect)
        return res.status(400).json({ message: 'Something went wrong' });

      const token = jwt.sign(
        { email: oldUser.email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '86400s',
        }
      );

      res.status(200).json({
        message: 'User existence test passed successfully!!',
        data: oldUser,
        accessToken: token,
      });
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      message: 'There is a server side error',
      // error: err
    });
  }
};

// sign-up with email
const registration = async (req, res) => {
  const { username, phone, email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email: email });

    if (!oldUser) {
      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        username: username,
        phone: phone,
        email: email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();

      const token = jwt.sign(
        { email: savedUser.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '86400s' }
      );

      res.status(200).json({
        message: 'User added successfully!!',
        data: savedUser,
        accessToken: token,
      });
    } else {
      return res.status(400).json({ message: 'User already exists' });
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      message: 'There is a server side error',
      // error: err
    });
  }
};

// exporting modules
module.exports = {
  logIn,
  registration,
};
