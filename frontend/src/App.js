// =====================================================
// File: src/App.js
// =====================================================
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './All/components/ProtectedRoute';
import { AppShell } from './components/layout';

// Shared
import HomePage      from './All/components/HomePage/HomePage';
import Home          from './All/pages/Home/Home';
import Profile       from './All/Profile/Profile';
import Login         from './All/Login/Login';
import SignUp        from './All/SignUp/SignUp';
import Privacy       from './All/pages/Privacy/privacy';
import Terms         from './All/pages/Terms/terms';
import Support       from './All/pages/Support/Support';

// Market
import PricingResult from './Market/PricingResult/PricingResult';
import Dashboard     from './Market/Dashboard/Dashboard';
import Sessions      from './Market/Sessions/Sessions';
import Account       from './Market/Account/Account';
import PaymentPage   from './Market/PaymentPage/PaymentPage';

// Market IQ (NEW)
import MarketIQWorkspace from './Market/MarketIQ/workspace/MarketIQWorkspace';

export default function App() {
  const getDisplayName = (node) =>
    node?.type?.displayName || node?.type?.name || 'Page';

  const toTitle = (name) =>
    String(name || 'Page')
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/_/g, ' ')
      .trim();

  const withShell = (node, options = {}) => {
    const title = options.title ?? toTitle(getDisplayName(node));
    return (
      <AppShell
        title={title}
        subtitle={options.subtitle}
        actions={options.actions}
        header={options.header}
        showHeader={options.showHeader !== false}
        fullBleed={options.fullBleed}
        noPadding={options.noPadding}
      >
        {node}
      </AppShell>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/"               element={withShell(<HomePage />, { showHeader: false, fullBleed: true, noPadding: true })} />
        <Route path="/profile"        element={withShell(<Profile />)} />
        <Route path="/login"          element={withShell(<Login />, { showHeader: false, fullBleed: true, noPadding: true })} />
        <Route path="/sign-up"        element={withShell(<SignUp />)} />
        <Route path="/pricing"        element={withShell(<PricingResult />)} />
        <Route path="/pages/privacy"  element={withShell(<Privacy />)} />
        <Route path="/pages/terms"    element={withShell(<Terms />)} />
        <Route path="/pages/support"  element={withShell(<Support />)} />
        <Route path="/pages/home"     element={withShell(<Home />)} />

        {/* Protected (Market) */}
        <Route path="/dashboard" element={<ProtectedRoute>{withShell(<Dashboard />)}</ProtectedRoute>} />
        <Route
          path="/market-iq"
          element={(
            <ProtectedRoute>
              {withShell(<MarketIQWorkspace />, { title: 'Market IQ', showHeader: false, fullBleed: true, noPadding: true })}
            </ProtectedRoute>
          )}
        />
        <Route path="/sessions"  element={<ProtectedRoute>{withShell(<Sessions />)}</ProtectedRoute>} />
        <Route path="/account"   element={<ProtectedRoute>{withShell(<Account />)}</ProtectedRoute>} />
        <Route path="/payment"   element={<ProtectedRoute>{withShell(<PaymentPage />)}</ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
