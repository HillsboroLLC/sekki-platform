import React from 'react';
import MarketingPageLayout from './MarketingPageLayout';

const SCORE_PILLARS = [
  {
    title: 'Strategic Fit',
    detail: 'Measures alignment to business outcomes, risk posture, and operating priorities.',
  },
  {
    title: 'Execution Readiness',
    detail: 'Evaluates clarity of owners, milestones, dependencies, and sequencing risk.',
  },
  {
    title: 'Impact Potential',
    detail: 'Surfaces expected value, confidence range, and upside/downside assumptions.',
  },
];

export default function JaspenScorePage() {
  return (
    <MarketingPageLayout
      eyebrow="PRODUCT"
      title="Jaspen Score turns ambiguity into a decision signal"
      subtitle="Quantify initiative quality before execution begins so teams can prioritize with confidence and speed."
    >
      <section className="marketing-section">
        <h2>How Jaspen Score Works</h2>
        <div className="marketing-grid">
          {SCORE_PILLARS.map((pillar) => (
            <article key={pillar.title} className="marketing-card">
              <h3>{pillar.title}</h3>
              <p>{pillar.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </MarketingPageLayout>
  );
}
