const router = require('express').Router();
const usersRoute = require('./users');
const clothingItemsRoute = require('./clothingItems');
const likesRoute = require('./likes');

// router.use('/', (req, res, next) => {
//   if (res.status !== 'ok') {
//     throw { message: "Requested resource not found" }
//   }
//   next();
// })
router.use('/users', usersRoute);
router.use('/items', clothingItemsRoute);
router.use('/items/', likesRoute);

module.exports = router;
