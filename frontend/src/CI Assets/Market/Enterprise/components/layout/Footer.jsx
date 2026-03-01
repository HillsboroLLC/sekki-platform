import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-links">
          <a href="#validation">How It Works</a>
          <a href="#pricing">Pricing</a>
          <a href="#testimonials">Success Stories</a>
          <a href="#contact">Get Started</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
        <div className="footer-bottom">
          &copy; 2025 SEKKI LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
