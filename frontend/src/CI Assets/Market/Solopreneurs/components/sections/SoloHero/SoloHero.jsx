import React from 'react';
import './SoloHero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Validate Your Idea <span className="hero-highlight">Before</span> You Build
            </h1>
            <p>
              Stop wasting months building something nobody wants.
              Get market validation in 24 hours, not 6 months of guesswork.
            </p>
            <div className="cta-buttons">
              <a href="#contact" className="cta-primary">
                Validate My Idea Now
              </a>
              <a href="#validation" className="cta-secondary">
                See How It Works
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="validation-preview">
              <div className="preview-header">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <div className="preview-content">
                <div className="validation-item">
                  <span className="validation-label">Market Demand</span>
                  <span className="validation-value validation-positive">High</span>
                </div>
                <div className="validation-item">
                  <span className="validation-label">Competition Level</span>
                  <span className="validation-value validation-warning">Medium</span>
                </div>
                <div className="validation-item">
                  <span className="validation-label">Success Probability</span>
                  <span className="validation-value">78%</span>
                </div>
                <div className="validation-item">
                  <span className="validation-label">Recommended Action</span>
                  <span className="validation-value">Build MVP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
