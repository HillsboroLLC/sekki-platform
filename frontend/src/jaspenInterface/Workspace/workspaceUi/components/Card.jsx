/**
 * Card.jsx — Presentational card component
 *
 * Variants: default (white + border), flat (gray-50, no border), kpi
 *
 * Usage:
 *   <Card>Content here</Card>
 *   <Card variant="flat">Flat card</Card>
 *   <Card variant="kpi" label="Score" value="46" sub="Fair" icon="fa-solid fa-chart-line" />
 */
import React from 'react';

const styles = {
  default: {
    background: 'var(--jas-white)',
    border: '1px solid var(--jas-border)',
    borderRadius: 'var(--jas-radius-md)',
    padding: 'var(--jas-space-6)',
    transition: 'box-shadow var(--jas-transition)',
  },
  flat: {
    background: 'var(--jas-gray-50)',
    border: 'none',
    borderRadius: 'var(--jas-radius-md)',
    padding: 'var(--jas-space-6)',
  },
  kpi: {
    background: 'var(--jas-white)',
    border: '1px solid var(--jas-border)',
    borderRadius: 'var(--jas-radius-md)',
    padding: '20px 24px',
  },
};

export default function Card({
  variant = 'default',
  label,
  value,
  sub,
  icon,
  children,
  className = '',
  style: customStyle = {},
  ...props
}) {
  const cardStyle = { ...styles[variant], ...customStyle };

  if (variant === 'kpi') {
    return (
      <div className={`jas-kpi ${className}`} style={cardStyle} {...props}>
        {icon && (
          <div style={{ marginBottom: '8px' }}>
            <i
              className={icon}
              style={{ fontSize: 'var(--jas-text-lg)', color: 'var(--jas-magenta)' }}
            />
          </div>
        )}
        {label && (
          <div
            style={{
              fontSize: 'var(--jas-text-sm)',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--jas-text-muted)',
              marginBottom: '4px',
            }}
          >
            {label}
          </div>
        )}
        {value && (
          <div
            style={{
              fontSize: 'var(--jas-text-3xl)',
              fontWeight: 700,
              color: 'var(--jas-navy)',
            }}
          >
            {value}
          </div>
        )}
        {sub && (
          <div
            style={{
              fontSize: 'var(--jas-text-sm)',
              color: 'var(--jas-text-muted)',
              marginTop: '2px',
            }}
          >
            {sub}
          </div>
        )}
        {children}
      </div>
    );
  }

  return (
    <div className={`jas-card ${className}`} style={cardStyle} {...props}>
      {children}
    </div>
  );
}
