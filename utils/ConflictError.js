class ConflictError extends Error {
  constructor(){
    super();
    this.name = "ConflictError";
  }
}

module.exports = ConflictError;
