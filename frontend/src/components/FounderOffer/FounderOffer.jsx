import React from 'react';
import './FounderOffer.css';

export default function FounderOffer({ onFounderClick }) {
  return (
    <section className="founder-offer-section">
      <div className="founder-offer">
        <div className="founder-badge">Limited Time</div>
        <div className="founder-content">
          <div className="founder-left">
            <h3>Founder Lifetime Access</h3>
            <p>
              Get unlimited access to our complete business analysis platform
              forever. Pay once, analyze unlimited projects for life.
            </p>
            <ul className="founder-features">
              <li><i className="fas fa-infinity"></i> Unlimited analyses forever</li>
              <li><i className="fas fa-check"></i> All current analysis tools</li>
              <li><i className="fas fa-check"></i> All future analysis tools</li>
              <li><i className="fas fa-check"></i> ML enhancements included</li>
              <li><i className="fas fa-check"></i> Work on 5 projects simultaneously</li>
            </ul>
          </div>
          <div className="founder-center">
            <div className="founder-price">
              <span className="founder-currency">$</span>
              <span className="founder-amount">2,999</span>
              <span className="founder-period">one-time</span>
            </div>
            <div className="founder-savings">Save $1,000+ vs regular price</div>
          </div>
          <div className="founder-right">
            <div className="founder-urgency">
              <h4>Limited Founder Spots</h4>
              <p>Price increases to $4,999 after founder period ends</p>
            </div>
            <button
              className="founder-cta"
              onClick={onFounderClick}
            >
              Get Founder Access
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
