const axios = require('axios');
const cheerio = require('cheerio');
const Story = require('../models/Story');

const scrapeHackerNews = async () => {
    try {
        console.log('Starting Hacker News scrape...');
        const { data } = await axios.get('https://news.ycombinator.com/');
        const $ = cheerio.load(data);
        const stories = [];

        $('.athing').slice(0, 10).each((index, element) => {
            const id = $(element).attr('id');
            const title = $(element).find('.titleline > a').text();
            const url = $(element).find('.titleline > a').attr('href');
            
            const subtext = $(element).next();
            const pointsText = subtext.find('.score').text();
            const points = parseInt(pointsText.replace(' points', '')) || 0;
            const author = subtext.find('.hnuser').text() || 'Anonymous';
            const postedAtStr = subtext.find('.age').attr('title');
            let postedAt = new Date();
            if (postedAtStr) {
                // HN sometimes includes extra text in title attribute like "2024-05-07T10:00:00 ...", let's split it just in case
                const datePart = postedAtStr.split(' ')[0];
                const parsedDate = new Date(datePart);
                if (!isNaN(parsedDate.getTime())) {
                    postedAt = parsedDate;
                }
            }

            stories.push({
                title,
                url,
                points,
                author,
                postedAt
            });
        });

        // Upsert stories into MongoDB
        for (const story of stories) {
            await Story.findOneAndUpdate(
                { url: story.url },
                story,
                { upsert: true, new: true }
            );
        }

        console.log(`Successfully scraped and stored ${stories.length} stories.`);
        return stories;
    } catch (error) {
        console.error('Error scraping Hacker News:', error.message);
        throw error;
    }
};

module.exports = scrapeHackerNews;
