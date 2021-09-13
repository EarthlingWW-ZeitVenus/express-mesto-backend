const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const defaultRouter = require('../controllers/default');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', defaultRouter);

module.exports = router;