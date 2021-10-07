const {
  errorCodes: { AUTHORIZATION_ERROR, AUTHENTICATION_ERROR }
} = require('../utils/constants');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if(!token) {
    return res
      .status(AUTHENTICATION_ERROR)
      .send({ message: 'Необходима аутентификация'});
  };
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key')
  } catch (err) {
    return res
      .status(AUTHORIZATION_ERROR)
      .send({ message: 'Необходима авторизация'});
  }
  req.user = payload;
  next();
};


module.exports = auth;