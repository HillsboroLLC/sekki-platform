import React from 'react';
import './EnterpriseHero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Transform Your Enterprise with AI-Powered Business Intelligence</h1>
            <p>
              Replace million-dollar consulting fees with instant, actionable insights. SEKKI
              delivers enterprise-grade analysis that scales with your organization.
            </p>
            <div className="cta-buttons">
              <a href="#contact" className="cta-primary">
                Schedule Enterprise Demo
              </a>
              <a href="#features" className="cta-secondary">
                Explore Features
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="dashboard-preview">
              <div className="dashboard-header">
                <div className="dashboard-dot dot-red" />
                <div className="dashboard-dot dot-yellow" />
                <div className="dashboard-dot dot-green" />
              </div>
              <div className="dashboard-content">
                <div className="metric-row">
                  <span className="metric-label">Revenue Growth</span>
                  <span className="metric-value">+47%</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Market Share</span>
                  <span className="metric-value">23.4%</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Cost Reduction</span>
                  <span className="metric-value">$2.3M</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">ROI</span>
                  <span className="metric-value">340%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
