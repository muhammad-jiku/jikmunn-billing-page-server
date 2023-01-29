const { MongoClient, ServerApiVersion } = require('mongodb');

// database uri
const uri = `mongodb+srv://${process.env.DB_AUTHOR}:${process.env.DB_PASS}@cluster0.vcvbzjp.mongodb.net/?retryWrites=true&w=majority`;

// connecting to the database
const databaseConnect = () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  client
    .connect()
    .then(() => {
      console.log('DB connected!!');
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = databaseConnect;
