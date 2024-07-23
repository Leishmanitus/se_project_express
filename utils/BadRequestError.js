class BadRequestError extends Error {
  constructor(message = "The id string is in an invalid format") {
    super(message);
    this.name = "BadRequestError";
    this.status = 403;
  }
}

module.exports = BadRequestError;
