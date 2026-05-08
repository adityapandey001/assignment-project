const scrapeHackerNews = require('../scraper/scrape');

// @desc    Trigger scraper manually
// @route   POST /api/scrape
// @access  Public
const triggerScrape = async (req, res) => {
    try {
        const stories = await scrapeHackerNews();
        res.json({ message: 'Scrape successful', count: stories.length });
    } catch (error) {
        res.status(500).json({ message: 'Scrape failed', error: error.message });
    }
};

module.exports = {
    triggerScrape
};
