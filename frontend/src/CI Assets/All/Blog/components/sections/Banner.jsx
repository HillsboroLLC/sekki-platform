import React, { useState } from 'react';
import './Banner.css';

export default function Banner() {
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    alert('Thank you! Your free toolkit is being sent to your email.');
    setEmail('');
  };

  return (
    <section className="banner">
      <h2>Free Business Validation Toolkit</h2>
      <p>Get our comprehensive guide with templates, checklists, and frameworks used by 10,000+ successful entrepreneurs</p>
      <form className="banner-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your business email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit">Download Free Toolkit</button>
      </form>
    </section>
  );
}
