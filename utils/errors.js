const mongoose = require('mongoose');

class ValidationError extends mongoose.Error.ValidationError {
  constructor(){
    super();
  }
}

module.exports.isValidId = (_id) => {
  if(!mongoose.isValidObjectId(_id)){
    return new Promise((resolve, reject) => {
      reject(new ValidationError());
    });
  }
};

module.exports.sendErrorStatus = (err) => {
  const status400 = { status: 400 };
  const status404 = { status: 404 };
  const status500 = { status: 500 };

  if(err.name === "ValidationError"){
    return status400;
  } else if(err.name === "CastError"){
    return status400;
  } else if(err.name === "AssertionError"){
    return status400;
  } else if(err.name === "ValidatorError"){
    return status400;
  } else if(err.name === "DocumentNotFoundError"){
    return status404;
  } else {
    return status500;
  }
};
