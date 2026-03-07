import React from 'react';
import MarketingPageLayout from './MarketingPageLayout';

const USE_CASES = [
  {
    title: 'Jaspen Security and Execution',
    detail: 'Unify risk, compliance, and delivery into one decision-ready execution flow.',
  },
];

const INDUSTRIES = [
  'Financial Services',
  'Nonprofits',
  'Quick Service Restaurants',
  'Government',
  'Healthcare',
  'Wellness',
  'Energy',
  'Aviation',
];

export default function SolutionsPage() {
  return (
    <MarketingPageLayout
      eyebrow="SOLUTIONS"
      title="Solutions built for decision quality and execution speed"
      subtitle="Use-case and industry frameworks tailored for teams that need clear recommendations and reliable delivery."
    >
      <section id="use-cases" className="marketing-section">
        <h2>Use Cases</h2>
        <div className="marketing-grid">
          {USE_CASES.map((item) => (
            <article key={item.title} className="marketing-card">
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="industries" className="marketing-section">
        <h2>Industries</h2>
        <div className="marketing-card">
          <ul className="industry-grid">
            {INDUSTRIES.map((industry) => (
              <li key={industry}>{industry}</li>
            ))}
          </ul>
        </div>
      </section>
    </MarketingPageLayout>
  );
}
