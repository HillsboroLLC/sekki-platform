import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../shared/auth/AuthContext';
import { API_BASE } from '../../../config/apiBase';
import './Dashboard.css';

const STATUS_LABELS = {
  completed: 'Completed',
  archived: 'Archived',
  in_progress: 'Active',
  active: 'Active',
};

function getToken() {
  return localStorage.getItem('access_token') || localStorage.getItem('token') || '';
}

function formatRelative(isoValue) {
  if (!isoValue) return 'Unknown';
  const value = new Date(isoValue);
  if (Number.isNaN(value.getTime())) return 'Unknown';
  const diffMs = Date.now() - value.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 30) return `${diffDay}d ago`;
  return value.toLocaleDateString();
}

function formatScore(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return '—';
  return `${Math.round(num)}`;
}

function scoreTone(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return 'muted';
  if (num >= 80) return 'excellent';
  if (num >= 60) return 'good';
  if (num >= 40) return 'fair';
  return 'risk';
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const fetchDashboard = useCallback(async ({ silent = false } = {}) => {
    if (silent) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError('');

    try {
      const token = getToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await fetch(`${API_BASE}/api/dashboard`, {
        method: 'GET',
        credentials: 'include',
        headers,
      });
      const payload = await response.json().catch(() => ({}));

      if (response.status === 401) {
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error(payload?.error || payload?.msg || 'Unable to load dashboard.');
      }

      setData(payload || null);
    } catch (err) {
      setError(err?.message || 'Unable to load dashboard.');
      setData(null);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const organization = data?.organization || {};
  const membership = data?.membership || {};
  const metrics = data?.metrics || {};
  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const activity = Array.isArray(data?.activity) ? data.activity : [];

  const scopeLabel = useMemo(() => {
    const scope = String(data?.scope || '').toLowerCase();
    if (scope === 'organization') return 'Organization view';
    if (scope === 'creator') return 'Creator view';
    return 'Dashboard view';
  }, [data?.scope]);

  if (loading) {
    return (
      <div className="dash-page">
        <div className="dash-card dash-loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="dash-page">
      <section className="dash-hero dash-card">
        <div>
          <p className="dash-eyebrow">Team Workspace</p>
          <h1>{organization?.name || 'Dashboard'}</h1>
          <p className="dash-subtitle">
            {scopeLabel} for {String(organization?.plan_key || user?.active_organization_plan_key || '').toUpperCase() || 'TEAM'}
            {' · '}
            Role: {String(membership?.role || 'member').replace('_', ' ')}
          </p>
        </div>
        <button
          type="button"
          className="dash-refresh"
          onClick={() => fetchDashboard({ silent: true })}
          disabled={refreshing}
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </section>

      {error && (
        <section className="dash-card dash-error">
          <strong>Dashboard unavailable.</strong>
          <span>{error}</span>
          <button type="button" onClick={() => navigate('/new')}>Go to Workspace</button>
        </section>
      )}

      {!error && (
        <>
          <section className="dash-metrics">
            <article className="dash-card">
              <h3>Projects</h3>
              <p>{metrics.projects_total ?? 0}</p>
              <small>{metrics.projects_active ?? 0} active</small>
            </article>
            <article className="dash-card">
              <h3>Completed</h3>
              <p>{metrics.projects_completed ?? 0}</p>
              <small>{metrics.projects_archived ?? 0} archived</small>
            </article>
            <article className="dash-card">
              <h3>Average Score</h3>
              <p>{metrics.avg_score == null ? '—' : `${metrics.avg_score}`}</p>
              <small>{metrics.scored_projects ?? 0} scored projects</small>
            </article>
            <article className="dash-card">
              <h3>Team Members</h3>
              <p>{metrics.team_members ?? 0}</p>
              <small>{metrics.collaborator_viewer_activity ?? 0} collaborator/viewer actions</small>
            </article>
          </section>

          <section className="dash-grid">
            <article className="dash-card dash-table-wrap">
              <div className="dash-section-header">
                <h2>Project Snapshot</h2>
                <span>{projects.length} shown</span>
              </div>
              {projects.length === 0 ? (
                <p className="dash-empty">No projects available yet.</p>
              ) : (
                <div className="dash-table-scroll">
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th>Project</th>
                        <th>Status</th>
                        <th>Score</th>
                        <th>Owner</th>
                        <th>Updated</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => {
                        const status = String(project.status || 'in_progress').toLowerCase();
                        const scoreClass = `dash-score dash-score-${scoreTone(project.jaspen_score)}`;
                        return (
                          <tr key={project.thread_id}>
                            <td>{project.project_name || 'Untitled project'}</td>
                            <td>
                              <span className={`dash-pill dash-pill-${status}`}>{STATUS_LABELS[status] || 'Active'}</span>
                            </td>
                            <td>
                              <span className={scoreClass}>{formatScore(project.jaspen_score)}</span>
                            </td>
                            <td>{project.owner_name || 'Unknown'}</td>
                            <td>{formatRelative(project.updated_at)}</td>
                            <td>
                              <button
                                type="button"
                                className="dash-link"
                                onClick={() => navigate(`/new?session_id=${encodeURIComponent(project.thread_id)}`)}
                              >
                                Open
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </article>

            <article className="dash-card dash-activity-wrap">
              <div className="dash-section-header">
                <h2>Recent Activity</h2>
                <span>{activity.length} events</span>
              </div>
              {activity.length === 0 ? (
                <p className="dash-empty">No activity yet.</p>
              ) : (
                <ul className="dash-activity-list">
                  {activity.map((event, index) => (
                    <li key={`${event.project_id || 'project'}-${event.timestamp || index}-${index}`}>
                      <div>
                        <strong>{event.actor_name || 'Someone'}</strong>
                        <span>{event.action || 'updated a project'}</span>
                        {event.project_name ? <em>{event.project_name}</em> : null}
                      </div>
                      <time>{formatRelative(event.timestamp)}</time>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </section>
        </>
      )}
    </div>
  );
}
