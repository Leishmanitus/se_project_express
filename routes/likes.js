const router = require('express').Router();
const { likeItem, dislikeItem } = require('../controllers/likes');

router.put('/:_id/likes', likeItem);
router.delete('/:_id/likes', dislikeItem);

module.exports = router;
