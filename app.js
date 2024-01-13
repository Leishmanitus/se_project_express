const express = require('express');
const mongoose = require('mongoose');

const {PORT=3001} = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db')
.then(() => {console.log(`Connected to db`)})
.catch(err => {console.error(`DB error: ${err.status}`)});

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
})
