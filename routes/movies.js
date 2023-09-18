const movies = require('express').Router();
const { validateCreateMovie, validateMovieId } = require('../middlewares/validate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

movies.get('/', getMovies);
movies.post('/', validateCreateMovie, createMovie);
movies.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = movies;
