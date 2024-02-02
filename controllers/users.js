const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { sendErrorStatus, checkUserId } = require('../utils/errors');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.signupNewUser({ name, avatar, email, password })
  .then(user => {
    res.status(200).send({
      data: { name, avatar, email }
    })
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
      const { name, avatar, email } = user;
      checkUserId(_id, user._id);

      res.status(200).send({ data: { name, avatar, email } });
    })
    .catch(err => {
      console.error(err);
      const error = sendErrorStatus(err);
      res.status(error.status || 500).send({ message:error.message || err.message });
    });
};

module.exports.updateUser = (req, res) => {
  const { _id } = req.params;

  User.findByIdAndUpdate({ _id }, req.body)
    .orFail()
    .then(user => {
      const { name, avatar, email } = user;

      checkUserId(_id, user._id);
      res.status(200).send({ data: { name, avatar, email } });
    })
    .catch(err => {
      console.error(err);
      const error = sendErrorStatus(err);
      res.status(error.status || 500).send({ message:error.message || err.message });
    });
};

module.exports.deleteUser = (req, res) => {
  const { _id } = req.params;

  User.findByIdAndDelete({ _id })
    .orFail()
    .then(user => {
      const { name, avatar, email } = user;

      checkUserId(_id, user._id);
      res.status(200).send({ data: { name, avatar, email } });
    })
    .catch(err => {
      console.error(err);
      const error = sendErrorStatus(err);
      res.status(error.status || 500).send({ message:error.message || err.message });
    });
};

module.exports.login = (req, res) => {
  const { name, avatar, email, password, _id } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      checkUserId(_id, user._id);

      res.status(200).send({
        data: { name, avatar, email },
        token: jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret', { expiresIn: 3600 })
      });
    })
    .catch(err => {
      console.error(err);
      const error = sendErrorStatus(err);
      res.status(error.status || 500).send({ message:error.message || err.message });
    });
};
