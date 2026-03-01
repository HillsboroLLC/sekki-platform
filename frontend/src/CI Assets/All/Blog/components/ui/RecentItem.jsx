import React from 'react';
import PropTypes from 'prop-types';
import SocialShareButtons from './SocialShareButtons';
import './RecentItem.css';

export default function RecentItem({ title, author, date, readingTime, excerpt, url }) {
  return (
    <div className="recent-item fade-in" data-category={author.category}>
      <h3>{title}</h3>
      <div className="post-meta">
        <div className="author-avatar">{author.initials}</div>
        <span>{author.name}</span>
        <span>•</span>
        <span>{date}</span>
        {readingTime && (
          <>
            <span>•</span>
            <span>{readingTime}</span>
          </>
        )}
      </div>
      <p>{excerpt}</p>
      <div className="recent-footer">
        <a href={url} className="read-more">
          Read More →
        </a>
        <SocialShareButtons />
      </div>
    </div>
  );
}

RecentItem.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.shape({ initials: PropTypes.string, name: PropTypes.string }).isRequired,
  date: PropTypes.string.isRequired,
  readingTime: PropTypes.string,
  excerpt: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
