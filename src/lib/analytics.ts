import { useEffect, useRef } from 'react';

/**
 * Strongly-typed Analytics Event Map for GA4 and Clarity
 */
export type AnalyticsEventMap = {
  resume_download: {
    button_location: string;
  };
  contact_action: {
    method: 'form_submit' | 'email_click' | 'email_copy' | 'linkedin' | 'github' | 'phone';
  };
  project_interaction: {
    project_name: string;
    link_type: 'live_demo' | 'source_code' | 'case_study';
  };
  chatbot_interaction: {
    action: 'opened' | 'closed' | 'question_asked' | 'suggested_prompt_clicked';
    query_topic?: string;
  };
  section_view: {
    section_name: string;
  };
};

export type AnalyticsEventName = keyof AnalyticsEventMap;

export interface RecruiterAttribution {
  ref?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  captured_at: string;
}

const ATTRIBUTION_STORAGE_KEY = 'portfolio_recruiter_attribution';

/**
 * Checks whether analytics scripts and event dispatching should run.
 * Only enabled in production OR when explicitly forced via VITE_ENABLE_ANALYTICS=true.
 */
export function isAnalyticsEnabled(): boolean {
  const isExplicit =
    import.meta.env.VITE_ENABLE_ANALYTICS === 'true' ||
    (import.meta.env as any).NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';
  const isProduction = import.meta.env.PROD;
  return isProduction || isExplicit;
}

/**
 * Captures recruiter UTM parameters and ?ref=company_name from URL query string on initial load.
 * Persists attribution in sessionStorage and syncs to GA4 user properties & Clarity tags.
 */
export function captureRecruiterAttribution(): RecruiterAttribution | null {
  if (typeof window === 'undefined') return null;

  try {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref') || params.get('referrer') || params.get('source');
    const utm_source = params.get('utm_source');
    const utm_medium = params.get('utm_medium');
    const utm_campaign = params.get('utm_campaign');
    const utm_term = params.get('utm_term');
    const utm_content = params.get('utm_content');

    if (ref || utm_source || utm_medium || utm_campaign || utm_term || utm_content) {
      const attribution: RecruiterAttribution = {
        ...(ref && { ref }),
        ...(utm_source && { utm_source }),
        ...(utm_medium && { utm_medium }),
        ...(utm_campaign && { utm_campaign }),
        ...(utm_term && { utm_term }),
        ...(utm_content && { utm_content }),
        captured_at: new Date().toISOString(),
      };

      sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));

      // Attach user properties to GA4
      if (typeof window.gtag === 'function') {
        window.gtag('set', 'user_properties', {
          recruiter_ref: ref || 'direct',
          campaign_source: utm_source || 'none',
          campaign_medium: utm_medium || 'none',
          campaign_name: utm_campaign || 'none',
        });
      }

      // Attach custom tags to Microsoft Clarity
      if (typeof window.clarity === 'function') {
        if (ref) window.clarity('set', 'ref', ref);
        if (utm_source) window.clarity('set', 'utm_source', utm_source);
        if (utm_campaign) window.clarity('set', 'utm_campaign', utm_campaign);
      }

      if (!isAnalyticsEnabled()) {
        console.debug('[Analytics Attribution Captured]:', attribution);
      }

      return attribution;
    }

    // Read stored attribution if previously set in session
    const stored = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (err) {
    console.warn('[Analytics Attribution Error]:', err);
  }

  return null;
}

/**
 * Initializes Google Analytics 4 (gtag.js) and Microsoft Clarity.
 * Injects scripts strictly in production or when VITE_ENABLE_ANALYTICS=true.
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined') return;

  const gaId =
    import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() ||
    (import.meta.env as any).NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  const clarityId =
    import.meta.env.VITE_CLARITY_PROJECT_ID?.trim() ||
    (import.meta.env as any).NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim();

  const enabled = isAnalyticsEnabled();

  // If in local dev and not forced on, initialize safe mock and notify in console
  if (!enabled) {
    console.debug('[Analytics]: Local dev mode. Tracking scripts suppressed. Set VITE_ENABLE_ANALYTICS=true in .env to test.');
    if (!window.gtag) {
      window.gtag = (...args: any[]) => {
        // Safe no-op in dev
      };
    }
    captureRecruiterAttribution();
    return;
  }

  // 1. Google Analytics 4 Setup
  if (gaId && !document.getElementById('ga4-script')) {
    const gaScript = document.createElement('script');
    gaScript.id = 'ga4-script';
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer?.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', gaId, {
      send_page_view: true,
      anonymize_ip: true,
    });
  }

  // 2. Microsoft Clarity Setup
  if (clarityId && !document.getElementById('clarity-script')) {
    (function (c: any, l: any, a: any, r: any, i: any, t?: any, y?: any) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.id = 'clarity-script';
      t.async = 1;
      t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode?.insertBefore(t, y);
    })(window, document, 'clarity', 'script', clarityId);
  }

  // 3. Process URL Recruiter Attribution
  captureRecruiterAttribution();
}

/**
 * Strongly-typed event dispatcher.
 * Dispatches to window.gtag and window.clarity when active.
 * Prints console.debug in development mode for easy verification.
 */
export function trackEvent<K extends keyof AnalyticsEventMap>(
  eventName: K,
  params: AnalyticsEventMap[K]
): void {
  if (typeof window === 'undefined') return;

  const enabled = isAnalyticsEnabled();

  // Enrich with recruiter reference tag if active in session
  const stored = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
  const enrichedParams: Record<string, any> = { ...params };
  if (stored) {
    try {
      const parsed: RecruiterAttribution = JSON.parse(stored);
      if (parsed.ref) enrichedParams.recruiter_ref = parsed.ref;
      if (parsed.utm_campaign) enrichedParams.campaign_name = parsed.utm_campaign;
    } catch {}
  }

  if (!enabled) {
    console.debug(`[Analytics Event]: %c${eventName}`, 'color: #2563eb; font-weight: bold;', enrichedParams);
    return;
  }

  // GA4
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, enrichedParams);
  }

  // Microsoft Clarity custom event
  if (typeof window.clarity === 'function') {
    window.clarity('event', eventName);
  }
}

/**
 * Section Visibility IntersectionObserver Hook.
 * Fires 'section_view' once per session when a recruiter dwells on a section for at least 2 seconds.
 */
export function useTrackSectionView(sectionName: string) {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sessionKey = `viewed_section_${sectionName}`;
    if (sessionStorage.getItem(sessionKey)) return;

    const element = elementRef.current;
    if (!element) return;

    let dwellTimer: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // Fire event only if recruiter remains in view for 2 continuous seconds
          dwellTimer = setTimeout(() => {
            trackEvent('section_view', { section_name: sectionName });
            sessionStorage.setItem(sessionKey, 'true');
            observer.disconnect();
          }, 2000);
        } else {
          // If user scrolls away before 2 seconds, cancel timer
          if (dwellTimer) {
            clearTimeout(dwellTimer);
            dwellTimer = null;
          }
        }
      },
      {
        threshold: 0.35, // Requires 35% of the section to be in viewport
      }
    );

    observer.observe(element);

    return () => {
      if (dwellTimer) clearTimeout(dwellTimer);
      observer.disconnect();
    };
  }, [sectionName]);

  return elementRef;
}
