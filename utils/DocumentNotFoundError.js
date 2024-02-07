class DocumentNotFoundError extends Error {
  constructor() {
    super();
    this.name = "DocumentNotFoundError";
  }
}

module.exports = DocumentNotFoundError;
