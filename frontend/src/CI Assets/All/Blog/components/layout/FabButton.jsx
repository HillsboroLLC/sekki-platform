import React, { useEffect, useState } from 'react';
import './FabButton.css';

export default function FabButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button className="fab" onClick={scrollToTop} title="Back to top">
      <svg className="icon" viewBox="0 0 24 24">
        <path d="M7 14l5-5 5 5z" />
      </svg>
    </button>
  );
}
