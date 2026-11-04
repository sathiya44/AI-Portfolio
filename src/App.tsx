import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { flushSync } from 'react-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { initAnalytics, trackEvent } from './lib/analytics';
// Code-split heavy interactive overlays for maximum initial render performance
const ChatAssistant = lazy(() =>
  import('./components/ChatAssistant').then((m) => ({ default: m.ChatAssistant }))
);
const ResumeModal = lazy(() =>
  import('./components/ResumeModal').then((m) => ({ default: m.ResumeModal }))
);

export const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('portfolio_theme');
      return stored === 'dark';
    }
    return false;
  });

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialChatQuery, setInitialChatQuery] = useState<string | undefined>(undefined);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const isTransitioningRef = useRef(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('portfolio_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('portfolio_theme', 'light');
    }
  }, [darkMode]);

  // Initialize Google Analytics 4 & Microsoft Clarity with recruiter attribution
  useEffect(() => {
    initAnalytics();
  }, []);

  // Silently preload code-split chunks during browser idle time for instant click response
  useEffect(() => {
    const preload = () => {
      import('./components/ChatAssistant');
      import('./components/ResumeModal');
    };
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(preload);
      } else {
        setTimeout(preload, 1500);
      }
    }
  }, []);

  const handleToggleDarkMode = (event?: React.MouseEvent) => {
    if (isTransitioningRef.current) return;

    const nextTheme = !darkMode;

    const isAppearanceTransition =
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Graceful smooth fallback for browsers without View Transitions
    if (!isAppearanceTransition) {
      document.documentElement.classList.add('theme-transition');
      setDarkMode(nextTheme);
      if (nextTheme) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('portfolio_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('portfolio_theme', 'light');
      }
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
      }, 350);
      return;
    }

    isTransitioningRef.current = true;

    // Directional Diagonal Loop:
    // Dark theme sweeps from Right-Top -> Full (Night falls from top-right)
    // Light theme sweeps from Left-Bottom -> Full (Daylight rises from bottom-left)
    const x = nextTheme ? window.innerWidth : 0;
    const y = nextTheme ? 0 : window.innerHeight;

    // Ensure radius cleanly covers the furthest opposite corner with buffer
    const endRadius = Math.ceil(Math.hypot(window.innerWidth, window.innerHeight)) + 30;

    try {
      // Synchronously flush the state and DOM update into the new snapshot
      const transition = (document as any).startViewTransition(() => {
        flushSync(() => {
          setDarkMode(nextTheme);
          if (nextTheme) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('portfolio_theme', 'dark');
          } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('portfolio_theme', 'light');
          }
        });
      });

      transition.ready
        .then(() => {
          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ];

          (document.documentElement as any).animate(
            {
              clipPath: clipPath,
            },
            {
              duration: 520,
              easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
              pseudoElement: '::view-transition-new(root)',
            }
          );
        })
        .catch(() => {
          // Fallback gracefully if animation rejected
        });

      transition.finished
        .catch(() => {})
        .finally(() => {
          isTransitioningRef.current = false;
        });
    } catch (err) {
      isTransitioningRef.current = false;
      setDarkMode(nextTheme);
    }
  };

  const handleOpenChat = (query?: string) => {
    if (query) {
      setInitialChatQuery(query);
    }
    trackEvent('chatbot_interaction', {
      action: 'opened',
      query_topic: query,
    });
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-700 dark:bg-[#0b0f19] dark:text-slate-300 font-sans selection:bg-blue-600/10 selection:text-blue-600 antialiased print:bg-white print:text-black overflow-x-hidden">
      {/* Floating Centered Rounded Navbar matching screenshot */}
      <div className="print:hidden">
        <Navbar
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
          onOpenChat={() => handleOpenChat()}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
        />
      </div>

      {/* Main Sections */}
      <main className="print:hidden">
        <Hero
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
          onOpenChat={() => handleOpenChat()}
        />
        <About />
        <Skills />
        <Services onOpenChat={handleOpenChat} />
        <Projects onOpenChat={handleOpenChat} />
        <Experience />
        <FAQ onOpenChat={handleOpenChat} />
        <Contact />
      </main>

      {/* Footer */}
      <div className="print:hidden">
        <Footer />
      </div>

      {/* Integrated Client-Side AI Chatbot Assistant */}
      <div className="print:hidden">
        <Suspense fallback={null}>
          {isChatOpen && (
            <ChatAssistant
              isOpen={isChatOpen}
              onClose={() => setIsChatOpen(false)}
              initialQuery={initialChatQuery}
              onClearInitialQuery={() => setInitialChatQuery(undefined)}
            />
          )}
        </Suspense>
      </div>

      {/* Verified Single-Column ATS Resume View Modal */}
      <Suspense fallback={null}>
        {isResumeModalOpen && (
          <ResumeModal
            isOpen={isResumeModalOpen}
            onClose={() => setIsResumeModalOpen(false)}
          />
        )}
      </Suspense>
    </div>
  );
};

export default App;
