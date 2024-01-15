const router = require('express').Router();
const { getItems, createItem, deleteItem } = require('../controllers/clothingItems');

router.get('/', getItems);
router.post('/', createItem);
router.delete('/:_id', deleteItem);

module.exports = router;
