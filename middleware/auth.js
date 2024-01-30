const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { handleAuthError, handleValidationError } = require('../utils/errors');

const { JWT_SECRET } = process.env;

const extractBearerToken = (header) => {
  return header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const { email, password } = req.body;

  if (!email || !password) {
    return handleValidationError(res);
  }
  console.log(authorization);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
};