const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middleware/logger');

require('dotenv').config();

const { PORT=3001 } = process.env;
const app = express();

process.on('uncaughtException', (err, origin) => {
  console.error(`${origin} ${err.name} with the message ${err.message} was not handled.`);
});


mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db')
.then(() => console.log(`Connected to db`))
.catch(err => console.error(`DB error: ${err.status}`));

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(requestLogger());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use(routes);

app.use(errorLogger());

app.use(errors());

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.status || 500).send({
    message: err.message || "Internal server error",
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(`${promise} was not handled because ${reason}`);
});

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
