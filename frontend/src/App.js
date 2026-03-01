// =====================================================
// File: src/App.js
// =====================================================
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

import { LSSProjectProvider } from './Ops/context/LSSProjectContext';
import { LSSWorkflowProvider } from './Ops/context/LSSWorkflowContext';
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
import Solopreneurs  from './Market/Solopreneurs/Solopreneurs';
import SmallBusiness from './Market/SmallBusiness/SmallBusiness';
import Enterprise    from './Market/Enterprise/Enterprise';
import PricingResult from './Market/PricingResult/PricingResult';
import Dashboard     from './Market/Dashboard/Dashboard';
import Sessions      from './Market/Sessions/Sessions';
import Account       from './Market/Account/Account';
import PaymentPage   from './Market/PaymentPage/PaymentPage';

// Market IQ (NEW)
import MarketIQWorkspace from './Market/MarketIQ/workspace/MarketIQWorkspace';

// Ops
import { AdminProvider } from './Ops/context/AdminContext';
import OpsDashboard        from './Ops/OpsDashboard/OpsDashboard';
import PMDashboard        from './Ops/PMDashboard/PMDashboard';
import LSSDashboard        from './Ops/LSSDashboard/LSSDashboard';
import SIPOC               from './Ops/SIPOC';
import ProcessMap          from './Ops/ProcessMap';
import ValueStreamMap      from './Ops/ValueStreamMap';
import RootCauseAnalysis   from './Ops/RootCauseAnalysis';
import FMEA                from './Ops/FMEA';
import ProjectCharter      from './Ops/ProjectCharter';
import VoiceOfCustomer     from './Ops/VoiceOfCustomer';
import DataCollectionPlan  from './Ops/DataCollectionPlan';
import MSA                 from './Ops/MSA';
import ControlPlan         from './Ops/ControlPlan';
import StandardWork        from './Ops/StandardWork';
import Checksheet          from './Ops/Checksheet';
import RunChart            from './Ops/RunChart';
import ParetoAnalysis      from './Ops/ParetoAnalysis';
import HypothesisTesting   from './Ops/HypothesisTesting';
import FiveWhys            from './Ops/FiveWhys';
import Histogram           from './Ops/Histogram';
import ScatterPlot         from './Ops/ScatterPlot';
import ControlChart        from './Ops/ControlChart';
import BoxPlot             from './Ops/BoxPlot';
import ANOVA               from './Ops/ANOVA';
import CapabilityAnalysis  from './Ops/CapabilityAnalysis';
import SolutionSelection   from './Ops/SolutionSelection';
import PilotPlan           from './Ops/PilotPlan';
import DOE                 from './Ops/DOE';
import ImplementationPlan  from './Ops/ImplementationPlan';
import A3                  from './Ops/A3';
import Checklists          from './Ops/Checklists';
import DataCollection      from './Ops/DataCollection';
import EffortImpactMatrix  from './Ops/EffortImpactMatrix';
import GapAnalysis         from './Ops/GapAnalysis';
import ProblemStatement    from './Ops/ProblemStatement';
import ProjectPlanning     from './Ops/ProjectPlanning';
import StakeholderAnalysis from './Ops/StakeholderAnalysis';
import SustainmentPlan     from './Ops/SustainmentPlan';
import DMAIC               from './Ops/DMAIC';
import FinY                from './Ops/FinY';
import Kaizen              from './Ops/Kaizen'; // uses src/Ops/Kaizen/index.js
import Statistics          from './Ops/Statistics/Statistics';
import Activities          from './Ops/Activities/Activities';

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
    <AdminProvider>
        <LSSProjectProvider>
          <LSSWorkflowProvider>
            <BrowserRouter>
              <Routes>
                {/* Public */}
                <Route path="/"               element={withShell(<HomePage />, { showHeader: false, fullBleed: true, noPadding: true })} />
                <Route path="/profile"        element={withShell(<Profile />)} />
                <Route path="/solopreneurs"   element={withShell(<Solopreneurs />)} />
                <Route path="/small-business" element={withShell(<SmallBusiness />)} />
                <Route path="/enterprise"     element={withShell(<Enterprise />)} />
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

                {/* Protected (Ops) */}
                <Route path="/ops"                      element={<ProtectedRoute>{withShell(<OpsDashboard />)}</ProtectedRoute>} />
                <Route path="/ops/pm"                   element={<ProtectedRoute>{withShell(<PMDashboard />)}</ProtectedRoute>} />
                <Route path="/ops/lss"                  element={<ProtectedRoute>{withShell(<LSSDashboard />)}</ProtectedRoute>} />
                <Route path="/ops/dmaic"                element={<ProtectedRoute>{withShell(<DMAIC />)}</ProtectedRoute>} />
                <Route path="/ops/kaizen"               element={<ProtectedRoute>{withShell(<Kaizen />)}</ProtectedRoute>} />
                <Route path="/ops/sipoc"                element={<ProtectedRoute>{withShell(<SIPOC />)}</ProtectedRoute>} />
                <Route path="/ops/process-map"          element={<ProtectedRoute>{withShell(<ProcessMap />)}</ProtectedRoute>} />
                <Route path="/ops/value-stream"         element={<ProtectedRoute>{withShell(<ValueStreamMap />)}</ProtectedRoute>} />
                <Route path="/ops/root-cause"           element={<ProtectedRoute>{withShell(<RootCauseAnalysis />)}</ProtectedRoute>} />
                <Route path="/ops/fmea"                 element={<ProtectedRoute>{withShell(<FMEA />)}</ProtectedRoute>} />
                <Route path="/ops/project-charter"      element={<ProtectedRoute>{withShell(<ProjectCharter />)}</ProtectedRoute>} />
                <Route path="/ops/voice-of-customer"    element={<ProtectedRoute>{withShell(<VoiceOfCustomer />)}</ProtectedRoute>} />
                <Route path="/ops/data-collection-plan" element={<ProtectedRoute>{withShell(<DataCollectionPlan />)}</ProtectedRoute>} />
                <Route path="/ops/msa"                  element={<ProtectedRoute>{withShell(<MSA />)}</ProtectedRoute>} />
                <Route path="/ops/control-plan"         element={<ProtectedRoute>{withShell(<ControlPlan />)}</ProtectedRoute>} />
                <Route path="/ops/standard-work"        element={<ProtectedRoute>{withShell(<StandardWork />)}</ProtectedRoute>} />
                <Route path="/ops/checksheet"           element={<ProtectedRoute>{withShell(<Checksheet />)}</ProtectedRoute>} />
                <Route path="/ops/run-chart"            element={<ProtectedRoute>{withShell(<RunChart />)}</ProtectedRoute>} />
                <Route path="/ops/pareto-analysis"      element={<ProtectedRoute>{withShell(<ParetoAnalysis />)}</ProtectedRoute>} />
                <Route path="/ops/hypothesis-testing"   element={<ProtectedRoute>{withShell(<HypothesisTesting />)}</ProtectedRoute>} />
                <Route path="/ops/five-whys"            element={<ProtectedRoute>{withShell(<FiveWhys />)}</ProtectedRoute>} />
                <Route path="/ops/histogram"            element={<ProtectedRoute>{withShell(<Histogram />)}</ProtectedRoute>} />
                <Route path="/ops/scatter-plot"         element={<ProtectedRoute>{withShell(<ScatterPlot />)}</ProtectedRoute>} />
                <Route path="/ops/control-chart"        element={<ProtectedRoute>{withShell(<ControlChart />)}</ProtectedRoute>} />
                <Route path="/ops/box-plot"             element={<ProtectedRoute>{withShell(<BoxPlot />)}</ProtectedRoute>} />
                <Route path="/ops/anova"                element={<ProtectedRoute>{withShell(<ANOVA />)}</ProtectedRoute>} />
                <Route path="/ops/capability"           element={<ProtectedRoute>{withShell(<CapabilityAnalysis />)}</ProtectedRoute>} />
                <Route path="/ops/solution-selection"   element={<ProtectedRoute>{withShell(<SolutionSelection />)}</ProtectedRoute>} />
                <Route path="/ops/pilot-plan"           element={<ProtectedRoute>{withShell(<PilotPlan />)}</ProtectedRoute>} />
                <Route path="/ops/doe"                  element={<ProtectedRoute>{withShell(<DOE />)}</ProtectedRoute>} />
                <Route path="/ops/implementation-plan"  element={<ProtectedRoute>{withShell(<ImplementationPlan />)}</ProtectedRoute>} />
                <Route path="/ops/a3"                   element={<ProtectedRoute>{withShell(<A3 />)}</ProtectedRoute>} />
                <Route path="/ops/checklists"           element={<ProtectedRoute>{withShell(<Checklists />)}</ProtectedRoute>} />
                <Route path="/ops/data-collection"      element={<ProtectedRoute>{withShell(<DataCollection />)}</ProtectedRoute>} />
                <Route path="/ops/effort-impact"        element={<ProtectedRoute>{withShell(<EffortImpactMatrix />)}</ProtectedRoute>} />
                <Route path="/ops/gap-analysis"         element={<ProtectedRoute>{withShell(<GapAnalysis />)}</ProtectedRoute>} />
                <Route path="/ops/problem-statement"    element={<ProtectedRoute>{withShell(<ProblemStatement />)}</ProtectedRoute>} />
                <Route path="/ops/project-planning"     element={<ProtectedRoute>{withShell(<ProjectPlanning />)}</ProtectedRoute>} />
                <Route path="/ops/stakeholder-analysis" element={<ProtectedRoute>{withShell(<StakeholderAnalysis />)}</ProtectedRoute>} />
                <Route path="/ops/sustainment-plan"     element={<ProtectedRoute>{withShell(<SustainmentPlan />)}</ProtectedRoute>} />
                <Route path="/ops/finy"                 element={<ProtectedRoute>{withShell(<FinY />)}</ProtectedRoute>} />
                <Route path="/ops/statistics"           element={<ProtectedRoute>{withShell(<Statistics />)}</ProtectedRoute>} />
                <Route path="/ops/activities"           element={<ProtectedRoute>{withShell(<Activities />)}</ProtectedRoute>} />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </LSSWorkflowProvider>
        </LSSProjectProvider>
    </AdminProvider>
  );
}
