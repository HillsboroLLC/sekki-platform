import React from 'react';
import PropTypes from 'prop-types';
import './CategoryTags.css';

export default function CategoryTags({ tags, selected, onSelect }) {
  return (
    <section className="category-tags">
      {tags.map(tag => (
        <button
          key={tag.value}
          className={`category-tag ${selected === tag.value ? 'active' : ''}`}
          onClick={() => onSelect(tag.value)}
          type="button"
        >
          {tag.label}
        </button>
      ))}
    </section>
  );
}

CategoryTags.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
  ).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};
