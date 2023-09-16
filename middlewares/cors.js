const allowedCors = [
  'https://voloh.nomoredomainsrocks.ru',
  'http://voloh.nomoredomainsrocks.ru',
  'http://localhost:3000',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-CSRF-Token, X-HTTP-Method-Override');
    return res.end();
  }

  return next();
};
