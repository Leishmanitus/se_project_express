const router = require('express').Router();
const usersRoute = require('./users');
const clothingItemsRoute = require('./clothingItems');
const { handleUnknownRoute } = require('../utils/errors');

router.use('/users', usersRoute);
router.use('/items', clothingItemsRoute);
router.use('/', handleUnknownRoute);

module.exports = router;
