const Error = require('express');
const mongoose = require('mongoose');

module.exports.isValidId = (_id) => {
  return mongoose.isValidObjectId(_id);
};

class ValidationError extends Error {
  constructor(message){
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
    this.message = "Invalid oject id";
  }

  isValidId = (_id) => {
    if(!mongoose.isValidObjectId(_id)){
      return this.message;
    }
  }
}

// const validationError = new ValidationError().isValidId;

// module.exports.validationError = (_id) => validationError(_id);
