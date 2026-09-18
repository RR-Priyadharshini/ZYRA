import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UploadCloud, 
  FileText, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  Loader2, 
  ArrowRight, 
  FileCode, 
  Layers, 
  RefreshCw,
  Eye,
  FileCheck
} from 'lucide-react';
import { PageType, UploadedDocument } from '../types';
import { SAMPLE_CONTRACT_TEXT, SAMPLE_POLICY_TEXT } from '../data/sampleData';

interface UploadPageProps {
  onNavigate: (page: PageType) => void;
  onAnalysisComplete: () => void;
}

export const UploadPage: React.FC<UploadPageProps> = ({
  onNavigate,
  onAnalysisComplete,
}) => {
  const [contractFile, setContractFile] = useState<{ name: string; size: string } | null>({
    name: 'ACME_Supplier_Agreement_MSA-2026.pdf',
    size: '1.8 MB',
  });
  const [policyFile, setPolicyFile] = useState<{ name: string; size: string } | null>({
    name: 'Enterprise_Data_Governance_Policy_V4.pdf',
    size: '840 KB',
  });

  const [contractText, setContractText] = useState(SAMPLE_CONTRACT_TEXT);
  const [policyText, setPolicyText] = useState(SAMPLE_POLICY_TEXT);
  const [isEditingText, setIsEditingText] = useState(false);

  // Analysis pipeline simulation
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentPipelineStep, setCurrentPipelineStep] = useState(0);

  const pipelineSteps = [
    { title: 'Reading Documents', desc: 'Parsing PDF text layers & structural headers' },
    { title: 'Extracting Obligations', desc: 'Isolating deadlines, SLAs, and responsible parties' },
    { title: 'Understanding Policies', desc: 'Normalizing organizational compliance constraints' },
    { title: 'Mapping Requirements', desc: 'Cross-referencing contractual clauses to policies' },
    { title: 'Detecting Conflicts', desc: 'Pinpointing numeric & operational discrepancies' },
    { title: 'Generating Evidence', desc: 'Assembling verbatim proof citations & redline guidance' },
  ];

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setCurrentPipelineStep(0);

    // Step through the animated pipeline
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < pipelineSteps.length) {
        setCurrentPipelineStep(step);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsAnalyzing(false);
          onAnalysisComplete();
          onNavigate('analysis');
        }, 600);
      }
    }, 700);
  };

  const handleLoadDemo = () => {
    setContractFile({ name: 'ACME_Supplier_Agreement_MSA-2026.pdf', size: '1.8 MB' });
    setPolicyFile({ name: 'Enterprise_Data_Governance_Policy_V4.pdf', size: '840 KB' });
    setContractText(SAMPLE_CONTRACT_TEXT);
    setPolicyText(SAMPLE_POLICY_TEXT);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-[var(--foreground)] tracking-tight">
          Contract & Policy Ingestion
        </h1>
        <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-2">
          Upload your supplier contract alongside your internal governance policy to trigger the autonomous compliance comparison pipeline.
        </p>

        {/* Demo Quick Load Banner */}
        <div className="mt-4 inline-flex items-center gap-2 p-1 pl-3 pr-1 rounded-full border border-[var(--border)] bg-[var(--card)] text-xs text-[var(--muted-foreground)]">
          <span>Preset Demo: ACME Supplier Agreement & GRC Policy V4</span>
          <button
            onClick={handleLoadDemo}
            className="px-2.5 py-1 rounded-full bg-[var(--accent)] text-[var(--primary-foreground)] font-semibold hover:brightness-110 transition-all cursor-pointer flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Two Upload Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CONTRACT UPLOAD BOX */}
        <div className="flex flex-col h-full rounded-2xl border-2 border-dashed border-[var(--border)] hover:border-[var(--accent)] bg-[var(--card)] p-6 transition-all group relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[var(--accent-glow)] text-[var(--accent)]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-base text-[var(--foreground)]">Contract Document</h2>
                <span className="text-[11px] text-[var(--muted-foreground)]">PDF, DOCX up to 25MB</span>
              </div>
            </div>
            {contractFile && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--success-light)] text-[var(--success)] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Ready
              </span>
            )}
          </div>

          <label 
            htmlFor="contract-input" 
            className="flex-1 flex flex-col items-center justify-center p-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] cursor-pointer transition-colors text-center"
          >
            <UploadCloud className="w-10 h-10 text-[var(--accent)] mb-3 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-semibold text-[var(--foreground)]">
              Drop your contract PDF here
            </p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              or click to browse from local drive
            </p>
            <input
              id="contract-input"
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  const f = e.target.files[0];
                  setContractFile({ name: f.name, size: `${(f.size / (1024 * 1024)).toFixed(1)} MB` });
                }
              }}
            />
          </label>

          {/* Current Contract File Info */}
          {contractFile && (
            <div className="mt-4 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 truncate">
                <FileCheck className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span className="font-medium text-[var(--foreground)] truncate">{contractFile.name}</span>
              </div>
              <span className="text-[var(--muted-foreground)] font-mono shrink-0">{contractFile.size}</span>
            </div>
          )}
        </div>

        {/* ORGANIZATIONAL POLICY UPLOAD BOX */}
        <div className="flex flex-col h-full rounded-2xl border-2 border-dashed border-[var(--border)] hover:border-[var(--secondary)] bg-[var(--card)] p-6 transition-all group relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[var(--muted)] text-[var(--secondary)]">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-base text-[var(--foreground)]">Organizational Policy</h2>
                <span className="text-[11px] text-[var(--muted-foreground)]">Internal GRC standard or guidelines</span>
              </div>
            </div>
            {policyFile && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--success-light)] text-[var(--success)] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Ready
              </span>
            )}
          </div>

          <label 
            htmlFor="policy-input" 
            className="flex-1 flex flex-col items-center justify-center p-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] cursor-pointer transition-colors text-center"
          >
            <UploadCloud className="w-10 h-10 text-[var(--secondary)] mb-3 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-semibold text-[var(--foreground)]">
              Drop your policy PDF here
            </p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              or click to browse from local drive
            </p>
            <input
              id="policy-input"
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  const f = e.target.files[0];
                  setPolicyFile({ name: f.name, size: `${(f.size / (1024 * 1024)).toFixed(1)} MB` });
                }
              }}
            />
          </label>

          {/* Current Policy File Info */}
          {policyFile && (
            <div className="mt-4 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 truncate">
                <FileCheck className="w-4 h-4 text-[var(--secondary)] shrink-0" />
                <span className="font-medium text-[var(--foreground)] truncate">{policyFile.name}</span>
              </div>
              <span className="text-[var(--muted-foreground)] font-mono shrink-0">{policyFile.size}</span>
            </div>
          )}
        </div>
      </div>

      {/* Start Analysis Button */}
      <div className="text-center pt-2">
        <button
          id="trigger-analysis-btn"
          disabled={isAnalyzing}
          onClick={handleStartAnalysis}
          className={`px-8 py-4 rounded-xl text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2.5 mx-auto cursor-pointer ${
            isAnalyzing 
              ? 'bg-[var(--muted)] text-[var(--muted-foreground)] cursor-not-allowed'
              : 'bg-[var(--accent)] text-[var(--primary-foreground)] hover:brightness-110 hover:shadow-xl active:scale-98'
          }`}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Executing Autonomous AI Pipeline...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Start Autonomous Compliance Analysis</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>

      {/* Animated AI Pipeline Modal / Visualizer */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-2xl relative overflow-hidden"
          >
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                AI Compliance Execution Engine
              </span>
              <h2 className="text-xl font-extrabold text-[var(--foreground)] mt-1">
                Processing Contract & Organizational Policy
              </h2>
            </div>

            {/* Vertical/Horizontal step tracker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {pipelineSteps.map((step, index) => {
                const isPast = currentPipelineStep > index;
                const isCurrent = currentPipelineStep === index;
                return (
                  <div
                    key={index}
                    className={`p-3.5 rounded-xl border transition-all text-center flex flex-col items-center justify-between ${
                      isPast
                        ? 'border-[var(--success)] bg-[var(--success-light)] text-[var(--success)]'
                        : isCurrent
                        ? 'border-[var(--accent)] bg-[var(--accent-glow)] text-[var(--foreground)] shadow-sm'
                        : 'border-[var(--border)] bg-[var(--surface)] text-[var(--muted-foreground)] opacity-60'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-2">
                      {isPast ? (
                        <CheckCircle2 className="w-5 h-5 text-[var(--success)]" />
                      ) : isCurrent ? (
                        <Loader2 className="w-5 h-5 text-[var(--accent)] animate-spin" />
                      ) : (
                        <span className="font-mono text-[var(--muted-foreground)]">{index + 1}</span>
                      )}
                    </div>
                    <div className="font-bold text-xs leading-snug">{step.title}</div>
                    <div className="text-[10px] mt-1 line-clamp-2">{step.desc}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Raw Document Text Peek / Toggle */}
      <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-[var(--muted-foreground)]" />
            <span className="text-xs font-bold text-[var(--foreground)]">
              Raw Extracted Text & Clause Preview (10 Clauses in MSA)
            </span>
          </div>
          <button
            onClick={() => setIsEditingText(!isEditingText)}
            className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isEditingText ? 'Hide Text' : 'View Text Clauses'}</span>
          </button>
        </div>

        {isEditingText && (
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="block text-[11px] font-bold text-[var(--muted-foreground)] mb-1">
                Contract Text Preview:
              </span>
              <textarea
                value={contractText}
                onChange={(e) => setContractText(e.target.value)}
                rows={8}
                className="w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--card)] text-xs font-mono text-[var(--foreground)] resize-none focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-[var(--muted-foreground)] mb-1">
                Policy Text Preview:
              </span>
              <textarea
                value={policyText}
                onChange={(e) => setPolicyText(e.target.value)}
                rows={8}
                className="w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--card)] text-xs font-mono text-[var(--foreground)] resize-none focus:outline-none focus:ring-1 focus:ring-[var(--secondary)]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
