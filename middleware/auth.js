const jwt = require('jsonwebtoken');
const { handleAuthError } = require('../utils/errors');
const { default: mongoose } = require('mongoose');

const { JWT_SECRET, NODE_ENV } = process.env;

const extractToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res, "Authorization header is missing or invalid");
  }

  const token = extractToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret');
  } catch (err) {
    return handleAuthError(res, "Token is invalid or has expired");
  }

  const currentTime = Math.floor(Date.now() / 1000);
  if(payload.exp && payload.exp < currentTime){
    return handleAuthError(res, "Token has expired");
  }

  req.user = payload;

  return next();
};