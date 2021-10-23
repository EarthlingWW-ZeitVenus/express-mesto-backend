const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const defaultRouter = require('../controllers/default');
const {
  createUser,
  login,
} = require('../controllers/users');
const { regExpUrl } = require('../utils/constants');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
    name: Joi.string().required().min(2),
    about: Joi.string().required().min(5),
    avatar: Joi.string().required().pattern(regExpUrl),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
}), login);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', defaultRouter);

module.exports = router;
