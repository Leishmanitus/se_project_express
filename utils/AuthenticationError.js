class AuthenticationError extends Error {
  constructor() {
    super();
    this.name = "AuthenticationError";
  }
}

module.exports = AuthenticationError;
