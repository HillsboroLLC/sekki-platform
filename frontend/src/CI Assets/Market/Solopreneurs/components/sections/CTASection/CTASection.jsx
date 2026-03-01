import React from 'react';
import './CTASection.css';

export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>Stop Building in the Dark</h2>
          <p>Join 2,500+ solopreneurs who validate before they build</p>
          <a href="#contact" className="cta-primary-white">
            Start Your Free Trial
          </a>
        </div>
      </div>
    </section>
  );
}
