const router = require('express').Router();
const { likeItem, dislikeItem } = require('../controllers/likes');

router.put('/:_id', likeItem);
router.delete('/:_id', dislikeItem);

module.exports = router;
