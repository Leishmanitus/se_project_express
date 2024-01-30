const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { checkForConflict, checkUserPassword, handleMissingField } = require('../utils/errors');

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
  return this.findOne({ email })
    .orFail()
    .select('+password')
    .then((user) => {
      if( !email || !password ) {
        handleMissingField();
      }
      checkForConflict(user);

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          checkUserPassword(matched);

          return user;
        });
    });
};

userSchema.statics.signupNewUser = function signupNewUser({ name, avatar, email, password }) {
  return this.findOne({ email })
    .then(user => {
      if( !name || !avatar || !email || !password ){
        handleMissingField();
      }
      checkForConflict(user);

      return bcrypt.hash(password, 10);
    })
    .then(hash => this.create({ name, avatar, email, password: hash }))
};

module.exports = mongoose.model('user', userSchema);
