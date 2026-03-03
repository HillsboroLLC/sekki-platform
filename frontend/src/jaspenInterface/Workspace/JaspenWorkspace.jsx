// ============================================================================
// File: frontend/src/Market/MarketIQ/workspace/MarketIQWorkspace.jsx
// Purpose: Redesigned Claude-inspired UI with FULL original logic preserved.
// ============================================================================

import React, { useEffect, useRef, useState, useMemo, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PM_API_BASE } from '../../config/apiBase';
import { useChatCommands, parseUIActions, ChatActionTypes } from "../../shared/hooks/useChatCommands"
import { useToast, ToastContainer } from '../../shared/components/Toast';
import { useAuth } from 'shared/auth/AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faQuestionCircle, faHome, faCogs,
  faPaperPlane, faSpinner, faTimes, faBars, faCheck, faExclamationTriangle,
  faChartLine, faTrash, faPlus, faMinus, faMicrophone, faChevronDown, faChevronRight, faWandMagicSparkles,
  faUser, faGear, faBolt, faBrain, faLayerGroup, faRobot, faListCheck, faArrowUpRightFromSquare, faArrowRightFromBracket, faGaugeHigh, faClockRotateLeft, faPaperclip, faArrowUp
} from '@fortawesome/free-solid-svg-icons';
import {
  MonitorCheck, MessageCircleQuestion,
  Sigma, Plus as LucidePlus, BarChart3
} from 'lucide-react';

// Data / storage
import { MarketIQ, storage } from './JaspenClient';

// Tab components
import ScoreDashboard   from './ScoreDashboard';
import ScenarioModeler  from './ScenarioModeler';
import ComparisonView   from './ComparisonView';
import ThreadEditModal from '../components/ThreadEditModal';

// Styles - Redesigned source
import "./JaspenWorkspace.css";

// === Header Icon Helpers =====================================================
const PM_VARIANT  = "monitor-check";
const LSS_VARIANT = "chart-scatter";

// ============================================================================
// Readiness Normalization Helpers (Backend Contract Compliance)
// ============================================================================

function normalizeReadiness(value) {
  if (value && typeof value === 'object') {
    const percent = Math.max(0, Math.min(100, Math.round(Number(value.percent) || 0)));
    const categories = Array.isArray(value.categories) ? value.categories : [];
    const updated_at = value.updated_at || null;
    return { percent, categories, updated_at };
  }
  const pct = Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
  return { percent: pct, categories: [], updated_at: null };
}

function clampPercent(p) {
  return Math.max(0, Math.min(100, Math.round(Number(p) || 0)));
}

// ============================================================================
// Sidebar State Reducer
// ============================================================================
const sidebarReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_HISTORY':
      return { ...state, history: true, readiness: false, userDismissedReadiness: true };
    case 'OPEN_READINESS':
      return { ...state, history: false, readiness: true };
    case 'CLOSE_HISTORY':
      return { ...state, history: false };
    case 'CLOSE_READINESS':
      return { ...state, readiness: false, userDismissedReadiness: true };
    case 'CLOSE_ALL':
      return { ...state, history: false, readiness: false };
    case 'TOGGLE_HISTORY':
      return { ...state, history: !state.history, readiness: false };
    case 'TOGGLE_READINESS':
      return { ...state, history: false, readiness: !state.readiness };
    case 'NEW_SESSION':
      return { ...state, userDismissedReadiness: false };
    default:
      return state;
  }
};

