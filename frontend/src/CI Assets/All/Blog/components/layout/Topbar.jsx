import React from 'react';
import { Link } from 'react-router-dom';
import './Topbar.css';

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="container">
        <div className="logo">SEKKI</div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/pricing" className="cta-btn">Try SEKKI Free</Link>
        </nav>
      </div>
    </header>
  );
}
