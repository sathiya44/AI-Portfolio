import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { profileContext } from '../data/profileContext';
import { trackEvent } from '../lib/analytics';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-[#060910] py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Summary */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">Sathiya Sankar</span>
            <span className="text-slate-400 dark:text-slate-600">|</span>
            <span className="text-slate-600 dark:text-slate-400 font-mono text-[11px]">Full-Stack & AI Engineer</span>
          </div>
          <p className="text-slate-500 max-w-sm">
            Architecting production Next.js web applications, multi-tenant SaaS platforms, and pgvector RAG workflows.
          </p>
        </div>

        {/* Links & Socials */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
          <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            About
          </a>
          <a href="#stack" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Stack
          </a>
          <a href="#services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Services
          </a>
          <a href="#case-studies" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Case Studies
          </a>
          <a href="#faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            FAQ
          </a>
          <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Contact
          </a>

          <div className="flex items-center gap-2.5 pl-4 border-l border-slate-200 dark:border-slate-800">
            <a
              href={profileContext.contact.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('contact_action', { method: 'github' })}
              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profileContext.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('contact_action', { method: 'linkedin' })}
              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profileContext.contact.email}`}
              onClick={() => trackEvent('contact_action', { method: 'email_click' })}
              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#0e1422] border border-slate-200 dark:border-slate-700 hover:border-slate-400 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all text-[11px] shadow-sm"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-slate-200/80 dark:border-slate-800/80 text-center text-slate-400 text-[11px]">
        © {new Date().getFullYear()} Sathiya Sankar. Built with React, TypeScript & Tailwind CSS.
      </div>
    </footer>
  );
};
