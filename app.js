const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const routes = require('./routes/index');

const {PORT=3001} = process.env;
const app = express();

process.on('uncaughtException', (err, origin) => {
  console.error(`${origin} ${err.name} with the message ${err.message} was not handled.`);
});


mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db')
.then(() => {console.log(`Connected to db`)})
.catch(err => {console.error(`DB error: ${err.status}`)});

app.use(helmet());
app.use((req, res, next) => {
  req.user = {
    _id: '65a404adf38139665f900918',
  };

  next();
});

app.use(express.json());
app.use(routes);

process.on('unhandledRejection', (reason, promise) => {
  console.error(`${promise} was not handled because ${reason}`);
});

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});

