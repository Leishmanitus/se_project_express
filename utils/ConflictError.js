class ConflictError extends Error {
  constructor(message = "Already exists in database"){
    super(message);
    this.name = "ConflictError";
    this.status = 409;
  }
}

module.exports = ConflictError;
