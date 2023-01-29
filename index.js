require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const cors = require('cors');

const databaseConnect = require('./utils/dbConnect');
const { logIn, registration } = require('./controllers/authController');
const {
  addBill,
  getAllBills,
  updateBill,
  removeBill,
} = require('./controllers/billController');

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

app.post('/api/login', logIn);
app.post('/api/registration', registration);
app.get('/api/billing-list ', getAllBills);
app.post('/api/add-billing', addBill);
app.put('/api/update-billing/:id', updateBill);
app.delete('/api/delete-billing/:id', removeBill);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
