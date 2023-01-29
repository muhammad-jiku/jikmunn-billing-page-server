require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion } = require('mongodb');

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

const uri = `mongodb+srv://${process.env.DB_AUTHOR}:${process.env.DB_PASS}@cluster0.vcvbzjp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// connecting to the database
const databaseConnect = async () => {
  try {
    await client.connect();
    const userCollection = client
      .db(`${process.env.DB_NAME}`)
      .collection('userInfo');

    app.get('/api/login', async (req, res) => {
      const { email, password } = await req.body;

      try {
        const oldUser = await userCollection.find({ email: email }).toArray();

        if (!oldUser) {
          return res.status(404).json({ message: 'User does not exist' });
        } else {
          const isPasswordCorrect = await bcrypt.compare(
            password,
            oldUser?.password
          );

          if (!isPasswordCorrect)
            return res.status(400).json({ message: 'Something went wrong' });

          const token = await jwt.sign(
            { email: oldUser?.email },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: '86400s',
            }
          );

          console.log('token...', token);
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
    });

    app.post('/api/registration', async (req, res) => {
      const { name, email, password } = await req.body;

      try {
        const oldUser = await userCollection.find({ email: email }).toArray();

        if (!oldUser) {
          const hashedPassword = await bcrypt.hash(password, 12);

          const newUser = {
            name: name,
            email: email,
            password: hashedPassword,
          };

          const savedUser = await userCollection.insertOne(newUser);

          const token = await jwt.sign(
            { email: savedUser?.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '86400s' }
          );
          console.log('creating token...', token);
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
    });

    // app.get('/api/billing-list', async (req, res) => {});

    // app.post('/api/add-billing', async (req, res) => {});

    // app.put('/api/update-billing/:id', async (req, res) => {});

    // app.delete('/api/delete-billing/:id', async (req, res) => {});

    // console.log('DB connected!');
  } finally {
    // await client.close();
  }
};
databaseConnect().catch(console.dir);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
