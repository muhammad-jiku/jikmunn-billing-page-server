require('dotenv').config();
const express = require('express');

const databaseConnect = require('./utils/databaseConnet');

const port = process.env.PORT || 5000;
const app = express();

//  middleware
app.use(express.json());

// database connect
databaseConnect();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'HELLO THERE!!' });
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
