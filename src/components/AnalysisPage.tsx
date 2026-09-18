import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon, 
  ShieldCheck, 
  Search, 
  Filter, 
  Clock, 
  UserCheck, 
  ChevronRight, 
  FileText, 
  ExternalLink,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { PageType, Obligation, RiskStatus } from '../types';
import { SAMPLE_OBLIGATIONS, INITIAL_ANALYSIS_STATS } from '../data/sampleData';

interface AnalysisPageProps {
  onNavigate: (page: PageType) => void;
  onSelectRisk: (riskId: string) => void;
  complianceScore: number;
}

export const AnalysisPage: React.FC<AnalysisPageProps> = ({
  onNavigate,
  onSelectRisk,
  complianceScore,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const filteredObligations = SAMPLE_OBLIGATIONS.filter((item) => {
    const matchesStatus = 
      filterStatus === 'ALL' ||
      (filterStatus === 'HIGH' && item.severity === 'High') ||
      (filterStatus === 'MEDIUM' && item.severity === 'Medium') ||
      (filterStatus === 'COMPLIANT' && item.status === 'COMPLIANT');

    const matchesSearch = 
      item.obligation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.responsible_party.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source_section.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: RiskStatus, severity: string) => {
    if (status === 'CONFLICT') {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--danger-light)] text-[var(--danger)] border border-[var(--danger)]/20">
          <AlertOctagon className="w-3 h-3" /> CONFLICT ({severity})
        </span>
      );
    }
    if (status === 'POTENTIAL_RISK') {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--warning-light)] text-[var(--warning)] border border-[var(--warning)]/20">
          <AlertTriangle className="w-3 h-3" /> POTENTIAL RISK ({severity})
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--success-light)] text-[var(--success)] border border-[var(--success)]/20">
        <CheckCircle2 className="w-3 h-3" /> COMPLIANT
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner with Document Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)]">
              ANALYSIS COMPLETE
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--muted)] text-[var(--muted-foreground)] font-mono">
              MSA-2026-ACME-884
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] tracking-tight mt-1">
            ACME Supplier Master Services Agreement
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">
            Compared against: <strong className="text-[var(--foreground)]">Enterprise Data Governance & Security Policy V4</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('risks')}
            className="px-4 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--surface-hover)] shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Inspect Risk Summary</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              onSelectRisk('risk-retention-01');
              onNavigate('evidence');
            }}
            className="px-4 py-2 rounded-xl bg-[var(--accent)] text-[var(--primary-foreground)] text-xs font-semibold hover:brightness-110 shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open Evidence Viewer</span>
          </button>
        </div>
      </div>

      {/* Hero Metric Section: Compliance Score 72% and 12/3/5/4 Breakdown */}
      <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--card-shadow)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Compliance Score Donut / Stat */}
          <div className="md:col-span-4 flex items-center gap-5 border-b md:border-b-0 md:border-r border-[var(--border)] pb-6 md:pb-0 md:pr-6">
            <div className="relative flex items-center justify-center w-24 h-24 rounded-full border-4 border-[var(--accent)] bg-[var(--surface)] text-[var(--foreground)] shadow-inner">
              <span className="text-3xl font-extrabold font-mono tracking-tighter">
                {complianceScore}%
              </span>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                Compliance Score
              </span>
              <h2 className="text-lg font-bold text-[var(--foreground)] leading-snug mt-0.5">
                Moderate Liability Exposure
              </h2>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">
                AI-assisted compliance risk classification • 2 critical policy conflicts flagged
              </p>
            </div>
          </div>

          {/* 4 Metric Pills */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center">
              <span className="text-2xl font-extrabold font-mono text-[var(--foreground)]">12</span>
              <span className="block text-xs text-[var(--muted-foreground)] font-medium mt-0.5">
                Obligations
              </span>
            </div>
            <div className="p-4 rounded-xl border border-[var(--danger)]/30 bg-[var(--danger-light)] text-center">
              <span className="text-2xl font-extrabold font-mono text-[var(--danger)]">3</span>
              <span className="block text-xs text-[var(--danger)] font-bold mt-0.5">
                High Risk
              </span>
            </div>
            <div className="p-4 rounded-xl border border-[var(--warning)]/30 bg-[var(--warning-light)] text-center">
              <span className="text-2xl font-extrabold font-mono text-[var(--warning)]">5</span>
              <span className="block text-xs text-[var(--warning)] font-bold mt-0.5">
                Medium Risk
              </span>
            </div>
            <div className="p-4 rounded-xl border border-[var(--success)]/30 bg-[var(--success-light)] text-center">
              <span className="text-2xl font-extrabold font-mono text-[var(--success)]">4</span>
              <span className="block text-xs text-[var(--success)] font-bold mt-0.5">
                Compliant
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl border border-[var(--border)] bg-[var(--card)] w-full sm:w-auto overflow-x-auto">
          {[
            { id: 'ALL', label: 'All Obligations (12)' },
            { id: 'HIGH', label: 'High Risk (3)' },
            { id: 'MEDIUM', label: 'Medium Risk (5)' },
            { id: 'COMPLIANT', label: 'Compliant (4)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterStatus === tab.id
                  ? 'bg-[var(--accent)] text-[var(--primary-foreground)] shadow-xs'
                  : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Search obligations, SLAs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--card)] text-xs text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>
      </div>

      {/* Obligation Cards Grid */}
      <div className="space-y-4">
        {filteredObligations.map((item) => {
          const isExpanded = expandedCardId === item.id;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xs hover:border-[var(--accent)]/60 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[var(--accent)] bg-[var(--muted)] px-2.5 py-0.5 rounded-md">
                      {item.source_section}
                    </span>
                    <span className="text-[11px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)]">
                      {item.category}
                    </span>
                    {getStatusBadge(item.status, item.severity)}
                  </div>

                  <h3 className="text-base font-bold text-[var(--foreground)] leading-snug">
                    {item.obligation}
                  </h3>

                  {/* Metadata Chips: Responsible Party & Deadline */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--muted-foreground)] pt-1">
                    <div className="flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span>Party: <strong className="text-[var(--foreground)]">{item.responsible_party}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[var(--warning)]" />
                      <span>Deadline: <strong className="text-[var(--foreground)] font-mono">{item.deadline}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-[var(--border)]">
                  {item.risk_id && (
                    <button
                      onClick={() => {
                        onSelectRisk(item.risk_id!);
                        onNavigate('evidence');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[var(--accent)] text-[var(--primary-foreground)] text-xs font-semibold hover:brightness-110 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>Investigate Evidence</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => setExpandedCardId(isExpanded ? null : item.id)}
                    className="px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                  >
                    {isExpanded ? 'Hide Source' : 'View Source'}
                  </button>
                </div>
              </div>

              {/* Expandable Source Text */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-3 border-t border-[var(--border)] text-xs font-mono text-[var(--muted-foreground)] bg-[var(--surface)] p-3 rounded-xl leading-relaxed border-l-3 border-l-[var(--accent)]"
                >
                  <span className="font-bold text-[var(--foreground)] block mb-1">
                    Original Contractual Clause Source Text:
                  </span>
                  "{item.source_text}"
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
