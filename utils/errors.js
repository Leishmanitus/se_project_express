const AuthenticationError = require('./AuthenticationError');
const ConflictError = require('./ConflictError');
const ValidationError = require('./ValidationError');
const IdentificationError = require('./IdentificationError');
const DocumentNotFoundError = require('./DocumentNotFoundError');
const BadRequestError = require('./BadRequestError');

module.exports.sendErrorStatus = (err, next) => {
  console.error(err);
  switch (err.name) {
    case "BadRequestError":
      next(new BadRequestError());
      break;
    case "CastError":
      next(new BadRequestError());
      break;
    case "ValidationError":
      next(new ValidationError());
      break;
    case "DocumentNotFoundError":
      next(new DocumentNotFoundError());
      break;
    case "AuthenticationError":
      next(new AuthenticationError());
      break;
    case "ConflictError":
      next(new ConflictError());
      break;
    case "IdentificationError":
      next(new IdentificationError());
      break;
    default:
      next(new Error("Internal server error"));
  }
};

module.exports.checkObjectId = (objectId, otherId) => String(objectId) === otherId ? false : Promise.reject(new BadRequestError());

module.exports.checkForConflict = (match) => match ? Promise.reject(new ConflictError()) : false;

module.exports.checkUserExists = (exists) => exists ? false : Promise.reject(new AuthenticationError());

module.exports.checkForMatch = (match) => !match ? Promise.reject(new AuthenticationError()) : false;

module.exports.handleAuthError = (message) => {
  Promise.reject(new AuthenticationError(message));
};

module.exports.handleMissingField = () => Promise.reject(new ValidationError());

module.exports.handleUnknownRoute = (req, res, next) => next(new DocumentNotFoundError());
