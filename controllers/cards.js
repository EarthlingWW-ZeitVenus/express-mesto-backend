const { VALIDATION_ERROR,
  AUTHENTICATION_ERROR,
  AUTHORIZATION_ERROR,
  RESOURCE_NOT_FOUND_ERROR,
  CONFLICTS_ERROR,
  INTERNAL_SERVER_ERROR } = require('../utils/constants');
const Card = require('../models/cards');


const getCards = (req, res) => {
  Card.find({})
  .populate('owner')
  .then(cards => {
    if(cards.length === 0) {
      res.status(RESOURCE_NOT_FOUND_ERROR).send({ message: "Карточек нет" });
      return;
    };
    res.send({ data: cards });
  })
  .catch(err => {
    res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
  .then(card => res.send(card))
  .catch(err => {
    if(err.name === "ValidationError") {
      res.status(VALIDATION_ERROR)
      .send({ message: `Переданы некорректные данные при создании карточки` });
      return;
    };
    res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
  .then(card => res.send({ message: `Удалена карточка: ${card.name}` }))
  .catch(err => {
    if(err.name === "CastError") {
      res.status(RESOURCE_NOT_FOUND_ERROR)
      .send({ message: `Карточка по указанному id - ${err.value}, не найдена` });
      return;
    };
    res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  });
};

const addLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $addToSet: { likes: req.user._id }
  }, {
    new: true
  })
  .then(card => res.send({ data: card }))
  .catch(err => {
    if(err.name === "ValidationError") {
      res.status(VALIDATION_ERROR)
      .send({ message: `Переданы некорректные данные для постановки/снятия лайка` });
      return;
    };
    res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  });
};

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $pull: { likes: req.user._id }
  }, {
    new: true
  })
  .then(card => res.send({ data: card }))
  .catch(err => {
    if(err.name === "ValidationError") {
      res.status(VALIDATION_ERROR)
      .send({ message: `Переданы некорректные данные для постановки/снятия лайка` });
      return;
    };
    res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  });
};


module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike
}