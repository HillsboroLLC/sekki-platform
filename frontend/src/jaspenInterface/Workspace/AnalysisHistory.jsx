// src/pages/Jaspen/AnalysisHistory.jsx
import React from 'react';
import { storage } from './JaspenClient';

const getScoreLabel = (score) => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'At Risk';
};

function ScoreCircleSmall({ score }) {
  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: '50%',
        border: '3px solid var(--jas-navy)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 'var(--jas-text-base)', fontWeight: 700, color: 'var(--jas-navy)' }}>
        {score}
      </span>
    </div>
  );
}

const AnalysisHistory = ({ onClose, onSelectAnalysis, onDelete, fullPage = false }) => {
  const items = storage.getHistory().map((entry) => {
    const score = Number(entry?.result?.jaspen_score ?? entry?.result?.score ?? 0);
    return {
      id: entry.id,
      name: entry?.result?.project_name || entry?.result?.title || `Analysis ${entry.id}`,
      score,
      label: entry?.result?.score_category || getScoreLabel(score),
      date: entry?.createdAt ? new Date(entry.createdAt).toLocaleDateString() : '',
      version: entry?.result?.version || entry?.result?.scorecard_version || '',
      raw: entry,
    };
  });

  const containerStyle = fullPage ? { padding: '0' } : { padding: '8px 0' };

  return (
    <div style={containerStyle}>
      {onClose && (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px 8px' }}>
          <h3 style={{ margin: 0, fontSize: 'var(--jas-text-md)', color: 'var(--jas-navy)' }}>
            Analysis History
          </h3>
          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: 'none',
              color: 'var(--jas-gray-500)',
              cursor: 'pointer',
              fontSize: 'var(--jas-text-base)',
            }}
            type="button"
          >
            Close
          </button>
        </div>
      )}

      {items.length === 0 && (
        <div
          style={{
            padding: '40px 16px',
            textAlign: 'center',
            color: 'var(--jas-gray-500)',
            fontSize: 'var(--jas-text-base)',
          }}
        >
          <i
            className="fa-solid fa-clock-rotate-left"
            style={{ fontSize: '1.5rem', marginBottom: '8px', display: 'block' }}
          />
          No analyses yet. Start a conversation to create your first scorecard.
        </div>
      )}

      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelectAnalysis?.(item.raw?.result || item.raw)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            cursor: 'pointer',
            borderBottom: '1px solid var(--jas-border)',
            transition: 'background var(--jas-transition)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--jas-gray-50)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <ScoreCircleSmall score={item.score} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 'var(--jas-text-base)',
                fontWeight: 600,
                color: 'var(--jas-navy)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item.name}
            </div>
            <div style={{ fontSize: 'var(--jas-text-sm)', color: 'var(--jas-gray-500)' }}>
              {item.date}
              {item.version && (
                <span style={{ marginLeft: '8px', color: 'var(--jas-gray-400)' }}>
                  {item.version}
                </span>
              )}
            </div>
          </div>
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(item.id);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--jas-gray-400)',
                cursor: 'pointer',
                fontSize: 'var(--jas-text-base)',
                padding: '4px',
                flexShrink: 0,
              }}
              type="button"
            >
              <i className="fa-solid fa-trash" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AnalysisHistory;
