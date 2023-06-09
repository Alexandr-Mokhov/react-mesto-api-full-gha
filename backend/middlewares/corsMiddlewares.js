const DEFAULT_ALLOWED_METHODS = 'GET,PUT,PATCH,POST,DELETE';
const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://mokhov.nomoredomains.rocks',
  'https://mokhov.nomoredomains.rocks',
];

const corsMiddlewares = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);

    return res.end();
  }

  return next();
};

module.exports = { corsMiddlewares };
