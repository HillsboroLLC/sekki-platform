import React from 'react'
import './Features.css'

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Everything You Need to Grow Smarter</h2>
          <p className="section-subtitle">
            Powerful tools designed specifically for small business owners
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg className="icon icon-white" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
            <h3 className="feature-title">Market Intelligence</h3>
            <p className="feature-description">
              Understand your market size, growth trends, and untapped opportunities before your competitors do.
            </p>
            <div className="feature-benefit">
              Find new revenue streams worth $10K-$50K annually
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg className="icon icon-white" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
              </svg>
            </div>
            <h3 className="feature-title">Competitor Analysis</h3>
            <p className="feature-description">
              See exactly what your competitors are doing right (and wrong) so you can outmaneuver them.
            </p>
            <div className="feature-benefit">
              Steal market share with proven strategies
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg className="icon icon-white" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="feature-title">SWOT Analysis</h3>
            <p className="feature-description">
              Identify your strengths, weaknesses, opportunities, and threats with AI-powered insights.
            </p>
            <div className="feature-benefit">
              Make strategic decisions with confidence
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg className="icon icon-white" viewBox="0 0 24 24">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
            </div>
            <h3 className="feature-title">Growth Opportunities</h3>
            <p className="feature-description">
              Discover specific, actionable ways to grow your business based on real market data.
            </p>
            <div className="feature-benefit">
              Get your next $100K revenue idea
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg className="icon icon-white" viewBox="0 0 24 24">
                <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H19v2h-1.5v16.5c0 .83-.67 1.5-1.5 1.5h-9c-.83 0-1.5-.67-1.5-1.5V4H4V2h4.5l1-1h5l1 1H19v2z"/>
              </svg>
            </div>
            <h3 className="feature-title">Risk Assessment</h3>
            <p className="feature-description">
              Spot potential threats to your business before they become expensive problems.
            </p>
            <div className="feature-benefit">
              Avoid costly mistakes and protect revenue
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg className="icon icon-white" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
            </div>
            <h3 className="feature-title">Action Plans</h3>
            <p className="feature-description">
              Get step-by-step implementation guides, not just analysis. Know exactly what to do next.
            </p>
            <div className="feature-benefit">
              Turn insights into revenue in 30 days
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
