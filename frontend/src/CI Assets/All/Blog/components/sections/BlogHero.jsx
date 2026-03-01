import React from 'react';
import { Link } from 'react-router-dom';
import './BlogHero.css';

export default function BlogHero() {
  return (
    <section className="blog-hero">
      <div className="container">
        <div className="hero-content">
          <h1>Expert Business Intelligence Insights</h1>
          <p>
            Master market analysis, competitive intelligence, and business validation with proven strategies from SEKKI's expert team. Transform your decision-making with data-driven insights.
          </p>
          <div className="hero-ctas">
            <Link to="#featured">Start Learning</Link>
            <Link to="#categories">Browse Topics</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
