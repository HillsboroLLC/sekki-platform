import React from 'react'
import './ProblemSection.css'

export default function ProblemSection() {
  return (
    <section className="problem-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">The Hidden Costs of Flying Blind</h2>
          <p className="section-subtitle">
            Every day without data-driven insights costs your business money, time, and opportunities
          </p>
        </div>
        <div className="problem-grid">
          <div className="problem-card">
            <div className="problem-icon">
              <svg className="icon icon-white" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3 className="problem-title">Wasted Marketing Spend</h3>
            <p className="problem-description">
              Throwing money at ads without knowing what works. Your competitors are stealing customers while you guess.
            </p>
            <div className="problem-cost">Average Loss: $2,000-$5,000/month</div>
          </div>
          <div className="problem-card">
            <div className="problem-icon">
              <svg className="icon icon-white" viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <h3 className="problem-title">Missed Opportunities</h3>
            <p className="problem-description">
              Market gaps your competitors haven't found yet. Revenue streams sitting right under your nose.
            </p>
            <div className="problem-cost">Potential Revenue: $10,000-$50,000/year</div>
          </div>
          <div className="problem-card">
            <div className="problem-icon">
              <svg className="icon icon-white" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="problem-title">Slow Decision Making</h3>
            <p className="problem-description">
              Weeks of research for simple decisions. While you analyze, competitors act and win customers.
            </p>
            <div className="problem-cost">Time Cost: 10-20 hours/week</div>
          </div>
          <div className="problem-card">
            <div className="problem-icon">
              <svg className="icon icon-white" viewBox="0 0 24 24">
                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
              </svg>
            </div>
            <h3 className="problem-title">Expensive Consultants</h3>
            <p className="problem-description">
              $200/hour for basic market research that's outdated before you can act on it.
            </p>
            <div className="problem-cost">Consultant Fees: $5,000-$20,000/project</div>
          </div>
        </div>
        <div className="solution-cta">
          <h3>SEKKI gives you Fortune 500 insights for $49/month</h3>
          <p>Stop losing money to guesswork. Get the data you need to make confident decisions.</p>
          <a href="#contact" className="cta-primary">Start Your Free Trial</a>
        </div>
      </div>
    </section>
  )
}
