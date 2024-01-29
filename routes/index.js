const router = require('express').Router();
const usersRoute = require('./users');
const clothingItemsRoute = require('./clothingItems');
const { handleUnknownRoute } = require('../utils/errors');
const auth = require('../middleware/auth');
const { createUser, login } = require('../controllers/users');

router.post('/signin', auth, login);
router.post('/signup', createUser);
router.use('/users', usersRoute);
router.use('/items', clothingItemsRoute);
router.use('/', handleUnknownRoute);

module.exports = router;
