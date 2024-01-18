const router = require('express').Router();
const { createItem, getItems, deleteItem } = require('../controllers/clothingItems');
const { likeItem, dislikeItem } = require('../controllers/likes');

router.post('/', createItem);
router.get('/', getItems);
router.delete('/:_id', deleteItem);
router.put('/:_id/likes', likeItem);
router.delete('/:_id/likes', dislikeItem);

module.exports = router;
