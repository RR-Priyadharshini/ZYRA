import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Filter, 
  Scale, 
  FileText, 
  ShieldAlert, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { PageType, ComplianceRisk, RiskSeverity } from '../types';
import { SAMPLE_RISKS } from '../data/sampleData';

interface RisksPageProps {
  onNavigate: (page: PageType) => void;
  onSelectRisk: (riskId: string) => void;
}

export const RisksPage: React.FC<RisksPageProps> = ({
  onNavigate,
  onSelectRisk,
}) => {
  const [filterLevel, setFilterLevel] = useState<string>('ALL');

  const filteredRisks = SAMPLE_RISKS.filter((r) => {
    if (filterLevel === 'ALL') return true;
    return r.risk_level === filterLevel;
  });

  const getRiskIcon = (level: RiskSeverity) => {
    switch (level) {
      case 'CRITICAL':
      case 'HIGH':
        return <AlertOctagon className="w-5 h-5 text-[var(--danger)]" />;
      case 'MEDIUM':
        return <AlertTriangle className="w-5 h-5 text-[var(--warning)]" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-[var(--success)]" />;
    }
  };

  const getSeverityBadge = (level: RiskSeverity) => {
    switch (level) {
      case 'HIGH':
        return (
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[var(--danger-light)] text-[var(--danger)] border border-[var(--danger)]/30">
            🔴 HIGH RISK
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[var(--warning-light)] text-[var(--warning)] border border-[var(--warning)]/30">
            🟠 MEDIUM RISK
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[var(--success-light)] text-[var(--success)] border border-[var(--success)]/30">
            🟢 COMPLIANT
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--danger)]">
              CONFLICT PRIORITIZATION
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--muted)] text-[var(--muted-foreground)]">
              6 Identified Findings
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] tracking-tight mt-1">
            Compliance Risks & Policy Divergences
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">
            Prioritized evaluation connecting contractual clauses against internal GRC constraints.
          </p>
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl border border-[var(--border)] bg-[var(--card)]">
          {[
            { id: 'ALL', label: 'All Risks (6)' },
            { id: 'HIGH', label: 'High (2)' },
            { id: 'MEDIUM', label: 'Medium (2)' },
            { id: 'LOW', label: 'Compliant (2)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterLevel(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterLevel === tab.id
                  ? 'bg-[var(--accent)] text-[var(--primary-foreground)] shadow-xs'
                  : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Risk Cards List */}
      <div className="space-y-6">
        {filteredRisks.map((risk) => {
          const isHigh = risk.risk_level === 'HIGH';
          return (
            <motion.div
              key={risk.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--card-shadow)] p-6 transition-all hover:border-[var(--accent)] group"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[var(--border)] gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                    {getRiskIcon(risk.risk_level)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base sm:text-lg font-bold text-[var(--foreground)]">
                        {risk.title}
                      </h2>
                      {getSeverityBadge(risk.risk_level)}
                    </div>
                    <span className="text-xs text-[var(--muted-foreground)]">
                      Category: <strong className="text-[var(--foreground)]">{risk.category}</strong>
                    </span>
                  </div>
                </div>

                {/* Right CTA: Investigate Risk → */}
                <button
                  id={`investigate-btn-${risk.id}`}
                  onClick={() => {
                    onSelectRisk(risk.id);
                    onNavigate('evidence');
                  }}
                  className="px-4 py-2 rounded-xl bg-[var(--accent)] text-[var(--primary-foreground)] text-xs font-bold hover:brightness-110 shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
                >
                  <span>Investigate Risk</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Side-by-Side Clause Quotes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                {/* Contract Clause */}
                <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[var(--accent)] font-semibold flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      Contract ({risk.contract_section})
                    </span>
                    <span className="font-mono font-bold px-2 py-0.5 rounded bg-[var(--muted)] text-[var(--foreground)] text-[11px]">
                      {risk.contract_metric}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed italic border-l-2 border-[var(--accent)] pl-3">
                    "{risk.contract_clause}"
                  </p>
                </div>

                {/* Policy Clause */}
                <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[var(--secondary)] font-semibold flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      Policy ({risk.policy_section})
                    </span>
                    <span className="font-mono font-bold px-2 py-0.5 rounded bg-[var(--muted)] text-[var(--foreground)] text-[11px]">
                      {risk.policy_metric}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed italic border-l-2 border-[var(--secondary)] pl-3">
                    "{risk.policy_rule}"
                  </p>
                </div>
              </div>

              {/* Difference & Explanation Bar */}
              <div className="p-3.5 rounded-xl bg-[var(--muted)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-[var(--foreground)]">Metric Comparison:</span>
                  <span className="font-mono font-extrabold text-[var(--accent)] bg-[var(--card)] px-2 py-0.5 rounded border border-[var(--border)]">
                    {risk.contract_metric} vs {risk.policy_metric}
                  </span>
                  <span className="text-[var(--muted-foreground)]">({risk.difference})</span>
                </div>

                <div className="text-[11px] text-[var(--muted-foreground)] italic">
                  Recommended: {risk.recommended_action.slice(0, 75)}...
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
