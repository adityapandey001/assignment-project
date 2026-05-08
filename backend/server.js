require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const scrapeHackerNews = require('./scraper/scrape');
const cron = require('node-cron');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/stories', require('./routes/stories'));
app.use('/api/scrape', require('./routes/scrape'));

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    
    // Run scraper on start
    try {
        await scrapeHackerNews();
    } catch (error) {
        console.error('Initial scrape failed:', error.message);
    }
    
    // Schedule scraper to run every hour
    cron.schedule('0 * * * *', async () => {
        console.log('Running scheduled scrape...');
        try {
            await scrapeHackerNews();
        } catch (error) {
            console.error('Scheduled scrape failed:', error.message);
        }
    });
});
