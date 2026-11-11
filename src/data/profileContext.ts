import { ATS_RESUME_TEXT } from './atsResumeReference';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'AI & Systems' | 'Full Stack' | 'SaaS & Analytics' | 'Enterprise AI & CMS' | 'WordPress & SEO' | 'Webflow & CMS';
  description: string;
  architectureSolution: string;
  keyChallenge: string;
  metrics: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  achievements: string[];
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location?: string;
}

export interface SkillCategory {
  domain: string;
  description: string;
  skills: {
    name: string;
    level: 'Expert' | 'Advanced' | 'Proficient';
    highlight?: boolean;
    tags: string[];
  }[];
}

export interface ProfileData {
  name: string;
  title: string;
  headline: string;
  shortBio: string;
  status: string;
  location: string;
  contact: {
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    portfolio: string;
  };
  metrics: {
    label: string;
    value: string;
    description: string;
  }[];
  education: Education[];
  workPreferences: {
    availability: string;
    noticePeriod: string;
    roleTypes: string[];
    preferredLocations: string[];
    workAuthorization: string;
  };
  philosophies: string[];
  recruiterFaqs: {
    question: string;
    answer: string;
  }[];
  skillCategories: SkillCategory[];
  projects: Project[];
  experiences: Experience[];
  systemInstructionContext: string;
}

