import React, { useState } from 'react';
import './NewsletterSignup.css';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    alert('Successfully subscribed! Welcome to our community of smart entrepreneurs.');
    setEmail('');
  };

  return (
    <section className="newsletter">
      <h2>Join 25,000+ Smart Entrepreneurs</h2>
      <p>Get weekly insights, exclusive templates, and proven strategies delivered to your inbox. No spam, just value.</p>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email address"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit">Subscribe Free</button>
      </form>
      <div className="newsletter-benefits">
        <div className="benefit-item">
          <svg className="icon benefit-icon" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Weekly expert insights</span>
        </div>
        <div className="benefit-item">
          <svg className="icon benefit-icon" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Exclusive templates</span>
        </div>
        <div className="benefit-item">
          <svg className="icon benefit-icon" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Unsubscribe anytime</span>
        </div>
      </div>
    </section>
  );
}
