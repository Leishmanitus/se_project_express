const User = require('../models/users');
const { isValidId } = require('../utils/errors');

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => {
      console.error(err);
      res.status(err.statusCode).send({ message: err.message });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .populate()
    .then(users => res.send({ data: users }))
    .catch(err => {
      console.error(err);
      res.status(err.statusCode).send({ message: err.message });
    });
};

module.exports.getUser = (req, res) => {
  const { _id } = req.body;

  User.find({ _id })
    .orFail((_id => isValidId(_id)))
    .populate()
    .then(user => {
      res.send({ data: user });
      console.log(user);
    })
    .catch(err => {
      console.error(err);
      res.status(err.statusCode).send({ message: err.message });
    });
};

module.exports.updateUser = (req, res) => {
  const { _id } = req.params;

  User.updateOne({ _id })
    .orFail()
    .then(user => {
      res.send({ data: user });
    })
    .catch(err => {
      console.error(err);
      res.status(err.statusCode).send({ message: err.message });
    });
};

module.exports.deleteUser = (req, res) => {
  const { _id } = req.params;

  User.deleteOne({ _id })
    .orFail()
    .then(user => {
      res.send({ data: user });
    })
    .catch(err => {
      console.error(err);
      res.status(err.statusCode).send({ message: err.message });
    });
};
