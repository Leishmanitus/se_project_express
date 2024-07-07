const router = require('express').Router();
const { createItem, getItems, deleteItem, likeItem, dislikeItem } = require('../controllers/clothingItems');
const auth = require('../middleware/auth');
const { validateId, validateItemData } = require('../middleware/validation');

router.post('/', validateItemData, auth, createItem);
router.get('/', getItems);
router.delete('/:_id', validateId, auth, deleteItem);
router.put('/:_id/likes', validateId, auth, likeItem);
router.delete('/:_id/likes', validateId, auth, dislikeItem);

module.exports = router;
