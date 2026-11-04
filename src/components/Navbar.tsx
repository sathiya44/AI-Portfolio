import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Moon, Sun, ChevronDown, Sparkles, Menu, X, Bot, FileText } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: (event?: React.MouseEvent) => void;
  onOpenChat: () => void;
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenChat,
  onOpenResumeModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Stack', href: '#stack' },
    {
      name: 'Services',
      href: '#services',
      hasDropdown: true,
      subItems: [
        { name: 'Full-Stack Web (Next.js)', href: '#services' },
        { name: 'Multi-Tenant SaaS', href: '#services' },
        { name: 'Production AI & RAG', href: '#services' },
        { name: 'Backend & Cloud APIs', href: '#services' },
      ],
    },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto rounded-full bg-white/90 dark:bg-[#0e1422]/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-sm px-5 sm:px-7 py-2.5 flex items-center justify-between transition-all duration-300">
        {/* Brand Name */}
        <a
          href="#"
          className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Sathiya Sankar
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              {link.hasDropdown ? (
                <div
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <a
                    href={link.href}
                    className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
                  >
                    <span>{link.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
                  </a>

                  {servicesOpen && (
                    <div className="absolute top-full left-0 pt-2 w-52 z-50">
                      <div className="rounded-xl bg-white dark:bg-[#0e1422] border border-slate-200 dark:border-slate-800 shadow-xl p-2 space-y-1">
                        {link.subItems?.map((sub) => (
                          <a
                            key={sub.name}
                            href={sub.href}
                            className="block px-3 py-1.5 rounded-lg text-xs text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                          >
                            {sub.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href={link.href}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </a>
              )}
            </div>
          ))}
        </nav>

        {/* Right Actions: Resume Button + Theme Toggle + Ask AI */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Resume Download Pill Button */}
          <button
            onClick={() => {
              trackEvent('resume_download', { button_location: 'navbar' });
              onOpenResumeModal();
            }}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#141c2e] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
            <span>Resume</span>
          </button>

          {/* Ask AI Pill Button */}
          <button
            onClick={onOpenChat}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all shadow-blue-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-200" />
            <span>Ask AI</span>
          </button>

          {/* Theme Switcher Toggle (Moon / Sun) with Smooth Rotation & Natural Ripple Animation */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={(e) => onToggleDarkMode(e)}
            className="p-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#141c2e] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors shadow-sm relative overflow-hidden"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={darkMode ? 'dark' : 'light'}
                initial={{ y: -8, opacity: 0, rotate: -40 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 8, opacity: 0, rotate: 40 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <div
              className="lg:hidden fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px]"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.16 }}
              className="lg:hidden relative z-50 mt-2 max-w-5xl mx-auto rounded-2xl bg-white dark:bg-[#0e1422] border border-slate-200 dark:border-slate-800 shadow-2xl p-4 space-y-3"
            >
              <nav className="flex flex-col gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenChat();
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Ask AI Assistant</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
