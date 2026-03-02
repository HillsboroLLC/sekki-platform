import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const STEPS = [
  {
    id: 'clarify',
    num: 1,
    title: 'Clarify',
    description: 'Capture the problem, constraints, and definition of success.',
    icon: 'fa-solid fa-lightbulb',
  },
  {
    id: 'decide',
    num: 2,
    title: 'Decide',
    description: 'Generate options, tradeoffs, risks, and a decision-grade recommendation.',
    icon: 'fa-solid fa-scale-balanced',
  },
  {
    id: 'plan',
    num: 3,
    title: 'Plan',
    description: 'Convert the decision into milestones, owners, artifacts, and timeline.',
    icon: 'fa-solid fa-diagram-project',
  },
  {
    id: 'execute',
    num: 4,
    title: 'Execute',
    description: 'Track progress, decisions, risks, and updates in one place.',
    icon: 'fa-solid fa-rocket',
  },
];

export default function HomePage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState(new Set());
  const [activeStep, setActiveStep] = useState(-1);
  const stepRefs = useRef([]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observers = [];

    stepRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Add to visible set
              setVisibleSteps((prev) => new Set([...prev, index]));
              // Update active step (highest visible)
              setActiveStep((prev) => Math.max(prev, index));
            }
          });
        },
        {
          threshold: 0.3,
          rootMargin: '-10% 0px -10% 0px',
        }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setMobileNavOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const progressHeight = activeStep >= 0 ? ((activeStep + 1) / STEPS.length) * 100 : 0;

  return (
    <div className="homepage">
      {/* ========== NAV ========== */}
      <header className="jaspen-header">
        <div className="jaspen-header-inner">
          <a href="/" className="jaspen-logo">Jaspen</a>

          <button
            className={`jaspen-hamburger ${mobileNavOpen ? 'is-open' : ''}`}
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>

          <nav className="jaspen-nav-desktop">
            <a href="#product" onClick={(e) => scrollToSection(e, 'product')}>How it works</a>
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a>
          </nav>

          <div className="jaspen-header-actions">
            <Link to="/login" className="jaspen-login-link">Log in</Link>
            <a href="#request-access" className="jaspen-btn jaspen-btn-primary">Request access</a>
          </div>
        </div>

        {/* Mobile nav */}
        <div className={`jaspen-mobile-nav ${mobileNavOpen ? 'show' : ''}`}>
          <a href="#product" onClick={(e) => scrollToSection(e, 'product')}>How it works</a>
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a>
          <div className="jaspen-mobile-actions">
            <Link to="/login" className="jaspen-btn jaspen-btn-outline">Log in</Link>
            <a href="#request-access" className="jaspen-btn jaspen-btn-primary">Request access</a>
          </div>
        </div>
      </header>

      {/* ========== HERO ========== */}
      <section className="jaspen-hero">
        <div className="jaspen-hero-inner">
          <h1>From idea to execution — with context that never gets lost.</h1>
          <p className="jaspen-hero-sub">
            Jaspen guides you from raw concept to structured plan. Clarify, decide, plan, execute — all in one continuous flow.
          </p>
          <div className="jaspen-hero-cta">
            <a href="#request-access" className="jaspen-btn jaspen-btn-primary jaspen-btn-lg">
              Request access
            </a>
            <a href="#product" onClick={(e) => scrollToSection(e, 'product')} className="jaspen-btn jaspen-btn-outline jaspen-btn-lg">
              See how it works
            </a>
          </div>
        </div>
      </section>

      {/* ========== TIMELINE ========== */}
      <section id="product" className="jaspen-timeline-section">
        <div className="jaspen-timeline-inner">
          <div className="jaspen-section-header">
            <h2>One flow. Full context. Zero handoffs.</h2>
            <p>Every step builds on the last — nothing gets lost between tools or teams.</p>
          </div>

          <div className="jaspen-timeline">
            {/* Progress line (desktop) */}
            <div className="jaspen-timeline-track">
              <div className="jaspen-timeline-line" />
              <div
                className="jaspen-timeline-progress"
                style={{ height: `${progressHeight}%` }}
              />
            </div>

            {/* Steps */}
            <div className="jaspen-timeline-steps">
              {STEPS.map((step, index) => {
                const isVisible = visibleSteps.has(index);
                const isActive = index === activeStep;
                const delay = index * 100; // stagger

                return (
                  <div
                    key={step.id}
                    ref={(el) => (stepRefs.current[index] = el)}
                    className={`jaspen-timeline-step ${isVisible ? 'is-visible' : ''} ${isActive ? 'is-active' : ''}`}
                    style={{ transitionDelay: `${delay}ms` }}
                  >
                    <div className="jaspen-step-dot">
                      <span>{step.num}</span>
                    </div>
                    <div className="jaspen-step-content">
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contextual awareness callout */}
          <div className="jaspen-context-callout">
            <i className="fa-solid fa-link"></i>
            <div>
              <strong>Contextual awareness throughout</strong>
              <p>The agent remembers every decision, constraint, and tradeoff — so you never have to repeat yourself.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHO IT'S FOR ========== */}
      <section id="about" className="jaspen-credibility">
        <div className="jaspen-credibility-inner">
          <h2>Built for people who ship, not just strategize</h2>
          <ul className="jaspen-who-list">
            <li>
              <i className="fa-solid fa-check"></i>
              <span><strong>Operators</strong> who need to justify initiatives and keep projects on track without a PMO army.</span>
            </li>
            <li>
              <i className="fa-solid fa-check"></i>
              <span><strong>Founders</strong> who move fast but still need structured thinking before big bets.</span>
            </li>
            <li>
              <i className="fa-solid fa-check"></i>
              <span><strong>Transformation leaders</strong> driving CI, digital, or org-wide change with limited bandwidth.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section id="request-access" className="jaspen-final-cta">
        <div className="jaspen-final-cta-inner">
          <h2>Ready to move from ideas to action?</h2>
          <p>Request early access and see how Jaspen can accelerate your next initiative.</p>
          <a href="mailto:hello@jaspen.ai" className="jaspen-btn jaspen-btn-primary jaspen-btn-lg">
            Request access
          </a>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="jaspen-footer">
        <div className="jaspen-footer-inner">
          <div className="jaspen-footer-left">
            <span className="jaspen-footer-logo">Jaspen</span>
            <p>&copy; {new Date().getFullYear()} Jaspen. All rights reserved.</p>
          </div>
          <div className="jaspen-footer-right">
            <Link to="/pages/privacy">Privacy</Link>
            <Link to="/pages/terms">Terms</Link>
            <Link to="/pages/support">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
