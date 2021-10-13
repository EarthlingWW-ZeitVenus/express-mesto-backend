const {
  NotFoundError
} = require('../utils/errors-classes');

const defaultRouter = (req, res, next) => {
  next(new NotFoundError(`Ресурс не найден`));
};

module.exports = defaultRouter;