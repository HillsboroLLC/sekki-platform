import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AuthCallback.css";

export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;

    const go = (path) => {
      if (!cancelled) navigate(path, { replace: true });
    };

    const init = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const next = params.get("next") || "/new";

        // No Supabase. Backend auth should set cookie/JWT during its callback.
        // We simply forward the user to the intended page.
        return go(next);
      } catch (e) {
        console.error("AuthCallback init error:", e);
        go("/?auth=1");
      }
    };

    init();
    return () => {
      cancelled = true;
    };
  }, [navigate, location.search]);

  return (
    <div className="auth-callback">
      <div className="auth-callback-card">
        <div className="auth-callback-spinner" />
        <h1>Signing you in…</h1>
        <p>Hang tight while we secure your session.</p>
      </div>
    </div>
  );
}