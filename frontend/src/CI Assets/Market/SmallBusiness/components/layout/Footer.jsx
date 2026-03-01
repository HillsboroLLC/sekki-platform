import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#testimonials">Success Stories</a>
            <a href="#contact">Get Started</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 SEKKI LLC. All rights reserved. | Small Business Intelligence Platform</p>
        </div>
      </div>
    </footer>
  )
}
