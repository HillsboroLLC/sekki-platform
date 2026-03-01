import React from 'react'
import './PricingComparison.css'

export default function PricingComparison() {
  return (
    <section className="pricing-comparison" id="pricing">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Stop Paying Consultant Prices</h2>
          <p className="section-subtitle">Get better insights for a fraction of the cost</p>
        </div>
        <div className="comparison-table">
          <div className="comparison-header">Traditional vs SEKKI</div>
          <div className="comparison-row">
            <div className="comparison-cell comparison-label"></div>
            <div className="comparison-cell comparison-label">Business Consultant</div>
            <div className="comparison-cell comparison-label">SEKKI</div>
          </div>
          <div className="comparison-row">
            <div className="comparison-cell comparison-label">Market Research</div>
            <div className="comparison-cell comparison-consultant">$5,000–$15,000</div>
            <div className="comparison-cell comparison-sekki">Included</div>
          </div>
          <div className="comparison-row">
            <div className="comparison-cell comparison-label">Competitor Analysis</div>
            <div className="comparison-cell comparison-consultant">$3,000–$8,000</div>
            <div className="comparison-cell comparison-sekki">Included</div>
          </div>
          <div className="comparison-row">
            <div className="comparison-cell comparison-label">SWOT Analysis</div>
            <div className="comparison-cell comparison-consultant">$2,000–$5,000</div>
            <div className="comparison-cell comparison-sekki">Included</div>
          </div>
          <div className="comparison-row">
            <div className="comparison-cell comparison-label">Time to Results</div>
            <div className="comparison-cell comparison-consultant">2–6 weeks</div>
            <div className="comparison-cell comparison-sekki">24 hours</div>
          </div>
          <div className="comparison-row">
            <div className="comparison-cell comparison-label">Monthly Cost</div>
            <div className="comparison-cell comparison-consultant">$2,000–$10,000</div>
            <div className="comparison-cell comparison-sekki">$49</div>
          </div>
          <div className="savings-highlight">
            Save $24,000–$120,000 per year with SEKKI
          </div>
        </div>
      </div>
    </section>
  )
}
