require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const cors = require('cors');

const databaseConnect = require('./utils/dbConnect');

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

app.get('/', (req, res) => {
  res.status(200).json({ message: 'HELLO THERE!!' });
});

//  database connection
databaseConnect();

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
