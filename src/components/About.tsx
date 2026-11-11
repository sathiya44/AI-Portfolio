import React from 'react';
import { GraduationCap, MapPin, Clock, Award, Code2, Cpu, Database, Layers } from 'lucide-react';
import { profileContext } from '../data/profileContext';
import { useTrackSectionView } from '../lib/analytics';

export const About: React.FC = () => {
  const sectionRef = useTrackSectionView('about');

  return (
    <section id="about" ref={sectionRef as any} className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800/80 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Heading */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            Background & Foundation
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            About Me
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
            Building reliable, high-performance web applications and production AI systems designed for speed, scale, and operational clarity.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Narrative & Focus Areas */}
          <div className="lg:col-span-7 space-y-6 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              I am a <strong className="text-slate-900 dark:text-white">Full-Stack Engineer</strong> with approximately <strong className="text-slate-900 dark:text-white">4 years</strong> of professional experience designing, developing, and deploying production-ready web applications using modern web technologies including <strong className="text-blue-600 dark:text-blue-400">Next.js</strong>, <strong className="text-blue-600 dark:text-blue-400">React.js</strong>, <strong className="text-blue-600 dark:text-blue-400">TypeScript</strong>, <strong className="text-blue-600 dark:text-blue-400">Node.js</strong>, <strong className="text-blue-600 dark:text-blue-400">NestJS</strong>, <strong className="text-blue-600 dark:text-blue-400">PostgreSQL</strong>, and <strong className="text-blue-600 dark:text-blue-400">Supabase</strong>.
            </p>
            <p>
              Throughout my engineering journey, I have owned features end-to-end—from requirements gathering and schema architecture through frontend interfaces, backend API integration, comprehensive testing, and CI/CD production deployment. I have built and maintained over 10 production web applications and internal business platforms, including multi-tenant SaaS tools and automatic workflows using AI agents.
            </p>

            {/* Core Architectural Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <div className="p-4 rounded-xl bg-white dark:bg-[#0e1422] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold text-sm">
                  <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Full-Stack Next.js</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  App Router, Server Actions, Server Components, SSR/SSG/ISR, and responsive modern design.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#0e1422] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold text-sm">
                  <Database className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>PostgreSQL & Supabase</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Prisma ORM, connection pooling, schema migrations, SQL optimization, and row-level tenant security.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#0e1422] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold text-sm">
                  <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>AI Agents & Workflows</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Vercel AI SDK, automated agent pipelines, tool orchestration, and streaming responses.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#0e1422] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold text-sm">
                  <Code2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>TypeScript & Node</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Strict type safety end-to-end, NestJS microservices, GraphQL resolvers, and RESTful API design.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Stats & Education */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Details Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0e1422] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Candidate Information
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    Availability
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">15 Days (Serving Notice)</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    Location
                  </span>
                  <span className="text-slate-900 dark:text-slate-200">Vellore, India (Remote)</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    Experience
                  </span>
                  <span className="text-slate-900 dark:text-slate-200 font-mono">~4 Years Total</span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-600 dark:text-slate-400">Preferred Roles</span>
                  <span className="text-slate-900 dark:text-slate-200 text-right">Full-Stack / Next.js / Backend</span>
                </div>
              </div>
            </div>

            {/* Verified Education Timeline */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0e1422] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Education & Degrees</span>
              </h3>

              <div className="relative space-y-6 pt-1">
                {/* Continuous Education Spine Line */}
                <div className="absolute left-[13px] top-3 bottom-3 w-0.5 bg-blue-600/30 dark:bg-blue-500/30 -translate-x-1/2" />

                {profileContext.education.map((edu, idx) => (
                  <div key={idx} className="relative pl-9 group">
                    {/* Education Icon centered directly on the vertical line */}
                    <div className="absolute left-[13px] top-0.5 -translate-x-1/2 flex items-center justify-center h-6 w-6 rounded-full bg-white dark:bg-[#0e1422] border-2 border-blue-600 text-blue-600 dark:text-blue-400 shadow-sm group-hover:scale-110 transition-transform z-10">
                      <GraduationCap className="w-3.5 h-3.5" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                        {edu.degree}
                      </h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                        {edu.institution}
                      </p>
                      <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400">
                        {edu.period}{edu.location ? ` • ${edu.location}` : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
