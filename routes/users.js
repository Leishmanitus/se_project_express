const router = require('express').Router();
const { getCurrentUser, updateUser } = require('../controllers/users');
const { validateId } = require('../middleware/validation');


router.get('/me', getCurrentUser);
router.patch('/me', validateId, updateUser);

module.exports = router;
