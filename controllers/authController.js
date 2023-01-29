const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const logIn = async (req, res) => {
  const { email, password } = await req.body;

  try {
    const oldUser = await User.findOne({ email: email });
    console.log('old user...', oldUser);
    // if (email !== oldUser?.email) {
    //   return res.status(404).json({ message: 'User does not exist' });
    // } else {
    const isPasswordCorrect = await bcrypt.compare(password, oldUser?.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Something went wrong' });

    const token = await jwt.sign(
      { email: oldUser?.email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '86400s',
      }
    );

    console.log('tokennn...', token);

    res.status(200).json({
      message: 'User existence test passed successfully!!',
      data: oldUser,
      accessToken: token,
    });
    // }
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      message: 'There is a server side error',
      // error: err
    });
  }
};

const registration = async (req, res) => {
  const { name, email, password } = await req.body;

  try {
    const oldUser = await User.findOne({ email: email });
    console.log('old user:', oldUser);

    // if (email !== oldUser?.email) {
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    console.log('new user', newUser);
    const savedUser = await newUser.save();

    console.log(savedUser);
    const token = await jwt.sign(
      { email: savedUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '86400s' }
    );

    res.status(200).json({
      message: 'User added successfully!!',
      data: savedUser,
      accessToken: token,
    });
    // } else {
    //   return res.status(400).json({ message: 'User already exists' });
    // }
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
