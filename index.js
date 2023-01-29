require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const cors = require('cors');

const databaseConnect = require('./utils/dbConnect');
const { logIn, registration } = require('./controllers/authController');
const { addBill, getAllBills } = require('./controllers/billController');

const app = express();
const port = process.env.PORT || 5000;

// cors config
const corsConfig = {
  origin: true,
  credentials: true,
};

// middleware
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
app.use(express.json());

//  database connection
databaseConnect();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'HELLO THERE!!' });
});

app.use('/api/login', logIn);
app.use('/api/registration', registration);
app.use('/api/billing-list ', getAllBills);
app.use('/api/add-billing', addBill);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
