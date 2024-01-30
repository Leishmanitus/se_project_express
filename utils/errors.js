const mongoose = require('mongoose');

class AuthenticationError extends Error {
  constructor() {
    super();
    this.name = "AuthenticationError";
  }
}

class IdentificationError extends Error {
  constructor(){
    super();
    this.name = "IdentificationError";
  }
}

class ConflictError extends Error {
  constructor(){
    super();
    this.name = "ConflictError";
  }
}

const statusDict = {
  validationErrorStatus: { status: 400, message: "Invalid entry" },
  castErrorStatus: { status: 400, message: "Could not cast ObjectId" },
  authenticationErrorStatus: { status: 401, message: "Incorrect email or password" },
  identificationErrorStatus: { status: 403, message: "Not allowed" },
  documentNotFoundErrorStatus: { status: 404, message: "Does not exist" },
  conflictErrorStatus: { status: 409, message: "Already exists in database" },
  defaultErrorStatus: { status: 500, message: "Internal Server Error" },
}

module.exports.sendErrorStatus = (err) => {
  if(err.name === "ValidationError"){
    return statusDict.validationErrorStatus;
  }
  if(err.name === "CastError"){
    return statusDict.castErrorStatus;
  }
  if(err.name === "DocumentNotFoundError"){
    return statusDict.documentNotFoundErrorStatus;
  }
  if(err.name === "AuthenticationError"){
    return statusDict.authenticationErrorStatus;
  }
  if(err.name === "ConflictError"){
    return statusDict.conflictErrorStatus;
  }
  if(err.name === "IdentificationError"){
    return statusDict.identificationErrorStatus;
  }
  return statusDict.defaultErrorStatus;
};

module.exports.checkUserId = (requestId, userId) => {
  if(requestId !== userId){
    throw new IdentificationError();
  }
};

module.exports.checkForConflict = (match) => {
  if(match){
    throw new ConflictError();
  }
}

module.exports.checkUserPassword = (match) => {
  if(!match) {
    throw new AuthenticationError();
  }
}

module.exports.handleAuthError = handleAuthError = (res) => {
  return res
    .status(401)
    .send({ message: 'Authorization Error' });
};

module.exports.handleValidationError = handleValidationError = (res) => {
  return res
    .status(400)
    .send({ message: 'Invalid entry' });
};

module.exports.handleMissingField = () => {
  throw new mongoose.Error.ValidationError();
};

module.exports.handleUnknownRoute = (req, res, next) => {
  if (!res.status.ok) {
    throw new mongoose.Error.DocumentNotFoundError();
  }
  next();
};
