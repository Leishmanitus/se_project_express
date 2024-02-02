const router = require('express').Router();
const { createItem, getItems, deleteItem, likeItem, dislikeItem } = require('../controllers/clothingItems');

router.post('/', createItem);
router.get('/', getItems);
router.delete('/:_id', deleteItem);
router.put('/:_id/likes', likeItem);
router.delete('/:_id/likes', dislikeItem);

module.exports = router;
