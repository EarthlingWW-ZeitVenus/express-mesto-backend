const { VALIDATION_ERROR,
  AUTHENTICATION_ERROR,
  AUTHORIZATION_ERROR,
  RESOURCE_NOT_FOUND_ERROR,
  CONFLICTS_ERROR,
  INTERNAL_SERVER_ERROR } = require('../utils/constants');
const User = require('../models/users');


const getUsers = (req, res) => {
  User.find({})
  .then(users => {
    if(users.length === 0) {
      res.status(RESOURCE_NOT_FOUND_ERROR).send({ message: "Пользователей нет" });
      return;
    };
    res.send({ data: users });
  })
  .catch(err => {
    res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
  .then(user => {
    res.send({ data: user });
  })
  .catch(err => {
    if(err.name === "CastError") {
      res.status(RESOURCE_NOT_FOUND_ERROR)
      .send({ message: `Пользователь по указанному id - ${err.value}, не найден` });
      return;
    };
    res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  });
};

const createUser = (req, res) => {
  User.create(req.body)
  .then(user => res.send({ data: user }))
  .catch(err => {
    if(err.name === "ValidationError") {
      res.status(VALIDATION_ERROR)
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
    upsert: true //создает новую запись в базе, если не находит среди существующих
  })
  .then(user => res.send({ data: user }))
  .catch(err => {
    if(err.name === "CastError") {
      res.status(RESOURCE_NOT_FOUND_ERROR)
      .send({ message: `Пользователь по указанному id - ${err.value}, не найден` });
      return;
    }
    else if(err.name === "ValidationError") {
        res.status(VALIDATION_ERROR)
        .send({ message: `Переданы некорректные данные при обновлении данных пользователя` });
        return;
    };
    res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  });
}


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser
}