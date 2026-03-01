import React from 'react';
import StatItem from '../ui/StatItem';
import './StatsBar.css';

export default function StatsBar({ stats }) {
  return (
    <section className="stats-bar">
      <div className="container">
        <div className="stats-grid">
          {stats.map(({ number, label }) => (
            <StatItem key={label} number={number} label={label} />
          ))}
        </div>
      </div>
    </section>
  );
}
