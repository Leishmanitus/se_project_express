const Error = require('express');
const mongoose = require('mongoose');

module.exports.isValidId = (_id) => {
  if(!mongoose.isValidObjectId(_id)){
    throw new ValidationError();
  }
}

class ValidationError extends Error {
  constructor(){
    super();
    this.name = "ValidationError";
    this.statusCode = 400;
    this.message = "User requested invalid id";
  }
}
