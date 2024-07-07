class DocumentNotFoundError extends Error {
  constructor(message = "Does not exist") {
    super(message);
    this.name = "DocumentNotFoundError";
    this.status = 404;
  }
}

module.exports = DocumentNotFoundError;
