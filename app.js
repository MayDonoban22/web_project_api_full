const express = require('express');
const mongoose = require('mongoose');
const supertest = require('supertest');
const cors = require('cors');
const { errors } = require('celebrate');
const usersRoutes = require('./routes/users.js');
const cardsRoutes = require('./routes/cards.js');
const { login, createUser } = require('./controllers/users.js');
const { logRequest, errorHandler } = require('./middlewares/errorHandler');
const { validateSignin, validateSignup } = require('./middlewares/validations');

require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors());
app.options('*', cors());
app.use(logRequest);

const DB_AROUND = process.env.DB_AROUND || 'arounddb';
const MONGOHOST = process.env.MONGOHOST;
const MONGOUSER = process.env.MONGOUSER;
const MONGOPASSWORD = encodeURIComponent(process.env.MONGOPASSWORD);
mongoose.connect(`mongodb://${MONGOUSER}:${MONGOPASSWORD}@${MONGOHOST}:27017/${DB_AROUND}?authSource=admin&retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => { //direccion IP requerible
  console.log('Connected to MongoDB');
})
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });

const { PORT = 3000 } = process.env;

app.post('/signin', validateSignin, login);
app.post('/signup', validateSignup, createUser);

app.use('/cards', cardsRoutes);
app.use('/users', usersRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
});
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}...`);
  console.log(`mongodb://${MONGOUSER}:${MONGOPASSWORD}@${MONGOHOST}:27017/${DB_AROUND}?authSource=admin&retryWrites=true&w=majority`);
});
module.exports = app;