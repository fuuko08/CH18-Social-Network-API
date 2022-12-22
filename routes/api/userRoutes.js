const router =  require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:id
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:id/friends
router.route('/:id/friends').post(addFriend);

// /api/users/:id/friends/:friendsId
router.route('/:id/friends/:friendsId').delete(deleteFriend);

module.exports = router;