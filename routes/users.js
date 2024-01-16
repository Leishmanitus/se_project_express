const router = require('express').Router();
const { getUsers, getUser, createUser, updateUser, deleteUser} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:_id', getUser);
router.patch('/:_id', updateUser);
router.delete('/:_id',deleteUser);

module.exports = router;
