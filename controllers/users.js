const jwt = require('jsonwebtoken');
const User = require('../models/users');
const DocumentNotFoundError = require('../utils/DocumentNotFoundError');
const { sendErrorStatus } = require('../utils/errors');
const IdentificationError = require('../utils/IdentificationError');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  User
    .signupNewUser({ name, avatar, email, password })
    .then((user) => {
      const { _id, token } = user;
      return res.send({ data: { name, avatar, _id, token } })
    })
    .catch(sendErrorStatus);
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  if (!_id) return new IdentificationError("ID not found");

  User
    .findById({ _id })
    .then(user => {
      if (!user) return new DocumentNotFoundError("User does not exist");
      const { name, email, avatar, token } = user;
      return res.send({ data: { name, email, avatar, _id, token } });
    })
    .catch(sendErrorStatus);
};

module.exports.updateUser = (req, res, next) => {
  const { _id } = req.user;

  User
    .findByIdAndUpdate({ _id }, { name:req.body.name, avatar:req.body.avatar }, { new: true, runValidators: true })
    .then(user => {
      if (!user) return new DocumentNotFoundError("User does not exist");
      const { name, avatar } = user
      return res.send({ data: { name, avatar } });
    })
    .catch(sendErrorStatus);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User
    .findUserByCredentials(email, password)
    .then((user) => {
      const { name, avatar, _id } = user;

      return res.send({ data: { _id, name, avatar, email, token: jwt.sign({ _id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret', { expiresIn: '7d', }), },
      });
    })
    .catch(sendErrorStatus);
};
