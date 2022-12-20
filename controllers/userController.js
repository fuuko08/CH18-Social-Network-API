const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .then((users) => {
                return res.json(users);
            }) 
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // Get a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id })
            .select('-__v')
            .then((user) => 
                !user
                ? res.status(404).json({ msg: 'No user is found with this ID' })
                : res.json(user))
                .catch((err) => {
                    console.log(err);
                    return res.status(500).json(err);
                });
    },

    // Create a user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // Update a user
    updateUser(req, res) {
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true },           
        ).then((user) => 
            !user
            ? res.status(404).json({ msg: 'No user is found with this ID'})
            : res.json(user)
        ).catch ((err) => res.status(500).json(err));
    },

    // Delete a user and it's associated thoughts
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.id })
            .then((user) => 
                !user
                ? res.status(404).json({ msg: 'No user is found with this ID'})
                //bonus: delete thought associated with user
                : Thought.deleteMany({ _id: {$in: user.thoughts} })
                ).then((thought) => 
                    !thought
                    ? res.status(404).json({ msg: 'No thought is found, user deleted!',})
                    : res.json({ msg: 'User deleted!'})
                    )
            .catch ((err) => res.status(500).json(err));   
    },

    // Add Friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id},
            { $addToSet: {friends: req.params.friendsId} },
            { runValidators: true, new: true }
        ).then((user) => 
            !user
            ? res.status(404).json({ msg: 'No friend is found with this ID'})
            : res.json(user)
        ).catch ((err) => res.status(500).json(err));
    },

    // Delete Friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: {friends: req.params.friendsId} },
            { runValidators: true, new: true }
        ).then((user) => 
            !user
            ? res.status(404).json({ msg: 'No friend is found with this ID'})
            : res.json(user)
        ).catch ((err) => res.status(500).json(err));
    },
};