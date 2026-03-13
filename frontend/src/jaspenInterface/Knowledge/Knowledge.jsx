import React, { useEffect, useMemo, useState } from 'react';
import './Knowledge.css';

const TOPICS = {
  gettingStarted: {
    short: 'GS',
    label: 'Getting Started',
    title: 'Getting Started',
    summary: 'End-to-end workflow from project kickoff to execution sync.',
    sections: [
      {
        heading: 'Recommended Flow',
        body: [
          'Use this sequence for consistent outcomes and faster team alignment.',
        ],
        steps: [
          'Start a project in New Project.',
          'Complete discovery with the AI intake conversation.',
          'Review the scorecard and key risks.',
          'Model scenarios and adopt the best option.',
          'Generate WBS and adjust owners, timelines, and dependencies.',
          'Sync to your PM system from Connectors.',
        ],
      },
      {
        heading: 'Output Surfaces',
        body: [
          'Use Scores for historical results, Projects for portfolio tracking, Activity for timeline events, and Reports for exported executive outputs.',
        ],
      },
    ],
    links: [
      { label: 'New Project', href: '/new' },
      { label: 'Projects', href: '/projects' },
      { label: 'Scores', href: '/scores' },
      { label: 'Connectors', href: '/connectors-manage' },
    ],
  },
  agent: {
    short: 'AG',
    label: 'The Agent',
    title: 'The Agent',
    summary: 'Execution-focused decision intelligence from intake through operational handoff.',
    sections: [
      {
        heading: 'What It Does',
        body: [
          'Jaspen transforms goals, constraints, and operational context into scoreable recommendations and execution-ready plans.',
        ],
      },
      {
        heading: 'Why It Matters',
        body: [
          'The platform reduces strategy-to-execution drift by making assumptions explicit and outputs auditable.',
        ],
      },
    ],
    links: [{ label: 'Workspace', href: '/new' }],
  },
  components: {
    short: 'CP',
    label: 'Agent Components',
    title: 'Agent Components',
    summary: 'Composable services for intake, scoring, scenarios, execution planning, and integrations.',
    sections: [
      {
        heading: 'Core Layers',
        body: [
          'Intake captures context, scoring quantifies readiness, scenarios model tradeoffs, WBS planning operationalizes execution, and connectors sync external systems.',
        ],
      },
      {
        heading: 'Why This Structure',
        body: [
          'Each layer can be inspected and tuned independently, which improves reliability and governance.',
        ],
      },
    ],
    links: [{ label: 'Workspace', href: '/new' }],
  },
  scoresHistory: {
    short: 'SC',
    label: 'Scores History',
    title: 'Scores History',
    summary: 'Completed scorecards across projects with filtering, sorting, trend visibility, and export.',
    sections: [
      {
        heading: 'What You Get',
        body: [
          'The Scores page lists completed analyses with project name, Jaspen score, category, adopted scenario, component score breakdown, and date.',
        ],
      },
      {
        heading: 'How To Use',
        body: [
          'Sort by name, score, category, or date. Filter by category/date/search. Export CSV for offline review.',
        ],
      },
    ],
    links: [{ label: 'Open Scores', href: '/scores' }],
  },
  aiScenarios: {
    short: 'AS',
    label: 'AI Scenarios',
    title: 'AI Scenario Suggestions',
    summary: 'Generate lever adjustments from natural language, then accept, modify, or reject.',
    sections: [
      {
        heading: 'Prompt Examples',
        body: [
          'Try prompts like "Increase budget by 20%" or "Accelerate timeline by one quarter". The agent returns rationale and lever-by-lever changes.',
        ],
      },
      {
        heading: 'Control Model',
        body: [
          'You always decide final adoption. AI suggestions can be accepted directly or edited in the manual scenario modeler.',
        ],
      },
    ],
    links: [{ label: 'Open Workspace', href: '/new' }],
  },
  aiWbsGeneration: {
    short: 'WB',
    label: 'AI WBS Generation',
    title: 'AI WBS Generation',
    summary: 'Generate an initial project plan from scorecard risks and adopted scenario context.',
    sections: [
      {
        heading: 'What Is Generated',
        body: [
          'The generated WBS includes phases, tasks, priorities, suggested roles, dependencies, and risk mapping.',
        ],
      },
      {
        heading: 'Post-Generation Editing',
        body: [
          'All generated tasks remain editable. Teams can refine task titles, owners, durations, and dependencies before syncing.',
        ],
      },
    ],
    links: [{ label: 'Open Workspace', href: '/new' }],
  },
  dataInsights: {
    short: 'DI',
    label: 'Data Insights',
    title: 'Data Insights',
    summary: 'Upload CSV/Excel datasets and run AI-assisted trend, anomaly, risk, and opportunity analysis.',
    sections: [
      {
        heading: 'Workflow',
        body: [
          'Upload a dataset, select Analyze, and review structured insight cards and chart recommendations.',
        ],
      },
      {
        heading: 'Best Practices',
        body: [
          'Use clean headers and stable metric definitions. Ask targeted questions when you need focused analysis.',
        ],
      },
    ],
    links: [{ label: 'Open Insights', href: '/insights' }],
  },
  teamManagement: {
    short: 'TM',
    label: 'Team Management',
    title: 'Team Management',
    summary: 'Manage organizations, members, invitations, roles, and seat policy by plan.',
    sections: [
      {
        heading: 'Role Model',
        body: [
          'Roles are owner, admin, creator, collaborator, and viewer. Owner is unique per org and has full admin privileges.',
        ],
      },
      {
        heading: 'Seat Defaults',
        body: [
          'Team: admin 2, creator 5, collaborator 10, viewer unlimited. Enterprise: admin 5, creator 25, collaborator unlimited, viewer unlimited.',
        ],
      },
    ],
    links: [{ label: 'Open Team', href: '/team' }],
  },
  savedStarters: {
    short: 'ST',
    label: 'Saved Starters',
    title: 'Saved Starters',
    summary: 'Save reusable intake and scoring configurations from completed analyses.',
    sections: [
      {
        heading: 'What Is Saved',
        body: [
          'Starters can preserve objective, intake context, lever defaults, and scoring preferences for repeatable launches.',
        ],
      },
      {
        heading: 'How Teams Use It',
        body: [
          'Create starters from strong analyses, share with your organization, and begin future projects from those baselines.',
        ],
      },
    ],
    links: [{ label: 'Open Workspace', href: '/new' }],
  },
  connectorSetup: {
    short: 'CS',
    label: 'Connector Setup',
    title: 'Connector Setup',
    summary: 'Unified setup pattern for execution and data connectors with explicit save behavior.',
    sections: [
      {
        heading: 'Setup Pattern',
        body: [
          'Select connector, enter required credentials/settings, choose sync mode and conflict policy, then Save.',
        ],
      },
      {
        heading: 'Operational Controls',
        body: [
          'Use Test Connection for credential validation and Sync Now for on-demand runs. Health and audit history are available per connector.',
        ],
      },
    ],
    links: [{ label: 'Open Connectors', href: '/connectors-manage' }],
  },
  jira: {
    short: 'JR',
    label: 'Jira',
    title: 'Jira Connector (Execution)',
    summary: 'Bidirectional issue and sprint alignment for execution planning.',
    sections: [
      {
        heading: 'Required Settings',
        body: [
          'Base URL, project key, email, API token, issue type, sync mode, and conflict policy.',
        ],
      },
    ],
    links: [{ label: 'Open Connectors', href: '/connectors-manage' }],
  },
  workfront: {
    short: 'WF',
    label: 'Workfront',
    title: 'Workfront Connector (Execution)',
    summary: 'Milestone and owner synchronization with Workfront projects.',
    sections: [
      {
        heading: 'Required Settings',
        body: ['Workfront base URL, project ID, API token, sync mode, and conflict policy.'],
      },
    ],
    links: [{ label: 'Open Connectors', href: '/connectors-manage' }],
  },
  smartsheet: {
    short: 'SM',
    label: 'Smartsheet',
    title: 'Smartsheet Connector (Execution)',
    summary: 'Task-row synchronization for schedule and execution status alignment.',
    sections: [
      {
        heading: 'Required Settings',
        body: ['Smartsheet sheet ID, access token, sync mode, and conflict policy.'],
      },
    ],
    links: [{ label: 'Open Connectors', href: '/connectors-manage' }],
  },
  salesforce: {
    short: 'SF',
    label: 'Salesforce',
    title: 'Salesforce Connector (Data)',
    summary: 'CRM pipeline and customer context for prioritization insights.',
    sections: [
      {
        heading: 'Required Settings',
        body: [
          'Instance URL, client ID, client secret, and refresh token for OAuth-backed data pulls.',
        ],
      },
    ],
    links: [{ label: 'Open Connectors', href: '/connectors-manage' }],
  },
  snowflake: {
    short: 'SN',
    label: 'Snowflake',
    title: 'Snowflake Connector (Data)',
    summary: 'Governed warehouse metrics and trend extraction for enriched analysis.',
    sections: [
      {
        heading: 'Required Settings',
        body: [
          'Account, warehouse, database, schema, role, user credentials, and table allowlist.',
        ],
      },
    ],
    links: [{ label: 'Open Connectors', href: '/connectors-manage' }],
  },
  oracleFusion: {
    short: 'OF',
    label: 'Oracle Fusion',
    title: 'Oracle Fusion Connector (Data)',
    summary: 'ERP operations and finance context for enterprise planning decisions.',
    sections: [
      {
        heading: 'Required Settings',
        body: ['Base URL, username, password, optional business unit, sync mode, and policy.'],
      },
    ],
    links: [{ label: 'Open Connectors', href: '/connectors-manage' }],
  },
  serviceNow: {
    short: 'SV',
    label: 'ServiceNow',
    title: 'ServiceNow Connector (Data)',
    summary: 'Service and change metrics for execution risk visibility.',
    sections: [
      {
        heading: 'Required Settings',
        body: ['Instance URL, username, password, optional table allowlist, sync mode, and policy.'],
      },
    ],
    links: [{ label: 'Open Connectors', href: '/connectors-manage' }],
  },
  netSuite: {
    short: 'NS',
    label: 'NetSuite',
    title: 'NetSuite Connector (Data)',
    summary: 'Operational and finance trend context for tradeoff planning.',
    sections: [
      {
        heading: 'Required Settings',
        body: [
          'Account ID, consumer key/secret, token ID/secret, REST base URL, sync mode, and policy.',
        ],
      },
    ],
    links: [{ label: 'Open Connectors', href: '/connectors-manage' }],
  },
  billing: {
    short: 'BL',
    label: 'Billing and Usage',
    title: 'Billing and Usage',
    summary: 'Plan entitlement, credits, and access governance.',
    sections: [
      {
        heading: 'Scope',
        body: [
          'Billing determines feature access, connector eligibility, and model availability by plan.',
        ],
      },
    ],
    links: [{ label: 'Open Account', href: '/account' }],
  },
  api: {
    short: 'AP',
    label: 'API and Integrations',
    title: 'API and Integrations',
    summary: 'Programmatic access for sessions, connectors, reports, activity, and organization workflows.',
    sections: [
      {
        heading: 'Integration Pattern',
        body: [
          'Authenticate, read current state, apply explicit writes, then verify responses and audit logs.',
        ],
      },
    ],
    links: [{ label: 'Open API Console', href: '/pages/api' }],
  },
};

