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

class DuplicateUserError extends Error {
  constructor(){
    super();
    this.name = "DuplicateUserError";
  }
}

const statusDict = {
  validationErrorStatus: { status: 400, message: "Invalid data" },
  castErrorStatus: { status: 400, message: "Could not cast ObjectId" },
  authenticationErrorStatus: { status: 401, message: "Incorrect email or password" },
  identificationErrorStatus: { status: 403, message: "Not allowed" },
  documentNotFoundErrorStatus: { status: 404, message: "Does not exist" },
  duplicateUserErrorStatus: { status: 409, message: "Already exists in database" },
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
  if(err.name === "DuplicateUserError"){
    return statusDict.duplicateUserErrorStatus;
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

module.exports.checkUserExists = (match) => {
  if(!match){
    throw new DuplicateUserError();
  }
}

module.exports.checkUserPassword = (match) => {
  if(!match) {
    throw new AuthenticationError();
  }
}

module.exports.handleUnknownRoute = (req, res, next) => {
  if (!res.status.ok) {
    throw new mongoose.Error.DocumentNotFoundError();
  }
  next();
};
