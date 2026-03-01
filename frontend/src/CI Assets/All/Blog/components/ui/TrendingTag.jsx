import React from 'react';
import PropTypes from 'prop-types';
import './TrendingTag.css';

export default function TrendingTag({ label, onClick, active }) {
  return (
    <button
      type="button"
      className={`trending-tag ${active ? 'active' : ''}`}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
}

TrendingTag.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
};

TrendingTag.defaultProps = {
  active: false,
};
