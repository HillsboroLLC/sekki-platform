/**
 * Badge.jsx — Presentational badge / pill component
 *
 * Variants: navy (default), success, warning, danger, info, magenta, outline
 *
 * Usage:
 *   <Badge variant="navy">Fair</Badge>
 *   <Badge variant="success">Strong</Badge>
 *   <Badge variant="warning" icon="fa-solid fa-triangle-exclamation">At Risk</Badge>
 */
import React from 'react';

const variantStyles = {
  navy:    { background: 'var(--jas-navy)',    color: 'var(--jas-white)' },
  magenta: { background: 'var(--jas-magenta)', color: 'var(--jas-white)' },
  success: { background: '#e6f9ee',            color: '#0d7a3e' },
  warning: { background: '#fff8e1',            color: '#b8860b' },
  danger:  { background: '#fde8e8',            color: '#c0392b' },
  info:    { background: '#e8f4fd',            color: '#1a73e8' },
  outline: { background: 'transparent',        color: 'var(--jas-navy)', border: '1px solid var(--jas-gray-300)' },
};

const baseStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '3px 10px',
  fontSize: 'var(--jas-text-sm)',
  fontWeight: 600,
  borderRadius: 'var(--jas-radius-full)',
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
  lineHeight: 1.4,
  border: '1px solid transparent',
};

export default function Badge({
  variant = 'navy',
  icon,
  children,
  className = '',
  style: customStyle = {},
  ...props
}) {
  const merged = {
    ...baseStyle,
    ...variantStyles[variant],
    ...customStyle,
  };

  return (
    <span className={`jas-badge ${className}`} style={merged} {...props}>
      {icon && <i className={icon} style={{ fontSize: '0.6rem' }} />}
      {children}
    </span>
  );
}
