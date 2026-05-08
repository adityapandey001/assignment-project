import { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import StoryCard from '../components/StoryCard';
import { AuthContext } from '../context/AuthContext';

const Stories = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scraping, setScraping] = useState(false);
    const { user } = useContext(AuthContext);

    const fetchStories = async () => {
        try {
            const { data } = await api.get('/stories');
            setStories(data);
        } catch (error) {
            console.error('Failed to fetch stories', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStories();
    }, []);

    const handleScrape = async () => {
        setScraping(true);
        try {
            await api.post('/scrape');
            await fetchStories();
        } catch (error) {
            console.error('Failed to trigger scrape', error);
        } finally {
            setScraping(false);
        }
    };

    const handleBookmark = async (id) => {
        try {
            const { data } = await api.post(`/stories/${id}/bookmark`);
            setStories(stories.map(story => story._id === id ? data : story));
        } catch (error) {
            console.error('Failed to toggle bookmark', error);
        }
    };

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '3rem' }}>Loading stories...</div>;
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Top Hacker News Stories</h2>
                <button 
                    onClick={handleScrape} 
                    disabled={scraping}
                    className="btn btn-primary"
                >
                    {scraping ? 'Scraping...' : 'Fetch Latest Stories'}
                </button>
            </div>
            
            {stories.length === 0 ? (
                <p>No stories found. Try fetching the latest!</p>
            ) : (
                stories.map(story => (
                    <StoryCard 
                        key={story._id} 
                        story={story} 
                        onBookmark={handleBookmark}
                        isBookmarked={user && story.bookmarkedBy.includes(user._id)}
                        isAuthenticated={!!user}
                    />
                ))
            )}
        </div>
    );
};

export default Stories;
