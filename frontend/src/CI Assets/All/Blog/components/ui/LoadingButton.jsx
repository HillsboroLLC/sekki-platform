import React from 'react';
import PropTypes from 'prop-types';
import './LoadingButton.css';

export default function LoadingButton({ isLoading, children, onClick, ...props }) {
  return (
    <button
      className="loading-button"
      onClick={onClick}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <span className="loading-spinner" /> : children}
    </button>
  );
}

LoadingButton.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

LoadingButton.defaultProps = {
  isLoading: false,
  onClick: () => {},
};
