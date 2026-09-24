import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Phone,
  ArrowRight,
  RotateCcw,
  Minimize2,
  CheckCircle2,
  Heart,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sendChatMessage, checkAiBackendStatus } from '../services/aiService';

const AIAssistantWidget = ({ onOpenProfile, isOpen: externalIsOpen, onToggleOpen }) => {
  const { user } = useAuth();

  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = onToggleOpen || setInternalIsOpen;
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hello ${user?.name ? user.name.split(' ')[0] : 'there'}! 🐾 I am your **WESTE AI Animal Care & Adoption Specialist**.\n\nAsk me anything about:\n• **Adopting a pet** and matching your lifestyle\n• **Emergency first aid** for injured or orphaned wildlife\n• **Toxic foods & veterinary safety**\n• **Sanctuary visiting hours & volunteer programs**\n\nHow can I help you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'How do I adopt an animal?',
        'What should I do for an injured bird?',
        'Which foods are toxic to dogs?',
        'Sanctuary visiting hours'
      ]
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [backendStatus, setBackendStatus] = useState('connecting');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isTyping]);

  // Check backend connection on mount
  useEffect(() => {
    checkAiBackendStatus().then((info) => {
      setBackendStatus(info?.status === 'online' ? 'connected' : 'local-ready');
    });
  }, []);

  const handleSend = async (textToSend) => {
    const messageText = textToSend || inputValue;
    if (!messageText.trim()) return;

    const userMsgId = Date.now();
    const newUserMessage = {
      id: userMsgId,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Call the AI Backend
      const aiData = await sendChatMessage({
        message: messageText,
        user: user || {},
        history: messages.slice(-6).map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        }))
      });

      const newAiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiData.reply,
        suggestions: aiData.suggestions || [],
        action: aiData.action || null,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, newAiMessage]);
    } catch (err) {
      console.error('Failed to get AI reply:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: 'I am experiencing a momentary connection glitch. If this is an emergency, please call our 24/7 hotline at **+1 (800) 555-WILD**.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: ['Call Hotline', 'Sanctuary Address']
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleAction = (action) => {
    if (!action) return;
    if (action.type === 'CALL_HOTLINE') {
      window.location.href = `tel:${action.phone || '+18005559453'}`;
    } else if (action.type === 'NAVIGATE') {
      setIsOpen(false);
      const element = document.querySelector(action.target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (action.type === 'OPEN_PROFILE') {
      setIsOpen(false);
      if (onOpenProfile) onOpenProfile();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'ai',
        text: `Chat reset! How can I assist you with animals, adoptions, or wildlife triage today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          'How do I adopt an animal?',
          'What should I do for an injured bird?',
          'Sanctuary visiting hours'
        ]
      }
    ]);
  };

  // Basic formatting helper for AI text with linebreaks and bold
  const renderFormattedText = (text) => {
    return text.split('\n').map((line, idx) => {
      // Bold handling
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={idx} className="block min-h-[1.2em]">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-bold text-white">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </span>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* ================= Floating Launcher Button ================= */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 p-3.5 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 text-white shadow-2xl shadow-indigo-900/60 hover:shadow-indigo-600/50 transition-all duration-300 transform hover:scale-105 active:scale-95 border border-indigo-400/30"
          aria-label="Open WESTE AI Support Assistant"
        >
          {/* Pulsing ring indicator */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-900" />
          </span>

          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
          </div>

          <div className="hidden sm:block text-left pr-1">
            <span className="text-xs font-bold block leading-tight">WESTE AI Support</span>
            <span className="text-[10px] text-blue-200 block font-medium">Veterinary & Adoption AI</span>
          </div>
        </button>
      )}

      {/* ================= Chat Modal Drawer ================= */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-slate-900/95 border border-slate-700/90 rounded-3xl shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400" />

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-white">WESTE AI Specialist</h3>
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Backend AI
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <span>Available 24/7 • Animal Rescue Intelligence</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
                title="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
                title="Close AI Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-xl bg-indigo-600/30 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className="max-w-[85%] space-y-2">
                  <div
                    className={`p-3.5 rounded-2xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none shadow-md'
                        : 'bg-slate-800/90 border border-slate-700/70 text-slate-200 rounded-tl-none shadow-inner'
                    }`}
                  >
                    {renderFormattedText(msg.text)}
                  </div>

                  {/* Interactive Action Card if returned by AI */}
                  {msg.action && (
                    <button
                      onClick={() => handleAction(msg.action)}
                      className="w-full py-2 px-3 rounded-xl bg-indigo-950/80 hover:bg-indigo-900/90 border border-indigo-700/60 text-indigo-200 text-xs font-semibold flex items-center justify-between transition group shadow-sm"
                    >
                      <span className="flex items-center gap-1.5">
                        {msg.action.type === 'CALL_HOTLINE' && <Phone className="w-3.5 h-3.5 text-rose-400" />}
                        {msg.action.type === 'NAVIGATE' && <ArrowRight className="w-3.5 h-3.5 text-blue-400" />}
                        {msg.action.type === 'OPEN_PROFILE' && <User className="w-3.5 h-3.5 text-emerald-400" />}
                        <span>
                          {msg.action.type === 'CALL_HOTLINE' && '🚨 Call 24/7 Hotline Now'}
                          {msg.action.type === 'NAVIGATE' && '🐾 View Animals in Directory'}
                          {msg.action.type === 'OPEN_PROFILE' && '👤 Open My Account Profile'}
                        </span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  )}

                  {/* Follow-up suggestions */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestions.map((sug, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleSend(sug)}
                          className="px-2.5 py-1 rounded-full bg-slate-800/90 hover:bg-indigo-900/50 border border-slate-700 hover:border-indigo-500/60 text-[11px] text-slate-300 hover:text-white transition"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-slate-500 block px-1">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-blue-600/30 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs p-2">
                <Bot className="w-4 h-4 text-indigo-400 animate-spin" />
                <span>WESTE AI is researching veterinary response...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Emergency Hotline Strip */}
          <div className="px-4 py-2 bg-rose-950/40 border-t border-rose-900/40 flex items-center justify-between text-[11px] text-rose-300">
            <span className="flex items-center gap-1 font-semibold">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>Wildlife Emergency?</span>
            </span>
            <a
              href="tel:+18005559453"
              className="font-bold underline hover:text-white transition flex items-center gap-1"
            >
              <span>+1 (800) 555-WILD</span>
            </a>
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about pet care, adoptions, injured wildlife..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIAssistantWidget;
