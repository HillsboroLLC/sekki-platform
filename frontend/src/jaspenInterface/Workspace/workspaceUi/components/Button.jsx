/**
 * Button.jsx — Presentational button component
 *
 * Variants: primary (navy), secondary (magenta), outline, ghost
 * Sizes: sm, md (default), lg
 *
 * Usage:
 *   <Button variant="primary" size="lg" icon="fa-solid fa-arrow-right">
 *     Request Demo
 *   </Button>
 */
import React from 'react';

const variantStyles = {
  primary: {
    background: 'var(--jas-navy)',
    color: 'var(--jas-white)',
    border: '1px solid var(--jas-navy)',
  },
  secondary: {
    background: 'var(--jas-magenta)',
    color: 'var(--jas-white)',
    border: '1px solid var(--jas-magenta)',
  },
  outline: {
    background: 'transparent',
    color: 'var(--jas-navy)',
    border: '1px solid var(--jas-gray-300)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--jas-text-secondary)',
    border: '1px solid transparent',
  },
};

const sizeStyles = {
  sm: { padding: '6px 16px', fontSize: 'var(--jas-text-base)' },
  md: { padding: '10px 24px', fontSize: 'var(--jas-text-md)' },
  lg: { padding: '14px 32px', fontSize: 'var(--jas-text-lg)' },
};

const baseStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  fontWeight: 500,
  fontFamily: 'var(--jas-font)',
  borderRadius: 'var(--jas-radius-sm)',
  cursor: 'pointer',
  transition: 'all var(--jas-transition)',
  textDecoration: 'none',
  lineHeight: 1.4,
};

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  children,
  className = '',
  style = {},
  ...props
}) {
  const merged = {
    ...baseStyle,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...style,
  };

  const iconEl = icon ? (
    <i className={icon} style={{ fontSize: '0.8rem' }} />
  ) : null;

  return (
    <button className={`jas-btn ${className}`} style={merged} {...props}>
      {iconPosition === 'left' && iconEl}
      {children}
      {iconPosition === 'right' && iconEl}
    </button>
  );
}
