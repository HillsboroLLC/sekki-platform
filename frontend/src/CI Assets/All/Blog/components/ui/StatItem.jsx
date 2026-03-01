import React from 'react';
import PropTypes from 'prop-types';
import './StatItem.css';

export default function StatItem({ number, label }) {
  return (
    <div className="stat-item">
      <span className="stat-number">{number}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

StatItem.propTypes = {
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
};
