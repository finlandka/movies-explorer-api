const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const { auth } = require('../middlewares/auth');

router.use('/users', auth, users);
router.use('/movies', auth, movies);

module.exports = router;
