import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowTrendUp,
  faBug,
  faCircleExclamation,
  faCloudArrowUp,
  faLightbulb,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { Jaspen } from '../Workspace/JaspenClient';
import './Insights.css';

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString();
}

function safeList(value) {
  return Array.isArray(value) ? value : [];
}

export default function Insights() {
  const fileInputRef = useRef(null);
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [question, setQuestion] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [activeDatasetId, setActiveDatasetId] = useState('');

  const loadDatasets = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await Jaspen.listInsightsDatasets();
      setDatasets(safeList(res?.datasets));
    } catch (err) {
      setError(err?.message || 'Failed to load datasets');
      setDatasets([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDatasets();
  }, [loadDatasets]);

  const activeDataset = useMemo(
    () => datasets.find((row) => String(row?.id || '') === String(activeDatasetId || '')) || null,
    [datasets, activeDatasetId]
  );

  const onUpload = useCallback(async (file) => {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const res = await Jaspen.uploadInsightsDataset(file);
      await loadDatasets();
      if (res?.dataset_id) setActiveDatasetId(String(res.dataset_id));
    } catch (err) {
      setError(err?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  }, [loadDatasets]);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file) onUpload(file);
  }, [onUpload]);

  const onAnalyze = useCallback(async (datasetId) => {
    const id = String(datasetId || '').trim();
    if (!id) return;
    setAnalyzing(true);
    setError('');
    setActiveDatasetId(id);
    try {
      const res = await Jaspen.analyzeInsightsDataset({ dataset_id: id, question });
      setAnalysis(res || null);
    } catch (err) {
      setError(err?.message || 'Analysis failed');
      setAnalysis(null);
    } finally {
      setAnalyzing(false);
    }
  }, [question]);

  return (
    <div className="insights-page">
      <header className="insights-header">
        <h1>Insights</h1>
        <p>Upload company datasets, run AI analysis, and review trends, anomalies, opportunities, and risks.</p>
      </header>

      <section className="insights-panel">
        <h2>Upload Data</h2>
        <div
          className={`insights-dropzone ${uploading ? 'busy' : ''}`}
          onDragOver={(event) => event.preventDefault()}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              fileInputRef.current?.click();
            }
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            hidden
            onChange={(event) => onUpload(event.target.files?.[0])}
          />
          <FontAwesomeIcon icon={uploading ? faSpinner : faCloudArrowUp} spin={uploading} />
          <div>
            {uploading ? 'Uploading dataset…' : 'Drag and drop CSV/Excel, or click to upload'}
          </div>
          <small>Max 10MB</small>
        </div>
      </section>

      <section className="insights-panel">
        <div className="insights-row-head">
          <h2>Datasets</h2>
          {loading && <span className="insights-muted">Refreshing…</span>}
        </div>
        <div className="insights-table-wrap">
          <table className="insights-table">
            <thead>
              <tr>
                <th>Filename</th>
                <th>Rows</th>
                <th>Columns</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {datasets.length === 0 ? (
                <tr>
                  <td colSpan={5} className="insights-empty">No datasets yet.</td>
                </tr>
              ) : datasets.map((row) => (
                <tr key={row.id} className={String(activeDatasetId) === String(row.id) ? 'active' : ''}>
                  <td>{row.filename || 'dataset'}</td>
                  <td>{row.row_count ?? '—'}</td>
                  <td>{safeList(row.column_names).join(', ') || '—'}</td>
                  <td>{formatDate(row.created_at)}</td>
                  <td>
                    <button
                      type="button"
                      className="insights-btn"
                      onClick={() => onAnalyze(row.id)}
                      disabled={analyzing}
                    >
                      {analyzing && String(activeDatasetId) === String(row.id) ? 'Analyzing…' : 'Analyze'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="insights-panel">
        <div className="insights-row-head">
          <h2>Analysis Results</h2>
          {activeDataset && <span className="insights-muted">Dataset: {activeDataset.filename}</span>}
        </div>

        <div className="insights-question-row">
          <input
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Optional focus question (for example: Which KPI trends signal execution risk?)"
          />
          <button
            type="button"
            className="insights-btn primary"
            onClick={() => onAnalyze(activeDatasetId)}
            disabled={!activeDatasetId || analyzing}
          >
            {analyzing ? 'Analyzing…' : 'Analyze'}
          </button>
        </div>

        {error && <div className="insights-error">{error}</div>}

        {!analysis ? (
          <div className="insights-empty">
            Select a dataset and click Analyze to generate AI insights.
          </div>
        ) : (
          <div className="insights-results">
            <article className="insights-card full">
              <h3>Summary</h3>
              <p>{analysis.summary || 'No summary available.'}</p>
            </article>
            <article className="insights-card">
              <h3><FontAwesomeIcon icon={faArrowTrendUp} /> Trends</h3>
              <ul>{safeList(analysis.trends).map((item, idx) => <li key={`trend_${idx}`}>{item}</li>)}</ul>
            </article>
            <article className="insights-card">
              <h3><FontAwesomeIcon icon={faBug} /> Anomalies</h3>
              <ul>{safeList(analysis.anomalies).map((item, idx) => <li key={`anomaly_${idx}`}>{item}</li>)}</ul>
            </article>
            <article className="insights-card">
              <h3><FontAwesomeIcon icon={faLightbulb} /> Opportunities</h3>
              <ul>{safeList(analysis.opportunities).map((item, idx) => <li key={`opp_${idx}`}>{item}</li>)}</ul>
            </article>
            <article className="insights-card">
              <h3><FontAwesomeIcon icon={faCircleExclamation} /> Risks</h3>
              <ul>{safeList(analysis.risks).map((item, idx) => <li key={`risk_${idx}`}>{item}</li>)}</ul>
            </article>
          </div>
        )}
      </section>
    </div>
  );
}
