const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const errorMessages = require('../errorMessages');
const { OK, CREATED } = require('../constantsStatus');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate('owner')
    .then((movie) => res.status(OK).send({ data: movie }))
    .catch((err) => next(err));
};

const createMovie = (req, res, next) => {
  const {
    nameRU,
    nameEN,
    image,
    thumbnail,
    trailerLink,
    movieId,
    description,
    country,
    director,
    duration,
    year,
  } = req.body;
  Movie.create({
    nameRU,
    nameEN,
    image,
    thumbnail,
    trailerLink,
    owner: req.user,
    movieId,
    description,
    country,
    director,
    duration,
    year,
  })
    .then((movie) => Movie.findById(movie._id).populate('owner'))
    .then((movie) => res.status(CREATED).send({ data: movie }))
    .catch((err) => next(err));
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError(errorMessages.NOT_FOUND))
    .then((movie) => {
      if (movie.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError(errorMessages.FORBIDDEN);
      }
      Movie.deleteOne(movie)
        .then((deletedMovie) => {
          res.status(OK).send({ data: deletedMovie });
        });
    })
    .catch((err) => next(err));
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
