const User = require('../models/users');
const { isValidId } = require('../utils/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .populate()
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.getUser = (req, res) => {
  const { _id } = req.body;

  if(!isValidId(_id)){
    return res.status(400).send({ message: "Invalid object id" })
  }

  User.find({ _id })
    .orFail()
    .populate()
    .then(user => {
      res.send({ data: user });
      console.log(user);
    })
    .catch(err => res.status(404).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
};
