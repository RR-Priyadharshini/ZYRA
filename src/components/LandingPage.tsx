import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  BrainCircuit, 
  Network, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Scale, 
  SplitSquareVertical, 
  Clock, 
  FileSearch,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { PageType } from '../types';

interface LandingPageProps {
  onNavigate: (page: PageType) => void;
  onLoadDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onLoadDemo }) => {
  const workflowSteps = [
    {
      step: '01',
      title: 'Contract Ingestion',
      desc: 'Raw PDF/DOCX contractual agreements parsed with exact page & clause coordinate preservation.',
      icon: FileText,
      badge: 'Unstructured Text',
    },
    {
      step: '02',
      title: 'AI Extraction',
      desc: 'Autonomous extraction of obligations, responsible entities, strict deadlines, and frequencies.',
      icon: BrainCircuit,
      badge: 'Semantic NLP',
    },
    {
      step: '03',
      title: 'Policy Mapping',
      desc: 'Internal compliance frameworks (SOC2, ISO27001, GRC, GDPR) mapped dynamically against obligations.',
      icon: Network,
      badge: 'Rules Engine',
    },
    {
      step: '04',
      title: 'Risk Detection',
      desc: 'Deterministic conflict categorization into Critical, High, Medium, and Compliant statuses.',
      icon: AlertTriangle,
      badge: 'Difference Engine',
    },
    {
      step: '05',
      title: 'Evidence Verification',
      desc: 'Split-screen side-by-side verification connecting verbatim clauses with recommended redline actions.',
      icon: ShieldCheck,
      badge: '100% Traceable',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
        {/* Ambient background glow */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-500"
          style={{ background: 'var(--hero-glow)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Top pill badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold shadow-xs mb-6"
            >
              <span className="flex h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="text-[var(--foreground)]">COMPLYX Autonomous Legal GRC Engine</span>
              <span className="text-[var(--muted-foreground)]">•</span>
              <span className="text-[var(--accent)] font-mono">v1.0 MVP</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.15]"
            >
              Turn Contracts Into <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] via-[var(--secondary)] to-[var(--accent)]">
                Compliance Intelligence.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed"
            >
              AI-powered analysis that extracts obligations, connects them with organizational policies, 
              detects risks, and explains every finding with evidence.
            </motion.p>

            {/* Call To Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5"
            >
              <button
                id="hero-analyze-btn"
                onClick={() => onNavigate('upload')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--accent)] text-[var(--primary-foreground)] font-semibold text-sm shadow-md hover:shadow-lg hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <BrainCircuit className="w-4 h-4" />
                <span>Analyze a Contract</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-demo-btn"
                onClick={() => {
                  onLoadDemo();
                  onNavigate('evidence');
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--foreground)] font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                <span>View Demo (ACME MSA)</span>
              </button>
            </motion.div>

            {/* Trust disclaimer badge */}
            <div className="mt-5 text-xs text-[var(--muted-foreground)] flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[var(--success)]" />
              <span>Evidence-backed reasoning with verbatim clause tracing • Not legal advice</span>
            </div>
          </div>

          {/* Interactive Hero Highlight Card: 7 Years vs 5 Years Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-14 max-w-4xl mx-auto rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--card-shadow)] p-5 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[var(--border)] gap-2">
              <div className="flex items-center gap-2.5">
                <span className="flex h-3 w-3 rounded-full bg-[var(--danger)]" />
                <span className="font-bold text-sm text-[var(--foreground)]">
                  Live Signature Conflict Example
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[var(--danger-light)] text-[var(--danger)]">
                  CRITICAL CONFLICT
                </span>
              </div>
              <button
                onClick={() => onNavigate('evidence')}
                className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
              >
                Inspect in Split-Screen Evidence Viewer
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Left: Contract */}
              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] relative">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-[var(--accent)] font-semibold">CONTRACT • Section 1.2</span>
                  <span className="px-2 py-0.5 rounded-full bg-[var(--muted)] text-[var(--foreground)] font-mono text-[11px] font-bold">
                    7 Years
                  </span>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed italic border-l-2 border-[var(--accent)] pl-3">
                  "Supplier shall retain all Customer personal data, audit logs, and transaction records for a mandatory duration of <strong className="text-[var(--foreground)] underline decoration-[var(--danger)] decoration-2">seven (7) years</strong> following creation..."
                </p>
              </div>

              {/* Right: Policy */}
              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] relative">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-[var(--secondary)] font-semibold">ORGANIZATIONAL POLICY • Section 3.1</span>
                  <span className="px-2 py-0.5 rounded-full bg-[var(--muted)] text-[var(--foreground)] font-mono text-[11px] font-bold">
                    5 Years Max
                  </span>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed italic border-l-2 border-[var(--secondary)] pl-3">
                  "Customer personal data and identification records <strong className="text-[var(--foreground)] underline decoration-[var(--danger)] decoration-2">must not be retained beyond five (5) years</strong> from account closure..."
                </p>
              </div>
            </div>

            {/* Bottom Difference Callout */}
            <div className="mt-4 pt-3 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[var(--danger)]">⚠ CONFLICT DETECTED:</span>
                <span className="text-[var(--foreground)] font-medium">7 years vs 5 years</span>
                <span className="text-[var(--muted-foreground)]">(2 years statutory retention delta)</span>
              </div>
              <button
                onClick={() => onNavigate('evidence')}
                className="px-3 py-1.5 rounded-lg bg-[var(--accent)] text-[var(--primary-foreground)] font-semibold text-xs hover:opacity-95 transition-opacity cursor-pointer text-center"
              >
                Investigate Risk & View Redline →
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Animated Pipeline Workflow Section */}
      <section className="py-14 border-y border-[var(--border)] bg-[var(--surface)]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
              Autonomous Intelligence Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-2">
              How COMPLYX AI systematically processes contracts, detects compliance friction, and surfaces evidence
            </p>
          </div>

          {/* 5-Step Workflow Cards with Framer Motion */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            {workflowSteps.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 relative flex flex-col justify-between hover:border-[var(--accent)] transition-all group shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-extrabold text-[var(--accent)]">
                        {item.step}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]">
                        {item.badge}
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-lg bg-[var(--accent-glow)] text-[var(--accent)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>

                    <h3 className="font-bold text-sm text-[var(--foreground)] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {index < 4 && (
                    <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-4 h-4 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] text-[10px]">
                        →
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Quick Launch */}
          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer"
            >
              <span>Explore Compliance Intelligence Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Key Stats Bar */}
      <section className="py-8 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
              <div className="text-2xl sm:text-3xl font-extrabold text-[var(--accent)] font-mono">100%</div>
              <div className="text-xs text-[var(--muted-foreground)] mt-1 font-medium">Traceable Evidence</div>
            </div>
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
              <div className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] font-mono">3 Switchable</div>
              <div className="text-xs text-[var(--muted-foreground)] mt-1 font-medium">Live Visual Themes</div>
            </div>
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
              <div className="text-2xl sm:text-3xl font-extrabold text-[var(--warning)] font-mono">&lt; 3.5s</div>
              <div className="text-xs text-[var(--muted-foreground)] mt-1 font-medium">Conflict Resolution</div>
            </div>
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
              <div className="text-2xl sm:text-3xl font-extrabold text-[var(--success)] font-mono">72% Score</div>
              <div className="text-xs text-[var(--muted-foreground)] mt-1 font-medium">Vendor Compliance Baseline</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
