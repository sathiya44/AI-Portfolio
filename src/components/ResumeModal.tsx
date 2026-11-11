import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Download, FileText, CheckCircle2 } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
import { profileContext } from '../data/profileContext';
import { ATS_RESUME_TEXT } from '../data/atsResumeReference';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('resume-open');
    }
    return () => {
      document.body.classList.remove('resume-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    trackEvent('resume_download', { button_location: 'resume_modal_print_pdf' });
    const originalTitle = document.title;
    document.title = "Sathiya_Sankar_Full_Stack_Engineer_Resume";
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  const handleDownloadTxt = () => {
    trackEvent('resume_download', { button_location: 'resume_modal_txt' });
    const element = document.createElement("a");
    const file = new Blob([ATS_RESUME_TEXT.trim()], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = "Sathiya_Sankar_Full_Stack_Engineer_Resume.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <AnimatePresence>
      <div className="resume-modal-portal fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 print:static print:p-0 print:block">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm print:hidden"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="resume-sheet-container relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-[#1a2333] bg-white dark:bg-[#0e1422] p-4 sm:p-10 shadow-2xl text-slate-800 dark:text-slate-300 print:max-w-none print:max-h-none print:border-none print:bg-white print:text-black print:p-0 print:overflow-visible print:shadow-none"
        >
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-[#1a2333] print:hidden">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-sky-950/40 border border-blue-200 dark:border-sky-800/60 text-blue-600 dark:text-sky-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Sathiya Sankar — ATS Verified Resume
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Standard ATS Single-Column Layout • Ready to Print / Export to PDF
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-blue-600 bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white shadow-sm transition-colors"
                title="Save as PDF or Print"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Save as PDF / Print</span>
              </button>

              <button
                onClick={handleDownloadTxt}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#080c14] hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-white transition-colors"
                title="Download ATS Plain Text File"
              >
                <Download className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                <span>ATS Text</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close Resume Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Body (ATS Optimized) */}
          <div className="pt-6 space-y-6 text-xs sm:text-sm leading-relaxed print:pt-0 print:space-y-4 print:text-[10pt] print:leading-normal">
            {/* Candidate Header */}
            <div className="text-center space-y-1.5 border-b border-slate-200 dark:border-[#1a2333] pb-6 print:border-black print:pb-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white print:text-black print:text-2xl tracking-tight">
                SATHIYA SANKAR
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-sky-400 print:text-black uppercase tracking-wider print:text-xs">
                Full-Stack Engineer — Next.js | TypeScript | Node.js | PostgreSQL
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400 print:text-black pt-1 font-mono print:text-[9pt]">
                <span>{profileContext.contact.email}</span>
                <span>•</span>
                <span>{profileContext.contact.phone}</span>
                <span>•</span>
                <span>{profileContext.location}</span>
                <span>•</span>
                <span className="text-blue-600 dark:text-sky-400 print:text-black font-semibold">Available in 15 Days (Serving Notice)</span>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="space-y-2 avoid-break">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-sky-400 print:text-black border-b border-slate-200 dark:border-[#1a2333] pb-1 print:border-black print:text-[10.5pt]">
                Professional Summary
              </h2>
              <p className="text-slate-700 dark:text-slate-300 print:text-black leading-relaxed">
                {profileContext.shortBio}
              </p>
            </div>

            {/* Technical Skills */}
            <div className="space-y-2 avoid-break">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-sky-400 print:text-black border-b border-slate-200 dark:border-[#1a2333] pb-1 print:border-black print:text-[10.5pt]">
                Technical Core Skills
              </h2>
              <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300 print:text-black print:text-[9.5pt]">
                <p><strong>Frontend & Next.js:</strong> Next.js (App Router, Server Actions, SSR/SSG/ISR), React.js, TypeScript, Tailwind CSS, ShadCN UI, TanStack Query, Redux.</p>
                <p><strong>Backend & APIs:</strong> Node.js, NestJS, Express.js, REST APIs, GraphQL, Server-Side Validation, Role-Based Access Control (RBAC).</p>
                <p><strong>Databases & Storage:</strong> PostgreSQL, Supabase, Prisma ORM, MongoDB, SQL Query Tuning, Schema Design.</p>
                <p><strong>AI Tools & Cloud:</strong> AI Agents & Automatic Workflows, Vercel AI SDK, Cursor, Claude, ChatGPT, GitHub Actions CI/CD, Docker, Vercel.</p>
              </div>
            </div>

            {/* Work Experience */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-sky-400 print:text-black border-b border-slate-200 dark:border-[#1a2333] pb-1 print:border-black print:text-[10.5pt]">
                Work Experience
              </h2>
              {profileContext.experiences.map((exp, idx) => (
                <div key={idx} className="avoid-break space-y-1.5 pt-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                    <span className="font-bold text-slate-900 dark:text-white print:text-black">{exp.role} — <span className="text-blue-600 dark:text-sky-300 print:text-black font-semibold">{exp.company}</span></span>
                    <span className="font-mono text-slate-500 dark:text-slate-400 print:text-black font-medium">{exp.period} | {exp.location}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 dark:text-slate-300 print:text-black print:text-[9.5pt]">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx}>{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Projects */}
            <div className="space-y-3 avoid-break">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-sky-400 print:text-black border-b border-slate-200 dark:border-[#1a2333] pb-1 print:border-black print:text-[10.5pt]">
                Key Engineering Projects
              </h2>
              {profileContext.projects.map((proj) => (
                <div key={proj.id} className="avoid-break space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900 dark:text-white print:text-black">{proj.title}</span>
                    <span className="font-mono text-slate-500 dark:text-slate-400 print:text-black">{proj.techStack.slice(0, 4).join(', ')}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 print:text-black">{proj.description}</p>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="space-y-2 avoid-break">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-sky-400 print:text-black border-b border-slate-200 dark:border-[#1a2333] pb-1 print:border-black print:text-[10.5pt]">
                Education
              </h2>
              {profileContext.education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs print:text-[9.5pt]">
                  <span className="font-semibold text-slate-900 dark:text-white print:text-black">{edu.degree} — {edu.institution}</span>
                  <span className="font-mono text-slate-500 dark:text-slate-400 print:text-black">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
