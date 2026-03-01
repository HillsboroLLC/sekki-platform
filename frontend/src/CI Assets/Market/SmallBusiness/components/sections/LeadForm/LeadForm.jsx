import React from 'react'
import './LeadForm.css'

export default function LeadForm() {
  return (
    <section className="lead-form-section" id="contact">
      <div className="container">
        <div className="form-container">
          <h3 className="form-title">Start Your Free Trial</h3>
          <p className="form-subtitle">Get your first business analysis in 24 hours. No credit card required.</p>
          <form>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input type="text" id="name" className="form-input" placeholder="Your full name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input type="email" id="email" className="form-input" placeholder="you@yourbusiness.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="business" className="form-label">Business Type</label>
              <input type="text" id="business" className="form-input" placeholder="e.g., Digital Marketing Agency" required />
            </div>
            <div className="form-group">
              <label htmlFor="size" className="form-label">Business Size</label>
              <select id="size" className="form-input" required>
                <option value="">Select business size</option>
                <option value="1-5">1-5 employees</option>
                <option value="6-20">6-20 employees</option>
                <option value="21-50">21-50 employees</option>
                <option value="51-100">51-100 employees</option>
              </select>
            </div>
            <button type="submit" className="form-submit">Start Free Trial →</button>
          </form>
          <p className="trust-message">✓ 14-day free trial ✓ No credit card required ✓ Cancel anytime</p>
        </div>
      </div>
    </section>
  )
}
