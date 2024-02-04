const router = require('express').Router();
const { createItem, getItems, deleteItem, likeItem, dislikeItem } = require('../controllers/clothingItems');
const auth = require('../middleware/auth');

router.post('/', auth, createItem);
router.get('/', getItems);
router.delete('/:_id', auth, deleteItem);
router.put('/:_id/likes', auth, likeItem);
router.delete('/:_id/likes', auth, dislikeItem);

module.exports = router;
