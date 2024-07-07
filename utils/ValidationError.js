class ValidationError extends Error {
  constructor(message = "Invalid or missing entry") {
    super(message);
    this.name = "ValidationError";
    this.status = 400;
  }
}

module.exports = ValidationError;
