const Story = require('../models/Story');

// @desc    Get all stories
// @route   GET /api/stories
// @access  Public
const getStories = async (req, res) => {
    const stories = await Story.find().sort({ points: -1 });
    res.json(stories);
};

// @desc    Get single story
// @route   GET /api/stories/:id
// @access  Public
const getStory = async (req, res) => {
    const story = await Story.findById(req.params.id);

    if (story) {
        res.json(story);
    } else {
        res.status(404).json({ message: 'Story not found' });
    }
};

// @desc    Toggle bookmark
// @route   POST /api/stories/:id/bookmark
// @access  Private
const toggleBookmark = async (req, res) => {
    const story = await Story.findById(req.params.id);

    if (!story) {
        return res.status(404).json({ message: 'Story not found' });
    }

    const isBookmarked = story.bookmarkedBy.includes(req.user.id);

    if (isBookmarked) {
        story.bookmarkedBy = story.bookmarkedBy.filter(
            (id) => id.toString() !== req.user.id.toString()
        );
    } else {
        story.bookmarkedBy.push(req.user.id);
    }

    await story.save();
    res.json(story);
};

module.exports = {
    getStories,
    getStory,
    toggleBookmark
};
