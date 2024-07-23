const router = require('express').Router();
const { createItem, getItems, deleteItem, likeItem, dislikeItem } = require('../controllers/clothingItems');
const auth = require('../middleware/auth');
const { validateId, validateItemData } = require('../middleware/validation');

router.post('/', auth, validateItemData, createItem);
router.get('/', getItems);
router.delete('/:_id', auth, validateId, deleteItem);
router.put('/:_id/likes', auth, validateId, likeItem);
router.delete('/:_id/likes', auth, validateId, dislikeItem);

module.exports = router;
