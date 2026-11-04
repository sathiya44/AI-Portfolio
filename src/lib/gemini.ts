import { profileContext } from '../data/profileContext';
import { ChatMessage, GeminiModel } from '../types';

export const DEFAULT_MODEL: GeminiModel = 'gemini-3.8-flash';

/**
 * Retrieves the environment API key silently if configured.
 * User is never asked or prompted to provide a key.
 */
export function getStoredApiKey(): string {
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (envKey && typeof envKey === 'string' && envKey.trim()) {
    return envKey.trim();
  }
  return '';
}

export function getStoredModel(): GeminiModel {
  return DEFAULT_MODEL;
}

/**
 * Intelligent, natural response generator grounded in Sathiya Sankar's verified engineering profile.
 * Provides articulate, human-like answers without robotic boilerplate or API key mentions.
 */
export function getIntelligentMockResponse(prompt: string): string {
  const query = prompt.toLowerCase().trim();

  // Casual greetings
  if (/^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening)|howdy)\b/i.test(query) || query === 'hi' || query === 'hello') {
    return `Hi there! 👋 Great to meet you.

I'm Sathiya's personal AI assistant. I can answer any questions you have about his software engineering experience, his work with **Next.js & TypeScript**, his **production SaaS platforms**, or his **15 days notice period**.

What would you like to know?`;
  }

  // Herbet Studio / Multi-tenant SaaS
  if (query.includes('herbet studio') || query.includes('multi-tenant') || query.includes('tenant') || query.includes('saas') || query.includes('workspace')) {
    return `**Herbet Studio** is a multi-tenant business workflow platform Sathiya engineered from scratch for client agencies.

- **Live Application:** [workspace.herbet.agency](https://workspace.herbet.agency/)
- **Tech Stack:** **Next.js (App Router)**, **React.js**, **TypeScript**, **NestJS**, **GraphQL**, **PostgreSQL**, **Prisma ORM**, and **Supabase**.
- **Tenant Isolation:** Complete client-level data partitioning using PostgreSQL row-level security and Supabase.
- **Role-Based Access (RBAC):** Granular permissions for admins, managers, and clients across workspace features.
- **Workflow Automation:** Integrated content approval pipelines, activity auditing, and automated status alerts that saved clients over 20 hours of manual work every month.`;
  }

  // Menuval / Restaurant QR SaaS
  if (query.includes('menuval') || query.includes('menu') || query.includes('qr') || query.includes('restaurant')) {
    return `**Menuval** is a restaurant menu management SaaS with mobile QR-based digital ordering Sathiya developed.

- **Live Application:** [menuval.vercel.app](https://menuval.vercel.app/)
- **Tech Stack:** **Next.js**, **React.js**, **TypeScript**, **Node.js**, **Supabase**, **PostgreSQL**, and **Server Actions**.
- **Capabilities:** Admin dashboards for live digital menu updates, category management, zero-reload state updates via Server Actions, and a responsive customer QR view designed for mobile devices.`;
  }

  // Work experience at Herbet Agency specifically
  if (query.includes('herbet agency') || (query.includes('herbet') && !query.includes('studio'))) {
    return `At **Herbet Agency** (Aug 2023 – Present), Sathiya works as a **Full-Stack Developer** leading the engineering of production client platforms and internal SaaS tools:

- **Next.js Modernization:** Migrated legacy applications to the Next.js App Router and Server Actions, boosting page speeds by **40–60%**.
- **Full-Stack SaaS:** Architected multi-tenant applications like *Herbet Studio* ([workspace.herbet.agency](https://workspace.herbet.agency/)) with strict tenant isolation and RBAC.
- **API Microservices:** Built robust backend services using **NestJS**, **Node.js**, **GraphQL**, and **PostgreSQL**.
- **AI & Automation:** Implemented AI-assisted workflows and automated manual business operations using Google Apps Script and webhook integrations, saving 20+ hours per month.`;
  }

  // Work experience at Infinite Bull's Eye
  if (query.includes('infinite') || query.includes('bull')) {
    return `At **Infinite Bull’s Eye** (June 2022 – Aug 2023), Sathiya worked as a **Full-Stack Developer**:

- **Frontend & React:** Engineered responsive single-page web applications with **React.js** and **Node.js**.
- **Database & Query Tuning:** Modeled relational and document schemas across **PostgreSQL** and **MongoDB**, optimizing indexes to cut query latency by **30%**.
- **RESTful APIs:** Developed clean, modular REST API endpoints and state management workflows.
- **Cross-Functional Delivery:** Collaborated closely with designers and product managers to deliver client milestones ahead of schedule.`;
  }

  // General Work Experience
  if (query.includes('experience') || query.includes('career') || query.includes('history') || query.includes('background') || query.includes('companies')) {
    return `Sathiya brings approximately **4 years of professional software engineering experience** delivering production web systems:

1. **Full-Stack Developer @ Herbet Agency** *(Aug 2023 – Present)*
   - Built 10+ production applications and multi-tenant SaaS platforms (like *Herbet Studio*) with Next.js, NestJS, and PostgreSQL.
   - Delivered 40–60% speed optimizations through code splitting, caching, and database tuning.

2. **Full-Stack Developer @ Infinite Bull’s Eye** *(June 2022 – Aug 2023)*
   - Developed scalable web apps with React.js, Node.js, and Express, optimizing query response times by 30%.

He is currently serving his notice period and is available to join within **15 days** for remote or hybrid full-stack roles.`;
  }

  // Tech stack & skills
  if (query.includes('stack') || query.includes('skill') || query.includes('tech') || query.includes('next.js') || query.includes('react') || query.includes('typescript') || query.includes('node') || query.includes('postgres')) {
    return `Sathiya's core technical stack centers around modern full-stack JavaScript & TypeScript:

- **Frontend:** Next.js (App Router, Server Components, Server Actions), React.js, TypeScript, Tailwind CSS, ShadCN UI.
- **Backend & APIs:** Node.js, NestJS, Express.js, REST APIs, GraphQL, and server-side validation.
- **Databases & ORMs:** PostgreSQL, Supabase, Prisma ORM, MongoDB, and SQL query tuning.
- **AI & Automation:** Vercel AI SDK, LLM integration, agentic tooling (Cursor, Claude, Copilot), and automated workflow scripts.
- **DevOps & Cloud:** Docker, GitHub Actions (CI/CD), Vercel, Netlify, and Render.

He is comfortable owning features end-to-end, from database migrations all the way to responsive frontend interfaces.`;
  }

  // Projects (general or other projects)
  if (query.includes('project') || query.includes('built') || query.includes('portfolio') || query.includes('case studies')) {
    return `Here are the production projects Sathiya has engineered:

1. **Herbet Studio** — Multi-Tenant Workflow Platform
   - *Live Application:* [workspace.herbet.agency](https://workspace.herbet.agency/)
   - *Stack:* Next.js, React, NestJS, GraphQL, PostgreSQL, Prisma, Supabase
   - Includes client-level tenant isolation, RBAC, content approval pipelines, and activity logging.

2. **Menuval** — Restaurant QR Menu SaaS
   - *Live Application:* [menuval.vercel.app](https://menuval.vercel.app/)
   - *Stack:* Next.js, React, Supabase, PostgreSQL, Server Actions
   - Powers dynamic digital menu management and mobile QR ordering for restaurants.`;
  }

  // Education
  if (query.includes('education') || query.includes('degree') || query.includes('college') || query.includes('university') || query.includes('vit') || query.includes('mca') || query.includes('study')) {
    return `Sathiya holds two formal degrees in computer applications and science:

1. **Master of Computer Applications (MCA)**
   - *Erode Sengunthar Engineering College* (2023 – 2025)
2. **BSc in Computer Science**
   - *VIT Vellore (Vellore Institute of Technology)* (2017 – 2020)

Both degrees provided a strong foundation in data structures, algorithms, relational databases, software architecture, and networking.`;
  }

  // Notice period / Availability / Hiring
  if (query.includes('notice') || query.includes('availability') || query.includes('available') || query.includes('hire') || query.includes('join') || query.includes('start')) {
    return `Sathiya is available to join in **15 days** as he is **currently serving his notice period**.

He is open to:
- **Roles:** Full-Stack Engineer, Next.js / TypeScript Specialist, or Backend Engineer.
- **Locations:** Remote (Worldwide / India) or Hybrid/On-site in Bangalore, Chennai, or Vellore.
- **Engagement:** Full-Time, Contract, or Startup roles.

You can connect with him directly at [sathiyasankar0107@gmail.com](mailto:sathiyasankar0107@gmail.com) or by phone at **+91 99438 50302**.

*(Tip: You can also click the **Contact Sathiya** button at the top of this chat to send an email inquiry directly to his inbox via Resend!)*`;
  }

  // Contact details
  if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('call') || query.includes('reach') || query.includes('linkedin') || query.includes('github') || query.includes('message')) {
    return `You can reach Sathiya directly through any of these channels:

- **Email:** [sathiyasankar0107@gmail.com](mailto:sathiyasankar0107@gmail.com)
- **Phone:** +91-99438-50302
- **LinkedIn:** [linkedin.com/in/sathiyasank](https://linkedin.com/in/sathiyasank)
- **GitHub:** [github.com/sathiyaHerbetAgency](https://github.com/sathiyaHerbetAgency)
- **Location:** Vellore, Tamil Nadu, India (Open to Remote Worldwide)

You can also use the **Contact Sathiya** button in the header of this chat window to deliver an inquiry directly to his personal inbox via Resend!`;
  }

  // Default natural response
  return `I can help you with anything related to Sathiya Sankar's engineering background! 

Here are a few popular questions you can ask:
- *"What is Sathiya's primary tech stack?"*
- *"Tell me about Herbet Studio and multi-tenant SaaS"*
- *"Tell me about Menuval"*
- *"What did he do at Herbet Agency?"*
- *"What is his notice period and availability?"*

Just let me know what you'd like to explore!`;
}

