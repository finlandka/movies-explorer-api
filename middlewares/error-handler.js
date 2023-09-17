const errorMessages = require('../errorMessages');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: (statusCode === 500) ? errorMessages.INTERNAL_SERVER : message,
  });
  next();
};
module.exports = errorHandler;
