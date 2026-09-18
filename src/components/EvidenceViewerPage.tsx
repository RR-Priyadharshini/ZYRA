import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  ShieldAlert, 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowRight, 
  ExternalLink,
  ChevronDown,
  Layers,
  Scale,
  GitCompare,
  PenTool
} from 'lucide-react';
import { ComplianceRisk } from '../types';
import { SAMPLE_RISKS } from '../data/sampleData';

interface EvidenceViewerPageProps {
  selectedRiskId: string;
  onSelectRisk: (id: string) => void;
  onOpenAIChat: () => void;
}

export const EvidenceViewerPage: React.FC<EvidenceViewerPageProps> = ({
  selectedRiskId,
  onSelectRisk,
  onOpenAIChat,
}) => {
  const [copiedRedline, setCopiedRedline] = useState(false);
  const [reviewStatus, setReviewStatus] = useState<'open' | 'in_review' | 'resolved'>('open');

  const currentRisk = SAMPLE_RISKS.find((r) => r.id === selectedRiskId) || SAMPLE_RISKS[0];

  const handleCopyRedline = () => {
    if (currentRisk.proposed_redline) {
      navigator.clipboard.writeText(currentRisk.proposed_redline);
      setCopiedRedline(true);
      setTimeout(() => setCopiedRedline(false), 2000);
    }
  };

  const isHigh = currentRisk.risk_level === 'HIGH';
  const isCompliant = currentRisk.status === 'COMPLIANT';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Risk Navigator Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              SIGNATURE FEATURE
            </span>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)] font-mono">
              Deterministic Evidence Trace
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] tracking-tight mt-1">
            Split-Screen Compliance Evidence
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">
            Directly cross-reference contractual clauses against governing policy rules with AI-backed reasoning.
          </p>
        </div>

        {/* Quick Action Button to Ask AI Copilot */}
        <button
          onClick={onOpenAIChat}
          className="px-4 py-2 rounded-xl bg-[var(--accent)] text-[var(--primary-foreground)] text-xs font-semibold hover:brightness-110 shadow-xs transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask AI About This Conflict</span>
        </button>
      </div>

      {/* Selectable Risk Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <span className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider whitespace-nowrap pl-1">
          Select Finding:
        </span>
        {SAMPLE_RISKS.map((r) => {
          const isActive = r.id === currentRisk.id;
          return (
            <button
              key={r.id}
              onClick={() => onSelectRisk(r.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-[var(--foreground)] text-[var(--background)] shadow-sm'
                  : 'bg-[var(--card)] border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)]'
              }`}
            >
              <span className="text-[10px]">
                {r.risk_level === 'HIGH' ? '🔴' : r.risk_level === 'MEDIUM' ? '🟠' : '🟢'}
              </span>
              <span>{r.title}</span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          SIGNATURE SPLIT-SCREEN INTERFACE
          LEFT: Contract (Section 4.2 / 1.2)
          CENTER: ⚠ CONFLICT DETECTED with animated connection beam
          RIGHT: Organizational Policy (Section 3.1)
          ========================================================================= */}
      <div className="relative rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--card-shadow)] p-6 sm:p-8 overflow-hidden">
        {/* Header inside Split-screen */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[var(--border)] gap-2">
          <div>
            <span className="text-xs font-mono font-bold text-[var(--muted-foreground)] uppercase">
              Current Finding #{currentRisk.id}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--foreground)] mt-0.5">
              {currentRisk.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-[var(--muted-foreground)] font-medium">Status:</span>
            <select
              value={reviewStatus}
              onChange={(e) => setReviewStatus(e.target.value as any)}
              className="text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
            >
              <option value="open">Open Finding</option>
              <option value="in_review">In Legal Review</option>
              <option value="resolved">Resolved / Amended</option>
            </select>
          </div>
        </div>

        {/* Split Grid with Center Animated Connector */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 my-8 relative items-stretch">
          {/* LEFT 5 COLS: CONTRACT */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-xs relative overflow-hidden group">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[var(--accent-glow)] text-[var(--accent)]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                      Source Document 1
                    </span>
                    <h3 className="font-bold text-sm text-[var(--foreground)]">
                      CONTRACT AGREEMENT
                    </h3>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[var(--accent)] bg-[var(--muted)] px-2.5 py-1 rounded-md">
                  {currentRisk.contract_section}
                </span>
              </div>

              {/* Document Reference Info */}
              <div className="text-[11px] text-[var(--muted-foreground)] font-medium">
                ACME Master Services Agreement (MSA-2026-ACME-884)
              </div>

              {/* Verbatim Highlighted Clause */}
              <div className="p-4 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-glow)]/40 relative">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] mb-2 flex items-center gap-1">
                  <span>Verbatim Contractual Clause:</span>
                </div>
                <p className="text-sm font-medium text-[var(--foreground)] leading-relaxed italic">
                  "{currentRisk.contract_clause}"
                </p>
                <div className="mt-3 pt-2 border-t border-[var(--accent)]/20 flex items-center justify-between">
                  <span className="text-[11px] text-[var(--muted-foreground)]">Extracted Requirement:</span>
                  <span className="font-mono font-extrabold text-sm text-[var(--accent)] bg-[var(--surface)] px-2.5 py-0.5 rounded border border-[var(--border)]">
                    {currentRisk.contract_metric}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--border)] text-[11px] text-[var(--muted-foreground)] flex items-center justify-between">
              <span>Section: {currentRisk.contract_section}</span>
              <span className="text-[var(--success)] font-medium">Verified by PDF Parser</span>
            </div>
          </div>

          {/* CENTER 1 COL: ANIMATED CONFLICT DETECTOR CONNECTOR */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center py-4 lg:py-0 relative">
            {/* Pulsing Connector beam */}
            <div className="hidden lg:block absolute inset-y-8 w-0.5 bg-gradient-to-b from-[var(--accent)] via-[var(--danger)] to-[var(--secondary)] opacity-40 animate-pulse" />

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className={`relative z-10 flex flex-col items-center justify-center p-3 rounded-2xl border shadow-lg text-center ${
                isCompliant
                  ? 'border-[var(--success)] bg-[var(--card)] text-[var(--success)]'
                  : 'border-[var(--danger)] bg-[var(--card)] text-[var(--danger)]'
              }`}
            >
              {isCompliant ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-[var(--success)] mb-1" />
                  <span className="text-[9px] font-extrabold tracking-tight uppercase leading-none">
                    ALIGNED
                  </span>
                </>
              ) : (
                <>
                  <AlertOctagon className="w-6 h-6 text-[var(--danger)] mb-1 animate-bounce" />
                  <span className="text-[9px] font-extrabold tracking-tight uppercase leading-none text-[var(--danger)]">
                    CONFLICT
                  </span>
                  <span className="text-[8px] font-mono mt-1 px-1 rounded bg-[var(--danger-light)] text-[var(--danger)] font-bold">
                    ≠ DELTA
                  </span>
                </>
              )}
            </motion.div>
          </div>

          {/* RIGHT 5 COLS: ORGANIZATIONAL POLICY */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-xs relative overflow-hidden group">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[var(--muted)] text-[var(--secondary)]">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                      Source Document 2
                    </span>
                    <h3 className="font-bold text-sm text-[var(--foreground)]">
                      ORGANIZATIONAL POLICY
                    </h3>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[var(--secondary)] bg-[var(--muted)] px-2.5 py-1 rounded-md">
                  {currentRisk.policy_section}
                </span>
              </div>

              {/* Policy Reference Info */}
              <div className="text-[11px] text-[var(--muted-foreground)] font-medium">
                Enterprise Data Governance & Security Policy (POL-SEC-2025-V4)
              </div>

              {/* Verbatim Highlighted Rule */}
              <div className="p-4 rounded-xl border border-[var(--secondary)]/30 bg-[var(--muted)]/60 relative">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--secondary)] mb-2 flex items-center gap-1">
                  <span>Governing Internal Policy Rule:</span>
                </div>
                <p className="text-sm font-medium text-[var(--foreground)] leading-relaxed italic">
                  "{currentRisk.policy_rule}"
                </p>
                <div className="mt-3 pt-2 border-t border-[var(--secondary)]/20 flex items-center justify-between">
                  <span className="text-[11px] text-[var(--muted-foreground)]">Internal Policy Ceiling:</span>
                  <span className="font-mono font-extrabold text-sm text-[var(--secondary)] bg-[var(--surface)] px-2.5 py-0.5 rounded border border-[var(--border)]">
                    {currentRisk.policy_metric}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--border)] text-[11px] text-[var(--muted-foreground)] flex items-center justify-between">
              <span>Rule: {currentRisk.policy_section}</span>
              <span className="text-[var(--secondary)] font-medium">Mandatory GRC Standard</span>
            </div>
          </div>
        </div>

        {/* Metric Divergence Banner */}
        <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs uppercase tracking-wider text-[var(--danger)]">
              Comparison Metric:
            </span>
            <span className="font-mono text-xs font-bold text-[var(--foreground)]">
              Contract ({currentRisk.contract_metric}) vs Policy ({currentRisk.policy_metric})
            </span>
          </div>
          <div className="text-xs font-mono font-semibold text-[var(--accent)] bg-[var(--card)] px-3 py-1 rounded-lg border border-[var(--border)]">
            Difference: {currentRisk.difference}
          </div>
        </div>

        {/* AI EXPLANATION AND RECOMMENDED ACTION SECTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--border)]">
          {/* AI Explanation Box */}
          <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--accent)]" />
              <h3 className="font-bold text-sm text-[var(--foreground)]">
                AI Compliance Reasoning & Analysis
              </h3>
            </div>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              {currentRisk.explanation}
            </p>
            <div className="pt-2 text-[11px] text-[var(--muted-foreground)]/80 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Evidence-backed reasoning mapped to GRC Rulebook</span>
            </div>
          </div>

          {/* Recommended Action & Redline Clause Box */}
          <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4 text-[var(--secondary)]" />
                <h3 className="font-bold text-sm text-[var(--foreground)]">
                  Recommended Action & Redline
                </h3>
              </div>
              {currentRisk.proposed_redline && (
                <button
                  onClick={handleCopyRedline}
                  className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copiedRedline ? <Check className="w-3.5 h-3.5 text-[var(--success)]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedRedline ? 'Copied' : 'Copy Redline'}</span>
                </button>
              )}
            </div>

            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              {currentRisk.recommended_action}
            </p>

            {currentRisk.proposed_redline && (
              <div className="p-3 rounded-xl bg-[var(--card)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)] leading-relaxed relative">
                <span className="block text-[10px] font-bold text-[var(--accent)] mb-1 uppercase tracking-wider">
                  Proposed Contract Amendment Clause:
                </span>
                {currentRisk.proposed_redline}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
