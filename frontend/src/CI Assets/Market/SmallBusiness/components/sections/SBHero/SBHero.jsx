import React from 'react'
import './SBHero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Stop <span className="hero-highlight">Guessing</span>, Start Growing</h1>
            <p>Get Fortune 500-level business insights without the Fortune 500 budget. Make data-driven decisions that actually grow your small business.</p>
            <div className="cta-buttons">
              <a href="#contact" className="cta-primary">Start Free 14-Day Trial</a>
              <a href="#demo"    className="cta-secondary">See How It Works</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="dashboard-mockup">
              <div className="mockup-header">
                <div className="mockup-dot dot-red"></div>
                <div className="mockup-dot dot-yellow"></div>
                <div className="mockup-dot dot-green"></div>
              </div>
              <div className="mockup-content">
                <div className="insight-item">
                  <span className="insight-label">Market Opportunity</span>
                  <span className="insight-value insight-positive">High Growth</span>
                </div>
                <div className="insight-item">
                  <span className="insight-label">Competitive Position</span>
                  <span className="insight-value">Strong</span>
                </div>
                <div className="insight-item">
                  <span className="insight-label">Revenue Risk</span>
                  <span className="insight-value insight-warning">Medium</span>
                </div>
                <div className="insight-item">
                  <span className="insight-label">Next Action</span>
                  <span className="insight-value">Expand Marketing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
