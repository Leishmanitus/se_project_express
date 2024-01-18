const User = require('../models/users');
const { sendErrorStatus } = require('../utils/errors');

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then(user => {
      res.send({ data: user });
    })
    .catch(err => {
      console.error(err);
      const error = sendErrorStatus(err);
      res.status(error.status).send({message:error.message || err.message});
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => {
      res.send({ data: users });
    })
    .catch(err => {
      console.error(err);
      const error = sendErrorStatus(err);
      res.status(error.status).send({message:error.message || err.message});
    });
};

module.exports.getUser = (req, res) => {
  const { _id } = req.params;

  User.findById({ _id })
    .orFail()
    .then(user => {
      res.send({ data: user });
    })
    .catch(err => {
      console.error(err);
      const error = sendErrorStatus(err);
      res.status(error.status).send({message:error.message || err.message});
    });
};

module.exports.updateUser = (req, res) => {
  const { _id } = req.params;

  User.findByIdAndUpdate({ _id }, req.body)
    .orFail()
    .then(user => {
      res.send({ data: user });
    })
    .catch(err => {
      console.error(err);
      const error = sendErrorStatus(err);
      res.status(error.status).send({message:error.message || err.message});
    });
};

module.exports.deleteUser = (req, res) => {
  const { _id } = req.params;

  User.findByIdAndDelete({ _id })
    .orFail()
    .then(user => {
      res.send({ data: user });
    })
    .catch(err => {
      console.error(err);
      const error = sendErrorStatus(err);
      res.status(error.status).send({message:error.message || err.message});
    });
};
