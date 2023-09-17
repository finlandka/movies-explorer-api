const mongoose = require('mongoose');
const constants = require('../constants');

const cardSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: [true, constants.REQUIRED],
  },
  nameEN: {
    type: String,
    required: [true, constants.REQUIRED],
  },
  image: {
    type: String,
    required: [true, constants.REQUIRED],
    validate: {
      validator: (v) => /^https?:\/\/([a-z0-9-]+\.)+([a-z])+(\/[a-z0-9\-._]*)*/.test(v),
      message: 'Некорректный URL',
    },
  },
  thumbnail: {
    type: String,
    required: [true, constants.REQUIRED],
    validate: {
      validator: (v) => /^https?:\/\/([a-z0-9-]+\.)+([a-z])+(\/[a-z0-9\-._]*)*/.test(v),
      message: 'Некорректный URL',
    },
  },
  trailerLink: {
    type: String,
    required: [true, constants.REQUIRED],
    validate: {
      validator: (v) => /^https?:\/\/([a-z0-9-]+\.)+([a-z])+(\/[a-z0-9\-._]*)*/.test(v),
      message: 'Некорректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: [true, constants.REQUIRED],
  },
  description: {
    type: String,
    required: [true, constants.REQUIRED],
  },
  country: {
    type: String,
    required: [true, constants.REQUIRED],
  },
  director: {
    type: String,
    required: [true, constants.REQUIRED],
  },
  duration: {
    type: Number,
    required: [true, constants.REQUIRED],
  },
  year: {
    type: String,
    required: [true, constants.REQUIRED],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', cardSchema);
