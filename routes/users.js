const router = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
  currentUser
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { celebrate, Joi } = require('celebrate');


router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5)
  }).unknown(true)
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5)
  })
}), login);

router.use(auth);
router.get('/', getUsers);
router.get('/me', currentUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24)
  })
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30)
  })
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().min(2).max(30)
  })
}), updateAvatar);


module.exports = router;