const TOPIC_GROUPS = [
  { label: 'Start Here', items: ['gettingStarted'] },
  {
    label: 'Core Features',
    items: [
      'agent',
      'components',
      'scoresHistory',
      'aiScenarios',
      'aiWbsGeneration',
      'dataInsights',
      'teamManagement',
      'savedStarters',
      'connectorSetup',
    ],
  },
  {
    label: 'Connectors',
    items: ['jira', 'workfront', 'smartsheet', 'salesforce', 'snowflake', 'oracleFusion', 'serviceNow', 'netSuite'],
  },
  { label: 'Platform', items: ['billing', 'api'] },
];

function toSearchBlob(topic) {
  const sections = Array.isArray(topic?.sections) ? topic.sections : [];
  const sectionText = sections
    .map((section) => {
      const body = Array.isArray(section?.body) ? section.body.join(' ') : String(section?.body || '');
      const list = Array.isArray(section?.list) ? section.list.join(' ') : '';
      const steps = Array.isArray(section?.steps) ? section.steps.join(' ') : '';
      return `${section?.heading || ''} ${body} ${list} ${steps}`;
    })
    .join(' ');
  return `${topic?.title || ''} ${topic?.summary || ''} ${sectionText}`.toLowerCase();
}

export default function Knowledge() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTopicId, setActiveTopicId] = useState('gettingStarted');
  const [query, setQuery] = useState('');

  const normalizedQuery = query.trim().toLowerCase();

  const filteredGroups = useMemo(() => {
    return TOPIC_GROUPS.map((group) => {
      const items = group.items.filter((topicId) => {
        const topic = TOPICS[topicId];
        if (!topic) return false;
        if (!normalizedQuery) return true;
        return toSearchBlob(topic).includes(normalizedQuery);
      });
      return { ...group, items };
    }).filter((group) => group.items.length > 0);
  }, [normalizedQuery]);

  const visibleTopicIds = useMemo(
    () => filteredGroups.flatMap((group) => group.items),
    [filteredGroups]
  );

  useEffect(() => {
    if (!visibleTopicIds.length) return;
    if (!visibleTopicIds.includes(activeTopicId)) {
      setActiveTopicId(visibleTopicIds[0]);
    }
  }, [activeTopicId, visibleTopicIds]);

  const activeTopic = useMemo(() => {
    if (!visibleTopicIds.length) return null;
    return TOPICS[activeTopicId] || TOPICS[visibleTopicIds[0]];
  }, [activeTopicId, visibleTopicIds]);

  return (
    <div className="knowledge-page">
      <div className={`knowledge-layout ${sidebarCollapsed ? 'is-sidebar-collapsed' : ''}`}>
        <aside className={`knowledge-sidebar ${sidebarCollapsed ? 'is-collapsed' : ''}`}>
          <div className="knowledge-sidebar-head">
            {!sidebarCollapsed && <p className="knowledge-sidebar-title">Docs index</p>}
            <button
              type="button"
              className="knowledge-sidebar-toggle"
              onClick={() => setSidebarCollapsed((prev) => !prev)}
              aria-label={sidebarCollapsed ? 'Expand docs index' : 'Collapse docs index'}
              aria-expanded={!sidebarCollapsed}
            >
              {sidebarCollapsed ? '=' : 'x'}
            </button>
          </div>
          <div className="knowledge-sidebar-scroll">
            {filteredGroups.map((group) => (
              <section key={group.label} className="knowledge-index-group">
                {!sidebarCollapsed && <p className="knowledge-index-label">{group.label}</p>}
                <div className="knowledge-index-items">
                  {group.items.map((topicId) => {
                    const topic = TOPICS[topicId];
                    if (!topic) return null;
                    return (
                      <button
                        key={topicId}
                        type="button"
                        className={`knowledge-index-item ${activeTopicId === topicId ? 'is-active' : ''}`}
                        onClick={() => setActiveTopicId(topicId)}
                        title={sidebarCollapsed ? topic.label : undefined}
                      >
                        <span className="knowledge-index-icon">{topic.short}</span>
                        {!sidebarCollapsed && <span className="knowledge-index-text">{topic.label}</span>}
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
            {!filteredGroups.length && !sidebarCollapsed && (
              <p className="knowledge-index-empty">No topics match your search.</p>
            )}
          </div>
        </aside>

        <main className="knowledge-main">
          <header className="knowledge-header">
            <p className="knowledge-eyebrow">Knowledge</p>
            <h1>Internal Product Documentation</h1>
            <p className="knowledge-header-summary">
              Contextual documentation for scoring, AI workflows, team collaboration, connectors, and operational setup.
            </p>
            <div className="knowledge-search-wrap">
              <input
                type="search"
                className="knowledge-search-input"
                placeholder="Search topics, summaries, and section content..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search knowledge topics"
              />
            </div>
          </header>

          {activeTopic ? (
            <article className="knowledge-topic" aria-live="polite">
              <header className="knowledge-topic-head">
                <h2>{activeTopic.title}</h2>
                <p>{activeTopic.summary}</p>
              </header>

              {(activeTopic.sections || []).map((section) => (
                <section key={`${activeTopic.title}-${section.heading}`} className="knowledge-doc-section">
                  <h3>{section.heading}</h3>
                  {(Array.isArray(section.body) ? section.body : [section.body])
                    .filter(Boolean)
                    .map((paragraph) => (
                      <p key={`${section.heading}-${paragraph}`}>{paragraph}</p>
                    ))}
                  {Array.isArray(section.steps) && section.steps.length > 0 && (
                    <ol>
                      {section.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  )}
                  {Array.isArray(section.list) && section.list.length > 0 && (
                    <ul>
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {Array.isArray(activeTopic.links) && activeTopic.links.length > 0 && (
                <section className="knowledge-doc-section knowledge-links">
                  <h3>Related links</h3>
                  <ul className="knowledge-link-list">
                    {activeTopic.links.map((link) => (
                      <li key={`${activeTopic.title}-${link.href}`}>
                        <a href={link.href} className="knowledge-link">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </article>
          ) : (
            <div className="knowledge-topic">
              <section className="knowledge-doc-section">
                <h3>No topics found</h3>
                <p>Try a broader keyword or clear the search field.</p>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
