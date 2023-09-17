const { NODE_ENV, PORT, DB_URL } = process.env;
const express = require('express');
const mongoose = require('mongoose');

const dotenev = require('dotenv');

dotenev.config();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimit');
const cors = require('./middlewares/cors');
const config = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const { auth, deleteCookies } = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const { validateAuth, validateRegister } = require('./middlewares/validate');
const { createUser, login } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');
const constants = require('./constants');

const app = express();
app.use(cors);
mongoose.connect(NODE_ENV !== 'production' ? config.DB_URL : DB_URL, {});

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(requestLogger);
app.use(limiter);

app.use(router);
app.post('/signin', validateAuth, login);
app.post('/signup', validateRegister, createUser);
app.post('/signout', auth, deleteCookies);

app.use('*', auth, (req, res, next) => {
  next(new NotFoundError(constants.NOT_FOUND));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(NODE_ENV !== 'production' ? config.PORT : PORT);