/**
 * Stream response from Gemini API or fallback with typing simulation
 */
export async function streamGeminiChat({
  messages,
  apiKey,
  model = DEFAULT_MODEL,
  onChunk,
  signal,
}: {
  messages: ChatMessage[];
  apiKey?: string;
  model?: GeminiModel;
  onChunk: (chunk: string, accumulated: string) => void;
  signal?: AbortSignal;
}): Promise<string> {
  const activeKey = apiKey?.trim() || getStoredApiKey();
  const effectiveModel = (!model || model === 'gemini-2.0-flash') ? DEFAULT_MODEL : model;

  // If no API key is provided, use the simulated response with smooth typewriter chunking
  if (!activeKey) {
    const lastUserMessage = messages.filter((m) => m.role === 'user').pop();
    const mockAnswer = getIntelligentMockResponse(lastUserMessage?.content || '');
    
    // Simulate streaming chunks
    let accumulated = '';
    const words = mockAnswer.split(/(?<=\s|\n)/);
    
    for (let i = 0; i < words.length; i++) {
      if (signal?.aborted) throw new Error('Generation aborted');
      const word = words[i];
      accumulated += word;
      onChunk(word, accumulated);
      // Fast realistic typing delay
      await new Promise((r) => setTimeout(r, Math.random() * 14 + 8));
    }

    return accumulated;
  }

  // Prepare Gemini REST payload
  // Format conversation history into Gemini format
  const formattedContents = messages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

  const payload = {
    systemInstruction: {
      parts: [{ text: profileContext.systemInstructionContext }],
    },
    contents: formattedContents,
    generationConfig: {
      maxOutputTokens: 2048,
      thinkingConfig: {
        thinkingBudget: 0,
      },
    },
  };

  try {
    // Attempt SSE streaming call
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${effectiveModel}:streamGenerateContent?key=${activeKey}&alt=sse`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal,
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => null);
      const errMsg = errJson?.error?.message || `Gemini API returned status ${response.status}`;
      throw new Error(errMsg);
    }

    if (!response.body) {
      throw new Error('Readable stream not supported in this browser environment');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulated = '';
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data:')) continue;

        const jsonStr = trimmed.replace(/^data:\s*/, '');
        if (jsonStr === '[DONE]') continue;

        try {
          const parsed = JSON.parse(jsonStr);
          const candidate = parsed.candidates?.[0];
          if (candidate?.content?.parts) {
            for (const part of candidate.content.parts) {
              if (part.thought) continue; // Skip internal reasoning tokens
              if (typeof part.text === 'string' && part.text) {
                accumulated += part.text;
                onChunk(part.text, accumulated);
              }
            }
          }
        } catch {
          // ignore parsing error for incomplete chunks
        }
      }
    }

    if (accumulated.trim().length > 0) {
      return accumulated;
    }

    // Fallback if SSE didn't return text chunks
    throw new Error('Empty response from streaming endpoint');
  } catch (err: unknown) {
    if (signal?.aborted) {
      throw err;
    }

    // Secondary attempt: non-streaming fallback with latest prompt (bypasses thought signature requirement)
    const lastUserMessage = messages.filter((m) => m.role === 'user').pop();
    const singleTurnPayload = {
      systemInstruction: {
        parts: [{ text: profileContext.systemInstructionContext }],
      },
      contents: [{ role: 'user', parts: [{ text: lastUserMessage?.content || 'Hello' }] }],
      generationConfig: {
        maxOutputTokens: 2048,
        thinkingConfig: { thinkingBudget: 0 },
      },
    };

    try {
      return await generateFallbackGemini(singleTurnPayload, activeKey, effectiveModel, onChunk, signal);
    } catch (fallbackErr) {
      console.warn('Gemini API call failed, falling back to grounded ATS resume knowledge base:', fallbackErr);

      // Resilient fallback: Stream grounded response from ATS resume so it NEVER looks stopped
      const mockAnswer = getIntelligentMockResponse(lastUserMessage?.content || '');
      let accumulated = '';
      const words = mockAnswer.split(/(?<=\s|\n)/);
      for (let i = 0; i < words.length; i++) {
        if (signal?.aborted) throw new Error('Generation aborted');
        const word = words[i];
        accumulated += word;
        onChunk(word, accumulated);
        await new Promise((r) => setTimeout(r, Math.random() * 12 + 6));
      }
      return accumulated;
    }
  }
}

/**
 * Standard generateContent fallback if SSE stream fails
 */
async function generateFallbackGemini(
  payload: any,
  apiKey: string,
  model: GeminiModel,
  onChunk: (chunk: string, accumulated: string) => void,
  signal?: AbortSignal
): Promise<string> {
  const effectiveModel = (!model || model === 'gemini-2.0-flash') ? DEFAULT_MODEL : model;
  const fallbackEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${effectiveModel}:generateContent?key=${apiKey}`;
  
  const response = await fetch(fallbackEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error?.message || `API error (${response.status})`);
  }

  const data = await response.json();
  let fullText = '';
  if (data.candidates?.[0]?.content?.parts) {
    for (const part of data.candidates[0].content.parts) {
      if (!part.thought && part.text) {
        fullText += part.text;
      }
    }
  }

  if (!fullText.trim()) {
    throw new Error('Empty response from generateContent');
  }

  // Simulate streaming output to give the user fluid feedback
  let accumulated = '';
  const chunks = fullText.split(/(?<=\s|\n)/);
  for (const chunk of chunks) {
    if (signal?.aborted) throw new Error('Aborted');
    accumulated += chunk;
    onChunk(chunk, accumulated);
    await new Promise((r) => setTimeout(r, 10));
  }

  return accumulated;
}
