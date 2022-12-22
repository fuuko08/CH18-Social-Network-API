const router =  require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:id
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:id/reactions
router.route('/:id/reactions').post(addReaction);

// /api/thoughts/:id/reactions/reactionId
router.route('/:id/reactions/:reactionId').delete(deleteReaction);

module.exports = router;