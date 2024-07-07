class AuthenticationError extends Error {
  constructor(message = "Incorrect email or password") {
    super(message);
    this.name = "AuthenticationError";
    this.status = 401;
  }
}

module.exports = AuthenticationError;
