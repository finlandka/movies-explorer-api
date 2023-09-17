const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const errorMessages = require('../errorMessages');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const { OK, CREATED } = require('../constantsStatus');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(errorMessages.NOT_FOUND))
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => next(err));
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(errorMessages.CONFLICT));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((newUser) => {
      const user = newUser.toObject();
      delete user.password;
      res.status(CREATED).send({ data: user });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(errorMessages.CONFLICT));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV !== 'production' ? '5b862e21cb7facfaa3fed4e2f99fbd84eb55eb4d4d7226db2754a056cc3aacc6' : JWT_SECRET, { expiresIn: '7d' });
      res.cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'none',
        domain: '.voloh.nomoredomainsrocks.ru',
      }).send({ token });
    })
    .catch((err) => next(err));
};

module.exports = {
  getUser,
  updateUser,
  createUser,
  login,
};
