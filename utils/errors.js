class ValidationError extends Error {
  constructor() {
    super();
    this.name = "ValidationError";
  }
}

class DocumentNotFoundError extends Error {
  constructor() {
    super();
    this.name = "DocumentNotFoundError";
  }
}

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
  validationErrorStatus: { status: 400, message: "Invalid or missing entry" },
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

module.exports.checkUserId = (requestId, userId) => requestId !== userId ? new IdentificationError() : false;

module.exports.checkForConflict = (match) => match ? new ConflictError() : false;

module.exports.checkUserExists = (match) => !match ? new ValidationError() : false;

module.exports.checkUserPassword = (match) => !match ? new AuthenticationError() : false;

module.exports.handleAuthError = (res, message) => res.status(401).send({ message });

module.exports.handleMissingField = () => Promise.reject(new ValidationError());

module.exports.handleUnknownRoute = (req, res, next) => {
  if (!res.status.ok) {
    throw new DocumentNotFoundError();
  }
  next();
};
