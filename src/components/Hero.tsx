import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
import { profileContext } from '../data/profileContext';
import profileImg from '../assets/profile-card.jpg';

interface HeroProps {
  onOpenResumeModal: () => void;
  onOpenChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal, onOpenChat }) => {
  return (
    <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-radial-rings">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Bio & Action Buttons (approx 7 columns) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Massive Bold Headline matching screenshot */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.15] sm:leading-[1.12]">
              Engineering resilient systems{' '}
              <span className="text-blue-600 dark:text-blue-400">
                across Full-Stack, Web & AI.
              </span>
            </h1>

            {/* Intro paragraph matching screenshot format */}
            <p className="text-sm sm:text-[17px] text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
              I'm <strong className="text-slate-900 dark:text-white font-semibold">Sathiya Sankar</strong>, a{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">Full-Stack Software Engineer</strong> specializing in{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">Next.js & TypeScript</strong> (App Router, Server Actions), native{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">multi-tenant SaaS platforms</strong>, high-performance{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">Backend & APIs (Node.js, PostgreSQL, Supabase)</strong>, and{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">Production AI & Vector RAG (Vercel AI SDK, pgvector)</strong>. Delivering scalable web apps, startup MVPs, and production systems.
            </p>

            {/* Action Buttons Row matching screenshot */}
            <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
              <a
                href="#case-studies"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-medium text-sm transition-all shadow-sm shadow-blue-500/20"
              >
                <span>Explore Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => {
                  trackEvent('resume_download', { button_location: 'hero' });
                  onOpenResumeModal();
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#141c2e] hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.98] text-slate-800 dark:text-slate-200 font-medium text-sm transition-all shadow-sm"
              >
                <Download className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>Download Resume</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#141c2e] hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.98] text-slate-800 dark:text-slate-200 font-medium text-sm transition-all shadow-sm"
              >
                <span>Contact Me</span>
              </a>
            </div>
          </div>

          {/* Right Column: Signature Hanging ID Lanyard Badge Card with Natural Swinging Motion */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[310px] sm:max-w-[370px] lanyard-swing">
              {/* Lanyard Strap & Clip at Top (extended by 10% for realistic pendulum physics) */}
              <div className="relative z-20 flex flex-col items-center">
                {/* Dark Blue Ribbon Strap (10% longer) */}
                <div className="w-8 h-12 bg-[#1e293b] dark:bg-[#0f172a] rounded-t-sm shadow-inner flex items-center justify-center">
                  <div className="w-1.5 h-full bg-[#334155] opacity-50" />
                </div>

                {/* Metallic Clip Hook */}
                <div className="w-10 h-4 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 rounded-sm border border-slate-400 dark:border-slate-500 shadow-md -mt-1 flex items-center justify-center">
                  <div className="w-4 h-1.5 bg-slate-500 dark:bg-slate-800 rounded-full" />
                </div>
              </div>

              {/* White Lanyard Card Body */}
              <div className="relative z-10 -mt-2 bg-white dark:bg-[#0e1422] rounded-[28px] sm:rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/90 dark:shadow-black/70 p-6 sm:p-8 text-center transition-all hover:shadow-blue-500/15">
                {/* Oval Badge Punch Hole */}
                <div className="w-8 h-2 rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-6" />

                {/* Circular Avatar Photo with blue ring */}
                <div className="relative mx-auto w-32 h-32 rounded-full ring-4 ring-blue-500/25 p-1 mb-5 shadow-lg shadow-blue-500/10">
                  <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                    <img
                      src={profileImg}
                      alt="Sathiya Sankar"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover object-center select-none"
                      loading="eager"
                      fetchPriority="high"
                    />
                  </div>
                </div>

                {/* Candidate Name */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Sathiya Sankar
                </h3>

                {/* Role Tag in Uppercase Blue */}
                <p className="text-[11px] font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mt-1">
                  SOFTWARE ENGINEER
                </p>

                {/* Domain breadcrumb line */}
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Full-Stack • Web • AI / RAG
                </p>

                {/* Social Icon Buttons Row matching screenshot */}
                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-3">
                  <a
                    href={profileContext.contact.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent('contact_action', { method: 'github' })}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 transition-all shadow-sm"
                    title="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>

                  <a
                    href={profileContext.contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent('contact_action', { method: 'linkedin' })}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 transition-all shadow-sm"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>

                  <a
                    href={`mailto:${profileContext.contact.email}`}
                    onClick={() => trackEvent('contact_action', { method: 'email_click' })}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 transition-all shadow-sm"
                    title="Email Sathiya"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quantified Stats Counter Strip matching bottom of screenshot */}
        <div className="pt-20 border-t border-slate-100 dark:border-slate-800/80 mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center sm:text-left">
          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-sans tracking-tight">
              4<span className="text-blue-600 dark:text-blue-400 font-bold">+</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Years of Experience
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-sans tracking-tight">
              10<span className="text-blue-600 dark:text-blue-400 font-bold">+</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Production Web Apps
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-sans tracking-tight">
              5<span className="text-blue-600 dark:text-blue-400 font-bold">+</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Multi-Tenant SaaS Tools
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-sans tracking-tight">
              &lt;200<span className="text-blue-600 dark:text-blue-400 font-bold">ms</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              pgvector RAG Retrieval
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
