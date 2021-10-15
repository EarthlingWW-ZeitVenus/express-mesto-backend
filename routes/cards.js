const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike
} = require('../controllers/cards');
const auth = require('../middlewares/auth');
const { celebrate, Joi } = require('celebrate');


router.use(auth);
router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required()
  })
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24)
  })
}), deleteCard);

router.put('/:cardId/likes', addLike);
router.delete('/:cardId/likes', deleteLike);


module.exports = router;