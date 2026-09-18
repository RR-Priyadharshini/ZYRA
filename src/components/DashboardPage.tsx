import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  CheckCircle2, 
  AlertOctagon, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  ArrowUpRight, 
  Filter, 
  Search, 
  Calendar,
  Layers,
  Sparkles,
  ChevronRight,
  TrendingDown,
  Info
} from 'lucide-react';
import { PageType, ComplianceRisk } from '../types';
import { RECENT_ISSUES, UPCOMING_DEADLINES } from '../data/sampleData';
import { useTheme } from '../context/ThemeContext';

interface DashboardPageProps {
  onNavigate: (page: PageType) => void;
  onSelectRisk: (riskId: string) => void;
  complianceScore: number;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  onSelectRisk,
  complianceScore,
}) => {
  const { theme, themes } = useTheme();
  const currentTheme = themes[theme];

  // Category distribution data
  const categories = [
    { name: 'Data Retention', count: 4, severity: 'HIGH', percentage: 28, color: 'var(--danger)' },
    { name: 'Subcontractors', count: 3, severity: 'HIGH', percentage: 22, color: 'var(--danger)' },
    { name: 'Incident Reporting', count: 3, severity: 'MEDIUM', percentage: 22, color: 'var(--warning)' },
    { name: 'Audit & Expense', count: 2, severity: 'MEDIUM', percentage: 14, color: 'var(--warning)' },
    { name: 'Data Deletion', count: 2, severity: 'COMPLIANT', percentage: 14, color: 'var(--success)' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Quick Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] tracking-tight">
              Compliance Intelligence Dashboard
            </h1>
            <span 
              className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-[var(--border)]"
              style={{ backgroundColor: 'var(--muted)', color: 'var(--accent)' }}
            >
              Live Demo Mode
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">
            Real-time compliance posture, conflict monitoring, and contractual obligation tracking
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('upload')}
            className="px-4 py-2 rounded-xl bg-[var(--accent)] text-[var(--primary-foreground)] text-xs font-semibold hover:brightness-110 shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Upload New Contract</span>
          </button>
          <button
            onClick={() => onNavigate('evidence')}
            className="px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] text-xs font-semibold hover:bg-[var(--surface-hover)] shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <AlertOctagon className="w-3.5 h-3.5 text-[var(--danger)]" />
            <span>View Evidence Split</span>
          </button>
        </div>
      </div>

      {/* Top 4 Executive KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Contracts */}
        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--card-shadow)] relative overflow-hidden group transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--muted-foreground)]">Total Contracts</span>
            <div className="p-2 rounded-xl bg-[var(--muted)] text-[var(--foreground)]">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[var(--foreground)] font-mono">24</span>
            <span className="text-xs text-[var(--success)] font-semibold flex items-center">
              +3 this month
            </span>
          </div>
          <div className="mt-3 text-[11px] text-[var(--muted-foreground)]">
            Active vendor MSAs, SOWs, and NDAs indexed
          </div>
        </motion.div>

        {/* Card 2: Obligations Detected */}
        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--card-shadow)] relative overflow-hidden group transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--muted-foreground)]">Obligations Detected</span>
            <div className="p-2 rounded-xl bg-[var(--accent-glow)] text-[var(--accent)]">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[var(--foreground)] font-mono">182</span>
            <span className="text-xs text-[var(--accent)] font-semibold">
              12 in current contract
            </span>
          </div>
          <div className="mt-3 text-[11px] text-[var(--muted-foreground)]">
            Extracted commitments with assigned SLAs
          </div>
        </motion.div>

        {/* Card 3: Compliance Score */}
        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--card-shadow)] relative overflow-hidden group transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--muted-foreground)]">Compliance Score</span>
            <div className="p-2 rounded-xl bg-[var(--warning-light)] text-[var(--warning)]">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-[var(--foreground)]">
              {complianceScore}%
            </span>
            <span className="text-xs text-[var(--warning)] font-semibold flex items-center">
              Requires 2 Redlines
            </span>
          </div>
          {/* Progress bar */}
          <div className="mt-3 w-full bg-[var(--muted)] h-2 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-700" 
              style={{ width: `${complianceScore}%`, backgroundColor: 'var(--accent)' }}
            />
          </div>
        </motion.div>

        {/* Card 4: Risks Breakdown */}
        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--card-shadow)] relative overflow-hidden group transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--muted-foreground)]">Active Compliance Risks</span>
            <div className="p-2 rounded-xl bg-[var(--danger-light)] text-[var(--danger)]">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div>
              <span className="text-xl font-extrabold text-[var(--danger)] font-mono">8</span>
              <span className="block text-[10px] text-[var(--muted-foreground)] font-semibold">High</span>
            </div>
            <div className="h-6 w-px bg-[var(--border)]" />
            <div>
              <span className="text-xl font-extrabold text-[var(--warning)] font-mono">13</span>
              <span className="block text-[10px] text-[var(--muted-foreground)] font-semibold">Med</span>
            </div>
            <div className="h-6 w-px bg-[var(--border)]" />
            <div>
              <span className="text-xl font-extrabold text-[var(--success)] font-mono">10</span>
              <span className="block text-[10px] text-[var(--muted-foreground)] font-semibold">Low</span>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-[var(--muted-foreground)]">
            Prioritized by GRC regulatory exposure
          </div>
        </motion.div>
      </div>

      {/* Middle Section: Recent Compliance Issues & Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Compliance Issues (Interactive Cards) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[var(--foreground)]">
                Recent Compliance Conflicts & Issues
              </h2>
              <p className="text-xs text-[var(--muted-foreground)]">
                Direct policy divergences identified by the compliance reasoning engine
              </p>
            </div>
            <button
              onClick={() => onNavigate('risks')}
              className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View all risks</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {RECENT_ISSUES.map((issue) => {
              const isHigh = issue.severity === 'HIGH';
              return (
                <motion.div
                  key={issue.id}
                  whileHover={{ scale: 1.005 }}
                  onClick={() => {
                    onSelectRisk('risk-retention-01');
                    onNavigate('evidence');
                  }}
                  className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition-all cursor-pointer shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg mt-0.5 shrink-0 ${
                      isHigh ? 'bg-[var(--danger-light)] text-[var(--danger)]' : 'bg-[var(--warning-light)] text-[var(--warning)]'
                    }`}>
                      {isHigh ? <AlertOctagon className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                          {issue.riskTitle}
                        </span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                          isHigh 
                            ? 'bg-[var(--danger-light)] text-[var(--danger)]' 
                            : 'bg-[var(--warning-light)] text-[var(--warning)]'
                        }`}>
                          {issue.severity}
                        </span>
                      </div>
                      <div className="text-xs text-[var(--muted-foreground)] mt-0.5">
                        {issue.contract} • <span className="font-semibold text-[var(--foreground)]">{issue.category}</span>
                      </div>
                      <div className="text-xs font-mono font-medium mt-1 text-[var(--accent)] bg-[var(--muted)] px-2 py-0.5 rounded inline-block">
                        {issue.metricComparison}
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-1 border-t sm:border-t-0 pt-2 sm:pt-0 border-[var(--border)]">
                    <span className="text-[11px] text-[var(--muted-foreground)]">{issue.daysAgo}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectRisk('risk-retention-01');
                        onNavigate('evidence');
                      }}
                      className="px-2.5 py-1 rounded-md bg-[var(--muted)] text-[var(--foreground)] group-hover:bg-[var(--accent)] group-hover:text-[var(--primary-foreground)] text-xs font-semibold transition-colors flex items-center gap-1"
                    >
                      <span>Investigate</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Theme-Adaptive Risk Distribution Chart & Legend */}
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-bold text-[var(--foreground)]">
              Risk Distribution by Category
            </h2>
            <p className="text-xs text-[var(--muted-foreground)]">
              Concentration of contractual exposures
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--card-shadow)] space-y-4">
            {/* Visual Bar Distribution */}
            <div className="h-3 w-full rounded-full overflow-hidden flex bg-[var(--muted)]">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                  title={`${cat.name}: ${cat.count} issues`}
                  className="h-full hover:opacity-80 transition-opacity"
                />
              ))}
            </div>

            {/* Category breakdown rows */}
            <div className="space-y-2.5 pt-2">
              {categories.map((cat, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2.5 h-2.5 rounded-full shrink-0" 
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="font-medium text-[var(--foreground)]">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[var(--muted-foreground)]">{cat.count} issues</span>
                    <span className="font-mono font-bold text-[var(--foreground)] w-8 text-right">
                      {cat.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[var(--border)] text-[11px] text-[var(--muted-foreground)] flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
              <span>Data Retention accounts for 28% of all compliance liabilities due to conflicting archival windows.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Upcoming Compliance Deadlines */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[var(--foreground)]">
              Upcoming Compliance Deadlines & Action Items
            </h2>
            <p className="text-xs text-[var(--muted-foreground)]">
              Contractual milestones and audit deadlines extracted from vendor agreements
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {UPCOMING_DEADLINES.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-xs hover:border-[var(--accent)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]">
                    {item.category}
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    item.riskLevel === 'HIGH' ? 'bg-[var(--danger-light)] text-[var(--danger)]' :
                    item.riskLevel === 'MEDIUM' ? 'bg-[var(--warning-light)] text-[var(--warning)]' :
                    'bg-[var(--success-light)] text-[var(--success)]'
                  }`}>
                    {item.riskLevel}
                  </span>
                </div>
                <h3 className="font-bold text-xs text-[var(--foreground)] leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[var(--muted-foreground)] mt-1">
                  {item.vendor}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-[var(--foreground)] font-mono text-[11px]">
                  <Clock className="w-3 h-3 text-[var(--accent)]" />
                  <span>{item.dueIn}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
