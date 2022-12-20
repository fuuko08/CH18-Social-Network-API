const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    // Get single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.id })
          .select('-__v')  
          .then((thought) =>
            !thought
            ? res.status(404).json({ msg: 'No thought is found'})
            : res.json(thought)
          ).catch((err) => res.status(500).json(err));   
    },

    // Create thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));   
    },

    // Update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        ).then((thought) =>
            !thought
            ? res.status(404).json({ msg: 'No thought is found'})
            : res.json(thought)
        ).catch((err) => res.status(500).json(err));
    },

    // Delete thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
        .then((thought) =>
            !thought
            ? res.status(404).json({ msg: 'No thought is found'})
            : User.findOneAndUpdate(
                { user: req.params.userId },
                { $pull: {thoughts: req.params.id}},
                { new: true }
            )
        ).then((user) => 
            !user
            ? res.status(404).json({ msg: 'Deleted thought but no user is found'})
            : res.json ({ msg: 'Thought is successfully deleted'})           
        ).catch((err) => res.status(500).json(err));
    },

    // Add Reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate (
            { _id: req.params.id },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        ).then((thought) => 
            !thought
            ? res.status(404).json({ msg: 'No thought is found'})
            : res.json(thought)
        ).catch((err) => res.status(500).json(err));
    },

    // Delete Reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            { runValidators: true, new: true },
        ).then((thought) => 
            !thought
            ? res.status(404).json({ msg: 'No thought is found'})
            : res.json(thought)
        ).catch((err) => res.status(500).json(err));
    },
    
};