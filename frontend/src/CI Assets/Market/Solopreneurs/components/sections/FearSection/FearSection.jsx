import React from 'react';
import './FearSection.css';

export default function FearSection() {
  return (
    <section className="fear-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">The Solopreneur's Nightmare</h2>
          <p className="section-subtitle">
            Every day you delay validation is another day closer to building something nobody wants
          </p>
        </div>

        <div className="fear-grid">
          <div className="fear-card">
            <div className="fear-icon">
              <svg className="icon icon-white" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3 className="fear-title">Building in the Dark</h3>
            <p className="fear-description">
              Spending months building a product based on assumptions, only to discover nobody wants it.
            </p>
            <div className="fear-stat">90% of startups fail due to no market need</div>
          </div>

          <div className="fear-card">
            <div className="fear-icon">
              <svg className="icon icon-white" viewBox="0 0 24 24">
                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
              </svg>
            </div>
            <h3 className="fear-title">Burning Your Savings</h3>
            <p className="fear-description">
              Investing your life savings into an unvalidated idea that might never generate revenue.
            </p>
            <div className="fear-stat">Average loss: $25,000–$100,000</div>
          </div>

          <div className="fear-card">
            <div className="fear-icon">
              <svg className="icon icon-white" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="fear-title">Wasted Years</h3>
            <p className="fear-description">
              Losing precious years of your life working on something that was doomed from the start.
            </p>
            <div className="fear-stat">Average failed startup: 2–3 years wasted</div>
          </div>

          <div className="fear-card">
            <div className="fear-icon">
              <svg className="icon icon-white" viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <h3 className="fear-title">Crushing Self-Doubt</h3>
            <p className="fear-description">
              The psychological toll of failure, making you question your abilities as an entrepreneur.
            </p>
            <div className="fear-stat">70% never try again after first failure</div>
          </div>
        </div>

        <div className="solution-cta">
          <h3>SEKKI validates your idea in 24 hours for $19/month</h3>
          <p>Stop gambling with your future. Get the validation you need before you build.</p>
          <a href="#contact" className="cta-primary">Validate My Idea Now</a>
        </div>
      </div>
    </section>
  );
}
