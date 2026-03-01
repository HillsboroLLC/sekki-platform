import React from 'react';
import './ValidationProcess.css';

export default function ValidationProcess() {
  return (
    <section className="validation-process" id="validation">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get Validation in 3 Simple Steps</h2>
          <p className="section-subtitle">From idea to validated concept in under 24 hours</p>
        </div>
        <div className="process-container">
          <div className="process-card">
            <div className="process-number">1</div>
            <h3 className="process-title">Describe Your Idea</h3>
            <p className="process-description">
              Tell us about your business concept in plain English. No business plan required—just your idea.
            </p>
          </div>
          <div className="process-card">
            <div className="process-number">2</div>
            <h3 className="process-title">AI Analyzes the Market</h3>
            <p className="process-description">
              Our AI researches market demand, competition, trends, and identifies potential customers for your idea.
            </p>
          </div>
          <div className="process-card">
            <div className="process-number">3</div>
            <h3 className="process-title">Get Your Validation Report</h3>
            <p className="process-description">
              Receive a clear go/no-go recommendation with specific next steps to move forward or pivot.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
