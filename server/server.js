import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import userRoute from './routes/usersRoute.js';
import transactionRoute from './routes/transactionRoute.js';

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
  });
}

const connect = () => {
  mongoose
    .connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('connected to db');
    })
    .catch((err) => {
      throw err;
    });
};

app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/transactions', transactionRoute);

app.listen(port, () => {
  connect();
  console.log(`Server running on port ${port}`);
});
