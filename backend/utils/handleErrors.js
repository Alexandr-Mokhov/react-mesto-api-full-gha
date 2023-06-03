const AuthorisationError = require('../errors/AuthorisationError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictingRequestError = require('../errors/ConflictingRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

function handleErrors(err) {
  if (err instanceof AuthorisationError
    || err instanceof ForbiddenError
    || err instanceof NotFoundError) {
    return err;
  }

  if (err.code === 11000) {
    return new ConflictingRequestError('Такой E-mail уже зарегистрирован.');
  }

  if (err.name === 'DocumentNotFoundError') {
    return new NotFoundError('Ресурс с указанным id не найден.');
  }

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return new BadRequestError('Переданы некорректные данные.');
  }

  return { statusCode: 500 };
}

module.exports = handleErrors;
