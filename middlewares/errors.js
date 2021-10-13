const erorrHandler = (err, req, res, next) => {
  console.log('runcode in erorrHandler');
  const {statusCode = 500, message } = err;
  res.status(statusCode)
  .send({
    message: statusCode === 500
    ? `На сервере произошла ошибка - ${message}`
    : message
  })
};

module.exports = erorrHandler;