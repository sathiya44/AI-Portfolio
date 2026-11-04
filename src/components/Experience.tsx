import React from 'react';
import { Briefcase, Calendar, CheckCircle2, MapPin } from 'lucide-react';
import { profileContext } from '../data/profileContext';
import { useTrackSectionView } from '../lib/analytics';

export const Experience: React.FC = () => {
  const sectionRef = useTrackSectionView('experience');

  return (
    <section id="experience" ref={sectionRef as any} className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800/80 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Heading */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            Career History
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Work Experience
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
            A track record of high-concurrency production deployments, end-to-end feature ownership, and reliable systems delivery.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative ml-1 sm:ml-3 space-y-12">
          {/* Continuous vertical timeline spine line */}
          <div className="absolute left-[16px] top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-slate-800 -translate-x-1/2" />

          {profileContext.experiences.map((exp, idx) => (
            <div key={idx} className="relative pl-12 sm:pl-14 group">
              {/* Timeline Indicator Dot — Exactly centered on spine line */}
              <div className="absolute left-[16px] top-2 -translate-x-1/2 flex items-center justify-center h-8 w-8 rounded-full bg-white dark:bg-[#080c14] border-2 border-blue-600 text-blue-600 dark:text-blue-400 shadow-md shadow-blue-500/10 group-hover:scale-110 transition-transform z-10">
                <Briefcase className="w-3.5 h-3.5" />
              </div>

              {/* Card Container */}
              <div className="p-5 sm:p-8 rounded-2xl bg-white dark:bg-[#0e1422] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all space-y-5">
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {exp.role}
                      <span className="text-blue-600 dark:text-blue-400 font-normal">@ {exp.company}</span>
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <span className="flex items-center gap-1 font-mono text-blue-600 dark:text-blue-400 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {exp.location} ({exp.type})
                      </span>
                    </div>
                  </div>

                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium font-mono text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 self-start sm:self-auto">
                    {idx === 0 ? 'Current Role' : 'Previous Role'}
                  </span>
                </div>

                {/* Role Summary */}
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {exp.summary}
                </p>

                {/* Measurable Achievements */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Key Quantified Contributions
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    {exp.achievements.map((item, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2.5 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Stack Tags */}
                <div className="pt-2 flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-mono text-slate-400 mr-2">Technologies:</span>
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#141c2e] border border-slate-200/80 dark:border-[#232f48]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
