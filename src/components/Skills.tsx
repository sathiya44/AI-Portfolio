import React from 'react';
import { Code, Server, Database, Sparkles } from 'lucide-react';
import { useTrackSectionView } from '../lib/analytics';

export const Skills: React.FC = () => {
  const sectionRef = useTrackSectionView('skills');
  const skillCategories = [
    {
      domain: 'Frontend & Next.js',
      icon: Code,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-900/50',
      description: 'Modern component architectures, streaming SSR, and reactive state management.',
      skills: [
        'Next.js (App Router, Server Actions, SSR/SSG/ISR)',
        'React.js & React 19',
        'TypeScript (Strict Mode)',
        'Tailwind CSS & ShadCN UI',
        'TanStack Query (React Query)',
        'Redux & Context API',
        'Responsive Design & Core Web Vitals',
      ],
    },
    {
      domain: 'Backend & APIs',
      icon: Server,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-100 dark:border-indigo-900/50',
      description: 'High-throughput REST and GraphQL backend services and business logic.',
      skills: [
        'Node.js & NestJS',
        'Express.js Microservices',
        'GraphQL Resolvers & Schema Design',
        'RESTful API Architecture',
        'Role-Based Access Control (RBAC)',
        'Tenant Data Isolation Guards',
        'Server-Side Validation & Middleware',
      ],
    },
    {
      domain: 'Databases & Vector Retrieval',
      icon: Database,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/50',
      description: 'Relational data structures, vector similarity indexes, and connection pooling.',
      skills: [
        'PostgreSQL & SQL Query Tuning',
        'Supabase (Auth, RLS, Storage)',
        'pgvector Vector Similarity Indexing',
        'Prisma ORM & Connection Pooling',
        'MongoDB & Document Collections',
        'Database Schema Migrations',
        'Multi-Tier In-Memory Caching',
      ],
    },
    {
      domain: 'AI Engineering & Developer Tools',
      icon: Sparkles,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950/40 border-purple-100 dark:border-purple-900/50',
      description: 'Context-grounded LLM integrations, automated pipelines, and cloud deployment.',
      skills: [
        'Vercel AI SDK & Streaming Hooks',
        'Retrieval-Augmented Generation (RAG)',
        'Google Gemini API & OpenAI APIs',
        'Docker Containerization',
        'GitHub Actions (CI/CD Pipelines)',
        'Vercel, Netlify, Render Deployments',
        'Git Workflow & Automated Testing',
      ],
    },
  ];

  return (
    <section id="stack" ref={sectionRef as any} className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800/80 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Heading */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            Capabilities & Technologies
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Technical Stack
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
            A battle-tested stack refined across production SaaS platforms, client delivery, and high-concurrency systems.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0e1422] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all space-y-5"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl border ${cat.bgColor} ${cat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {cat.domain}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-[#141c2e] border border-slate-200/70 dark:border-slate-700/80 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
