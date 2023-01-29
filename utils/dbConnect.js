const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.DB_AUTHOR}:${process.env.DB_PASS}@cluster0.vcvbzjp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// connecting to the database
const databaseConnect = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('DB connected!!');
    })
    .catch((err) => {
      console.error('Connection error', err);
      process.exit();
    });
};

// exporting module
module.exports = databaseConnect;
