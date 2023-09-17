const { celebrate, Joi } = require('celebrate');

const validateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().regex(/[\w-]+@[\w-]*\.[a-z]*/),
    password: Joi.string().required(),
  }),
});

const validateRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email().regex(/[\w-]+@[\w-]*\.[a-z]*/),
    password: Joi.string().required(),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required().regex(/[\w-]+@[\w-]*\.[a-z]*/),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    image: Joi.string().required().regex(/^https?:\/\/([a-z0-9-]+\.)+([a-z])+(\/[a-z0-9\-._]*)*/),
    thumbnail: Joi.string().required().regex(/^https?:\/\/([a-z0-9-]+\.)+([a-z])+(\/[a-z0-9\-._]*)*/),
    trailerLink: Joi.string().required().regex(/^https?:\/\/([a-z0-9-]+\.)+([a-z])+(\/[a-z0-9\-._]*)*/),
    movieId: Joi.number().required(),
    description: Joi.string().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validateAuth,
  validateRegister,
  validateUpdateUser,
  validateCreateMovie,
  validateMovieId,
};
