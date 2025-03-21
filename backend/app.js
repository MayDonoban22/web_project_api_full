const express = require('express');
const mongoose = require('mongoose');
const supertest = require('supertest');
const usersRoutes = require('./routes/users.js');
const cardsRoutes = require('./routes/cards.js');
require('dotenv').config()

const app = express();
app.use(express.json());

const DB_AROUND = process.env.DB_AROUND || 'arounddb';
mongoose.connect(`mongodb://127.0.0.1:27017/${DB_AROUND}`).then(() => { //direccion IP requerible
  console.log('Connected to MongoDB');
})
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });

const { PORT = 3000 } = process.env;
app.use((req, res, next) => {
  req.user = {
    _id: '678b09a199c41466ea77c57f'
  };

  next();
});
app.use('/cards', cardsRoutes),
  app.use('/users', usersRoutes)

app.post('/signin', login);
app.post('/signup', createUser);


app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}...`);
});




