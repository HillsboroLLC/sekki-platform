import React from 'react';
import './Pricing.css';

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Choose Your Validation Plan</h2>
          <p className="section-subtitle">Start with a free trial, upgrade when you're ready</p>
        </div>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h3 className="pricing-title">Free Trial</h3>
            <div className="pricing-price">$0</div>
            <div className="pricing-period">7 days free</div>
            <ul className="pricing-features">
              <li>1 idea validation</li>
              <li>Basic market analysis</li>
              <li>Competition overview</li>
              <li>Email support</li>
            </ul>
            <button className="pricing-cta">Start Free Trial</button>
          </div>
          <div className="pricing-card featured">
            <h3 className="pricing-title">Solopreneur</h3>
            <div className="pricing-price">$19</div>
            <div className="pricing-period">per month</div>
            <ul className="pricing-features">
              <li>Unlimited idea validations</li>
              <li>Deep market analysis</li>
              <li>Competitor intelligence</li>
              <li>Revenue projections</li>
              <li>Risk assessment</li>
              <li>Customer insights</li>
              <li>Action plans</li>
              <li>Priority support</li>
            </ul>
            <button className="pricing-cta">Start Validating</button>
          </div>
          <div className="pricing-card">
            <h3 className="pricing-title">Lifetime</h3>
            <div className="pricing-price">$299</div>
            <div className="pricing-period">one-time payment</div>
            <ul className="pricing-features">
              <li>Everything in Solopreneur</li>
              <li>Lifetime access</li>
              <li>All future features</li>
              <li>No monthly fees ever</li>
              <li>VIP support</li>
            </ul>
            <button className="pricing-cta">Get Lifetime Access</button>
          </div>
        </div>
      </div>
    </section>
  );
}
