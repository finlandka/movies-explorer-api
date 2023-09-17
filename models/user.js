const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');
const constants = require('../constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, constants.REQUIRED],
    minlength: [2, constants.MINLENGTH],
    maxlength: [30, constants.MAXLENGTH],
  },
  email: {
    type: String,
    required: [true, constants.REQUIRED],
    unique: true,
    validate: {
      validator: (v) => /[\w-]+@[\w-]*\.[a-z]*/.test(v),
      message: constants.INCORRECT_EMAIL,
    },
  },
  password: {
    type: String,
    required: [true, constants.REQUIRED],
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(constants.UNAUTHORIZED);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(constants.UNAUTHORIZED);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
