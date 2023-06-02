require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const router = require('./routes/index');
const NotFoundError = require('./errors/NotFoundError');
const BadRequestError = require('./errors/BadRequestError');
const ConflictingRequestError = require('./errors/ConflictingRequestError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { mongodbLink, PORT } = process.env;

const app = express();
app.use(cors());
const limiter = rateLimit(
  {
    windowMs: 10 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
  },
);

mongoose.connect(mongodbLink);

app.use(requestLogger);
app.use(limiter);
app.use(express.json());
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(router);
app.use(errorLogger);
app.use(errors()); // для вывода стандартных ошибок от Joi

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  let error = err;

  // Для вывода ошибок от Joi в стиле остальных ошибок
  // if (isCelebrateError(err)) {
  //   error.statusCode = 400;
  //   if (err.details.get('body')) {
  //     error.message = err.details.get('body').details[0].message;
  //   } else {
  //     error.message = err.details.get('params').details[0].message;
  //   }
  // }

  if (err.code === 11000) {
    error = new ConflictingRequestError('Такой E-mail уже зарегистрирован.');
  }

  if (err.name === 'DocumentNotFoundError') {
    error = new NotFoundError('Ресурс с указанным id не найден.');
  }

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    error = new BadRequestError('Переданы некорректные данные.');
  }

  const { statusCode = 500, message } = error;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Enabled port ${PORT}`));
