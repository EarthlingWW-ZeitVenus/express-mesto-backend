const {
  errorCodes: {
    RESOURCE_NOT_FOUND_ERROR,
  }
} = require('../utils/constants');


const defaultRouter = (req, res) => {
  res.status(RESOURCE_NOT_FOUND_ERROR).send({ message: "Ресурс не найден" });
};


module.exports = defaultRouter;