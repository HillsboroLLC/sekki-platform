import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../shared/supabase/supabaseClient";
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
        if (!supabase) return go("/?auth=1");

        const params = new URLSearchParams(location.search);
        const next = params.get("next") || "/market-iq";
        const code = params.get("code");

        // PKCE flow: exchange ?code= for a session
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            console.error("exchangeCodeForSession error:", error);
            return go("/?auth=1");
          }
        }

        // Confirm we have a session
        const { data } = await supabase.auth.getSession();
        if (data?.session) return go(next);

        return go("/?auth=1");
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
