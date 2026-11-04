import React, { useState } from 'react';
import { Sparkles, Layers, ShieldAlert, Cpu, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { profileContext, Project } from '../data/profileContext';
import { trackEvent, useTrackSectionView } from '../lib/analytics';

interface ProjectsProps {
  onOpenChat: (initialQuery?: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenChat }) => {
  const sectionRef = useTrackSectionView('projects');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'SaaS & Analytics', 'Full Stack'];

  const filteredProjects =
    activeCategory === 'All'
      ? profileContext.projects
      : profileContext.projects.filter((p) => p.category === activeCategory);

  return (
    <section id="case-studies" ref={sectionRef as any} className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800/80 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Heading & Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              Engineering Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Featured Case Studies
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl">
              Real-world systems, performance benchmarks, and architectural solutions built for production scale.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-100 dark:bg-[#0e1422] border border-slate-200/80 dark:border-slate-800 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project: Project) => (
            <div
              key={project.id}
              className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0e1422] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all group"
            >
              <div className="space-y-6">
                {/* Header: Category + Featured Tag */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50">
                      Production Flagship
                    </span>
                  )}
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {project.tagline}
                  </p>
                </div>

                {/* Challenge & Solution Blocks */}
                <div className="space-y-3 pt-1">
                  {/* The Challenge */}
                  <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-[#080c14] border border-amber-200/70 dark:border-amber-900/40 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-amber-700 dark:text-amber-400">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>The Challenge</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {project.keyChallenge}
                    </p>
                  </div>

                  {/* The Solution */}
                  <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-[#080c14] border border-blue-200/70 dark:border-blue-900/40 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-blue-700 dark:text-blue-400">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>The Solution & Architecture</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {project.architectureSolution}
                    </p>
                  </div>
                </div>

                {/* Measurable Performance Highlights */}
                <div className="space-y-2">
                  <div className="text-xs font-mono font-semibold uppercase text-slate-600 dark:text-slate-400">
                    Key Performance Highlights
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                    {project.metrics.map((metric, mIdx) => (
                      <li key={mIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span className="break-words leading-tight">{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#141c2e] border border-slate-200 dark:border-[#232f48]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    trackEvent('project_interaction', {
                      project_name: project.title,
                      link_type: 'live_demo',
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all shadow-sm shadow-blue-500/20 hover:shadow-md hover:shadow-blue-500/30"
                >
                  <span>Live Application</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => {
                    trackEvent('project_interaction', {
                      project_name: project.title,
                      link_type: 'case_study',
                    });
                    onOpenChat(`Tell me about the architecture and challenges of ${project.title}`);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-medium text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                  title="Ask AI assistant about this system"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask AI</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
