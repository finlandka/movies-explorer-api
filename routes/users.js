const users = require('express').Router();
const { validateUpdateUser } = require('../middlewares/validate');
const { getUser, updateUser } = require('../controllers/users');

users.get('/me', getUser);
users.patch('/me', validateUpdateUser, updateUser);

module.exports = users;
