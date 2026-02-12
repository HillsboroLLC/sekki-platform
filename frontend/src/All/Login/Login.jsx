// filepath: src/All/Login/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../shared/auth/AuthContext';
import './Login.css';

export default function Login() {
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [remember, setRemember]         = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login, user, loading }        = useAuth();
  const navigate                        = useNavigate();
  const loc                             = useLocation();

  // Respect ?next= for post-login redirect
  const params = new URLSearchParams(loc.search);
  const next = params.get('next') || '/market-iq';

  if (user) return <Navigate to={next} replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      if (remember) localStorage.setItem('rememberMe', 'true');
      navigate(next, { replace: true });
    } else {
      setErrorMessage(result.error || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      {/* Left Panel - Branding */}
      <div className="login-branding">
        <div className="branding-content">
          {/* Logo */}
          <div className="login-logo">
            <svg className="logo-icon" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" fill="#a0036c"/>
              <path d="M16 8L22 11.5V18.5L16 22L10 18.5V11.5L16 8Z" fill="white"/>
            </svg>
            <span className="logo-text">AI Agent</span>
          </div>

          {/* Headline */}
          <h1 className="branding-headline">
            Every team gets a Chief Strategy Officer.
          </h1>

          {/* Description */}
          <p className="branding-description">
            Turn raw ideas into executable business plans in minutes — without consultants,
            complex models, or months of waiting.
          </p>

          {/* Stats */}
          <div className="branding-stats">
            <div className="stat-item">
              <span className="stat-value">5 min</span>
              <span className="stat-label">TO STRATEGY</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">240%</span>
              <span className="stat-label">AVG. ROI</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">$1.3M+</span>
              <span className="stat-label">SAVED ANNUALLY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="login-form-panel">
        <div className="login-form-container">
          {/* Error message */}
          {errorMessage && <div className="login-error">{errorMessage}</div>}

          {/* Header */}
          <div className="form-header">
            <h2>Welcome back</h2>
            <p>Log in to your workspace.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="current-password"
              />
            </div>

            <div className="remember-forgot">
              <label className="remember-label">
                <input
                  type="checkbox"
                  name="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  disabled={loading}
                />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
            </div>

            <button type="submit" className="login-submit-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
              {!loading && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              )}
            </button>
          </form>

          {/* Sign up link */}
          <p className="signup-link">
            Don't have an account? <Link to="/sign-up">Request access</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
