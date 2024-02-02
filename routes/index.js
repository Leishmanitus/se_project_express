const router = require('express').Router();
const usersRoute = require('./users');
const clothingItemsRoute = require('./clothingItems');
const { handleUnknownRoute } = require('../utils/errors');
const auth = require('../middleware/auth');
const { createUser, login } = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', createUser);
router.use('/users', auth, usersRoute);
router.use('/items', clothingItemsRoute);
router.use('/', handleUnknownRoute);

module.exports = router;
