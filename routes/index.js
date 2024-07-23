const router = require('express').Router();
const usersRoute = require('./users');
const clothingItemsRoute = require('./clothingItems');
const { handleUnknownRoute } = require('../utils/errors');
const { createUser, login } = require('../controllers/users');
const { validateLoginData, validateRegistrationData } = require('../middleware/validation');

router.post('/signin', validateLoginData, login);
router.post('/signup', validateRegistrationData, createUser);
router.use('/users', usersRoute);
router.use('/items', clothingItemsRoute);
router.use('/', handleUnknownRoute);

module.exports = router;
