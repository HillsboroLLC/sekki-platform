import React from 'react'
import './SocialProof.css'

export default function SocialProof() {
  return (
    <section className="social-proof" id="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Real Results from Real Small Businesses</h2>
          <p className="section-subtitle">See how SEKKI helped these businesses grow</p>
        </div>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p className="testimonial-text">
              SEKKI found a market gap we never knew existed. We launched a new service line and made $30K in the first quarter.
            </p>
            <div className="testimonial-author">Maria Rodriguez</div>
            <div className="testimonial-role">Owner, Digital Marketing Agency</div>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">
              Used to spend $5K on consultants for basic market research. SEKKI gives me better insights for $49/month. No brainer.
            </p>
            <div className="testimonial-author">James Chen</div>
            <div className="testimonial-role">Founder, E-commerce Store</div>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">
              The competitor analysis showed us exactly why we were losing customers. Fixed it in 2 weeks and revenue jumped 40%.
            </p>
            <div className="testimonial-author">Sarah Johnson</div>
            <div className="testimonial-role">CEO, Local Service Business</div>
          </div>
        </div>
      </div>
    </section>
  )
}
