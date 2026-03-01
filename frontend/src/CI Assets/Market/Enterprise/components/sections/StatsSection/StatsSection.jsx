import React from 'react';
import './StatsSection.css';

export default function StatsSection() {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">$50M+</span>
            <span className="stat-label">Consulting Costs Saved</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Enterprise Clients</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">98%</span>
            <span className="stat-label">Client Satisfaction</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24hrs</span>
            <span className="stat-label">Average Analysis Time</span>
          </div>
        </div>
      </div>
    </section>
  );
}
