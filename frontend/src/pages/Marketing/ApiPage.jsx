import React from 'react';
import MarketingPageLayout from './MarketingPageLayout';

const EXECUTION_CONNECTORS = ['Jira', 'Workfront', 'Smartsheet'];
const DATA_CONNECTORS = ['Snowflake', 'Salesforce', 'Oracle Fusion'];

export default function ApiPage() {
  return (
    <MarketingPageLayout pageClass="page-api">
      <section className="page-hero page-hero-api">
        <div className="hero-copy">
          <p className="hero-kicker">API</p>
          <h1>APIs, integrations, and connectors in one clear model</h1>
          <p>
            Jaspen uses prebuilt connectors for fast setup and API access for custom enterprise workflows.
            Start with essential connectors first, then expand.
          </p>
        </div>
        <div className="hero-abstract api-abstract">
          <div className="api-tag">Integrations</div>
          <div className="api-tag">Connectors</div>
          <div className="api-tag">API</div>
        </div>
      </section>

      <section className="marketing-section">
        <h2>What each term means</h2>
        <div className="api-terms-grid">
          <article className="marketing-card api-term-card">
            <h3>Integrations</h3>
            <p>Business-facing setup of connected systems so teams can use Jaspen in daily workflows.</p>
          </article>
          <article className="marketing-card api-term-card">
            <h3>Connectors</h3>
            <p>Prebuilt integration modules for specific systems (for example Jira or Snowflake).</p>
          </article>
          <article className="marketing-card api-term-card">
            <h3>API</h3>
            <p>Developer interface for custom automations, internal apps, and enterprise-specific logic.</p>
          </article>
        </div>
      </section>

      <section className="marketing-section">
        <div className="lydia-story lydia-story-api">
          <div className="lydia-visual api-flow-canvas">
            <div className="api-flow-node">Data connectors</div>
            <div className="api-flow-node">Jaspen analysis</div>
            <div className="api-flow-node">Execution connectors</div>
          </div>
          <article className="lydia-content">
            <h3>How the flow works in practice</h3>
            <p>
              Jaspen reads from data systems to detect patterns, then recommends actions, and can write approved updates
              into project tools so teams do less manual handoff work.
            </p>
            <ul className="lydia-bullets">
              <li>Detect trend and variance signals from business data</li>
              <li>Generate likely causes and recommended opportunities</li>
              <li>Apply approved plan updates in execution systems</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="marketing-section">
        <h2>Essential connectors first</h2>
        <div className="connector-group-grid">
          <article className="connector-group-card">
            <h3>Execution connectors</h3>
            <p>Used for plan updates, ownership changes, and status synchronization.</p>
            <div className="connector-matrix">
              {EXECUTION_CONNECTORS.map((name) => (
                <article key={name} className="connector-cell">
                  <h3>{name}</h3>
                  <span>Essential</span>
                </article>
              ))}
            </div>
          </article>

          <article className="connector-group-card">
            <h3>Data connectors</h3>
            <p>Used for trend analysis and opportunity recommendations.</p>
            <div className="connector-matrix">
              {DATA_CONNECTORS.map((name) => (
                <article key={name} className="connector-cell">
                  <h3>{name}</h3>
                  <span>Essential</span>
                </article>
              ))}
            </div>
          </article>
        </div>
      </section>
    </MarketingPageLayout>
  );
}
