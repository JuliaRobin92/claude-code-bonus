import { useState, useEffect, useRef } from 'react';
import './BriefingWorkspace.css';
import ProposalBlock from './ProposalBlock';
import AgentActivity from './AgentActivity';
import ContextPanel from './ContextPanel';
import DecisionControl from './DecisionControl';

const BriefingWorkspace = () => {
  const [agentState, setAgentState] = useState('analyzing');
  const [proposals, setProposals] = useState([]);
  const [activeProposal, setActiveProposal] = useState(null);
  const [contextVisible, setContextVisible] = useState(false);
  const [agentActivity, setAgentActivity] = useState([]);
  const workspaceRef = useRef(null);

  // Simuleer live agent activiteit
  useEffect(() => {
    // Initial proposals
    setTimeout(() => {
      setProposals([
        {
          id: 'targeting',
          type: 'targeting',
          status: 'stable',
          confidence: 0.92,
          title: 'Doelgroep Focus',
          proposal: 'Gezinnen 25-45 jaar, focus op convenience shoppers',
          reasoning: 'Gebaseerd op Q4 2025 performance data: hoogste conversie in deze segmenten',
          lastUpdated: new Date(Date.now() - 120000),
          data: {
            previousCampaigns: ['AH_Q4_2025_Bonus', 'AH_Q3_2025_Family'],
            performanceMetrics: { conversion: 0.087, engagement: 0.34 }
          }
        },
        {
          id: 'channels',
          type: 'channels',
          status: 'learning',
          confidence: 0.78,
          title: 'Kanaal Strategie',
          proposal: 'Instagram Stories (60%) + In-app (40%)',
          reasoning: 'Testing nieuwe mix - Instagram Stories tonen stijgende trend',
          lastUpdated: new Date(Date.now() - 30000),
          data: {
            experimentStatus: 'active',
            costEfficiency: { instagram: 0.82, inapp: 0.91 }
          }
        },
        {
          id: 'timing',
          type: 'timing',
          status: 'under_review',
          confidence: 0.65,
          title: 'Timing & Frequentie',
          proposal: 'Donderdag 18:00 launch, 3x per week reminder',
          reasoning: 'Patroon analyse suggereert alternatief voor standaard vrijdag launch',
          lastUpdated: new Date(Date.now() - 5000),
          data: {
            weekdayPerformance: { thu: 0.89, fri: 0.84, sat: 0.77 }
          }
        },
        {
          id: 'budget',
          type: 'budget',
          status: 'stable',
          confidence: 0.88,
          title: 'Budget Allocatie',
          proposal: '€45.000 over 3 weken, 70% eerste week',
          reasoning: 'Front-loading strategie op basis van historical decay patterns',
          lastUpdated: new Date(Date.now() - 180000),
          data: {
            historicalROI: { week1: 2.4, week2: 1.8, week3: 1.3 }
          }
        }
      ]);
      setAgentState('proposing');
    }, 1500);

    // Simuleer continue agent activiteit
    const activityInterval = setInterval(() => {
      const activities = [
        'Analyseren Q4 2025 campagne performance',
        'Cross-referencing doelgroep gedrag met seizoen trends',
        'Optimaliseren kanaal mix op basis van real-time data',
        'Valideren budget allocatie tegen benchmarks',
        'Herberekenen confidence scores'
      ];

      setAgentActivity(prev => [
        {
          action: activities[Math.floor(Math.random() * activities.length)],
          timestamp: new Date(),
          id: Date.now()
        },
        ...prev.slice(0, 4)
      ]);
    }, 8000);

    return () => clearInterval(activityInterval);
  }, []);

  // Live updates van proposals
  useEffect(() => {
    if (agentState !== 'proposing') return;

    const updateInterval = setInterval(() => {
      setProposals(prev => prev.map(proposal => {
        // Simuleer confidence updates voor 'learning' status
        if (proposal.status === 'learning') {
          return {
            ...proposal,
            confidence: Math.min(0.95, proposal.confidence + 0.01),
            lastUpdated: new Date()
          };
        }
        return proposal;
      }));
    }, 15000);

    return () => clearInterval(updateInterval);
  }, [agentState]);

  const handleDecision = (proposalId, decision, params = {}) => {
    setProposals(prev => prev.map(p => {
      if (p.id === proposalId) {
        if (decision === 'accept') {
          return { ...p, status: 'stable', confidence: 0.95 };
        } else if (decision === 'adjust') {
          return {
            ...p,
            status: 'learning',
            confidence: Math.max(0.5, p.confidence - 0.1),
            ...params
          };
        } else if (decision === 'reject') {
          return { ...p, status: 'rejected', confidence: 0 };
        }
      }
      return p;
    }));

    // Trigger agent reanalysis
    setAgentActivity(prev => [
      {
        action: `Verwerken feedback op ${proposals.find(p => p.id === proposalId)?.title}`,
        timestamp: new Date(),
        id: Date.now()
      },
      ...prev
    ]);
  };

  return (
    <div className="briefing-workspace" ref={workspaceRef}>
      {/* Agent Status Bar */}
      <div className="agent-status-bar">
        <div className="agent-identity">
          <div className="agent-avatar">
            <div className="pulse-ring" />
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#00ADE6" fillOpacity="0.2" stroke="#00ADE6" strokeWidth="2"/>
              <path d="M2 17L12 22L22 17" stroke="#00ADE6" strokeWidth="2" strokeLinecap="round"/>
              <path d="M2 12L12 17L22 12" stroke="#00ADE6" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="agent-info">
            <h3>Briefing Agent</h3>
            <span className={`agent-state state-${agentState}`}>
              {agentState === 'analyzing' && 'Analyseren van context...'}
              {agentState === 'proposing' && 'Actief aan het optimaliseren'}
            </span>
          </div>
        </div>

        <AgentActivity activities={agentActivity} />

        <button
          className="context-toggle"
          onClick={() => setContextVisible(!contextVisible)}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2"/>
          </svg>
          Context
        </button>
      </div>

      {/* Main Workspace */}
      <div className="workspace-content">
        <div className="workspace-main">
          <div className="workspace-header">
            <h1>Campagne Briefing</h1>
            <div className="briefing-meta">
              <span className="campaign-type">Bonus Campagne Q1 2026</span>
              <span className="live-indicator">
                <span className="live-dot" />
                Live workspace
              </span>
            </div>
          </div>

          <div className="proposals-grid">
            {proposals.filter(p => p.status !== 'rejected').map(proposal => (
              <ProposalBlock
                key={proposal.id}
                proposal={proposal}
                isActive={activeProposal === proposal.id}
                onActivate={() => setActiveProposal(proposal.id)}
                onDecision={handleDecision}
              />
            ))}
          </div>

          {/* Global Decision Controls */}
          {proposals.length > 0 && (
            <div className="global-actions">
              <DecisionControl
                type="global"
                onAcceptAll={() => {
                  proposals.forEach(p => handleDecision(p.id, 'accept'));
                }}
                onRefineAll={() => {
                  setAgentState('analyzing');
                  setTimeout(() => setAgentState('proposing'), 2000);
                }}
              />
            </div>
          )}
        </div>

        {/* Context Panel */}
        <ContextPanel
          visible={contextVisible}
          proposal={proposals.find(p => p.id === activeProposal)}
          onClose={() => setContextVisible(false)}
        />
      </div>
    </div>
  );
};

export default BriefingWorkspace;
