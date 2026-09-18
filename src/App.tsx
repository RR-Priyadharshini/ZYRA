import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { DashboardPage } from './components/DashboardPage';
import { UploadPage } from './components/UploadPage';
import { AnalysisPage } from './components/AnalysisPage';
import { RisksPage } from './components/RisksPage';
import { EvidenceViewerPage } from './components/EvidenceViewerPage';
import { AIChatDrawer } from './components/AIChatDrawer';
import { PageType } from './types';
import { ShieldCheck, Sparkles, AlertTriangle } from 'lucide-react';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [selectedRiskId, setSelectedRiskId] = useState<string>('risk-retention-01');
  const [isAIChatOpen, setIsAIChatOpen] = useState<boolean>(false);
  const [complianceScore, setComplianceScore] = useState<number>(72);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSelectRisk = (riskId: string) => {
    setSelectedRiskId(riskId);
  };

  const handleLoadDemo = () => {
    showNotification('Loaded ACME Supplier Agreement & GRC Policy V4');
  };

  const handleAnalysisComplete = () => {
    showNotification('AI Pipeline Complete: 12 Obligations & 3 High Risks identified');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] theme-transition">
      {/* Global Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page)}
        onOpenAIChat={() => setIsAIChatOpen(true)}
        complianceScore={complianceScore}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'landing' && (
          <LandingPage
            onNavigate={(page) => setCurrentPage(page)}
            onLoadDemo={() => {
              handleLoadDemo();
              setSelectedRiskId('risk-retention-01');
            }}
          />
        )}

        {currentPage === 'dashboard' && (
          <DashboardPage
            onNavigate={(page) => setCurrentPage(page)}
            onSelectRisk={(id) => {
              handleSelectRisk(id);
              setCurrentPage('evidence');
            }}
            complianceScore={complianceScore}
          />
        )}

        {currentPage === 'upload' && (
          <UploadPage
            onNavigate={(page) => setCurrentPage(page)}
            onAnalysisComplete={handleAnalysisComplete}
          />
        )}

        {currentPage === 'analysis' && (
          <AnalysisPage
            onNavigate={(page) => setCurrentPage(page)}
            onSelectRisk={(id) => {
              handleSelectRisk(id);
              setCurrentPage('evidence');
            }}
            complianceScore={complianceScore}
          />
        )}

        {currentPage === 'risks' && (
          <RisksPage
            onNavigate={(page) => setCurrentPage(page)}
            onSelectRisk={(id) => {
              handleSelectRisk(id);
              setCurrentPage('evidence');
            }}
          />
        )}

        {currentPage === 'evidence' && (
          <EvidenceViewerPage
            selectedRiskId={selectedRiskId}
            onSelectRisk={handleSelectRisk}
            onOpenAIChat={() => setIsAIChatOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--surface)]/60 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted-foreground)]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[var(--accent)]" />
            <span className="font-bold text-[var(--foreground)]">COMPLYX AI</span>
            <span>— Autonomous Contract & Compliance Intelligence</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Active Dataset: ACME MSA-2026 vs Policy V4</span>
            <span>•</span>
            <span className="font-mono">Status: 100% Traceable</span>
          </div>
        </div>
      </footer>

      {/* Floating AI Copilot Trigger for Instant Access */}
      <button
        id="floating-ai-btn"
        onClick={() => setIsAIChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[var(--accent)] text-[var(--primary-foreground)] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-white/20"
        title="Open AI Compliance Assistant"
      >
        <Sparkles className="w-5 h-5 animate-pulse" />
        <span className="hidden sm:inline font-bold text-xs">Ask AI Copilot</span>
      </button>

      {/* AI Chat Copilot Drawer */}
      <AIChatDrawer
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        activeContext={`Current Page: ${currentPage}. Selected Finding ID: ${selectedRiskId}`}
      />

      {/* Global Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-[var(--foreground)] text-[var(--background)] text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <ShieldCheck className="w-4 h-4 text-[var(--success)]" />
          <span>{notification}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
