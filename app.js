const express = require('express');
const mongoose = require('mongoose');

const dotenev = require('dotenv');

dotenev.config();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const config = require('./config');
const limiter = require('./middlewares/rateLimit');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const users = require('./routes/users');
const movies = require('./routes/movies');
const { auth, deleteCookies } = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const { validateAuth, validateRegister } = require('./middlewares/validate');
const { createUser, login } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');

const app = express();
app.use(cors);
mongoose.connect(config.DB_URL, {});

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(requestLogger);
app.use(limiter);

app.use('/users', auth, users);
app.use('/movies', auth, movies);
app.post('/signin', validateAuth, login);
app.post('/signup', validateRegister, createUser);
app.post('/signout', deleteCookies);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(config.PORT);