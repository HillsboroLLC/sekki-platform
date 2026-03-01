import React from 'react'
import './HowItWorks.css'

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="demo">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get Insights in 3 Simple Steps</h2>
          <p className="section-subtitle">
            From setup to actionable insights in under 10 minutes
          </p>
        </div>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3 className="step-title">Tell Us About Your Business</h3>
            <p className="step-description">
              Quick 2-minute setup. Just describe what you do and who you serve. No complex integrations needed.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3 className="step-title">Choose Your Analysis</h3>
            <p className="step-description">
              Pick from market analysis, competitor research, SWOT analysis, or growth opportunities. Or get them all.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3 className="step-title">Get Actionable Insights</h3>
            <p className="step-description">
              Receive clear, specific recommendations you can implement immediately. No jargon, just results.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
