const {
  successCodes: {
    REQUEST_SUCCESS,
    RESOURCE_CREATED_SUCCESS
  }
} = require('../utils/constants');
const {
  BadRequestError,
  NotFoundError,
  AuthorizationError
} = require('../utils/errors-classes');
const Card = require('../models/cards');


const getCards = (req, res, next) => {
  Card.find({})
  .populate('owner')
  .then(cards => {
    res.status(REQUEST_SUCCESS).send({ data: cards });
  })
  .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
  .then(card => res.status(RESOURCE_CREATED_SUCCESS).send({ data: card }))
  .catch(err => {
    if(err.name === "ValidationError") {
      next(new BadRequestError(`Переданы некорректные данные при создании карточки - ${err.message}`));
      return;
    };
    next(err);
  });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
  .then(card => {
    if(!card) {
      throw new NotFoundError(`Карточка с указанным id (${cardId}), не найдена - ${err.message}`);
    };
    if(String(card.owner._id) !== String(req.user._id)) {
      throw new AuthorizationError(`Вы не можете удалять чужие карточки`);
    };
    Card.findByIdAndRemove(cardId)
    .then(card => {
      res.status(REQUEST_SUCCESS).send({ message: `Удалена карточка: ${card.name}` });
    })
  })
  .catch(err => {
    if(err.name === "CastError") {
      next(new BadRequestError(`Передано некорректное id карточки - ${err.value}`));
      return;
    };
    next(err);
  });
};

const addLike = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, {
    $addToSet: { likes: req.user._id }
  }, {
    new: true
  })
  .then(card => {
    if(!card) {
      throw new NotFoundError(`Карточка с указанным id (${cardId}), не найдена - ${err.message}`);
    };
    res.status(REQUEST_SUCCESS).send({ data: card });
  })
  .catch(err => {
    if(err.name === "CastError") {
      next(new BadRequestError(`Переданы некорректные данные для постановки/снятия лайка`));
      return;
    };
    next(err);
  });
};

const deleteLike = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, {
    $pull: { likes: req.user._id }
  }, {
    new: true
  })
  .then(card => {
    if(!card){
      throw new NotFoundError(`Карточка с указанным id (${cardId}), не найдена - ${err.message}`);
    };
    res.status(REQUEST_SUCCESS).send({ data: card });
  })
  .catch(err => {
    if(err.name === "CastError") {
      next(new BadRequestError(`Переданы некорректные данные для постановки/снятия лайка`));
      return;
    };
    next(err);
  });
};


module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike
}