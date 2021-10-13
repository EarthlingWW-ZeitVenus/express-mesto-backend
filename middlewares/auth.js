// const {
//   errorCodes: { AUTHORIZATION_ERROR, AUTHENTICATION_ERROR }
// } = require('../utils/constants');
const {
  AuthorizationError,
  AuthenticationError
} = require('../utils/errors-classes');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if(!token) {
    next(new AuthenticationError(`Необходима аутентификация`));
    return;
  };
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key')
  } catch (err) {
    next(new AuthorizationError(`Необходима авторизация`));
    return;
  };
  req.user = payload;
  next();
};


module.exports = auth;