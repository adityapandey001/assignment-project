const express = require('express');
const router = express.Router();
const { getStories, getStory, toggleBookmark } = require('../controllers/storyController');
const { protect } = require('../middleware/auth');

router.get('/', getStories);
router.get('/:id', getStory);
router.post('/:id/bookmark', protect, toggleBookmark);

module.exports = router;
