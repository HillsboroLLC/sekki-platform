import React from 'react';
import './LeadFormSection.css';

export default function LeadFormSection() {
  return (
    <section className="form-section" id="contact">
      <div className="container">
        <div className="form-container">
          <h3 className="form-title">Schedule Your Enterprise Demo</h3>
          <p className="form-subtitle">
            See how SEKKI can transform your organization's strategic intelligence capabilities
          </p>
          <form>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input type="text" id="name" className="form-input" placeholder="Your full name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Business Email</label>
              <input type="email" id="email" className="form-input" placeholder="you@company.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="company" className="form-label">Company Name</label>
              <input type="text" id="company" className="form-input" placeholder="Your company name" required />
            </div>
            <div className="form-group">
              <label htmlFor="role" className="form-label">Your Role</label>
              <input type="text" id="role" className="form-input" placeholder="e.g., Chief Strategy Officer" required />
            </div>
            <div className="form-group">
              <label htmlFor="employees" className="form-label">Company Size</label>
              <select id="employees" className="form-input" required>
                <option value="">Select company size</option>
                <option value="1000-5000">1,000 - 5,000 employees</option>
                <option value="5000-10000">5,000 - 10,000 employees</option>
                <option value="10000+">10,000+ employees</option>
              </select>
            </div>
            <button type="submit" className="form-submit">Schedule Demo</button>
          </form>
          <p className="trust-message">
            ✓ Enterprise-grade security ✓ SOC 2 compliant ✓ GDPR compliant
          </p>
        </div>
      </div>
    </section>
  );
}
