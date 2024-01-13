const User = require('../models/users');

module.exports.getUsers = (req, res) => {
  User.find({})
    .populate('user')
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.getUser = (req, res) => {
  const { userId } = req.body;
  User.find({ userId })
    .populate('user')
    .then(user => res.send({ data: user }))
    .catch(err => res.status(404).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
};
