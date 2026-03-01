import React from 'react';
import './SocialProof.css';

export default function SocialProof() {
  return (
    <section className="social-proof" id="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Real Solopreneurs, Real Results</h2>
          <p className="section-subtitle">
            See how SEKKI helped these entrepreneurs validate (or pivot) their ideas
          </p>
        </div>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p className="testimonial-text">
              SEKKI saved me 6 months and $15K. The validation showed my original idea had no market, so I pivoted to something with real demand. Now I'm profitable.
            </p>
            <div className="testimonial-author">Alex Chen</div>
            <div className="testimonial-role">SaaS Founder</div>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">
              I was about to quit my job to build an app. SEKKI's analysis showed the market was oversaturated. Dodged a bullet and found a better opportunity instead.
            </p>
            <div className="testimonial-author">Sarah Martinez</div>
            <div className="testimonial-role">App Developer</div>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">
              The validation gave me confidence to move forward. Knowing there was real demand made it easier to invest my time and money. Best $19 I ever spent.
            </p>
            <div className="testimonial-author">Mike Johnson</div>
            <div className="testimonial-role">E-commerce Entrepreneur</div>
          </div>
        </div>
      </div>
    </section>
  );
}
