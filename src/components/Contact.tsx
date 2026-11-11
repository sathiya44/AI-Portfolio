import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader2, Github, Linkedin, ShieldCheck } from 'lucide-react';
import { profileContext } from '../data/profileContext';
import { sendEmailViaResend } from '../lib/emailService';
import { trackEvent, useTrackSectionView } from '../lib/analytics';

export const Contact: React.FC = () => {
  const sectionRef = useTrackSectionView('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Full-Stack Web App',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    const result = await sendEmailViaResend({
      name: formData.name,
      email: formData.email,
      service: formData.service,
      message: formData.message,
      source: 'contact_page',
    });

    setIsSubmitting(false);

    if (result.success) {
      trackEvent('contact_action', { method: 'form_submit' });
      setSubmitStatus({ type: 'success', text: result.message });
      setFormData({ name: '', email: '', service: 'Full-Stack Web App', message: '' });
    } else {
      setSubmitStatus({ type: 'error', text: result.message });
    }
  };

  return (
    <section id="contact" ref={sectionRef as any} className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800/80 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Heading */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            Connect & Inquire
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Get in Touch
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl">
            Have a project in mind, an engineering role opening, or want to discuss technical architectures? Let's connect.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Coordinates Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0e1422] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Direct Contact Channels
              </h3>

              <div className="space-y-4">
                <a
                  href={`mailto:${profileContext.contact.email}`}
                  onClick={() => trackEvent('contact_action', { method: 'email_click' })}
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 dark:bg-[#080c14] border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/40 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-600 dark:text-slate-400 block font-medium">E-Mail Address</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors break-all">
                      {profileContext.contact.email}
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${profileContext.contact.phone}`}
                  onClick={() => trackEvent('contact_action', { method: 'phone' })}
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 dark:bg-[#080c14] border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/40 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-600 dark:text-slate-400 block font-medium">Phone / WhatsApp</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors font-mono">
                      {profileContext.contact.phone}
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 dark:bg-[#080c14] border border-slate-200/80 dark:border-slate-800">
                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-600 dark:text-slate-400 block font-medium">Availability Status</span>
                    <span className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400">
                      15 Days Notice (Serving Notice Period)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 dark:bg-[#080c14] border border-slate-200/80 dark:border-slate-800">
                  <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 text-purple-600 dark:text-purple-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-600 dark:text-slate-400 block font-medium">Current Location</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                      Vellore, Tamil Nadu, India (Open to Remote Worldwide)
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4 text-xs font-medium">
                <a
                  href={profileContext.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('contact_action', { method: 'github' })}
                  className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4 text-slate-400" />
                  <span>GitHub</span>
                </a>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <a
                  href={profileContext.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('contact_action', { method: 'linkedin' })}
                  className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-slate-400" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0e1422] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Send a Message or Project Request
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Fill in your details below and I will respond within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#080c14] border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#080c14] border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-service" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Service / Inquiry Scope
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    aria-label="Service or Inquiry Scope"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#080c14] border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="Full-Stack Web App">Full-Stack Web Application (Next.js & TypeScript)</option>
                    <option value="Multi-Tenant SaaS">Multi-Tenant SaaS Architecture & Databases</option>
                    <option value="AI Integration">AI Agents & Automatic Workflows</option>
                    <option value="Engineering Role">Full-Time / Contract Engineering Role Inquiry</option>
                    <option value="General Technical Consultation">General Technical Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, timeline, or engineering opportunity..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#080c14] border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium text-sm transition-all shadow-sm shadow-blue-500/20 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending via Resend...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 px-1 pt-1 font-medium">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                    <span>Protected delivery via Resend</span>
                  </span>
                  <span>Direct to sathiyasankar0107@gmail.com</span>
                </div>

                {submitStatus && submitStatus.type === 'success' && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    <div>
                      <p className="font-semibold">Email delivered successfully!</p>
                      <p className="text-[11px] opacity-90 mt-0.5">{submitStatus.text}</p>
                    </div>
                  </div>
                )}

                {submitStatus && submitStatus.type === 'error' && (
                  <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-rose-800 dark:text-rose-300 text-xs flex items-start gap-2.5 leading-relaxed">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
                    <div>
                      <p className="font-semibold">Delivery issue</p>
                      <p className="text-[11px] opacity-90 mt-0.5">{submitStatus.text}</p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
