import React from 'react';
import { Layers, Database, Sparkles, Server, ArrowRight, ShieldCheck, Zap, Code2 } from 'lucide-react';
import { useTrackSectionView } from '../lib/analytics';

interface ServicesProps {
  onOpenChat: (initialQuery?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenChat }) => {
  const sectionRef = useTrackSectionView('services');
  const services = [
    {
      title: 'Full-Stack Web Development',
      badge: 'Next.js & TypeScript',
      icon: Layers,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-900/50',
      description:
        'Architecting robust, production-ready web applications using Next.js App Router, Server Actions, React 19, and Tailwind CSS. Focused on sub-second initial page loads, high SEO performance, and responsive interfaces.',
      capabilities: [
        'Next.js SSR/SSG/ISR architectures',
        'Strict type-safe TypeScript codebases',
        'Tailwind CSS & ShadCN UI systems',
        'TanStack Query asynchronous state management',
      ],
      prompt: 'Tell me about Sathiya\'s Full-Stack Next.js expertise',
    },
    {
      title: 'Multi-Tenant SaaS Systems',
      badge: 'Enterprise Architecture',
      icon: ShieldCheck,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-100 dark:border-indigo-900/50',
      description:
        'Building scalable multi-tenant SaaS platforms with strict client-level data isolation, Role-Based Access Control (RBAC), approval workflows, activity audit logs, and secure authentication.',
      capabilities: [
        'Row-Level Security (RLS) & tenant isolation',
        'RBAC authorization & protected API routes',
        'Complex business task approval pipelines',
        'Prisma ORM schema migrations & connection pooling',
      ],
      prompt: 'How did Sathiya implement multi-tenant isolation in Herbet Studio?',
    },
    {
      title: 'Production AI & Vector RAG',
      badge: 'Vercel AI SDK + pgvector',
      icon: Sparkles,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/50',
      description:
        'Integrating context-grounded AI capabilities directly into web applications. Experienced in vector similarity embeddings, Retrieval-Augmented Generation (RAG) pipelines, and streaming chat interfaces.',
      capabilities: [
        'PostgreSQL pgvector similarity search (<200ms)',
        'Vercel AI SDK streaming hooks & token control',
        'Context-aware knowledge base synthesis',
        'Resilient client-side fallback architectures',
      ],
      prompt: 'Explain Sathiya\'s experience with AI engineering and vector search using pgvector',
    },
    {
      title: 'Backend APIs & Cloud DevOps',
      badge: 'Node.js, NestJS & Docker',
      icon: Server,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950/40 border-purple-100 dark:border-purple-900/50',
      description:
        'Designing high-throughput REST and GraphQL backend services, relational schema design, database query optimization, containerized environments, and automated CI/CD deployment pipelines.',
      capabilities: [
        'NestJS microservices & Express.js APIs',
        'GraphQL schema design & custom resolvers',
        'SQL query optimization & relational indexing',
        'Docker containerization & GitHub Actions CI/CD',
      ],
      prompt: 'What backend and database technologies does Sathiya specialize in?',
    },
  ];

  return (
    <section id="services" ref={sectionRef as any} className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800/80 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Heading */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            Engineering Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            What I Deliver
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl">
            Specialized engineering capabilities focused on high concurrency, clean architecture, and reliable production deployment.
          </p>
        </div>

        {/* Services Grid (4 Cards layout matching mabroorahmad.vercel.app) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0e1422] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl border ${service.bgColor} ${service.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#141c2e] border border-slate-200 dark:border-[#232f48]">
                      {service.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    {service.capabilities.map((cap, cIdx) => (
                      <div key={cIdx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <span className="h-1 w-1 rounded-full bg-blue-600 dark:bg-blue-400" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => onOpenChat(service.prompt)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <span>Ask AI about this capability</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
