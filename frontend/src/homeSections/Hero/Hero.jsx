import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-container">
        {/* Left column */}
        <div className="hero-left">
          <div className="hero-tagline">
            <i className="fa-solid fa-bolt"></i>
            AI-POWERED OPERATIONS STRATEGY
          </div>

          <h1 className="hero-headline">
            Your next strategic decision is five minutes away.
          </h1>

          <p className="hero-description">
            AI Agent turns a raw idea into a scored business case, financial model, and execution plan — before your next meeting starts.
          </p>

          <div className="hero-cta">
            <a href="#request-demo" className="btn btn-primary">
              <i className="fa-solid fa-arrow-right"></i>
              Request Demo
            </a>
            <a href="#how-it-works" className="btn btn-outline">
              See How It Works
            </a>
          </div>
        </div>

        {/* Right column - Strategy Scorecard */}
        <div className="hero-card">
          <div className="card-header">
            <i className="fa-solid fa-chart-line"></i>
            STRATEGY SCORECARD
          </div>

          <div className="card-body">
            <div className="scorecard-main">
              <div className="score-circle">
                <span className="score-value">87</span>
                <span className="score-label">SCORE</span>
              </div>

              <div className="score-metrics">
                <div className="metric-row">
                  <span className="metric-name">ROI Opportunity</span>
                  <span className="metric-value highlight">240%</span>
                </div>
                <div className="metric-row">
                  <span className="metric-name">Projected Savings</span>
                  <span className="metric-value">$360K</span>
                </div>
                <div className="metric-row">
                  <span className="metric-name">Viability</span>
                  <span className="metric-value highlight">Strong</span>
                </div>
              </div>
            </div>

            <div className="scorecard-features">
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fa-solid fa-comments"></i>
                </div>
                <span>Intake</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fa-solid fa-magnifying-glass-chart"></i>
                </div>
                <span>Analysis</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fa-solid fa-file-invoice-dollar"></i>
                </div>
                <span>Business Case</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fa-solid fa-list-check"></i>
                </div>
                <span>Execution</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
