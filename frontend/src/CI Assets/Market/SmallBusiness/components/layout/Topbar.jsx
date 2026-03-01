import React from 'react'
import './Topbar.css'

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="container">
        <div className="logo">SEKKI</div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#testimonials">Success Stories</a>
          <a href="#contact">Get Started</a>
          <a href="#contact" className="trial-btn">Start Free Trial</a>
        </div>
      </div>
    </div>
  )
}
