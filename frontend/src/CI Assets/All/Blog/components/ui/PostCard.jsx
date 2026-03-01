import React from 'react';
import PropTypes from 'prop-types';
import LoadingButton from './LoadingButton';
import SocialShareButtons from './SocialShareButtons';
import './PostCard.css';

export default function PostCard({
  image,
  category,
  readingTime,
  author,
  date,
  title,
  excerpt,
  onReadMore
}) {
  return (
    <article className="post-card fade-in" data-category={category}>
      <div className="post-image">
        <img src={image} alt={title} />
        <span className="post-category">{category}</span>
        <span className="reading-time">{readingTime}</span>
      </div>
      <div className="post-content">
        <div className="post-meta">
          <div className="author-avatar">{author.initials}</div>
          <span className="author-name">{author.name}</span>
          <span className="date">{date}</span>
        </div>
        <h3 className="post-title">{title}</h3>
        <p className="post-excerpt">{excerpt}</p>
        <div className="post-footer">
          <button className="read-more-btn" onClick={onReadMore}>
            Read Full Article →
          </button>
          <SocialShareButtons />
        </div>
      </div>
    </article>
  );
}

PostCard.propTypes = {
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  readingTime: PropTypes.string.isRequired,
  author: PropTypes.shape({
    initials: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  onReadMore: PropTypes.func.isRequired
};
