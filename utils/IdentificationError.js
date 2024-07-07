class IdentificationError extends Error {
  constructor(message = "Not allowed"){
    super(message);
    this.name = "IdentificationError";
    this.status = 403;
  }
}

module.exports = IdentificationError;
