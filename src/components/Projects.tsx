import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { profileContext, Project } from '../data/profileContext';
import { trackEvent, useTrackSectionView } from '../lib/analytics';

// Real high-fidelity project preview assets
import herbetClean from '../assets/projects/herbet-clean.webp';
import menuvalClean from '../assets/projects/menuval-clean.webp';
import elantisClean from '../assets/projects/elantis-clean.webp';
import aegisClean from '../assets/projects/aegis-clean.webp';
import cloudmatosClean from '../assets/projects/cloudmatos-clean.webp';
import ruangramaClean from '../assets/projects/ruangrama-clean.webp';
import hitmanClean from '../assets/projects/hitman-clean.webp';
import herbetThumb from '../assets/projects/herbet-thumb.webp';
import menuvalThumb from '../assets/projects/menuval-thumb.webp';
import elantisThumb from '../assets/projects/elantis-thumb.webp';
import aegisThumb from '../assets/projects/aegis-thumb.webp';
import cloudmatosThumb from '../assets/projects/cloudmatos-thumb.webp';
import ruangramaThumb from '../assets/projects/ruangrama-thumb.webp';
import hitmanThumb from '../assets/projects/hitman-thumb.webp';

interface ProjectsProps {
  onOpenChat: (initialQuery?: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenChat }) => {
  const sectionRef = useTrackSectionView('projects');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const projects = profileContext.projects;
  const currentProject: Project = projects[selectedIndex] || projects[0];

  const projectAssets = [
    {
      full: herbetClean,
      thumb: herbetThumb,
      alt: 'Herbet Workspace — Real Multi-Tenant SaaS Dual-Device Preview',
    },
    {
      full: menuvalClean,
      thumb: menuvalThumb,
      alt: 'Menuval — Restaurant QR Menu & Ordering SaaS Dual-Device Preview',
    },
    {
      full: elantisClean,
      thumb: elantisThumb,
      alt: 'Elantis AI USA — Enterprise AI Services & Strapi Headless CMS Dual-Device Preview',
    },
    {
      full: aegisClean,
      thumb: aegisThumb,
      alt: 'Aegis Security — Runtime Security for AI Agents Dual-Device Preview',
    },
    {
      full: cloudmatosClean,
      thumb: cloudmatosThumb,
      alt: 'Cloudmatos — Unified Cloud Security Platform Dual-Device Preview',
    },
    {
      full: ruangramaClean,
      thumb: ruangramaThumb,
      alt: 'Ruang Rama — Luxury Wedding & Event Venue Platform Dual-Device Preview',
    },
    {
      full: hitmanClean,
      thumb: hitmanThumb,
      alt: 'Hitman Live — Concerts & Premier Event Management Dual-Device Preview',
    },
  ];

  const handlePrev = () => {
    const prevIdx = selectedIndex === 0 ? projects.length - 1 : selectedIndex - 1;
    setSelectedIndex(prevIdx);
    trackEvent('project_interaction', {
      project_name: projects[prevIdx].title,
      link_type: 'case_study',
    });
  };

  const handleNext = () => {
    const nextIdx = selectedIndex === projects.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(nextIdx);
    trackEvent('project_interaction', {
      project_name: projects[nextIdx].title,
      link_type: 'case_study',
    });
  };

  const handleSelectProject = (index: number) => {
    setSelectedIndex(index);
    trackEvent('project_interaction', {
      project_name: projects[index].title,
      link_type: 'case_study',
    });
  };

  // Structured metrics for the 2-column display matching Aman Jagdev's metrics stack
  const projectMetrics = [
    // Herbet Studio
    [
      { value: '100%', label: 'Tenant Data Isolation (Prisma & Supabase RLS)' },
      { value: '<200ms', label: 'GraphQL & PostgreSQL Retrieval Latency' },
      { value: '20+ Hrs/Mo', label: 'Saved via Workflow Automation' },
    ],
    // Menuval
    [
      { value: '0ms', label: 'Page Reload Latency (Next.js Server Actions)' },
      { value: '100%', label: 'Mobile-First Responsive QR Ordering Flow' },
      { value: 'Real-Time', label: 'Menu Availability & Instant Order Notifications' },
    ],
    // Elantis AI USA
    [
      { value: '100%', label: 'Headless Editorial Decoupling (Strapi CMS for Blogs)' },
      { value: '<300ms', label: 'API Content Delivery & Dynamic Article Sync' },
      { value: '95+', label: 'Lighthouse Core Web Vitals & SEO Performance' },
    ],
    // Aegis Security
    [
      { value: '50 ➔ 90+', label: 'Google Lighthouse Performance Score Elevation' },
      { value: '40–60%', label: 'Bundle Size & First Contentful Paint (FCP) Reduction' },
      { value: '0 Lag', label: 'Optimized Render Loops via useMemo & useCallback' },
    ],
    // Cloudmatos
    [
      { value: 'Top #1-3', label: 'Google Search Ranking & Organic SEO Discovery' },
      { value: '2.5x', label: 'Page Load Speed & Core Web Vitals Elevation' },
      { value: '100%', label: 'Custom PHP Theme & Modular Semantic Architecture' },
    ],
    // Ruang Rama
    [
      { value: '100%', label: 'Automated CI/CD via GitHub Actions to Netlify Edge' },
      { value: '<1s', label: 'First Contentful Paint via Next.js Image Optimization' },
      { value: 'Zero Downtime', label: 'Continuous Deployment & Instant Edge Rollbacks' },
    ],
    // Hitman Live
    [
      { value: '100%', label: 'Pixel-Perfect Figma-to-Webflow Implementation' },
      { value: '0 Code', label: 'Marketing CMS Autonomy for Event Updates' },
      { value: '100k+', label: 'Concert On-Sale Traffic Spikes Handled' },
    ],
  ];

  const activeMetrics = projectMetrics[selectedIndex] || projectMetrics[0];

  return (
    <section
      id="projects"
      ref={sectionRef as any}
      className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800/80 relative bg-white dark:bg-[#080c16]"
    >
      {/* Anchor for backward compatibility with existing links */}
      <span id="case-studies" className="sr-only" />

      <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
        {/* Section Heading matching Aman Jagdev's clean header */}
        <div className="space-y-2">
          {/* Geometric Triangle Accent Icon */}
          <div className="w-12 h-10 mb-2">
            <svg viewBox="0 0 69 55" fill="none" className="w-full h-full text-blue-600 dark:text-sky-400">
              <path
                d="M34.5 0L68.5 54.5H0.5L34.5 0Z"
                fill="currentColor"
                fillOpacity="0.15"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <path
                d="M34.5 14L56 50H13L34.5 14Z"
                fill="currentColor"
                fillOpacity="0.3"
              />
            </svg>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-slate-900 dark:text-white tracking-tight">
            Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl">
            Selected full-stack and multi-tenant SaaS applications built with Next.js, TypeScript, and modern database architectures.
          </p>
        </div>

        {/* =========================================================================
            STAGE 1: Floating Dual-Device Stage (Real Tablet + Mobile Preview)
            ========================================================================= */}
        <div className="relative mx-auto w-full max-w-4xl flex items-center justify-center min-h-[280px] sm:min-h-[420px] md:min-h-[480px]">
          {/* Subtle Ambient Studio Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-sky-500/10 rounded-3xl blur-3xl -z-10 pointer-events-none" />

          {/* Device Mockup with Framer Motion Transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full flex items-center justify-center p-2 sm:p-4"
            >
              <img
                src={projectAssets[selectedIndex]?.full || herbetClean}
                alt={projectAssets[selectedIndex]?.alt}
                className="w-full max-h-[480px] sm:max-h-[520px] object-contain mx-auto drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_25px_45px_rgba(0,0,0,0.7)] select-none"
                loading="eager"
              />
            </motion.div>
          </AnimatePresence>

          {/* Floating Prev Slide Button on Left Side */}
          <button
            onClick={handlePrev}
            aria-label="Previous Project"
            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/90 dark:bg-zinc-800/90 hover:bg-blue-600 dark:hover:bg-blue-600 text-white shadow-xl hover:scale-105 active:scale-95 transition-all backdrop-blur-sm border border-white/10"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Floating Next Slide Button on Right Side */}
          <button
            onClick={handleNext}
            aria-label="Next Project"
            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/90 dark:bg-zinc-800/90 hover:bg-blue-600 dark:hover:bg-blue-600 text-white shadow-xl hover:scale-105 active:scale-95 transition-all backdrop-blur-sm border border-white/10"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* =========================================================================
            STAGE 2: Thumbnail Dock (Matching Aman Jagdev's reference slider)
            ========================================================================= */}
        <div className="rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-slate-100/70 dark:bg-[#0c121e]/80 backdrop-blur-md p-2 sm:p-2.5 flex items-center justify-start md:justify-center gap-2 sm:gap-2.5 max-w-5xl mx-auto shadow-inner overflow-x-auto">
          {projects.map((proj, idx) => {
            const isActive = selectedIndex === idx;
            const thumbAsset = projectAssets[idx]?.thumb;
            return (
              <button
                key={proj.id}
                onClick={() => handleSelectProject(idx)}
                aria-label={`Switch to project ${idx + 1}: ${proj.title}`}
                className={`relative group rounded-xl p-0.5 cursor-pointer transition-all duration-300 w-20 sm:w-24 md:w-28 lg:w-32 h-14 sm:h-16 md:h-18 lg:h-20 shrink-0 overflow-hidden ${
                  isActive
                    ? 'ring-2 ring-blue-500 dark:ring-sky-400 scale-[1.03] shadow-lg shadow-blue-500/25'
                    : 'opacity-70 hover:opacity-100 hover:scale-[1.01]'
                }`}
              >
                <div className="relative w-full h-full rounded-[10px] overflow-hidden bg-slate-900">
                  {/* Miniature Preview Image */}
                  {thumbAsset && (
                    <img
                      src={thumbAsset}
                      alt={proj.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  )}

                  {/* Number Badge in Bottom Left matching Aman Jagdev's dock */}
                  <div
                    className={`absolute bottom-1.5 left-1.5 z-10 rounded px-2 py-0.5 text-xs font-mono font-bold transition-colors ${
                      isActive
                        ? 'bg-blue-600 dark:bg-sky-500 text-white shadow-sm'
                        : 'bg-black/70 backdrop-blur-sm text-slate-300'
                    }`}
                  >
                    {idx + 1}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            STAGE 3: Bottom Split Details (Aman Jagdev's exact typographic layout)
            ========================================================================= */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start text-left">
          {/* Left Column: Bold Italic Serif Title + Metrics with horizontal dividers */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-serif text-3xl sm:text-4xl font-bold italic text-slate-900 dark:text-white tracking-tight">
              {currentProject.title.split('—')[0].trim()}
            </h3>

            {/* Metrics List matching the reference image */}
            <div className="space-y-3 pt-2">
              {activeMetrics.map((metric, mIdx) => (
                <div
                  key={mIdx}
                  className={`pb-3 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-snug ${
                    mIdx !== activeMetrics.length - 1
                      ? 'border-b border-slate-200 dark:border-zinc-800'
                      : ''
                  }`}
                >
                  <span className="font-semibold text-slate-900 dark:text-white font-sans mr-2">
                    {metric.value}
                  </span>
                  <span className="text-sm sm:text-base font-normal">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Live & Ask AI Buttons + Description Text + Tech Stack */}
          <div className="md:col-span-7 space-y-4">
            {/* Buttons Row with Gradient Pill */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Live Button matching reference */}
              <a
                href={currentProject.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackEvent('project_interaction', {
                    project_name: currentProject.title,
                    link_type: 'live_demo',
                  })
                }
                className="group cursor-pointer rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 p-0.5 hover:scale-[1.02] transition-transform inline-flex"
              >
                <div className="flex items-center gap-2 rounded-md bg-slate-950 px-5 py-2 text-white font-medium text-sm group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Live</span>
                </div>
              </a>

              {/* Ask AI Architecture Button */}
              <button
                onClick={() => {
                  trackEvent('project_interaction', {
                    project_name: currentProject.title,
                    link_type: 'case_study',
                  });
                  onOpenChat(`Tell me about the architecture, tech stack, and challenges of ${currentProject.title}`);
                }}
                className="group cursor-pointer rounded-lg border border-slate-300 dark:border-zinc-700 hover:border-blue-500 bg-white dark:bg-zinc-900 px-4 py-2 text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-sky-300 text-sm font-medium transition-all shadow-sm flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                <span>Ask AI</span>
              </button>
            </div>

            {/* Description Paragraph */}
            <p className="text-slate-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
              {currentProject.description}
            </p>

            {/* Engineering Challenge & Solution Summary */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800 text-xs sm:text-sm space-y-1">
              <span className="font-mono font-bold text-blue-600 dark:text-sky-400 block text-xs uppercase tracking-wider">
                Architecture Highlights:
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {currentProject.architectureSolution}
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {currentProject.techStack.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded-md text-xs font-mono font-medium text-slate-700 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
