const User = require('../models/users');
const jwt = require('jsonwebtoken');
const { sendErrorStatus, checkUserId } = require('../utils/errors');

module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

    User.signupNewUser({ name, avatar, email, password })
    .then(user => {
      const { name, avatar, email } = user;

      res.send({
        data: {
          name,
          avatar,
          email,
        }
      });
    })
    .catch(err => {
      console.error(err);
      const error = sendErrorStatus(err);
      res.status(error.status).send({ message:error.message || err.message });
    });
};

// module.exports.getUsers = (req, res) => {
//   User.find({})
//     .then(users => {
//       res.send({ data: users });
//     })
//     .catch(err => {
//       console.error(err);
//       const error = sendErrorStatus(err);
//       res.status(error.status || 500).send({ message:error.message || err.message });
//     });
// };

module.exports.getCurrentUser = (req, res) => {
  const { email, password } = req.params;

  User.findUserByCredentials({ email, password })
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
      console.log(user);
      const { name, avatar, email } = user;

      console.log(this);
      checkUserId(_id, User._id);
      res.send({
        data: {
          name,
          avatar,
          email,
        }
      });
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

      checkUserId(_id, User._id);
      res.send({
        data: {
          name,
          avatar,
          email,
        }
      });
    })
    .catch(err => {
      console.error(err);
      const error = sendErrorStatus(err);
      res.status(error.status || 500).send({ message:error.message || err.message });
    });
};

module.exports.login = (req, res) => {
  const { email, password, _id } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { name, avatar, email } = user;
      const token = jwt.sign({ _id }, 'Bearer ', { expiresIn: 3600 });

      checkUserId(_id, User._id);
      res.send({
        data: {
          name,
          avatar,
          email,
        },
        token
      });
    })
    .catch(err => {
      console.error(err);
      const error = sendErrorStatus(err);
      res.status(error.status || 500).send({ message:error.message || err.message });
    });
};
