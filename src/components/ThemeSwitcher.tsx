import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Check, ChevronDown, Sparkles, X, Shield, Moon, Eye } from 'lucide-react';
import { useTheme, THEMES } from '../context/ThemeContext';
import { ThemeType } from '../types';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isTabletOpen, setIsTabletOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [previewTheme, setPreviewTheme] = useState<ThemeType | null>(null);

  const tabletRef = useRef<HTMLDivElement>(null);

  // Close tablet dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tabletRef.current && !tabletRef.current.contains(event.target as Node)) {
        setIsTabletOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeList: { id: ThemeType; label: string; short: string; icon: any; emoji: string }[] = [
    { id: 'trust', label: 'Trust Blue', short: 'Trust', icon: Shield, emoji: '🔵' },
    { id: 'midnight', label: 'Midnight Cyber', short: 'Midnight', icon: Moon, emoji: '🌙' },
    { id: 'aurora', label: 'Aurora Executive', short: 'Aurora', icon: Sparkles, emoji: '✨' },
  ];

  return (
    <>
      {/* =========================================================================
          1. DESKTOP VIEW (≥ 1024px)
          Inline compact pill-style buttons with active indicator, hover lift & glow
          ========================================================================= */}
      <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-xs relative">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] pl-2 pr-1 select-none flex items-center gap-1">
          <Palette className="w-3.5 h-3.5 text-[var(--accent)]" />
          Theme
        </span>

        <div className="flex items-center gap-1">
          {themeList.map((item) => {
            const isActive = theme === item.id;
            const meta = THEMES[item.id];

            return (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setPreviewTheme(item.id)}
                onMouseLeave={() => setPreviewTheme(null)}
              >
                <button
                  id={`theme-btn-${item.id}`}
                  onClick={() => setTheme(item.id)}
                  aria-pressed={isActive}
                  className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                    isActive
                      ? 'text-[var(--primary-foreground)] font-semibold shadow-xs'
                      : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:-translate-y-0.5'
                  }`}
                  style={{
                    backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                    boxShadow: isActive ? '0 0 14px var(--accent-glow)' : 'none',
                  }}
                >
                  <span className="text-xs leading-none">{item.emoji}</span>
                  <span>{item.short}</span>
                </button>

                {/* Live Mini Preview Popover on Desktop Hover */}
                <AnimatePresence>
                  {previewTheme === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 p-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-xl z-50 pointer-events-none"
                    >
                      <div className="flex items-center justify-between pb-1.5 border-b border-[var(--border)] mb-2">
                        <span className="text-xs font-bold text-[var(--foreground)] flex items-center gap-1.5">
                          <span>{item.emoji}</span>
                          {meta.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)] font-mono">
                          {meta.tagline}
                        </span>
                      </div>

                      {/* Mini Mock Dashboard UI */}
                      <div
                        className="rounded-lg p-2 border border-black/10 overflow-hidden text-[9px]"
                        style={{ backgroundColor: meta.bgColor, color: meta.id === 'midnight' ? '#F8FAFC' : '#0F172A' }}
                      >
                        <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-current/10">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: meta.accentColor }} />
                            <span className="font-bold">COMPLYX</span>
                          </div>
                          <span className="text-[8px] opacity-70">72% Score</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1 mb-1.5">
                          <div
                            className="p-1 rounded text-center"
                            style={{ backgroundColor: meta.surfaceColor, border: '1px solid rgba(128,128,128,0.2)' }}
                          >
                            <span className="block opacity-60 text-[7px]">Contracts</span>
                            <span className="font-bold text-[10px]">24</span>
                          </div>
                          <div
                            className="p-1 rounded text-center"
                            style={{ backgroundColor: meta.surfaceColor, border: '1px solid rgba(128,128,128,0.2)' }}
                          >
                            <span className="block opacity-60 text-[7px]">Risks</span>
                            <span className="font-bold text-[10px]" style={{ color: meta.accentColor }}>3 High</span>
                          </div>
                        </div>
                        {/* Swatches */}
                        <div className="flex items-center gap-1 pt-0.5">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: meta.accentColor }} title="Accent" />
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: meta.secondaryColor }} title="Secondary" />
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: meta.surfaceColor, border: '1px solid #ccc' }} title="Surface" />
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: meta.bgColor, border: '1px solid #999' }} title="Background" />
                        </div>
                      </div>

                      <div className="text-[10px] text-[var(--muted-foreground)] mt-2 leading-tight">
                        {meta.description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          2. TABLET VIEW (768px – 1023px)
          Compact [ 🎨 Theme ▾ ] dropdown popover
          ========================================================================= */}
      <div className="hidden md:flex lg:hidden relative" ref={tabletRef}>
        <button
          id="theme-tablet-trigger"
          onClick={() => setIsTabletOpen(!isTabletOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-colors shadow-xs"
          aria-expanded={isTabletOpen}
          aria-label="Select visual theme"
        >
          <span className="text-sm">{THEMES[theme].icon}</span>
          <span className="font-medium">{THEMES[theme].name}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-[var(--muted-foreground)] transition-transform duration-200 ${isTabletOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isTabletOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-xl p-2 z-50"
            >
              <div className="px-2.5 py-1.5 text-[11px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wider border-b border-[var(--border)] mb-1">
                Visual Identity
              </div>
              <div className="space-y-1">
                {themeList.map((item) => {
                  const meta = THEMES[item.id];
                  const isSelected = theme === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setTheme(item.id);
                        setIsTabletOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[var(--accent-glow)] text-[var(--foreground)] font-semibold'
                          : 'hover:bg-[var(--surface-hover)] text-[var(--foreground)]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{item.emoji}</span>
                        <div>
                          <div className="font-medium flex items-center gap-1.5">
                            {meta.name}
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: meta.accentColor }} />
                          </div>
                          <span className="text-[11px] text-[var(--muted-foreground)]">{meta.tagline}</span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[var(--accent)]" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =========================================================================
          3. MOBILE VIEW (< 768px)
          Single [ 🎨 ] icon button opening a sleek bottom sheet
          ========================================================================= */}
      <div className="flex md:hidden">
        <button
          id="theme-mobile-trigger"
          onClick={() => setIsMobileOpen(true)}
          className="p-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)] shadow-xs relative"
          aria-label="Open Appearance Theme selector"
        >
          <Palette className="w-4 h-4 text-[var(--accent)]" />
          <span
            className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-[var(--surface)]"
            style={{ backgroundColor: THEMES[theme].accentColor }}
          />
        </button>

        <AnimatePresence>
          {isMobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50"
              />

              {/* Slide-up Bottom Sheet */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 280 }}
                className="fixed bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-[var(--border)] bg-[var(--card)] p-5 z-50 shadow-2xl"
              >
                {/* Pull handle */}
                <div className="w-12 h-1.5 rounded-full bg-[var(--border)] mx-auto mb-4" />

                <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] mb-4">
                  <div>
                    <h3 className="text-base font-bold text-[var(--foreground)]">Choose Appearance</h3>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Instant live visual identity change across all components
                    </p>
                  </div>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-1.5 rounded-full text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 mb-6">
                  {themeList.map((item) => {
                    const meta = THEMES[item.id];
                    const isSelected = theme === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setTheme(item.id);
                          setIsMobileOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-left ${
                          isSelected
                            ? 'border-[var(--accent)] bg-[var(--accent-glow)] shadow-sm'
                            : 'border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.emoji}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm text-[var(--foreground)]">{meta.name}</span>
                              {isSelected && (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--accent)] text-[var(--primary-foreground)]">
                                  ACTIVE
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{meta.tagline}</p>
                            <p className="text-[11px] text-[var(--muted-foreground)]/80 mt-1 line-clamp-1">
                              {meta.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {/* Color preview dots */}
                          <div className="flex -space-x-1">
                            <div
                              className="w-4 h-4 rounded-full border border-[var(--card)]"
                              style={{ backgroundColor: meta.accentColor }}
                              title="Accent"
                            />
                            <div
                              className="w-4 h-4 rounded-full border border-[var(--card)]"
                              style={{ backgroundColor: meta.secondaryColor }}
                              title="Secondary"
                            />
                            <div
                              className="w-4 h-4 rounded-full border border-[var(--card)]"
                              style={{ backgroundColor: meta.bgColor }}
                              title="Background"
                            />
                          </div>
                          {isSelected && <Check className="w-5 h-5 text-[var(--accent)] ml-1" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full py-3 rounded-xl border border-[var(--border)] bg-[var(--muted)] text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-colors"
                >
                  Cancel
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
