import React from 'react';
import PropTypes from 'prop-types';
import RecentItem from '../ui/RecentItem';
import './LatestInsights.css';

export default function LatestInsights({ posts }) {
  return (
    <section className="latest-insights">
      <div className="section-header">
        <h2 className="section-title">Latest Insights</h2>
        <p className="section-subtitle">Stay ahead with our newest articles and industry updates</p>
      </div>
      <div className="recent-list">
        {posts.map(post => (
          <RecentItem
            key={post.id}
            title={post.title}
            author={post.author}
            date={post.date}
            readingTime={post.readingTime}
            excerpt={post.excerpt}
            url={post.url}
          />
        ))}
      </div>
    </section>
  );
}

LatestInsights.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.shape({ initials: PropTypes.string, name: PropTypes.string }).isRequired,
      date: PropTypes.string.isRequired,
      readingTime: PropTypes.string,
      excerpt: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};
