import React from 'react';
import './Benefits.css';

export default function Benefits() {
  return (
    <section className="benefits">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Everything You Need to Validate Smart</h2>
          <p className="section-subtitle">Comprehensive validation tools designed for solo entrepreneurs</p>
        </div>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">
              {/* icon SVG here */}
            </div>
            <h3 className="benefit-title">Market Demand Analysis</h3>
            <p className="benefit-description">
              Discover if there's real demand for your idea and how big the market opportunity actually is.
            </p>
            <div className="benefit-outcome">Know if people will pay before you build</div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">{/* icon SVG here */}</div>
            <h3 className="benefit-title">Competition Intelligence</h3>
            <p className="benefit-description">
              See who you're up against and find gaps in the market you can exploit.
            </p>
            <div className="benefit-outcome">Find your competitive advantage</div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">{/* icon SVG here */}</div>
            <h3 className="benefit-title">Revenue Potential</h3>
            <p className="benefit-description">
              Get realistic revenue projections and pricing recommendations for your market.
            </p>
            <div className="benefit-outcome">Know your earning potential upfront</div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">{/* icon SVG here */}</div>
            <h3 className="benefit-title">Risk Assessment</h3>
            <p className="benefit-description">
              Identify potential roadblocks and risks before they become expensive problems.
            </p>
            <div className="benefit-outcome">Avoid costly mistakes from day one</div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">{/* icon SVG here */}</div>
            <h3 className="benefit-title">Customer Insights</h3>
            <p className="benefit-description">
              Understand exactly who your customers are and what they really want.
            </p>
            <div className="benefit-outcome">Build exactly what customers need</div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">{/* icon SVG here */}</div>
            <h3 className="benefit-title">Action Plan</h3>
            <p className="benefit-description">
              Get a step-by-step roadmap for your next moves—whether it’s build, pivot, or stop.
            </p>
            <div className="benefit-outcome">Know exactly what to do next</div>
          </div>
        </div>
      </div>
    </section>
  );
}
