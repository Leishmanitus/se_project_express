const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { checkForConflict, checkForMatch, checkUserExists, handleMissingField } = require('../utils/errors');

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
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  if( !email || !password ) {
    return handleMissingField();
  }

  return this.findOne({ email })
    .select('+password')
    .then(user => {
      const existsError = checkUserExists(user);
      if (existsError) return existsError;

      return bcrypt.compare(password, user.password)
        .then(match => {
          const matchError = checkForMatch(match);
          if (matchError) return matchError;

          return user;
        });
      });
};

userSchema.statics.signupNewUser = function signupNewUser({ name, avatar, email, password }) {
  if( !name || !avatar || !email || !password ){
    return handleMissingField();
  }

  return this.findOne({ email })
    .then(duplicate => {
      const conflictError = checkForConflict(duplicate);
      if(conflictError) return conflictError;

      return bcrypt.hash(password, 10);
    })
    .then(hash => this.create({ name, avatar, email, password: hash }).then(user => user))
};

module.exports = mongoose.model('user', userSchema);
