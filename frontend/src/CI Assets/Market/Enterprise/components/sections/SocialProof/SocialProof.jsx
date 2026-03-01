import React from 'react';
import './SocialProof.css';

export default function SocialProof() {
  return (
    <section className="testimonial" id="testimonials">
      <div className="container">
        <div className="testimonial-card">
          <p className="testimonial-text">
            SEKKI transformed our strategic planning process. What used to take our team 6 months and cost $2M in consulting fees now happens in 24 hours. The insights are more comprehensive and actionable than anything we've received from traditional consultants.
          </p>
          <div className="testimonial-author">Sarah Chen</div>
          <div className="testimonial-role">
            Chief Strategy Officer, Fortune 500 Technology Company
          </div>
        </div>
      </div>
    </section>
  );
}
