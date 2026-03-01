import React from 'react';
import './FearSection.css';

export default function FearSection() {
  return (
    <section className="pain-points">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">The Enterprise Intelligence Gap</h2>
          <p className="section-subtitle">Traditional consulting is too slow and expensive for today's fast-moving markets</p>
        </div>
        <div className="pain-grid">
          <div className="pain-card">
            <div className="pain-icon">
              {/* SVG icon */}
            </div>
            <h3 className="pain-title">Slow Decision Making</h3>
            <p className="pain-description">
              Waiting weeks or months for consulting reports while competitors move faster and capture market opportunities.
            </p>
          </div>
          <div className="pain-card">
            <div className="pain-icon">
              {/* SVG icon */}
            </div>
            <h3 className="pain-title">Expensive Consulting Fees</h3>
            <p className="pain-description">
              Paying millions for basic market analysis that becomes outdated before implementation begins.
            </p>
          </div>
          <div className="pain-card">
            <div className="pain-icon">
              {/* SVG icon */}
            </div>
            <h3 className="pain-title">Fragmented Data Sources</h3>
            <p className="pain-description">
              Struggling to integrate insights from multiple departments, vendors, and market research providers.
            </p>
          </div>
          <div className="pain-card">
            <div className="pain-icon">
              {/* SVG icon */}
            </div>
            <h3 className="pain-title">Missed Opportunities</h3>
            <p className="pain-description">
              Losing competitive advantages because insights arrive too late to influence strategic decisions.
            </p>
          </div>
        </div>
        <div className="solution-highlight">
          <h3>SEKKI delivers enterprise-grade insights in hours, not months</h3>
          <p>Get the strategic intelligence you need to stay ahead of the competition</p>
          <a href="#contact" className="cta-primary">Schedule Your Demo</a>
        </div>
      </div>
    </section>
  );
}
