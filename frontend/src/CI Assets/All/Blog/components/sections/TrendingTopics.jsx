import React from 'react';
import PropTypes from 'prop-types';
import './TrendingTopics.css';

export default function TrendingTopics({ topics, onSelect }) {
  return (
    <section className="trending-topics">
      <h3>Trending Topics</h3>
      <div className="trending-tags">
        {topics.map(topic => (
          <button
            key={topic}
            className="trending-tag"
            onClick={() => onSelect(topic)}
            type="button"
          >
            {topic}
          </button>
        ))}
      </div>
    </section>
  );
}

TrendingTopics.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};
