import React, { useState } from 'react';
import { PageType } from '../types';
import { ThemeSwitcher } from './ThemeSwitcher';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  UploadCloud, 
  BrainCircuit, 
  AlertTriangle, 
  SplitSquareVertical, 
  Sparkles,
  Menu,
  X,
  FileCheck2,
  ExternalLink
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onOpenAIChat: () => void;
  complianceScore: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenAIChat,
  complianceScore,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { id: PageType; label: string; icon: any; badge?: string }[] = [
    { id: 'landing', label: 'Overview', icon: FileCheck2 },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', label: 'Upload & Pipeline', icon: UploadCloud },
    { id: 'analysis', label: 'AI Analysis', icon: BrainCircuit, badge: '72%' },
    { id: 'risks', label: 'Compliance Risks', icon: AlertTriangle, badge: '3 High' },
    { id: 'evidence', label: 'Evidence Viewer', icon: SplitSquareVertical, badge: 'Split' },
  ];

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--theme-nav-bg)] backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand / Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('landing')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] text-[var(--primary-foreground)] shadow-sm transition-transform duration-200 group-hover:scale-105">
                <ShieldCheck className="w-5 h-5" />
                <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--success)]"></span>
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-[var(--foreground)]">
                    COMPLYX<span className="text-[var(--accent)]">.AI</span>
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-md bg-[var(--muted)] text-[var(--muted-foreground)] border border-[var(--border)]">
                    MVP
                  </span>
                </div>
                <span className="text-[10px] text-[var(--muted-foreground)] font-medium hidden md:block">
                  Contract & Compliance Intelligence
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[var(--accent)] text-[var(--primary-foreground)] shadow-xs'
                      : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive
                          ? 'bg-black/20 text-white'
                          : 'bg-[var(--muted)] text-[var(--muted-foreground)]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools & Responsive Theme Switcher */}
          <div className="flex items-center gap-2.5">
            {/* Ask AI Assistant Drawer Button */}
            <button
              id="open-ai-chat-btn"
              onClick={onOpenAIChat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold text-[var(--foreground)] hover:border-[var(--accent)] hover:bg-[var(--surface-hover)] transition-all cursor-pointer shadow-xs group"
              title="Ask COMPLYX AI about contractual risk or draft redlines"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent)] animate-pulse" />
              <span className="hidden sm:inline">Ask AI Copilot</span>
              <span className="sm:hidden">AI</span>
            </button>

            {/* THEME SWITCHER (Desktop pills, tablet dropdown, mobile sheet) */}
            <ThemeSwitcher />

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-b border-[var(--border)] bg-[var(--card)] px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="px-2 py-1.5 text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[var(--accent)] text-[var(--primary-foreground)]'
                    : 'text-[var(--foreground)] hover:bg-[var(--surface-hover)]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/10 font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
