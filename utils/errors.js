const mongoose = require('mongoose');

module.exports.sendErrorStatus = (err) => {
  const validationErrorStatus = { status: 400, message: "Invalid data" };
  const castErrorStatus = { status: 400, message: "Could not cast ObjectId" }
  const DocumentNotFoundErrorStatus = { status: 404, message: "Does not exist" };
  const defaultErrorStatus = { status: 500, message: "Internal Server Error" };

  if(err.name === "ValidationError"){
    return validationErrorStatus;
  }
  if(err.name === "CastError"){
    return castErrorStatus;
  }
  if(err.name === "DocumentNotFoundError"){
    return DocumentNotFoundErrorStatus;
  }
  return defaultErrorStatus;
};

module.exports.handleUnknownRoute = (req, res, next) => {
  if (res.status !== 'ok') {
    throw mongoose.Error.DocumentNotFoundError;
  }
  next();
};
