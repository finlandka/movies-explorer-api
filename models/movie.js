const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
  },
  image: {
    type: String,
    required: [true, 'Поле "link" должно быть заполнено'],
    validate: {
      validator: (v) => /^https?:\/\/([a-z0-9-]+\.)+([a-z])+(\/[a-z0-9\-._]*)*/.test(v),
      message: 'Некорректный URL',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле "thumbnail" должно быть заполнено'],
    validate: {
      validator: (v) => /^https?:\/\/([a-z0-9-]+\.)+([a-z])+(\/[a-z0-9\-._]*)*/.test(v),
      message: 'Некорректный URL',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле "trailerLink" должно быть заполнено'],
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
    required: true,
  },
  description: {
    type: String,
    required: [true, 'Поле "description" должно быть заполнено'],
  },
  country: {
    type: String,
    required: [true, 'Поле "country" должно быть заполнено'],
  },
  director: {
    type: String,
    required: [true, 'Поле "director" должно быть заполнено'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле "duration" должно быть заполнено'],
  },
  year: {
    type: String,
    required: [true, 'Поле "year" должно быть заполнено'],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', cardSchema);
