class IdentificationError extends Error {
  constructor(){
    super();
    this.name = "IdentificationError";
  }
}

module.exports = IdentificationError;
