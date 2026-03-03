import React, { useState } from 'react';
import './Header.css';

export default function Header() {
  const [openMobile, setOpenMobile] = useState(false);

  const toggleMobile = () => setOpenMobile(o => !o);
  const closeMobile  = () => setOpenMobile(false);

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <a href="/" className="logo">
          <i className="fa-solid fa-cube logo-icon"></i>
          <span className="logo-text">AI Agent</span>
        </a>

        {/* Hamburger (mobile only) */}
        <button
          className={`hamburger ${openMobile ? 'is-open' : ''}`}
          onClick={toggleMobile}
          aria-expanded={openMobile}
          aria-controls="site-mobile-nav"
          aria-label="Toggle navigation"
        >
          <span/><span/><span/>
        </button>

        {/* Desktop nav */}
        <nav className="desktop-nav" aria-label="Primary">
          <ul className="nav-list">
            <li><a href="#platform" className="nav-link">Platform</a></li>
            <li><a href="#about" className="nav-link">About</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
        </nav>

        {/* Desktop actions */}
        <div className="header-actions desktop-actions">
          <a href="/login" className="login-link">Get in touch</a>
          <a href="#request-demo" className="btn btn-primary">
            <i className="fa-solid fa-arrow-right"></i>
            Request Demo
          </a>
        </div>
      </div>

      {/* Mobile slide-down panel */}
      <div id="site-mobile-nav" className={`mobile-nav ${openMobile ? 'show' : ''}`}>
        <ul className="mobile-nav-list" onClick={closeMobile}>
          <li><a href="#platform" className="nav-link">Platform</a></li>
          <li><a href="#about" className="nav-link">About</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
        </ul>

        <div className="mobile-actions">
          <a href="/login" className="btn btn-outline" onClick={closeMobile}>Get in touch</a>
          <a href="#request-demo" className="btn btn-primary" onClick={closeMobile}>
            Request Demo
          </a>
        </div>
      </div>
    </header>
  );
}
