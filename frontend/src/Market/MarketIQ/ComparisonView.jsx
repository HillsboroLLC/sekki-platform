import React, { useMemo } from 'react';

const getLabel = (score) => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'At Risk';
};

export default function ComparisonView({
  baseAnalysis,
  scenarios,
  onBackToScenario,
  onBackToSummary,
  onAdopt,
}) {
  const normalized = baseAnalysis || {};
  const projectName =
    normalized.project_name ||
    normalized.title ||
    normalized.compat?.title ||
    'Market IQ Project';

  const overallScore = Number(
    normalized.market_iq_score ??
    normalized.score ??
    normalized.compat?.score ??
    0
  );
  const overallLabel = normalized.score_category || getLabel(overallScore);

  const categories = useMemo(() => {
    const comps =
      normalized.component_scores ||
      normalized.scores ||
      normalized.compat?.components ||
      {};
    const entries = [
      { key: 'financial_health', label: 'Financial Health' },
      { key: 'operational_efficiency', label: 'Operational Efficiency' },
      { key: 'market_position', label: 'Market Position' },
      { key: 'execution_readiness', label: 'Execution Readiness' },
    ];
    const rows = entries.map((entry) => ({
      name: entry.label,
      value: Number(
        comps[entry.key] ??
        comps[entry.key.replace(/_([a-z])/g, (_, c) => c.toUpperCase())] ??
        0
      ),
    }));
    return rows.filter((row) => Number.isFinite(row.value));
  }, [normalized]);

  return (
    <div style={{ padding: '20px 16px' }}>
      {(onBackToScenario || onBackToSummary) && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          {onBackToScenario && (
            <button
              onClick={onBackToScenario}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--miq-magenta)',
                cursor: 'pointer',
                fontSize: 'var(--miq-text-base)',
                fontWeight: 600,
              }}
              type="button"
            >
              Back to Scenarios
            </button>
          )}
          {onBackToSummary && (
            <button
              onClick={onBackToSummary}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--miq-gray-500)',
                cursor: 'pointer',
                fontSize: 'var(--miq-text-base)',
                fontWeight: 600,
              }}
              type="button"
            >
              Back to Score
            </button>
          )}
        </div>
      )}

      {/* Project name */}
      <div
        style={{
          fontSize: 'var(--miq-text-md)',
          fontWeight: 600,
          color: 'var(--miq-navy)',
          marginBottom: '4px',
        }}
      >
        {projectName}
      </div>

      {/* Overall score */}
      <div style={{ marginBottom: '20px' }}>
        <span
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: 'var(--miq-navy)',
          }}
        >
          {overallScore}
        </span>
        <span
          style={{
            fontSize: 'var(--miq-text-md)',
            fontWeight: 500,
            color: 'var(--miq-gray-500)',
            marginLeft: '4px',
          }}
        >
          /100
        </span>
        <span
          style={{
            fontSize: 'var(--miq-text-md)',
            fontWeight: 500,
            color: 'var(--miq-gray-500)',
            marginLeft: '8px',
          }}
        >
          &bull; {overallLabel}
        </span>
      </div>

      {/* Category bars */}
      {categories.map((cat, i) => (
        <div key={`${cat.name}-${i}`} style={{ marginBottom: '14px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 'var(--miq-text-base)',
              marginBottom: '4px',
            }}
          >
            <span style={{ color: 'var(--miq-navy)' }}>{cat.name}</span>
            <span style={{ fontWeight: 600, color: 'var(--miq-navy)' }}>{cat.value}</span>
          </div>
          <div className="miq-progress" style={{ height: '8px' }}>
            <div className="miq-progress-fill magenta" style={{ width: `${cat.value}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
