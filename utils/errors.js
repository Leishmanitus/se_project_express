const AuthenticationError = require('./AuthenticationError');
const ConflictError = require('./ConflictError');
const DocumentNotFoundError = require('./DocumentNotFoundError');
const IdentificationError = require('./IdentificationError');
const ValidationError = require('./ValidationError');

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

module.exports.checkObjectId = (res, objectId, otherId) => String(objectId) === otherId ? false : res.status(statusDict.identificationErrorStatus.status).send({ message: statusDict.identificationErrorStatus.message });

module.exports.checkForConflict = (match) => match ? new ConflictError() : false;

module.exports.checkUserExists = (exists) => exists ? false : new AuthenticationError();

module.exports.checkForMatch = (match, user) => !match ? new AuthenticationError() : user;

module.exports.handleAuthError = (res) => res.status(statusDict.authenticationErrorStatus.status).send({ message: statusDict.authenticationErrorStatus.message });

module.exports.handleMissingField = () => Promise.reject(new ValidationError());

module.exports.handleUnknownRoute = (req, res, next) => {
  if (!res.status.ok) {
    return res.status(statusDict.documentNotFoundErrorStatus.status).send({ message: statusDict.documentNotFoundErrorStatus.message });
  }
  next();
};
