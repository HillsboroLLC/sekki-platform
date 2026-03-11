import React, { useMemo, useState } from 'react';
import './Knowledge.css';

const TOPICS = {
  agent: {
    short: 'AG',
    label: 'The Agent',
    title: 'The Agent',
    summary: 'Jaspen is an execution-focused decision agent that turns project context into concrete operating plans.',
    what: 'Ingests structured and unstructured context, builds recommendation-grade outputs, and translates approved direction into execution-ready actions.',
    why: 'Reduces strategy-to-execution drift by connecting planning logic, readiness scoring, and system-of-record sync in one workflow.',
    where: 'Primary entry is the workspace at /new with model selection, PM dashboard access, and scenario tooling.',
    how: [
      'Open /new and describe project goals, constraints, and expected outcomes.',
      'Select the model tier your plan supports (Pluto, Orbit, Titan where available).',
      'Review recommendations and readiness, then approve execution direction.',
      'Use connectors to operationalize approved actions in external systems.',
    ],
    links: [
      { label: 'Open Workspace', href: '/new' },
      { label: 'Tutorials', href: '/pages/resources/tutorials#docs' },
    ],
  },
  components: {
    short: 'CP',
    label: 'Agent Components',
    title: 'Agent Components',
    summary: 'Core modules that combine context capture, reasoning, scoring, and system orchestration.',
    what: 'The stack includes Intake Layer, Reasoning Core, Scoring and Readiness, Scenario Modeler, Execution Translator, and Connector Orchestrator.',
    why: 'Separating components keeps decision quality measurable and makes connector behavior auditable per module.',
    where: 'Visible across workspace flows: planning chat, score dashboards, scenario compare, and connector settings.',
    how: [
      'Capture context in Intake Layer.',
      'Generate options with Reasoning Core.',
      'Validate confidence in Scoring and Readiness.',
      'Compare alternatives in Scenario Modeler.',
      'Translate chosen path with Execution Translator.',
      'Apply external sync rules with Connector Orchestrator.',
    ],
    notes: [
      'Intake Layer: Captures prompt, constraints, workspace context, and model tier.',
      'Reasoning Core: Produces options, tradeoffs, and recommended actions.',
      'Scoring and Readiness: Tracks confidence and checklist completion.',
      'Scenario Modeler: Quantifies impact, cost, and risk across alternatives.',
      'Execution Translator: Converts approved decisions into milestones and owner-ready actions.',
      'Connector Orchestrator: Applies sync rules, credentials, and conflict policies.',
    ],
    links: [{ label: 'Tutorials', href: '/pages/resources/tutorials#docs' }],
  },
  billing: {
    short: 'BL',
    label: 'Billing & Usage',
    title: 'Billing and Usage Service',
    summary: 'Plan management, credit visibility, connector eligibility, and model access all live in Billing and Usage.',
    what: 'Manages plan tier, available credits, connector entitlement, and model type access by plan.',
    why: 'Prevents unsupported sync behavior and makes feature access explicit before teams rely on automation.',
    where: 'Internal account page at /account with tabbed sections for overview, plans, connectors, packs, models, and admin.',
    how: [
      'Review plan and credits in Overview.',
      'Move plans in Plans and purchase overage packs when needed.',
      'Configure per-connector settings in Connectors and save changes.',
      'Check model availability by tier in Models before changing workflows.',
    ],
    links: [
      { label: 'Open Billing and Usage', href: '/account' },
      { label: 'Tutorials', href: '/pages/resources/tutorials#docs' },
    ],
  },
  connectorPlatform: {
    short: 'OR',
    label: 'Connector Platform',
    title: 'Connector Platform',
    summary: 'Each connector follows the same lifecycle: entitlement check, settings capture, toggle control, and explicit save.',
    what: 'A unified connector framework with consistent sync mode, conflict policy, workspace mapping, and connection status fields.',
    why: 'Gives users predictable behavior across tools and reduces onboarding friction when adding a new integration.',
    where: 'Connector controls are managed in Billing and Usage > Connectors with per-connector settings panels.',
    how: [
      'Check if connector is available for the current plan.',
      'Toggle connector on or off depending on intended sync behavior.',
      'Set sync direction and conflict policy.',
      'Save connector state to persist API and workspace settings.',
    ],
    unlocks: [
      'Execution connectors: issue, milestone, status, and ownership sync.',
      'Data connectors: insight context ingestion for recommendations.',
    ],
    blocks: [
      'Off state blocks connector-specific sync and context ingestion.',
      'Locked state requires plan upgrade before saving connector settings.',
    ],
    links: [{ label: 'Open Billing and Usage', href: '/account' }],
  },
  jira: {
    short: 'JR',
    label: 'Jira',
    title: 'Jira Connector (Execution)',
    summary: 'Syncs Jira issues, owners, and sprint status into execution planning.',
    what: 'Bi-directional or directional issue-level synchronization based on selected sync mode.',
    why: 'Keeps delivery status aligned between planning output and Jira execution data.',
    where: 'Billing and Usage > Connectors > Jira settings.',
    how: [
      'Toggle Jira on, which prompts Jira API settings when required.',
      'Enter Jira URL, project key, service account email, API token, and issue type.',
      'Set sync mode and conflict policy.',
      'Save connector configuration.',
    ],
    requiredSettings: ['Jira base URL', 'Jira project key', 'Jira email', 'Jira API token', 'Jira issue type', 'Sync mode', 'Conflict policy'],
    unlocks: ['Issue sync', 'Sprint/state alignment', 'Ownership mapping', 'Delivery status visibility'],
    blocks: ['No Jira sync flows', 'No issue-state ingestion into planning context'],
    links: [
      { label: 'Open Billing and Usage', href: '/account' },
      { label: 'Jira API token docs', href: 'https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/' },
    ],
  },
  workfront: {
    short: 'WF',
    label: 'Workfront',
    title: 'Workfront Connector (Execution)',
    summary: 'Connects milestone and ownership updates between Workfront and Jaspen.',
    what: 'Syncs project structure, milestone status, and owner assignment signals.',
    why: 'Maintains consistent cross-team delivery governance where Workfront is the execution system.',
    where: 'Billing and Usage > Connectors > Workfront settings.',
    how: [
      'Toggle Workfront on.',
      'Set external workspace or account identifier.',
      'Select sync direction and conflict policy.',
      'Save connector settings.',
    ],
    requiredSettings: ['External workspace/account id', 'Sync mode', 'Conflict policy'],
    unlocks: ['Milestone alignment', 'Owner alignment', 'Schedule change visibility'],
    blocks: ['No Workfront milestone/owner exchange'],
    links: [{ label: 'Open Billing and Usage', href: '/account' }],
  },
  smartsheet: {
    short: 'SM',
    label: 'Smartsheet',
    title: 'Smartsheet Connector (Execution)',
    summary: 'Maps row-level plan progress and timeline updates into Jaspen execution context.',
    what: 'Syncs task rows, dates, and delivery status fields according to connector policy.',
    why: 'Prevents schedule and progress drift between spreadsheet planning and execution decisions.',
    where: 'Billing and Usage > Connectors > Smartsheet settings.',
    how: [
      'Toggle Smartsheet on.',
      'Configure external workspace/account identifier.',
      'Set sync mode and conflict policy.',
      'Save connector settings.',
    ],
    requiredSettings: ['External workspace/account id', 'Sync mode', 'Conflict policy'],
    unlocks: ['Task-row status sync', 'Date alignment', 'Execution signal ingestion'],
    blocks: ['No Smartsheet delivery-state exchange'],
    links: [{ label: 'Open Billing and Usage', href: '/account' }],
  },
  salesforce: {
    short: 'SF',
    label: 'Salesforce',
    title: 'Salesforce Connector (Data)',
    summary: 'Brings customer and pipeline context into recommendation analysis.',
    what: 'Reads CRM trend and account-level context for strategic prioritization inputs.',
    why: 'Improves roadmap and execution tradeoffs with revenue and customer-signal grounding.',
    where: 'Billing and Usage > Connectors > Salesforce settings.',
    how: [
      'Toggle Salesforce on.',
      'Provide external workspace/account identifier.',
      'Select sync mode and conflict policy.',
      'Save connector settings.',
    ],
    requiredSettings: ['External workspace/account id', 'Sync mode', 'Conflict policy'],
    unlocks: ['Pipeline context in analysis', 'Customer trend visibility'],
    blocks: ['No Salesforce-derived insight context'],
    links: [{ label: 'Open Billing and Usage', href: '/account' }],
  },
  snowflake: {
    short: 'SN',
    label: 'Snowflake',
    title: 'Snowflake Connector (Data)',
    summary: 'Ingests warehouse KPI and financial trend signals for planning recommendations.',
    what: 'Reads governed warehouse data to enrich scoring, scenario assumptions, and prioritization.',
    why: 'Improves confidence with analytics-backed decisions rather than prompt-only reasoning.',
    where: 'Billing and Usage > Connectors > Snowflake settings.',
    how: [
      'Toggle Snowflake on.',
      'Set external workspace/account identifier.',
      'Configure sync mode and conflict policy.',
      'Save connector settings.',
    ],
    requiredSettings: ['External workspace/account id', 'Sync mode', 'Conflict policy'],
    unlocks: ['Warehouse KPI ingestion', 'Financial trend context'],
    blocks: ['No Snowflake context in recommendations'],
    links: [{ label: 'Open Billing and Usage', href: '/account' }],
  },
  oracleFusion: {
    short: 'OF',
    label: 'Oracle Fusion',
    title: 'Oracle Fusion Connector (Data)',
    summary: 'Adds ERP operations and finance signals to planning decisions.',
    what: 'Ingests operational and financial context from Oracle Fusion for scenario and recommendation quality.',
    why: 'Keeps execution decisions grounded in enterprise ERP constraints and actuals.',
    where: 'Billing and Usage > Connectors > Oracle Fusion settings.',
    how: [
      'Toggle Oracle Fusion on.',
      'Enter external workspace/account identifier.',
      'Set sync mode and conflict policy.',
      'Save connector settings.',
    ],
    requiredSettings: ['External workspace/account id', 'Sync mode', 'Conflict policy'],
    unlocks: ['ERP signal ingestion', 'Finance and operations context'],
    blocks: ['No Oracle Fusion signal contribution'],
    links: [{ label: 'Open Billing and Usage', href: '/account' }],
  },
  serviceNow: {
    short: 'SV',
    label: 'ServiceNow',
    title: 'ServiceNow Connector (Data)',
    summary: 'Ingests service and change context to identify execution risk and blockers.',
    what: 'Adds service and change-management signal data to scenario and readiness analysis.',
    why: 'Surfaces operational risk earlier and improves mitigation planning quality.',
    where: 'Billing and Usage > Connectors > ServiceNow settings.',
    how: [
      'Toggle ServiceNow on.',
      'Set external workspace/account identifier.',
      'Configure sync mode and conflict policy.',
      'Save connector settings.',
    ],
    requiredSettings: ['External workspace/account id', 'Sync mode', 'Conflict policy'],
    unlocks: ['Service/change signal context', 'Execution risk insights'],
    blocks: ['No ServiceNow risk signal ingestion'],
    links: [{ label: 'Open Billing and Usage', href: '/account' }],
  },
  netSuite: {
    short: 'NS',
    label: 'NetSuite',
    title: 'NetSuite Connector (Data)',
    summary: 'Connects finance and operations trend signals for execution tradeoff decisions.',
    what: 'Ingests NetSuite context for cost, operational feasibility, and planning confidence signals.',
    why: 'Improves tradeoff decisions with current enterprise operating and finance context.',
    where: 'Billing and Usage > Connectors > NetSuite settings.',
    how: [
      'Toggle NetSuite on.',
      'Set external workspace/account identifier.',
      'Choose sync mode and conflict policy.',
      'Save connector settings.',
    ],
    requiredSettings: ['External workspace/account id', 'Sync mode', 'Conflict policy'],
    unlocks: ['Finance and ops trend context', 'Tradeoff modeling support'],
    blocks: ['No NetSuite context in recommendation pipeline'],
    links: [{ label: 'Open Billing and Usage', href: '/account' }],
  },
  api: {
    short: 'AP',
    label: 'API and Integrations',
    title: 'API and Integration Surface',
    summary: 'Programmatic entry points for managing sessions, billing context, and connector state.',
    what: 'API endpoints expose status and configuration controls used by the internal UI and service integrations.',
    why: 'Supports automation, admin tooling, and repeatable setup workflows beyond manual UI actions.',
    where: 'API console and internal backend routes (billing, connectors, admin, sessions).',
    how: [
      'Authenticate with your account token or session credentials.',
      'Read current billing and connector status.',
      'Patch connector settings with required fields and save.',
      'Use monitoring/logging around connector update requests.',
    ],
    notes: [
      'Connector updates are explicit save operations, not auto-commit toggles.',
      'Jira requires API credential fields before enabling sync.',
      'Plan entitlements determine whether connector updates are allowed.',
    ],
    links: [
      { label: 'Open API console', href: '/pages/api' },
      { label: 'Tutorials', href: '/pages/resources/tutorials#docs' },
    ],
  },
};

