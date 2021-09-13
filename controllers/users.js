const {
  errorCodes: {
    BAD_REQUEST_ERROR,
    RESOURCE_NOT_FOUND_ERROR,
    INTERNAL_SERVER_ERROR
  },
  successCodes: {
    REQUEST_SUCCESS,
    RESOURCE_CREATED_SUCCESS
  }
} = require('../utils/constants');
const User = require('../models/users');


const getUsers = (req, res) => {
  User.find({})
  .then(users => {
    res.status(REQUEST_SUCCESS).send({ data: users });
  })
  .catch(err => {
    res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
  .then(user => {
    if(!user){
      res.status(RESOURCE_NOT_FOUND_ERROR)
      .send({ message: `Пользователь с указанным id - ${req.params.userId}, не найден` });
      return;
    };
    res.status(REQUEST_SUCCESS).send({ data: user });
  })
  .catch(err => {
    if(err.name === "CastError") {
      res.status(BAD_REQUEST_ERROR)
      .send({ message: `Передано некорректное id пользователя - ${err.value}` });
      return;
    };
    res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  });
};

const createUser = (req, res) => {
  User.create(req.body)
  .then(user => res.status(RESOURCE_CREATED_SUCCESS).send({ data: user }))
  .catch(err => {
    if(err.name === "ValidationError") {
      res.status(BAD_REQUEST_ERROR)
      .send({ message: `Переданы некорректные данные при создании пользователя` });
      return;
    };
    res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  });
};


  const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true, //для того, чтобы then получил обновленную запись
    runValidators: true, //данные валидируются перед изменением
    // upsert: true //создает новую запись в базе, если не находит среди существующих
  })
  .then(user => {
    res.status(REQUEST_SUCCESS).send({ data: user });
  })
  .catch(err => {
    if(err.name === "CastError") {
      res.status(BAD_REQUEST_ERROR)
      .send({ message: `Передано некорректное id пользователя - - ${err.value}` });
      return;
    }
    else if(err.name === "ValidationError") {
        res.status(BAD_REQUEST_ERROR)
        .send({ message: `Переданы некорректные данные при обновлении данных пользователя` });
        return;
    };
    res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  });
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
  .then(user => {
    res.status(REQUEST_SUCCESS).send({ data: user });
  })
  .catch(err => {
    if(err.name === "CastError") {
      res.status(BAD_REQUEST_ERROR)
      .send({ message: `Передано некорректное id пользователя - - ${err.value}` });
      return;
    }
    else if(err.name === "ValidationError") {
        res.status(BAD_REQUEST_ERROR)
        .send({ message: `Переданы некорректные данные при обновлении данных пользователя` });
        return;
    };
    res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  });
};


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar
}