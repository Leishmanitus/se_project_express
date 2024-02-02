const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { handleAuthError } = require('../utils/errors');

const { JWT_SECRET } = process.env;

const extractToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res, "Authorization header is missing or invalid");
  }

  const token = extractToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res, "Token is invalid or has expired");
  }

  const currentTime = Math.floor(Date.now() / 1000);
  if(payload.exp && payload.exp < currentTime){
    return handleAuthError(res, "Token has expired");
  }

  req.user = payload;
  console.log(req.user);

  next();
};