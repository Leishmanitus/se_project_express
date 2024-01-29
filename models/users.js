const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { checkUserExists, checkUserPassword } = require('../utils/errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Not a valid url",
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "Not a valid email address",
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    // validate: {
    //   validator: (v) => validator.isStrongPassword(v),
    //   message: "Password is not strong enough",
    // },
    minLength: 8,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials({ email, password }) {
  console.log(this);

  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      checkUserExists(user);

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          checkUserPassword(matched);

          return user;;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
