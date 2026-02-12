import React from 'react';
import './HomePage.css';
import Header from '../Header/Header';
import Hero from '../Hero/Hero';

export default function HomePage() {
  return (
    <div className="homepage">
      <Header />
      <Hero />

      {/* Value Stats Strip */}
      <section className="value-strip">
        <div className="value-strip-inner">
          <div className="value-item">
            <div className="number">5 min</div>
            <div className="label">Idea to Scored Business Case</div>
          </div>
          <div className="value-item">
            <div className="number">90%</div>
            <div className="label">Faster Than Traditional Analysis</div>
          </div>
          <div className="value-item">
            <div className="number">$1.3M+</div>
            <div className="label">Avg. Savings vs. Outside Consultants</div>
          </div>
          <div className="value-item">
            <div className="number">3-in-1</div>
            <div className="label">Research + Planning + Execution</div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="pain-section">
        <div className="pain-container">
          <div className="section-header">
            <h2>Ideas are everywhere. Strategy is not.</h2>
            <p>Your teams have no shortage of ideas. They have a shortage of time, tools, and access to turn those ideas into funded, executable plans.</p>
          </div>

          <div className="pain-grid">
            <div className="pain-card">
              <div className="pain-icon">
                <i className="fa-solid fa-money-bill-wave"></i>
              </div>
              <h4>Consulting is expensive and slow</h4>
              <p>A single strategic engagement costs $150K–$500K and takes 3–6 months to deliver a static deck that is outdated on arrival.</p>
              <span className="pain-stat">$150K–$500K per engagement</span>
            </div>
            <div className="pain-card">
              <div className="pain-icon">
                <i className="fa-solid fa-puzzle-piece"></i>
              </div>
              <h4>Tools are fragmented</h4>
              <p>Research in one platform. Modeling in a spreadsheet. Project plans in another. Nothing connects, and context is lost at every handoff.</p>
              <span className="pain-stat">4+ disconnected tools per initiative</span>
            </div>
            <div className="pain-card">
              <div className="pain-icon">
                <i className="fa-solid fa-hourglass-half"></i>
              </div>
              <h4>Good ideas die quietly</h4>
              <p>Without a fast path from concept to business case, promising opportunities stall in email threads and never reach a decision-maker.</p>
              <span className="pain-stat">6–12 months avg. decision cycle</span>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="workflow-section" id="how-it-works">
        <div className="workflow-container">
          <div className="section-header">
            <h2>From idea to execution in minutes, not months.</h2>
            <p>One conversation. One workspace. Every deliverable your leadership team needs to say yes.</p>
          </div>

          <div className="workflow-grid">
            <div className="workflow-step">
              <div className="step-number">1</div>
              <h3>Describe your idea</h3>
              <p>Tell the agent what you are thinking in plain language. It asks the right follow-up questions to build a complete picture.</p>
              <span className="step-time">~3 MINUTES</span>
            </div>
            <div className="workflow-step">
              <div className="step-number">2</div>
              <h3>Get a viability score</h3>
              <p>Market context, competitive landscape, and financial viability are scored automatically against proven frameworks.</p>
              <span className="step-time">~1 MINUTE</span>
            </div>
            <div className="workflow-step">
              <div className="step-number">3</div>
              <h3>Review the business case</h3>
              <p>Quantified ROI, EBITDA projections, risk assessment, and scenario modeling — ready to present, not to build.</p>
              <span className="step-time">~1 MINUTE</span>
            </div>
            <div className="workflow-step">
              <div className="step-number">4</div>
              <h3>Launch the project</h3>
              <p>An execution roadmap with milestones, resource allocation, and task ownership is generated and ready to act on.</p>
              <span className="step-time">~2 MINUTES</span>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Strip */}
      <section className="proof-strip">
        <div className="proof-inner">
          <h3>Built for operations and transformation leaders</h3>
          <p>AI Agent is purpose-built for the people who turn strategy into results — VPs of Operations, CI Managers, and Transformation Directors who need answers fast and cannot wait for a consulting cycle.</p>
          <div className="proof-metrics">
            <div className="proof-metric">
              <div className="pm-val">5 min</div>
              <div className="pm-label">From Idea to Business Case</div>
            </div>
            <div className="proof-metric">
              <div className="pm-val">100%</div>
              <div className="pm-label">Self-Service, No Consultants Needed</div>
            </div>
            <div className="proof-metric">
              <div className="pm-val">1</div>
              <div className="pm-label">Platform for Research, Planning & Execution</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="comparison-section">
        <div className="comparison-container">
          <div className="section-header">
            <h2>One platform replaces the entire stack.</h2>
            <p>Comparable investment. Radically broader scope.</p>
          </div>

          <table className="comparison-table">
            <thead>
              <tr>
                <th>CAPABILITY</th>
                <th>TRADITIONAL APPROACH</th>
                <th>TYPICAL COST</th>
                <th className="highlight-col">AI AGENT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Market Research</td>
                <td>Consulting firms, 4–8 weeks</td>
                <td>$50K – $100K</td>
                <td className="highlight-col">
                  <span className="check-icon">
                    <i className="fa-solid fa-check"></i>
                    Included
                  </span>
                </td>
              </tr>
              <tr>
                <td>Strategic Planning</td>
                <td>Management consultants, 3–6 months</td>
                <td>$150K – $500K+</td>
                <td className="highlight-col">
                  <span className="check-icon">
                    <i className="fa-solid fa-check"></i>
                    Included
                  </span>
                </td>
              </tr>
              <tr>
                <td>Project Management</td>
                <td>Separate PPM software + headcount</td>
                <td>$30K – $120K</td>
                <td className="highlight-col">
                  <span className="check-icon">
                    <i className="fa-solid fa-check"></i>
                    Included
                  </span>
                </td>
              </tr>
              <tr>
                <td>Business Intelligence</td>
                <td>BI platforms + dedicated analysts</td>
                <td>$10K – $60K</td>
                <td className="highlight-col">
                  <span className="check-icon">
                    <i className="fa-solid fa-check"></i>
                    Included
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Stop waiting on consultants. Start executing strategy.</h2>
          <p>See how AI Agent gives every operations team the strategic firepower of a top-tier firm — in minutes, not months.</p>
          <div className="cta-buttons">
            <a href="#request-demo" className="btn btn-primary">
              <i className="fa-solid fa-arrow-right"></i>
              Request Demo
            </a>
            <a href="#contact" className="btn btn-outline">
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <p>&copy; 2025 AI Agent. All rights reserved.</p>
          </div>
          <div className="footer-right">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/security">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
