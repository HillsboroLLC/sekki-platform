import React from 'react';
import './BenefitsSection.css';

export default function BenefitsSection() {
  return (
    <section className="benefits">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Everything You Need to Validate Smart</h2>
          <p className="section-subtitle">Comprehensive validation tools designed for large enterprises</p>
        </div>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">🔍</div>
            <h3 className="benefit-title">Advanced Market Intelligence</h3>
            <p className="benefit-description">Deep market analysis with real-time competitive intelligence and trend forecasting.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🛡️</div>
            <h3 className="benefit-title">Risk Assessment</h3>
            <p className="benefit-description">Proactive risk identification and mitigation strategies for enterprise resilience.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">⚙️</div>
            <h3 className="benefit-title">Custom Integrations</h3>
            <p className="benefit-description">Seamless connectivity to your ERP, CRM, BI tools via our API-first platform.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🤝</div>
            <h3 className="benefit-title">White-Glove Support</h3>
            <p className="benefit-description">Dedicated account management, training, and strategic consultation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
