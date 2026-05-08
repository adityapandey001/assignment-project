import React from 'react';
import classNames from 'classnames';

const StoryCard = ({ story, onBookmark, isBookmarked, isAuthenticated }) => {
    const timeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };

    return (
        <div className="story-card">
            <div className="story-content">
                <h3>
                    <a href={story.url} target="_blank" rel="noopener noreferrer">
                        {story.title}
                    </a>
                </h3>
                <div className="story-meta">
                    <span>{story.points} points</span>
                    <span>by {story.author}</span>
                    <span>{timeAgo(story.postedAt)}</span>
                </div>
            </div>
            {isAuthenticated && (
                <button 
                    className={classNames('bookmark-btn', { active: isBookmarked })}
                    onClick={() => onBookmark(story._id)}
                    title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
                >
                    {isBookmarked ? '★' : '☆'}
                </button>
            )}
        </div>
    );
};

export default StoryCard;
