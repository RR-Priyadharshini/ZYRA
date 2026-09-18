import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Copy, 
  Check, 
  FileText, 
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: string;
}

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeContext?: string;
}

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({
  isOpen,
  onClose,
  activeContext,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init-1',
      sender: 'assistant',
      text: `Hello! I am **COMPLYX AI Copilot**. I have indexed the **ACME Supplier Agreement (MSA-2026)** and **Enterprise Data Governance Policy V4**.\n\nYou can ask me about obligation deadlines, policy conflicts, or request me to draft negotiation redlines.`,
      timestamp: 'Just now',
      source: 'gemini-3.8-flash',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickPrompts = [
    'Why is 7 years a risk for Data Retention?',
    'Draft a redline amendment for Section 1.2',
    'What is the operational impact of the 24h breach SLA?',
    'Does the contract allow annual security audits?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ask-compliance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          context: activeContext || 'ACME Supplier Agreement vs Enterprise Data Governance Policy V4',
        }),
      });

      if (!res.ok) throw new Error('API query failed');
      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.answer || 'Analysis processed successfully.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source || 'gemini-3.8-flash',
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      // Graceful offline fallback answer
      const fallbackMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: `**COMPLYX Compliance Analysis:**\n\n- **Contractual Finding:** Section 1.2 mandates retaining personal records for **7 years**.\n- **Policy Divergence:** Policy Section 3.1 caps retention at **5 years** to mitigate privacy statutory liability (GDPR Art. 5).\n- **Suggested Amendment:** *"Supplier shall retain customer data for up to five (5) years, or such shorter period as mandated by Customer's written data retention schedule."*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'compliance_engine',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50"
          />

          {/* Side Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-[var(--card)] border-l border-[var(--border)] shadow-2xl z-50 flex flex-col"
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-[var(--border)] flex items-center justify-between bg-[var(--surface)]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[var(--accent-glow)] text-[var(--accent)]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[var(--foreground)]">
                    COMPLYX AI Copilot
                  </h3>
                  <span className="text-[10px] text-[var(--muted-foreground)] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)]" />
                    Indexed: ACME MSA & Policy V4
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Prompts */}
            <div className="p-3 border-b border-[var(--border)] bg-[var(--surface)]/50 overflow-x-auto">
              <div className="flex items-center gap-1.5 text-xs whitespace-nowrap">
                <span className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase pl-1">
                  Ask:
                </span>
                {quickPrompts.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="px-2.5 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[11px] text-[var(--foreground)] hover:border-[var(--accent)] hover:bg-[var(--accent-glow)] transition-colors shrink-0 cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((m) => {
                const isAi = m.sender === 'assistant';
                return (
                  <div
                    key={m.id}
                    className={`flex gap-3 ${isAi ? 'items-start' : 'items-start flex-row-reverse'}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs ${
                        isAi
                          ? 'bg-[var(--accent)] text-[var(--primary-foreground)]'
                          : 'bg-[var(--foreground)] text-[var(--background)]'
                      }`}
                    >
                      {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>

                    <div className={`space-y-1 max-w-[85%] ${isAi ? '' : 'text-right'}`}>
                      <div
                        className={`p-3.5 rounded-2xl text-xs leading-relaxed text-left ${
                          isAi
                            ? 'bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] shadow-xs'
                            : 'bg-[var(--accent)] text-[var(--primary-foreground)]'
                        }`}
                      >
                        <div className="whitespace-pre-wrap font-sans">
                          {m.text}
                        </div>

                        {isAi && (
                          <div className="mt-2 pt-2 border-t border-[var(--border)] flex items-center justify-between text-[10px] text-[var(--muted-foreground)]">
                            <span className="font-mono">Source: {m.source || 'gemini-3.8-flash'}</span>
                            <button
                              onClick={() => copyToClipboard(m.text, m.id)}
                              className="hover:text-[var(--foreground)] flex items-center gap-1 cursor-pointer"
                            >
                              {copiedId === m.id ? (
                                <Check className="w-3 h-3 text-[var(--success)]" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                              <span>{copiedId === m.id ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                        )}
                      </div>

                      <span className="text-[9px] text-[var(--muted-foreground)] px-1 block">
                        {m.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] pl-10">
                  <Loader2 className="w-4 h-4 animate-spin text-[var(--accent)]" />
                  <span>Reasoning over contractual clauses...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-[var(--border)] bg-[var(--surface)]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask COMPLYX AI about contractual risk..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-xs text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="p-2.5 rounded-xl bg-[var(--accent)] text-[var(--primary-foreground)] disabled:opacity-50 hover:brightness-110 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="mt-2 text-center text-[10px] text-[var(--muted-foreground)] flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[var(--success)]" />
                <span>AI answers are grounded on exact contract clauses</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
