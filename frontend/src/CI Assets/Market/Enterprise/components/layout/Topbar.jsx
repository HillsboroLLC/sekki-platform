import React from 'react';
import { Link } from 'react-router-dom';
import './Topbar.css';

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="container">
        <div className="logo">SEKKI</div>
        <div className="nav-links">
          <Link to="#validation">Validation</Link>
          <Link to="#pricing">Pricing</Link>
          <Link to="#testimonials">Success Stories</Link>
          <Link to="#contact">Get Started</Link>
          <Link to="#contact" className="trial-btn">Start Free Trial</Link>
        </div>
      </div>
    </div>
  );
}
