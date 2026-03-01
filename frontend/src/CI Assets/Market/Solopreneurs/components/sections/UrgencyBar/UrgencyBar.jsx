import React from 'react';
import './UrgencyBar.css';

export default function UrgencyBar() {
  return (
    <div className="urgency-bar">
      <div className="container urgency-items">
        <div className="urgency-item">
          <svg className="urgency-icon" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span>7-Day Free Trial</span>
        </div>
        <div className="urgency-item">
          <svg className="urgency-icon" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
          </svg>
          <span>No Credit Card Required</span>
        </div>
        <div className="urgency-item">
          <svg className="urgency-icon" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          <span>Results in 24 Hours</span>
        </div>
        <div className="urgency-item">
          <svg className="urgency-icon" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>Cancel Anytime</span>
        </div>
      </div>
    </div>
  );
}
