const router = require('express').Router();
const { createItem, getItems, getItem, updateItem, deleteItem } = require('../controllers/clothingItems');

router.post('/', createItem);
router.get('/', getItems);
router.get('/:_id', getItem);
router.patch('/:_id', updateItem);
router.delete('/:_id', deleteItem);

module.exports = router;
