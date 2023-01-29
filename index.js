require('dotenv').config();
const express = require('express');
const cors = require('cors');

const databaseConnect = require('./utils/databaseConnet');

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

// database connect
databaseConnect();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'HELLO THERE!!' });
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
