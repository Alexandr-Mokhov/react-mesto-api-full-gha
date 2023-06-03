require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const { errors } = require('celebrate');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const router = require('./routes/index');
const handleErrors = require('./utils/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const config = require('./config');

const app = express();
app.use(cors());
const limiter = rateLimit(
  {
    windowMs: 10 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
  },
);

mongoose.connect(config.mongodbLink);

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
// app.use(errors()); // для вывода стандартных ошибок от Joi

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode, message } = handleErrors(err);
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

// eslint-disable-next-line no-console
app.listen(config.port, () => console.log(`Enabled port ${config.port}`));