const TOPIC_GROUPS = [
  {
    label: 'Core Services',
    items: ['agent', 'components', 'billing', 'connectorPlatform', 'api'],
  },
  {
    label: 'Execution Connectors',
    items: ['jira', 'workfront', 'smartsheet'],
  },
  {
    label: 'Data Connectors',
    items: ['salesforce', 'snowflake', 'oracleFusion', 'serviceNow', 'netSuite'],
  },
];

export default function Knowledge() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTopicId, setActiveTopicId] = useState('agent');
  const activeTopic = useMemo(() => TOPICS[activeTopicId] || TOPICS.agent, [activeTopicId]);

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
            {TOPIC_GROUPS.map((group) => (
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
          </div>
        </aside>

        <main className="knowledge-main">
          <header className="knowledge-header">
            <p className="knowledge-eyebrow">Knowledge</p>
            <h1>Internal Product Documentation</h1>
            <p className="knowledge-header-summary">
              Comprehensive reference for each service and connector, including what it does, why it matters, where it is configured, and how to set it up.
            </p>
          </header>

          <section className="knowledge-topic">
            <div className="knowledge-topic-head">
              <h2>{activeTopic.title}</h2>
              <p>{activeTopic.summary}</p>
            </div>

            <div className="knowledge-wwwh-grid">
              <article className="knowledge-wwwh-card">
                <h3>What</h3>
                <p>{activeTopic.what}</p>
              </article>
              <article className="knowledge-wwwh-card">
                <h3>Why</h3>
                <p>{activeTopic.why}</p>
              </article>
              <article className="knowledge-wwwh-card">
                <h3>Where</h3>
                <p>{activeTopic.where}</p>
              </article>
              <article className="knowledge-wwwh-card">
                <h3>How</h3>
                <ol>
                  {(activeTopic.how || []).map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </article>
            </div>

            {(activeTopic.requiredSettings || activeTopic.unlocks || activeTopic.blocks || activeTopic.notes) && (
              <div className="knowledge-detail-grid">
                {Array.isArray(activeTopic.requiredSettings) && activeTopic.requiredSettings.length > 0 && (
                  <article className="knowledge-detail-card">
                    <h3>Required Settings</h3>
                    <ul>
                      {activeTopic.requiredSettings.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                )}

                {Array.isArray(activeTopic.unlocks) && activeTopic.unlocks.length > 0 && (
                  <article className="knowledge-detail-card">
                    <h3>Toggle On Unlocks</h3>
                    <ul>
                      {activeTopic.unlocks.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                )}

                {Array.isArray(activeTopic.blocks) && activeTopic.blocks.length > 0 && (
                  <article className="knowledge-detail-card">
                    <h3>Toggle Off Blocks</h3>
                    <ul>
                      {activeTopic.blocks.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                )}

                {Array.isArray(activeTopic.notes) && activeTopic.notes.length > 0 && (
                  <article className="knowledge-detail-card">
                    <h3>Operational Notes</h3>
                    <ul>
                      {activeTopic.notes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                )}
              </div>
            )}

            {Array.isArray(activeTopic.links) && activeTopic.links.length > 0 && (
              <div className="knowledge-links">
                <p>Related Links</p>
                <div className="knowledge-link-row">
                  {activeTopic.links.map((link) => (
                    <a
                      key={`${activeTopic.title}-${link.href}`}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="knowledge-link-chip"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
