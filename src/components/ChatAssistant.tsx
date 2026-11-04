import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Bot, Sparkles, Send, RotateCcw, X, CheckCircle, AlertCircle, Mail, Loader2, ShieldCheck, ArrowRight } from 'lucide-react';
import { ChatMessage, GeminiModel } from '../types';
import { streamGeminiChat, getStoredModel, getIntelligentMockResponse } from '../lib/gemini';
import { sendEmailViaResend } from '../lib/emailService';
import { trackEvent } from '../lib/analytics';

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  onClearInitialQuery?: () => void;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  isOpen,
  onClose,
  initialQuery,
  onClearInitialQuery,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hi there! 👋 I'm Sathiya's personal AI technical assistant.\n\nFeel free to ask me anything about his software engineering background, such as:\n- **Tech Stack:** His hands-on experience with Next.js, TypeScript, and Node.js\n- **Featured Projects:** Building Herbet Studio's multi-tenant SaaS and Menuval\n- **Work Experience:** What he built at Herbet Agency and Infinite Bull's Eye\n- **Availability:** 15 days notice period (currently serving notice)\n\n*(You can also click **Contact Sathiya** above to message his inbox directly via Resend!)*`,
      timestamp: Date.now(),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentModel, setCurrentModel] = useState<GeminiModel>('gemini-3.8-flash');

  // In-chat Contact Form State
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    service: 'Full-Stack Engineering Opportunity',
    message: '',
  });
  const [isSendingContact, setIsSendingContact] = useState(false);
  const [contactResult, setContactResult] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setCurrentModel(getStoredModel());
  }, [isOpen]);

  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSendMessage(initialQuery.trim());
      if (onClearInitialQuery) onClearInitialQuery();
    }
  }, [initialQuery]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, showContactForm]);

  useEffect(() => {
    if (isOpen && !showContactForm) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, showContactForm]);

  const suggestedPrompts = [
    '✉️ Contact Sathiya directly',
    'What is Sathiya\'s tech stack?',
    'Tell me about Herbet Studio & SaaS',
    'Notice period & availability',
  ];

  const handleClose = () => {
    trackEvent('chatbot_interaction', { action: 'closed' });
    onClose();
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactData.name.trim() || !contactData.email.trim() || !contactData.message.trim() || isSendingContact) {
      return;
    }

    setIsSendingContact(true);
    setContactResult(null);

    const result = await sendEmailViaResend({
      name: contactData.name,
      email: contactData.email,
      service: contactData.service,
      message: contactData.message,
      source: 'chat_assistant',
    });

    setIsSendingContact(false);

    if (result.success) {
      trackEvent('contact_action', { method: 'form_submit' });
      setContactResult({ type: 'success', text: result.message });

      // Post user & confirmation messages into chat history
      const userMsg: ChatMessage = {
        id: `user-inquiry-${Date.now()}`,
        role: 'user',
        content: `**Sent Direct Inquiry via Resend:**\n- **From:** ${contactData.name} (${contactData.email})\n- **Scope:** ${contactData.service}\n- **Message:** ${contactData.message}`,
        timestamp: Date.now(),
      };

      const assistantReply: ChatMessage = {
        id: `assistant-confirm-${Date.now()}`,
        role: 'assistant',
        content: `✅ **Inquiry successfully delivered via Resend!**\n\nThank you, **${contactData.name}**! Your message regarding *${contactData.service}* has been sent directly to Sathiya Sankar's personal inbox (**sathiyasankar0107@gmail.com**).\n\nHe has received your details and will get in touch with you at **${contactData.email}** within 24 hours. Feel free to continue chatting if you'd like to explore more about his past projects or tech stack!`,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg, assistantReply]);

      // Reset form fields
      setContactData({
        name: '',
        email: '',
        service: 'Full-Stack Engineering Opportunity',
        message: '',
      });

      // Auto-collapse form after 2.5 seconds to return to the active conversation
      setTimeout(() => {
        setShowContactForm(false);
        setContactResult(null);
      }, 2500);
    } else {
      setContactResult({ type: 'error', text: result.message });
    }
  };

  const handleSendMessage = async (textToSend?: string, isSuggested?: boolean) => {
    const content = (textToSend || input).trim();
    if (!content || isLoading) return;

    if (isSuggested) {
      trackEvent('chatbot_interaction', {
        action: 'suggested_prompt_clicked',
        query_topic: content.slice(0, 60),
      });
    } else {
      trackEvent('chatbot_interaction', {
        action: 'question_asked',
        query_topic: content.slice(0, 60),
      });
    }

    // Check if the user is asking to contact/message Sathiya
    if (content === '✉️ Contact Sathiya directly' || /^(contact|message|hire|email|reach|talk to)\s*(sathiya|him)?$/i.test(content)) {
      setShowContactForm(true);
      if (!textToSend) setInput('');
      return;
    }

    setInput('');

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    const assistantPlaceholderId = `assistant-${Date.now()}`;
    const initialAssistantMessage: ChatMessage = {
      id: assistantPlaceholderId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      isStreaming: true,
    };

    const updatedHistory = [...messages, userMessage];
    setMessages([...updatedHistory, initialAssistantMessage]);
    setIsLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      await streamGeminiChat({
        messages: updatedHistory,
        model: currentModel,
        signal: controller.signal,
        onChunk: (_chunk, accumulated) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantPlaceholderId
                ? { ...msg, content: accumulated, isStreaming: true }
                : msg
            )
          );
        },
      });

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantPlaceholderId ? { ...msg, isStreaming: false } : msg
        )
      );
    } catch (err: unknown) {
      const error = err as Error;
      if (error.name !== 'AbortError' && error.message !== 'Generation aborted') {
        const lastUser = updatedHistory.filter((m) => m.role === 'user').pop();
        const fallback = getIntelligentMockResponse(lastUser?.content || '');
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantPlaceholderId
              ? {
                  ...msg,
                  content: fallback,
                  isStreaming: false,
                }
              : msg
          )
        );
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = () => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    setShowContactForm(false);
    setContactResult(null);
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: `Conversation reset. What would you like to know about Sathiya's work? Or click **Contact Sathiya** above to message him directly.`,
        timestamp: Date.now(),
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative z-10 flex flex-col h-full w-full max-w-lg bg-white dark:bg-[#0e1422] border-l border-slate-200 dark:border-[#1a2333] shadow-2xl text-slate-800 dark:text-slate-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 dark:border-[#1a2333] bg-slate-50/90 dark:bg-[#0a0f1d]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-sky-950/40 border border-blue-200/80 dark:border-sky-800/60 text-blue-600 dark:text-sky-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>AI Technical Assistant</span>
                </h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Ask anything about Sathiya's engineering work & projects
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setShowContactForm(!showContactForm);
                  setContactResult(null);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  showContactForm
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-sky-950/40 border border-blue-200/80 dark:border-sky-800/60 hover:bg-blue-100 dark:hover:bg-sky-900/40'
                }`}
                title="Send a message directly to Sathiya via Resend"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{showContactForm ? 'Chat View' : 'Contact Sathiya'}</span>
              </button>

              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                title="Close drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Clean Status Bar */}
          <div className="px-6 py-2 border-b border-slate-200/80 dark:border-[#1a2333] bg-slate-50/70 dark:bg-[#080c14] text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Online • Verified Engineering Profile</span>
            </span>
            <span className="text-[10px] font-mono text-blue-600 dark:text-sky-400 font-semibold">15 Days Notice (Serving Notice)</span>
          </div>

          {showContactForm ? (
            /* In-Chat Resend Contact Submission View */
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 bg-white dark:bg-[#0e1422]">
              <div className="flex items-start justify-between border-b border-slate-200/80 dark:border-[#1a2333] pb-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-sky-950/40 border border-blue-200 dark:border-sky-800/60 mb-1.5">
                    <ShieldCheck className="w-3 h-3 text-blue-600 dark:text-sky-400" />
                    <span>Resend Verified Email Service</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Send Direct Message to Sathiya
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Your inquiry will be delivered directly to Sathiya Sankar's personal inbox (<span className="text-blue-600 dark:text-sky-400 font-mono">sathiyasankar0107@gmail.com</span>).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Return to conversation"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#080c14] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#080c14] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Topic / Role Scope
                  </label>
                  <select
                    value={contactData.service}
                    onChange={(e) => setContactData({ ...contactData, service: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#080c14] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="Full-Stack Engineering Opportunity">Full-Stack / Next.js Engineering Role</option>
                    <option value="Multi-Tenant SaaS / Platform Project">Multi-Tenant SaaS / Platform Project</option>
                    <option value="AI / Vector Search Integration">AI & Vector Search (pgvector, RAG) Integration</option>
                    <option value="Contract / Freelance Development">Contract / Freelance Development</option>
                    <option value="Technical Consultation">Technical Consultation & General Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    placeholder="Hi Sathiya, I'd like to discuss an engineering opportunity or project regarding..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#080c14] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center gap-2.5">
                  <button
                    type="submit"
                    disabled={isSendingContact}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium text-xs transition-all shadow-sm shadow-blue-500/20 disabled:cursor-not-allowed"
                  >
                    {isSendingContact ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending via Resend...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message to Sathiya</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>

                {contactResult && contactResult.type === 'success' && (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs flex items-start gap-2 leading-relaxed">
                    <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    <div>
                      <p className="font-semibold">Delivered via Resend!</p>
                      <p className="text-[11px] opacity-90 mt-0.5">{contactResult.text}</p>
                    </div>
                  </div>
                )}

                {contactResult && contactResult.type === 'error' && (
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-rose-800 dark:text-rose-300 text-xs flex items-start gap-2 leading-relaxed">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
                    <div>
                      <p className="font-semibold">Delivery issue</p>
                      <p className="text-[11px] opacity-90 mt-0.5">{contactResult.text}</p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          ) : (
            <>
              {/* Messages Stream */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs sm:text-sm bg-slate-50/50 dark:bg-transparent">
                {messages.map((message) => {
                  const isUser = message.role === 'user';
                  return (
                    <div
                      key={message.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 mb-1 px-1 font-mono uppercase tracking-wider">
                        {isUser ? 'You' : 'Sathiya Assistant'}
                      </span>
                      <div
                        className={`max-w-[92%] rounded-2xl p-4 leading-relaxed ${
                          isUser
                            ? 'bg-blue-600 text-white rounded-tr-sm shadow-sm'
                            : 'bg-white dark:bg-[#080c14] text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-[#1a2333] rounded-tl-sm shadow-sm'
                        }`}
                      >
                        {isUser ? (
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        ) : (
                          <div className="space-y-2 prose prose-slate dark:prose-invert prose-sm max-w-none text-slate-800 dark:text-slate-200">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                h1: ({ node, ...props }) => <h1 className="text-sm font-bold text-slate-900 dark:text-white my-1" {...props} />,
                                h2: ({ node, ...props }) => <h2 className="text-xs font-bold text-slate-900 dark:text-white my-1" {...props} />,
                                h3: ({ node, ...props }) => <h3 className="text-xs font-semibold text-blue-600 dark:text-sky-400 my-1 uppercase" {...props} />,
                                p: ({ node, ...props }) => <p className="leading-relaxed my-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc list-inside my-1 space-y-0.5 text-slate-700 dark:text-slate-300" {...props} />,
                                li: ({ node, ...props }) => <li className="text-slate-700 dark:text-slate-300" {...props} />,
                                code: ({ node, inline, ...props }: any) =>
                                  inline ? (
                                    <code className="bg-slate-100 dark:bg-[#141c2e] text-blue-600 dark:text-sky-300 px-1 py-0.5 rounded font-mono text-[11px] border border-slate-200 dark:border-[#232f48]" {...props} />
                                  ) : (
                                    <pre className="bg-slate-900 text-slate-100 dark:bg-[#05080e] dark:text-slate-200 rounded-lg p-2.5 my-1.5 overflow-x-auto text-[11px] font-mono border border-slate-800 dark:border-[#1a2333]">
                                      <code {...props} />
                                    </pre>
                                  ),
                                a: ({ node, ...props }) => <a className="text-blue-600 dark:text-sky-400 underline hover:text-blue-700" target="_blank" rel="noreferrer" {...props} />,
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                            {message.isStreaming && (
                              <span className="inline-block h-3.5 w-1.5 bg-blue-600 dark:bg-sky-400 ml-1 animate-pulse" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                {isLoading && !messages[messages.length - 1]?.isStreaming && (
                  <div className="text-xs text-slate-500 italic flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-sky-400 animate-pulse" />
                    Synthesizing response from verified resume context...
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggested Prompts */}
              <div className="px-5 py-2.5 border-t border-slate-200/80 dark:border-[#1a2333] bg-white dark:bg-[#0a0f1d] flex flex-wrap gap-1.5">
                {suggestedPrompts.map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSendMessage(prompt, true)}
                    disabled={isLoading}
                    className="px-2.5 py-1 rounded-full text-[10px] font-mono text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-[#080c14] border border-slate-200 dark:border-[#1a2333] hover:border-blue-500 hover:text-blue-600 dark:hover:text-sky-300 transition-colors disabled:opacity-40"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input Box */}
              <div className="p-4 border-t border-slate-200/80 dark:border-[#1a2333] bg-white dark:bg-[#0a0f1d]">
                <div className="flex items-end gap-2 border border-slate-200 dark:border-[#1a2333] bg-slate-50 dark:bg-[#080c14] p-2.5 rounded-xl focus-within:border-blue-500 dark:focus-within:border-sky-500 transition-colors">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about Next.js, pgvector, Herbet Agency, availability..."
                    rows={2}
                    disabled={isLoading}
                    className="w-full resize-none bg-transparent px-1 py-0.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={!input.trim() || isLoading}
                    className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 transition-all shadow-sm shadow-blue-500/20"
                    title="Send message"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="mt-1.5 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                  Press Enter to send • Shift+Enter for new line
                </p>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
