import React from 'react';
import './LeadForm.css';

export default function LeadForm() {
  return (
    <section className="lead-form-section" id="contact">
      <div className="container">
        <div className="form-container">
          <h3 className="form-title">Validate Your Idea Today</h3>
          <p className="form-subtitle">
            Get your first validation report in 24 hours. No credit card required for trial.
          </p>
          <form>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input type="text" id="name" className="form-input" placeholder="Your full name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input type="email" id="email" className="form-input" placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="idea" className="form-label">Your Business Idea (Optional)</label>
              <input type="text" id="idea" className="form-input" placeholder="e.g., AI-powered fitness app" />
            </div>
            <button type="submit" className="form-submit">Start Free Trial →</button>
          </form>
          <p className="trust-message">
            ✓ 7-day free trial ✓ No credit card required ✓ Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