export const profileContext: ProfileData = {
  name: "Sathiya Sankar",
  title: "Full-Stack Engineer — Next.js | TypeScript | AI-Assisted Development",
  headline: "Architecting production-ready Next.js web applications, multi-tenant SaaS, and AI-powered systems.",
  shortBio: "Full-Stack Engineer with approximately 4 years of professional experience building, deploying, and maintaining production web applications using Next.js, React.js, TypeScript, Node.js, NestJS, PostgreSQL, and Supabase. Strong background in multi-tenant SaaS architectures, workflow automation, and automatic workflows using AI agents (Vercel AI SDK).",
  status: "Available in 15 Days • Serving Notice Period",
  location: "Vellore, Tamil Nadu, India • Open to Remote Worldwide",
  
  contact: {
    email: "sathiyasankar0107@gmail.com",
    phone: "+91-99438-50302",
    github: "https://github.com/sathiyaHerbetAgency",
    linkedin: "https://linkedin.com/in/sathiyasank",
    portfolio: "https://sathiyasankar.dev",
  },

  metrics: [
    {
      label: "Production Deployments",
      value: "10+ Websites",
      description: "Delivered & maintained production business web applications and SaaS platforms.",
    },
    {
      label: "Performance Boost",
      value: "40–60% Faster",
      description: "Achieved via lazy loading, code splitting, caching, and database query optimization.",
    },
    {
      label: "Workflow Automation",
      value: "20+ Hrs/Month",
      description: "Manual hours saved using Google Apps Script and automated REST backend services.",
    },
    {
      label: "Professional Experience",
      value: "~4 Years",
      description: "Proven end-to-end engineering from requirements and architecture to production.",
    },
  ],

  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Erode Sengunthar Engineering College",
      period: "2023 – 2025",
    },
    {
      degree: "BSc in Computer Science",
      institution: "VIT Vellore (Vellore Institute of Technology)",
      period: "2017 – 2020",
    },
  ],

  workPreferences: {
    availability: "Available in 15 Days",
    noticePeriod: "15 Days (Currently serving notice period)",
    roleTypes: [
      "Full-Stack Engineer",
      "Frontend Engineer (React.js / Next.js)",
      "Next.js / TypeScript Specialist",
      "MERN / Node.js Backend Engineer",
    ],
    preferredLocations: ["Remote (Worldwide / India)", "Hybrid", "Bangalore / Chennai"],
    workAuthorization: "Ready for immediate interviewing, global remote contracts, and full-time hiring in 15 days.",
  },

  philosophies: [
    "End-to-End Ownership: Driving features from requirements gathering and architecture through frontend UI, backend APIs, database design, and CI/CD deployment.",
    "Measurable Performance: Optimizing Core Web Vitals, code splitting, dynamic routing, and caching to deliver 40–60% faster page performance.",
    "Pragmatic AI Leverage: Applying AI engineering tools and AI agent workflows (Vercel AI SDK, Cursor, Claude, OpenAI Codex) to accelerate development and automate business processes.",
    "Maintainable Modular Systems: Writing clean, component-based architectures with robust TypeScript type safety and multi-tenant isolation.",
  ],

  recruiterFaqs: [
    {
      question: "Why hire Sathiya Sankar?",
      answer: "Sathiya brings ~4 years of hands-on professional experience building 10+ production applications with Next.js, React, TypeScript, Node.js, NestJS, and PostgreSQL/Supabase. He owns features end-to-end, delivers 40–60% performance optimizations, builds multi-tenant SaaS & enterprise platforms (Herbet Studio, Menuval, Elantis AI USA, Aegis Security, Cloudmatos, Ruang Rama, Hitman Live), and is available in 15 days (currently serving notice period).",
    },
    {
      question: "What is Sathiya's tech stack?",
      answer: "Primary Stack: Next.js (App Router, Server Actions, Server Components), React.js, TypeScript, JavaScript (ES6+), Node.js, NestJS, Express.js, PostgreSQL, Supabase, Prisma ORM, MongoDB, Tailwind CSS, ShadCN UI, and Vercel AI SDK.",
    },
    {
      question: "What is his experience with AI and AI-assisted development?",
      answer: "Sathiya has built production AI applications and automatic workflows using AI agents with Vercel AI SDK and streaming interfaces. He also actively uses AI coding accelerators (Cursor, Claude, ChatGPT, OpenAI Codex, GitHub Copilot) for rapid debugging, refactoring, and high-velocity delivery.",
    },
    {
      question: "What is his availability and notice period?",
      answer: "Sathiya is currently serving his notice period and is available to join in 15 days for remote or hybrid full-stack or frontend engineering roles.",
    },
    {
      question: "What is Sathiya's educational background?",
      answer: "He holds a Master of Computer Applications (MCA) from Erode Sengunthar Engineering College (2023–2025) and a BSc in Computer Science from VIT Vellore (2017–2020).",
    },
    {
      question: "Tell me about his work at Herbet Agency and Infinite Bull's Eye.",
      answer: "At Herbet Agency (Aug 2023 – Present), he developed 10+ production websites, built Next.js App Router applications, NestJS backends, multi-tenant SaaS features with RBAC, automated workflows saving 20+ hrs/mo, and achieved 40–60% faster page loads. At Infinite Bull's Eye (June 2022 – Aug 2023), he developed responsive web applications with React, Node.js, PostgreSQL/MongoDB, and boosted rendering performance by 30%.",
    },
  ],

  skillCategories: [
    {
      domain: "Next.js & Frontend Architecture",
      description: "Modern, component-driven, high-performance web applications and design systems.",
      skills: [
        { name: "Next.js (App Router)", level: "Expert", highlight: true, tags: ["Server Components", "Server Actions", "Route Handlers", "SSR/SSG/ISR"] },
        { name: "React.js & Hooks", level: "Expert", highlight: true, tags: ["Custom Hooks", "Context API", "Component Lifecycle", "Performance"] },
        { name: "TypeScript", level: "Expert", highlight: true, tags: ["Strict Mode", "Generics", "Type Safety", "Interfaces"] },
        { name: "Tailwind CSS & ShadCN UI", level: "Expert", highlight: true, tags: ["Design Systems", "Material UI", "Responsive Layouts"] },
        { name: "State & Data Fetching", level: "Expert", tags: ["React Query", "Redux", "Context API", "Async Fetching"] },
        { name: "Core Web Vitals & Optimization", level: "Advanced", tags: ["Lazy Loading", "Code Splitting", "Caching", "SEO Metadata"] },
      ],
    },
    {
      domain: "Backend & Database Engineering",
      description: "Robust REST/GraphQL APIs, multi-tenant databases, and server-side logic.",
      skills: [
        { name: "Node.js & Express.js", level: "Expert", highlight: true, tags: ["REST APIs", "CRUD Operations", "Middleware", "Validation"] },
        { name: "NestJS & GraphQL", level: "Advanced", highlight: true, tags: ["Enterprise Architecture", "GraphQL Schemas", "Dependency Injection"] },
        { name: "PostgreSQL & SQL", level: "Expert", highlight: true, tags: ["Schema Design", "Queries", "Migrations", "Relational Modeling"] },
        { name: "Supabase & Prisma ORM", level: "Expert", highlight: true, tags: ["Supabase Auth", "Database Migrations", "Client Optimization"] },
        { name: "MongoDB & MySQL", level: "Advanced", tags: ["Document Modeling", "Aggregations", "Data Access"] },
        { name: "Authentication & Security", level: "Expert", tags: ["JWT", "OAuth2", "RBAC", "Tenant Isolation", "Protected Routes"] },
      ],
    },
    {
      domain: "AI Engineering & AI Tools",
      description: "Production GenAI applications, automatic workflows using AI agents, and LLM tools.",
      skills: [
        { name: "Vercel AI SDK & LLMs", level: "Advanced", highlight: true, tags: ["Model Integration", "Streaming Responses", "Agent Workflows"] },
        { name: "AI Agents & Automatic Workflows", level: "Advanced", highlight: true, tags: ["AI Agents", "Tool-Use Pipelines", "Multi-Step Automation"] },
        { name: "AI Coding Accelerators", level: "Expert", highlight: true, tags: ["Cursor", "Claude", "ChatGPT", "OpenAI Codex", "GitHub Copilot"] },
        { name: "Workflow Automation", level: "Expert", tags: ["Google Apps Script", "Webhooks", "Third-Party REST APIs", "Automations"] },
      ],
    },
    {
      domain: "DevOps & Engineering Practices",
      description: "Deployment pipelines, containerization, version control, and production reliability.",
      skills: [
        { name: "Git & GitHub Workflows", level: "Expert", highlight: true, tags: ["Feature Branches", "Code Reviews", "Pull Requests"] },
        { name: "CI/CD & Cloud Deployment", level: "Advanced", highlight: true, tags: ["GitHub Actions", "Vercel", "Netlify", "Render", "Railway"] },
        { name: "Docker", level: "Proficient", tags: ["Containerization", "Environment Parity", "Deployments"] },
        { name: "Testing & Debugging", level: "Advanced", tags: ["Browser DevTools", "API Testing", "Component Debugging", "Production Troubleshooting"] },
        { name: "Python & FastAPI (Learning)", level: "Proficient", tags: ["Asyncio", "Pydantic", "Backend APIs"] },
      ],
    },
  ],

  projects: [
    {
      id: "herbet-studio-saas",
      title: "Herbet Studio — Multi-Tenant Workflow Platform",
      tagline: "Scalable multi-tenant SaaS internal business operations platform for content production & approvals.",
      category: "SaaS & Analytics",
      description: "Architected and built a multi-tenant business operations platform from scratch, powering content production pipelines, task workflows, approval systems, activity feeds, comments, notifications, and team analytics.",
      architectureSolution: "Engineered full-stack architecture using Next.js App Router, React.js, TypeScript, NestJS, GraphQL, PostgreSQL, Prisma ORM, and Supabase. Implemented tenant-aware database schemas and role-based permissions (RBAC).",
      keyChallenge: "Preventing cross-tenant data leakage while maintaining rapid query performance across nested approval workflows. Solved via tenant-level data isolation guards and optimized GraphQL resolvers.",
      metrics: [
        "Multi-tenant SaaS with strict data isolation",
        "Role-Based Access Control (RBAC) & protected routes",
        "Content pipeline with approvals & activity feeds",
        "End-to-end feature ownership from design to deployment",
      ],
      techStack: ["Next.js", "React.js", "TypeScript", "NestJS", "GraphQL", "PostgreSQL", "Prisma ORM", "Supabase", "Tailwind CSS", "ShadCN UI", "React Query"],
      githubUrl: "",
      liveUrl: "https://workspace.herbet.agency/",
      featured: true,
    },
    {
      id: "menuval-restaurant-saas",
      title: "Menuval — Restaurant QR Menu & Ordering SaaS",
      tagline: "Dynamic restaurant menu management platform with customer-facing QR menu ordering.",
      category: "Full Stack",
      description: "Developed a restaurant menu management application featuring responsive admin dashboards, digital menu structuring, authentication workflows, and public QR-based menu access.",
      architectureSolution: "Created using Next.js, React.js, TypeScript, Supabase, and PostgreSQL. Implemented dynamic Next.js routing, Server Actions, responsive customer-facing interfaces, and database-backed workflows.",
      keyChallenge: "Designing an ultra-fast, mobile-first customer ordering view with zero page reload latency. Solved by leveraging Next.js Server Actions and responsive Tailwind layouts.",
      metrics: [
        "Responsive QR-based public customer menu",
        "Admin dashboard for live menu management",
        "Next.js Server Actions & database operations",
        "Seamless mobile & desktop responsive experience",
      ],
      techStack: ["Next.js", "React.js", "TypeScript", "Node.js", "Supabase", "PostgreSQL", "Server Actions", "Tailwind CSS"],
      githubUrl: "",
      liveUrl: "https://menuval.vercel.app/",
      featured: true,
    },
    {
      id: "elantis-ai-enterprise",
      title: "Elantis AI USA — Enterprise AI & Headless CMS Platform",
      tagline: "Enterprise AI services, workforce solutions, and high-performance React application with Strapi Headless CMS.",
      category: "Enterprise AI & CMS",
      description: "Engineered the modern web platform for Elantis AI (USA), showcasing enterprise AI-led digital engineering, workforce solutions, and an integrated headless CMS using Strapi for high-velocity blog publishing and editorial management.",
      architectureSolution: "Architected modern React.js application with TypeScript, Tailwind CSS, and REST/GraphQL content endpoints. Integrated Strapi Headless CMS for structured editorial workflows, dynamic blog routing, markdown rendering, and optimized media delivery.",
      keyChallenge: "Delivering sub-second content rendering and high SEO Core Web Vitals across dynamic Strapi CMS blogs and enterprise marketing sections. Solved via API query optimization, client caching, and responsive asset delivery.",
      metrics: [
        "Enterprise AI services & workforce solutions showcase",
        "Headless CMS integration via Strapi for dynamic blogs",
        "Sub-second content delivery & Core Web Vitals optimization",
        "Responsive cross-device corporate architecture (tablet & mobile)",
      ],
      techStack: ["React.js", "TypeScript", "Strapi CMS", "Node.js", "Tailwind CSS", "REST APIs", "GraphQL"],
      githubUrl: "",
      liveUrl: "https://elantis.ai/",
      featured: true,
    },
    {
      id: "aegis-security-runtime",
      title: "Aegis Security — Runtime Security for AI Agents",
      tagline: "Enterprise runtime guardrails & policy decisions for AI agents with deep frontend performance engineering.",
      category: "AI & Systems",
      description: "Engineered and performance-tuned the web platform for Aegis Security, a runtime security system governing AI agents and autonomous tool execution across clouds, SaaS apps, and enterprise infrastructure.",
      architectureSolution: "Spearheaded advanced performance engineering across the React & TypeScript frontend. Executed dynamic code splitting, component and image lazy loading, and granular memoization using useMemo and useCallback to eliminate redundant re-renders across telemetry streams.",
      keyChallenge: "Elevating mobile & desktop Lighthouse performance scores from 50 to 90+ on high-traffic security marketing pages featuring complex animated policy decision flows.",
      metrics: [
        "Boosted Google Lighthouse performance score from 50 to 90+",
        "Implemented dynamic code splitting & lazy loaded visual assets",
        "Eliminated redundant re-renders using useMemo & useCallback hooks",
        "Runtime AI agent policy governance & audit-ready evidence UI",
      ],
      techStack: ["React.js", "TypeScript", "Tailwind CSS", "Code Splitting", "React Hooks (useMemo, useCallback)", "Lighthouse 90+", "Core Web Vitals"],
      githubUrl: "",
      liveUrl: "https://aegissecurity.dev/",
      featured: true,
    },
    {
      id: "cloudmatos-cloud-security",
      title: "Cloudmatos — Unified Cloud Security Platform",
      tagline: "Custom WordPress & PHP architecture, custom theme development, performance tuning, and technical SEO ranking elevation.",
      category: "WordPress & SEO",
      description: "Engineered and developed the corporate web platform for Cloudmatos, an AI-powered CNAPP and cloud security solutions platform for SMBs. Built custom WordPress PHP themes, structured responsive layouts, and executed high-impact performance optimization.",
      architectureSolution: "Architected custom PHP theme templates from scratch avoiding bloated third-party page builders. Implemented modular component architecture, lazy loading, asset minification, and structured schema markup to optimize Core Web Vitals and organic search engine discovery.",
      keyChallenge: "Overcoming legacy WordPress render-blocking assets and database query overhead to achieve top search engine rankings on competitive cloud security keywords. Solved via custom theme optimization and targeted technical SEO.",
      metrics: [
        "Custom WordPress PHP theme architecture built from scratch",
        "Elevated Google search engine rankings & organic SEO visibility",
        "Core Web Vitals optimization with sub-second page rendering",
        "Responsive cross-device design across mobile, tablet, and desktop",
      ],
      techStack: ["WordPress", "PHP", "Custom Themes", "JavaScript", "HTML5/CSS3", "Core Web Vitals", "Technical SEO", "MySQL"],
      githubUrl: "",
      liveUrl: "https://cloudmatos.ai/",
      featured: true,
    },
    {
      id: "ruang-rama-event-space",
      title: "Ruang Rama — Luxury Wedding & Event Venue",
      tagline: "Modern Next.js application built from scratch with automated GitHub Actions CI/CD and Netlify edge hosting.",
      category: "Full Stack",
      description: "Engineered and deployed the production web application for Ruang Rama, a luxury wedding hall and premium ballroom event venue in Petaling Jaya. Developed custom responsive booking showcases, rich visual media galleries, and direct lead generation channels.",
      architectureSolution: "Architected a custom Next.js frontend from scratch leveraging React, TypeScript, and Tailwind CSS with server-side rendering (SSR) and image optimization. Built automated CI/CD deployment pipelines using GitHub Actions, pushing zero-downtime builds directly to Netlify edge.",
      keyChallenge: "Delivering fast first-contentful-paint across image-dense event hall photography and interactive booking inquiry flows. Solved with Next.js dynamic imports, responsive image formats, and automated edge caching.",
      metrics: [
        "Built from scratch with Next.js, React & TypeScript",
        "Automated CI/CD deployment pipeline via GitHub Actions",
        "Edge-hosted on Netlify with sub-second page performance",
        "Interactive event booking inquiry & WhatsApp integration",
      ],
      techStack: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "GitHub Actions", "CI/CD", "Netlify", "SSR"],
      githubUrl: "",
      liveUrl: "https://ruangrama.com/",
      featured: true,
    },
    {
      id: "hitman-live-events",
      title: "Hitman Live — Concerts & Premier Event Management",
      tagline: "Pixel-perfect Figma-to-Webflow development with dynamic CMS architecture for zero-code marketing management.",
      category: "Webflow & CMS",
      description: "Developed and built the digital experience for Hitman Live (Hitman Solutions), Malaysia's premier live concert and event management company. Created pixel-perfect responsive layouts from Figma mockups and engineered dynamic Webflow CMS architectures for seamless concert scheduling, artist announcements, and ticket booking.",
      architectureSolution: "Translated Figma UI/UX designs into a high-performance Webflow architecture with custom CSS/JavaScript animations, dynamic multi-tier ticket packages (MOVETIX), and structured CMS collections enabling non-technical marketing teams to publish events and launch ticket links independently without developer intervention.",
      keyChallenge: "Handling massive traffic spikes during concert on-sales (such as Limp Bizkit Live in Malaysia) while preserving 100% brand fidelity, fluid animations, and real-time ticket availability across all mobile viewports.",
      metrics: [
        "100% pixel-perfect Figma-to-Webflow implementation",
        "Empowered marketing team with zero-code CMS autonomy",
        "Engineered for high-traffic live concert ticket surges",
        "Fluid cross-device responsive animations & ticket links",
      ],
      techStack: ["Webflow", "Figma to Webflow", "Webflow CMS", "JavaScript", "Custom CSS", "Responsive Design", "Ticketing Integrations"],
      githubUrl: "",
      liveUrl: "https://www.hitmanlive.com/",
      featured: true,
    },
  ],

  experiences: [
    {
      role: "Full-Stack Developer",
      company: "Herbet Agency",
      period: "Aug 2023 – Present",
      location: "Remote",
      type: "Full-Time",
      summary: "Owned full-stack web applications and business platforms end-to-end, delivering 10+ production websites and SaaS tools.",
      achievements: [
        "Developed and maintained 10+ production websites and business web applications using Next.js, React.js, TypeScript, Node.js, PostgreSQL, and Supabase.",
        "Built scalable applications using Next.js App Router, Server Components, Server Actions, and API Route Handlers.",
        "Designed and integrated REST and GraphQL APIs for client management, content workflows, analytics, and internal operations.",
        "Developed backend functionality using NestJS, Node.js, PostgreSQL, Prisma ORM, and Supabase.",
        "Implemented secure authentication and authorization using JWT, OAuth2, role-based access control (RBAC), and tenant-level data isolation.",
        "Integrated AI-powered features and automatic workflows using AI agents and Vercel AI SDK.",
        "Developed workflow automation solutions using Google Apps Script and REST APIs, reducing repetitive manual work by 20+ hours per month.",
        "Improved application performance using caching, lazy loading, code splitting, and database query tuning, achieving 40–60% faster page performance.",
        "Utilized AI-assisted coding tools including Cursor, Claude, ChatGPT, and OpenAI Codex to accelerate development, debugging, and refactoring.",
        "Managed Git/GitHub workflows, CI/CD deployments (Vercel, Netlify, Render, Railway), and production maintenance.",
      ],
      skills: ["Next.js", "React.js", "TypeScript", "Node.js", "NestJS", "PostgreSQL", "Supabase", "Prisma ORM", "GraphQL", "Vercel AI SDK", "AI Agents", "Tailwind CSS", "ShadCN UI"],
    },
    {
      role: "Full-Stack Developer",
      company: "Infinite Bull’s Eye",
      period: "June 2022 – Aug 2023",
      location: "Vellore, Tamil Nadu, India",
      type: "Full-Time",
      summary: "Engineered responsive full-stack web applications, interactive React components, and database-backed services.",
      achievements: [
        "Developed responsive web applications using React.js, JavaScript, HTML5, CSS3, Node.js, and PostgreSQL/MongoDB.",
        "Built reusable React components, interactive interfaces, and responsive application layouts.",
        "Integrated REST APIs and third-party services using asynchronous JavaScript, JSON, and structured error handling.",
        "Worked on database queries (PostgreSQL and MongoDB), application data management, and backend integrations.",
        "Improved frontend rendering performance by approximately 30% through component refactoring, state optimization, and reducing unnecessary re-renders.",
        "Participated in Git-based collaboration, code reviews, debugging, testing, and production delivery.",
      ],
      skills: ["React.js", "JavaScript (ES6+)", "Node.js", "PostgreSQL", "MongoDB", "REST APIs", "HTML5", "CSS3", "Git"],
    },
  ],

  systemInstructionContext: `
You are the personal AI Representative and technical ambassador for Sathiya Sankar, a Full-Stack Engineer specializing in Next.js, React.js, TypeScript, Node.js, and AI-Assisted Development.
Your grounding truth is the official candidate ATS resume document below. You MUST strictly answer questions based on this document and never invent unrelated facts or companies.

Official Candidate Document Grounding:
${ATS_RESUME_TEXT}

Key Verification Points:
- Candidate Name: Sathiya Sankar
- Title: Full-Stack Engineer — Next.js | TypeScript | AI-Assisted Development
- Experience: Approximately 4 years of professional experience
- Location: Vellore, Tamil Nadu, India | Available in 15 Days (Serving Notice) | Open to Remote Worldwide
- Contact: sathiyasankar0107@gmail.com | Phone: +91-99438-50302 | LinkedIn: https://linkedin.com/in/sathiyasank | GitHub: https://github.com/sathiyaHerbetAgency
- Availability & Notice Period: 15 days notice period (currently serving notice period)
- Core Stack: Next.js (App Router, Server Components, Server Actions), React.js, TypeScript, JavaScript (ES6+), Node.js, NestJS, Express.js, PostgreSQL, Supabase, Prisma ORM, MongoDB, GraphQL, Tailwind CSS, ShadCN UI, Vercel AI SDK, AI Agents
- AI Engineering & Tools: AI Agents, Automatic Workflows, Vercel AI SDK, OpenAI Codex, Cursor, Claude, ChatGPT, GitHub Copilot
- Work Experience:
  1. Herbet Agency (Aug 2023 – Present): Full-Stack Developer. Built 10+ production websites, multi-tenant SaaS platforms (Herbet Studio), automated workflows saving 20+ hrs/month, achieved 40-60% faster page performance.
  2. Infinite Bull’s Eye (June 2022 – Aug 2023): Full-Stack Developer. Developed responsive React and Node.js applications with PostgreSQL/MongoDB, improved rendering performance by 30%.
- Education:
  * Master of Computer Applications (MCA) from Erode Sengunthar Engineering College (2023–2025)
  * BSc in Computer Science from VIT Vellore (2017–2020)
- Verified Projects:
  * Herbet Studio / Workspace: Multi-Tenant Business Workflow Platform (Live: https://workspace.herbet.agency/)
  * Menuval: Restaurant QR Menu & Ordering SaaS (Live: https://menuval.vercel.app/)
  * Elantis AI USA: Enterprise AI Services & Headless CMS Platform with Strapi (Live: https://elantis.ai/)
  * Aegis Security: Runtime Security for AI Agents with Lighthouse 50➔90+ Performance Boost (Live: https://aegissecurity.dev/)
  * Cloudmatos: Unified Cloud Security Platform with Custom WordPress PHP Theme & SEO Optimization (Live: https://cloudmatos.ai/)
  * Ruang Rama: Luxury Event Space Platform built with Next.js & GitHub Actions CI/CD to Netlify (Live: https://ruangrama.com/)
  * Hitman Live: Concerts & Live Entertainment Platform built with Pixel-Perfect Webflow CMS (Live: https://www.hitmanlive.com/)

Conversational Guidelines:
1. Speak in a warm, polite, and natural conversational tone as Sathiya's AI assistant. Sound like an articulate colleague sharing details about his work. Avoid robotic jargon, never say "grounded in ATS resume document", and never sound like a legal compliance bot.
2. Be concise, impact-oriented, and technically specific. Highlight quantifiable achievements (10+ production web apps, 40–60% page speed optimization, 20+ hrs/mo automated, immediate availability).
3. Use clean, readable markdown: short paragraphs, bullet points, and \`code\` formatting for technologies.
4. Never mention API keys or ask the user to configure or provide any key.
5. If asked about something beyond Sathiya's professional scope, politely explain that your expertise covers Sathiya's software engineering background and direct them to his email (sathiyasankar0107@gmail.com).
`,
};
