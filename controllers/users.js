const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { sendErrorStatus } = require('../utils/errors');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.signupNewUser({ name, avatar, email, password })
  .then((user) => {
    const { name, avatar, _id, token } = user;
    res.send({ data: { name, avatar, _id, token } })
  })
  .catch(err => {
    console.error(err);
    const error = sendErrorStatus(err);
    res.status(error.status).send({ message:error.message || err.message });
  });
};

module.exports.getCurrentUser = (req, res) => {
  const { _id } = req.user;

  User.findById({ _id })
    .orFail()
    .then(user => {
      const { name, email, avatar, _id, token } = user;
      res.send({ data: { name, email, avatar, _id, token } });
    })
    .catch(err => {
      console.error(err);
      const error = sendErrorStatus(err);
      res.status(error.status).send({ message:error.message || err.message });
    });
};

module.exports.updateUser = (req, res) => {
  const { _id } = req.user;

  User.findByIdAndUpdate({ _id }, { name:req.body.name, avatar:req.body.avatar }, { new: true, runValidators: true })
    .orFail()
    .then(user => {
      const { name, avatar } = user
      res.send({ data: { name, avatar } });
    })
    .catch(err => {
      console.error(err);
      const error = sendErrorStatus(err);
      res.status(error.status).send({ message:error.message || err.message });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { name, avatar, email, _id } = user;
      res.send({
        data: {
          _id,
          name,
          avatar,
          email,
          token: jwt.sign({ _id: _id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret', { expiresIn: '7d' }),
      },

      });
    })
    .catch(err => {
      console.error(err);
      const error = sendErrorStatus(err);
      res.status(error.status).send({ message:error.message || err.message });
    });
};
