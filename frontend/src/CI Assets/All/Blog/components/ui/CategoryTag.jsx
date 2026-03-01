import React from 'react';
import PropTypes from 'prop-types';
import './CategoryTag.css';

export default function CategoryTag({ label, value, active, onClick }) {
  return (
    <button
      type="button"
      className={`category-tag ${active ? 'active' : ''}`}
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
}

CategoryTag.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

CategoryTag.defaultProps = {
  active: false,
};