function normalizeAnalysis(raw = {}) {
  const compat = raw.compat || {};
  const comps  = raw.component_scores || compat.components || {};
  const fin    = raw.financial_impact || compat.financials || {};

  const toInt = (v) => {
    const n = parseInt(Number(v), 10);
    return Number.isFinite(n) ? n : 0;
  };

  const score = toInt(raw.market_iq_score ?? raw.score ?? compat.score);
  const score_category =
    raw.score_category ||
    (score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'At Risk');

  return {
    ...raw,
    market_iq_score: score,
    score_category,
    component_scores: {
      financial_health:       toInt(comps.financial_health       ?? comps.financialHealth       ?? comps.financial   ?? comps.economics),
      operational_efficiency: toInt(comps.operational_efficiency ?? comps.operationalEfficiency ?? comps.execution   ?? comps.operations),
      market_position:        toInt(comps.market_position        ?? comps.marketPosition        ?? comps.market      ?? comps.strategy),
      execution_readiness:    toInt(comps.execution_readiness    ?? comps.executionReadiness    ?? comps.team        ?? comps.readiness),
    },
    financial_impact: {
      ebitda_at_risk:   fin.ebitda_at_risk   ?? fin.ebitdaAtRisk   ?? null,
      potential_loss:   fin.potential_loss   ?? fin.potentialLoss  ?? null,
      roi_opportunity:  fin.roi_opportunity  ?? fin.roiOpportunity ?? null,
      projected_ebitda: fin.projected_ebitda ?? fin.projectedEbitda?? null,
    },
    project_name: raw.project_name || compat.title || raw.title || 'Market IQ Project',
    risks: Array.isArray(raw.risks) ? raw.risks : (raw.top_risks || []),
    decision_framework: raw.decision_framework || raw.strategic_decision_framework || null,
    investment_analysis: raw.investment_analysis || null,
    npv_irr_analysis: raw.npv_irr_analysis || null,
    valuation: raw.valuation || null,
    before_after_financials: raw.before_after_financials || null,
  };
}

