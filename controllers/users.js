const User = require('../models/users');
const { sendErrorStatus, isValidId } = require('../utils/errors');

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then(user => {
      res.send({ data: user });
    })
    .catch(err => {
      console.error(err);

      const error = sendErrorStatus(err);
      res.status(error.status).send({message:err.message});
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .populate()
    .then(users => {
      res.send({ data: users });
    })
    .catch(err => {
      console.error(err);
      const error = sendErrorStatus(err);
      res.status(error.status).send({message:err.message});
    });
};

module.exports.getUser = (req, res) => {
  const { _id } = req.params;

  User.find({ _id })
    .orFail()
    .populate()
    .then(user => {
      isValidId(user._id);
      res.send({ data: user });
    })
    .catch(err => {
      console.error(err);
      const error = sendErrorStatus(err);
      res.status(error.status).send({message:err.message});
    });
};

module.exports.updateUser = (req, res) => {
  const { _id } = req.params;

  User.updateOne({ _id }, req.body)
    .orFail()
    .then(user => {
      isValidId(user._id);
      res.send({ data: user });
    })
    .catch(err => {
      console.error(err);
      const error = sendErrorStatus(err);
      res.status(error.status).send({message:err.message});
    });
};

module.exports.deleteUser = (req, res) => {
  const { _id } = req.params;

  User.deleteOne({ _id })
    .orFail()
    .then(user => {
      isValidId(user._id);
      res.send({ data: user });
    })
    .catch(err => {
      console.error(err);
      const error = sendErrorStatus(err);
      res.status(error.status).send({message:err.message});
    });
};
