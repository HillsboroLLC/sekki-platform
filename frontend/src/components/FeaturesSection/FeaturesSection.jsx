import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';  // ensure Font-Awesome CSS is loaded
import './FeaturesSection.css';

export default function FeaturesSection() {
  return (
    <section className="features" id="tools">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Complete Business Analysis Platform</h2>
          <p className="section-subtitle">
            All the tools you need to <span className="highlight">evaluate</span> and validate
            your business ideas, strategies, and market opportunities.
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card feature-highlight">
            <div className="feature-icon">
              <i className="fas fa-chart-bar"></i>
            </div>
            <h3 className="feature-title">Market Analysis</h3>
            <p className="feature-description">
              Comprehensive market research and validation tools to assess demand, competition,
              and opportunity size for any business idea.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-search"></i>
            </div>
            <h3 className="feature-title">Gap Analysis</h3>
            <p className="feature-description">
              Identify market gaps, competitive advantages, and untapped opportunities in your
              industry or target market.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-balance-scale"></i>
            </div>
            <h3 className="feature-title">SWOT Analysis</h3>
            <p className="feature-description">
              Evaluate strengths, weaknesses, opportunities, and threats for strategic planning
              and decision making.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-robot"></i>
            </div>
            <h3 className="feature-title">AI-Powered Insights</h3>
            <p className="feature-description">
              Machine learning algorithms provide deeper insights and predictive analysis for
              better business decisions.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-infinity"></i>
            </div>
            <h3 className="feature-title">Unlimited Projects</h3>
            <p className="feature-description">
              Work on up to 5 projects simultaneously with unlimited analysis runs and no
              monthly limits.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-download"></i>
            </div>
            <h3 className="feature-title">Export & Share</h3>
            <p className="feature-description">
              Generate professional reports and presentations to share with stakeholders,
              investors, or team members.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