export default function MarketIQWorkspace() {
  const [view, setView] = useState('intake');
  const [activeTab, setActiveTab] = useState('summary');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userMenuRef = useRef(null);
  const { user, logout } = useAuth();
  const scenarioModelerRef = useRef(null);
  const [sidebarState, dispatchSidebar] = useReducer(sidebarReducer, {
    history: false,
    readiness: false,
    userDismissedReadiness: false
  });
  const [sessionId, setSessionId] = useState(null);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [sessionsLoading, setSessionsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [readinessAudit, setReadinessAudit] = useState(null);
  const [collectedData, setCollectedData] = useState({});
  const READINESS_CIRC = 2 * Math.PI * 52;
  const [input, setInput] = useState('');
  const [pendingFiles, setPendingFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [resultA, setResultA] = useState(null);
  const [resultB, setResultB] = useState(null);
  const [resultC, setResultC] = useState(null);
  const [readinessSpec, setReadinessSpec] = useState(null);
  const [specMap, setSpecMap] = useState({});
  const [readinessSource, setReadinessSource] = useState(null);
  const [readinessVersion, setReadinessVersion] = useState(null);
  const [scoreVariants, setScoreVariants] = useState([]);
  const [selectedVariantId, setSelectedVariantId] = useState('baseline');
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [savedScenarios, setSavedScenarios] = useState([]);
  const [helpOpen, setHelpOpen] = useState(false);
  const [helpMessages, setHelpMessages] = useState([]);
  const [helpInput, setHelpInput] = useState('');
  const [helpLoading, setHelpLoading] = useState(false);
  const [scenarioOptions, setScenarioOptions] = useState([]);
  const [activeScenarioId, setActiveScenarioId] = useState('baseline');
  const [scenarioDrawerView, setScenarioDrawerView] = useState('assistant');
  const [scenarioLevers, setScenarioLevers] = useState([]);
  const [threadEditOpen, setThreadEditOpen] = useState(false);
  const [bundleCurrentScorecard, setBundleCurrentScorecard] = useState(null);
  const [bundleBaselineScorecard, setBundleBaselineScorecard] = useState(null);
  const [scorecardSnapshots, setScorecardSnapshots] = useState([]);
  const [selectedScorecardId, setSelectedScorecardId] = useState(null);
  const [baselineScorecardId, setBaselineScorecardId] = useState(null);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(true);
  const [aiInput, setAiInput] = useState('');
  const { toasts, showToast, dismissToast } = useToast();
  const [previousSessionState, setPreviousSessionState] = useState(null);
  const suggestionsPool = useMemo(() => ([
    "Launch a B2B SaaS analytics platform in NA/EU with a $2M budget within 12 months",
    "Expand manufacturing by 40% over 18 months targeting 20% EBITDA improvement",
    "Go-to-market for an AI customer support tool; budget $750k; target SMBs",
    "Open 3 new retail locations in Texas in 9 months with a $1.2M budget",
    "Enterprise security product targeting healthcare; target ARR $5M in 18 months",
    "Premium coffee subscription for urban professionals; $150k budget; $50/mo price"
  ]), []);
  const [dynamicPrompts, setDynamicPrompts] = useState([]);

  // --- Core Effects ---
  useEffect(() => {
    const apiBase = process.env.REACT_APP_API_BASE || 'https://api.sekki.io';
    let abort = false;
    (async () => {
      try {
        const res = await fetch(`${apiBase}/api/ai-agent/readiness/spec`, { credentials: 'include' });
        if (!res.ok) return;
        const json = await res.json();
        if (abort) return;
        setReadinessSpec(json || null);
        setReadinessVersion(json?.version || null);
        const map = {};
        for (const c of (json?.categories || [])) {
          map[c.key] = { label: c.label || c.key, weight: c.weight ?? null };
        }
        setSpecMap(map);
      } catch (e) { console.error('[fetchReadinessSpec] failed', e); }
    })();
    return () => { abort = true; };
  }, []);

  useEffect(() => {
    const picks = [...suggestionsPool].sort(() => 0.5 - Math.random()).slice(0, 3);
    setDynamicPrompts(picks);
    fetchSessions();
  }, [suggestionsPool]);

  useEffect(() => {
    const opts = [
      analysisResult ? { id: 'baseline',  label: 'Baseline',   result: analysisResult } : null,
      resultA        ? { id: 'scenarioA', label: 'Scenario A', result: resultA }        : null,
      resultB        ? { id: 'scenarioB', label: 'Scenario B', result: resultB }        : null,
      resultC        ? { id: 'scenarioC', label: 'Scenario C', result: resultC }        : null,
    ].filter(Boolean);
    setScoreVariants(opts);
    const stillExists = opts.some(o => o.id === selectedVariantId);
    if (!stillExists) setSelectedVariantId('baseline');
  }, [analysisResult, resultA, resultB, resultC]);

  const selectedVariant = useMemo(() => {
    return (scoreVariants.find(v => v.id === selectedVariantId)?.result || analysisResult);
  }, [scoreVariants, selectedVariantId, analysisResult]);

  // --- Handlers ---
  const chatWithReadiness = async (message, forcedSid) => {
    const sid = (() => {
      if (forcedSid && typeof forcedSid === 'string') {
        const m = document.cookie.match(/(?:^|;\s*)sekki_sid=([^;]+)/);
        const cookieSid = m ? decodeURIComponent(m[1]) : null;
        if (cookieSid !== forcedSid) {
          document.cookie = `sekki_sid=${encodeURIComponent(forcedSid)}; Max-Age=${30*24*3600}; Path=/; Secure; SameSite=None`;
        }
        return forcedSid;
      }
      const m = document.cookie.match(/(?:^|;\s*)sekki_sid=([^;]+)/);
      if (m) return decodeURIComponent(m[1]);
      const v = `web_${Math.random().toString(36).slice(2)}`;
      document.cookie = `sekki_sid=${v}; Max-Age=${30*24*3600}; Path=/; Secure; SameSite=None`;
      return v;
    })();

    const resp = await fetch(`${process.env.REACT_APP_API_BASE || 'https://api.sekki.io'}/api/ai-agent/conversation/continue`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Session-ID': sid },
      credentials: 'include',
      body: JSON.stringify({
        message,
        ui_mode: 'interactive',
        ui_context: {
          screen: activeTab,
          view,
          session_id: sid,
          selected_scorecard_id: selectedScorecardId || null,
          baseline_scorecard_id: baselineScorecardId || null,
        }
      })
    });
    const json = await resp.json();
    return {
      text: json.reply || "",
      readiness: json.readiness || null,
      sessionId: json.session_id || sid,
      actions: json.actions || json.ui_actions || json.uiActions || []
    };
  };

  const fetchSessions = async () => {
    try {
      const localSessions = storage.getHistory();
      const token = localStorage.getItem('access_token') || localStorage.getItem('token');
      const headers = { };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch('https://api.sekki.io/api/ai-agent/threads', {
        method: 'GET',
        headers,
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.sessions) {
          const apiSessions = data.sessions.map((session) => {
            const full = (session && typeof session.result === 'object') ? session.result : {};
            return {
              id: session.session_id,
              createdAt: new Date(session.timestamp || session.created).getTime(),
              result: {
                ...full,
                analysis_id: full.analysis_id ?? session.session_id,
                project_name: full.project_name ?? session.name ?? 'Market IQ Analysis',
                market_iq_score: full.market_iq_score ?? session.score,
                status: full.status ?? session.status,
                chat_history: full.chat_history ?? session.chat_history,
                readiness: normalizeReadiness(full.readiness ?? session.readiness),
                collected_data: full.collected_data ?? session.collected_data,
              },
            };
          });
          setAnalysisHistory([...apiSessions, ...localSessions]);
        }
      }
      setSessionsLoading(false);
    } catch (e) { console.error('[fetchSessions] failed', e); setSessionsLoading(false); }
  };

  const refreshBundle = async (tid) => {
    try {
      const bundle = await MarketIQ.getThreadBundle(tid);
      if (bundle) {
        setBundleCurrentScorecard(bundle.current_scorecard || null);
        setBundleBaselineScorecard(bundle.baseline_scorecard || null);
        setScorecardSnapshots(bundle.snapshots || []);
        setSelectedScorecardId(bundle.selected_scorecard_id || null);
        setBaselineScorecardId(bundle.baseline_scorecard_id || null);
      }
    } catch (e) { console.error('[refreshBundle] failed', e); }
  };

  async function onFinishAnalyze() {
    if (!sessionId || busy) return;
    setBusy(true);
    setError(null);
    try {
      const transcript = messages.map(m => `${m.role === 'user' ? 'User' : 'AI'}: ${m.text}`).join('\n');
      const sid = currentSessionId || sessionId;
      const seed = Number(String(sid).replace(/\D/g, '')) % 2147483647 || 123456;
      const data = await MarketIQ.analyzeFromConversation({ session_id: sid, transcript, deterministic: true, seed });
      const raw = (data && data.analysis) ? data.analysis : (data && data.analysis_result) ? data.analysis_result : (data || {});
      const result = normalizeAnalysis({
        ...raw,
        market_iq_score: raw.overall_score || raw.market_iq_score || 0,
        component_scores: raw.scores || raw.component_scores || {},
        project_name: raw.name || raw.project_name || 'Market IQ Project',
      });
      setAnalysisResult(result);
      setView('summary');
      setActiveTab('summary');
      await refreshBundle(sid);
      showToast('Analysis complete', 'success');
    } catch (err) {
      console.error('[Finish&Analyze] failed', err);
      setError('Analysis failed. Please try again.');
    } finally { setBusy(false); }
  }

  // --- Redesigned Shell Render ---
  const renderWorkspaceShell = () => {
    const isWelcome = view === 'intake' && messages.length === 0;
    const shellOpen = sidebarState.history || sidebarState.readiness;
    
    const uiReadiness = normalizeReadiness(readinessAudit || collectedData?.readiness).percent;
    const canAnalyze = uiReadiness >= 80;

    return (
      <div className={`jaspen-workspace ${shellOpen ? 'drawer-open' : ''}`}>
        <header className="jaspen-topbar">
          <div className="jaspen-topbar-left">
            <h1 className="jaspen-logo" onClick={() => window.location.reload()}>Jaspen</h1>
            {!isWelcome && (
              <nav className="jaspen-tabs">
                <button className={`jaspen-tab ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => {setActiveTab('chat'); setView('intake');}}>Refine</button>
                <button className={`jaspen-tab ${activeTab === 'summary' ? 'active' : ''}`} onClick={() => {setActiveTab('summary'); setView('summary');}}>Score</button>
                <button className={`jaspen-tab ${activeTab === 'scenario' ? 'active' : ''}`} onClick={() => {setActiveTab('scenario'); setView('scenario');}}>Scenarios</button>
                <button className={`jaspen-tab ${activeTab === 'comparison' ? 'active' : ''}`} onClick={() => {setActiveTab('comparison'); setView('comparison');}}>Compare</button>
              </nav>
            )}
          </div>
          <div className="jaspen-topbar-right">
            <div className="jaspen-user-menu-wrapper" ref={userMenuRef}>
              <button className="jaspen-user-avatar" onClick={() => setUserDropdownOpen(!userDropdownOpen)}>
                {user?.name?.charAt(0) || 'U'}
              </button>
              {userDropdownOpen && (
                <div className="jaspen-user-dropdown">
                  <div className="jaspen-dropdown-item"><FontAwesomeIcon icon={faUser} /><span>Profile</span></div>
                  <div className="jaspen-dropdown-item" onClick={logout}><FontAwesomeIcon icon={faArrowRightFromBracket} /><span>Logout</span></div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="jaspen-main">
          <ToastContainer toasts={toasts} onDismiss={dismissToast} />
          
          <div className="jaspen-content-container">
            {isWelcome ? (
              <div className="jaspen-welcome">
                <div className="jaspen-hero">
                  <h2 className="jaspen-hero-title">What would you like to work on?</h2>
                  <p className="jaspen-hero-subtitle">Describe your project or business idea and I'll help you build a complete strategy scorecard.</p>
                </div>
                
                <div className="jaspen-composer-card">
                  <div className="jaspen-composer-input-wrapper">
                    <button className="jaspen-composer-icon-btn"><FontAwesomeIcon icon={faPlus} /></button>
                    <textarea 
                      className="jaspen-composer-input" 
                      placeholder="Describe your project or goal..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {if(e.key === 'Enter' && !e.shiftKey){e.preventDefault(); chatWithReadiness(input).then(r => {setMessages([{role:'user', text:input}, {role:'ai', text:r.text}]); setSessionId(r.sessionId); setInput('');});}}}
                    />
                    <div className="jaspen-composer-actions">
                      <button className={`jaspen-composer-voice-btn ${isRecording ? 'recording' : ''}`} onClick={() => setIsRecording(!isRecording)}><FontAwesomeIcon icon={faMicrophone} /></button>
                      <button className="jaspen-composer-send-btn" onClick={() => chatWithReadiness(input).then(r => {setMessages([{role:'user', text:input}, {role:'ai', text:r.text}]); setSessionId(r.sessionId); setInput('');})}><FontAwesomeIcon icon={faArrowUp} /></button>
                    </div>
                  </div>
                </div>

                <div className="jaspen-quick-actions">
                  {dynamicPrompts.map((p, i) => (
                    <button key={i} className="jaspen-action-chip" onClick={() => setInput(p)}>{p}</button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="jaspen-tab-content">
                {activeTab === 'chat' && (
                  <div className="jaspen-chat-view">
                    <div className="jaspen-messages">
                      {messages.map((m, i) => (
                        <div key={i} className={`jaspen-message jaspen-message-${m.role}`}>
                          <div className="jaspen-message-content">{m.text}</div>
                        </div>
                      ))}
                    </div>
                    <div className="jaspen-chat-footer">
                       <div className="jaspen-readiness-mini">
                          <div className="jaspen-readiness-bar"><div className="fill" style={{width: `${uiReadiness}%`}}></div></div>
                          <span>{uiReadiness}% ready</span>
                       </div>
                       <button className="jaspen-analyze-btn" disabled={!canAnalyze || busy} onClick={onFinishAnalyze}>
                          {busy ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faCheck} />}
                          <span>Finish & Analyze</span>
                       </button>
                    </div>
                  </div>
                )}
                {activeTab === 'summary' && <ScoreDashboard analysis={selectedVariant} />}
                {activeTab === 'scenario' && <ScenarioModeler ref={scenarioModelerRef} sessionId={sessionId} />}
                {activeTab === 'comparison' && <ComparisonView snapshots={scorecardSnapshots} />}
              </div>
            )}
          </div>
        </main>
      </div>
    );
  };

  return renderWorkspaceShell();
}
