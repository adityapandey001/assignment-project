import { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import StoryCard from '../components/StoryCard';
import { AuthContext } from '../context/AuthContext';

const Bookmarks = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const { data } = await api.get('/stories');
                // Filter stories that have the current user's ID in their bookmarkedBy array
                const bookmarkedStories = data.filter(story => 
                    story.bookmarkedBy.includes(user._id)
                );
                setStories(bookmarkedStories);
            } catch (error) {
                console.error('Failed to fetch bookmarked stories', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchStories();
        }
    }, [user]);

    const handleBookmark = async (id) => {
        try {
            await api.post(`/stories/${id}/bookmark`);
            // Remove the unbookmarked story from the view immediately
            setStories(stories.filter(story => story._id !== id));
        } catch (error) {
            console.error('Failed to toggle bookmark', error);
        }
    };

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '3rem' }}>Loading bookmarks...</div>;
    }

    return (
        <div>
            <h2 style={{ marginBottom: '2rem' }}>Your Bookmarks</h2>
            {stories.length === 0 ? (
                <p>You have no saved bookmarks yet. Go back to the home page to add some!</p>
            ) : (
                stories.map(story => (
                    <StoryCard 
                        key={story._id} 
                        story={story} 
                        onBookmark={handleBookmark}
                        isBookmarked={true}
                        isAuthenticated={true}
                    />
                ))
            )}
        </div>
    );
};

export default Bookmarks;
