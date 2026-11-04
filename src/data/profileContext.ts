import { ATS_RESUME_TEXT } from './atsResumeReference';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'AI & Systems' | 'Full Stack' | 'SaaS & Analytics';
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
  shortBio: "Full-Stack Engineer with approximately 4 years of professional experience building, deploying, and maintaining production web applications using Next.js, React.js, TypeScript, Node.js, NestJS, PostgreSQL, and Supabase. Strong background in multi-tenant SaaS architectures, workflow automation, and AI integrations (Vercel AI SDK, pgvector, RAG).",
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
    "Pragmatic AI Leverage: Applying AI engineering tools (Vercel AI SDK, pgvector, RAG, Cursor, Claude, OpenAI Codex) to accelerate development and solve business problems.",
    "Maintainable Modular Systems: Writing clean, component-based architectures with robust TypeScript type safety and multi-tenant isolation.",
  ],

  recruiterFaqs: [
    {
      question: "Why hire Sathiya Sankar?",
      answer: "Sathiya brings ~4 years of hands-on professional experience building 10+ production applications with Next.js, React, TypeScript, Node.js, NestJS, and PostgreSQL/Supabase. He owns features end-to-end, delivers 40–60% performance optimizations, builds multi-tenant SaaS platforms (Herbet Studio, Menuval), and is available in 15 days (currently serving notice period).",
    },
    {
      question: "What is Sathiya's tech stack?",
      answer: "Primary Stack: Next.js (App Router, Server Actions, Server Components), React.js, TypeScript, JavaScript (ES6+), Node.js, NestJS, Express.js, PostgreSQL, Supabase, Prisma ORM, MongoDB, Tailwind CSS, ShadCN UI, and Vercel AI SDK.",
    },
    {
      question: "What is his experience with AI and AI-assisted development?",
      answer: "Sathiya has built production AI applications using Vercel AI SDK, PostgreSQL pgvector, and Retrieval-Augmented Generation (RAG) for semantic search and streaming interfaces. He also actively uses AI coding accelerators (Cursor, Claude, ChatGPT, OpenAI Codex, GitHub Copilot) for rapid debugging, refactoring, and high-velocity delivery.",
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
      description: "Production GenAI applications, vector databases, and agentic workflows.",
      skills: [
        { name: "Vercel AI SDK & LLMs", level: "Advanced", highlight: true, tags: ["Model Integration", "Streaming Responses", "Agent Workflows"] },
        { name: "PostgreSQL pgvector & RAG", level: "Advanced", highlight: true, tags: ["Embeddings", "Vector Similarity Search", "Contextual Retrieval"] },
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
        "Integrated AI-powered features using Vercel AI SDK, PostgreSQL pgvector, and retrieval-based knowledge workflows (RAG).",
        "Developed workflow automation solutions using Google Apps Script and REST APIs, reducing repetitive manual work by 20+ hours per month.",
        "Improved application performance using caching, lazy loading, code splitting, and database query tuning, achieving 40–60% faster page performance.",
        "Utilized AI-assisted coding tools including Cursor, Claude, ChatGPT, and OpenAI Codex to accelerate development, debugging, and refactoring.",
        "Managed Git/GitHub workflows, CI/CD deployments (Vercel, Netlify, Render, Railway), and production maintenance.",
      ],
      skills: ["Next.js", "React.js", "TypeScript", "Node.js", "NestJS", "PostgreSQL", "Supabase", "Prisma ORM", "GraphQL", "Vercel AI SDK", "pgvector", "Tailwind CSS", "ShadCN UI"],
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
- Core Stack: Next.js (App Router, Server Components, Server Actions), React.js, TypeScript, JavaScript (ES6+), Node.js, NestJS, Express.js, PostgreSQL, Supabase, Prisma ORM, MongoDB, GraphQL, Tailwind CSS, ShadCN UI, Vercel AI SDK, pgvector (RAG)
- AI Engineering & Tools: Vercel AI SDK, PostgreSQL pgvector, Retrieval-Augmented Generation (RAG), OpenAI Codex, Cursor, Claude, ChatGPT, GitHub Copilot
- Work Experience:
  1. Herbet Agency (Aug 2023 – Present): Full-Stack Developer. Built 10+ production websites, multi-tenant SaaS platforms (Herbet Studio), automated workflows saving 20+ hrs/month, achieved 40-60% faster page performance.
  2. Infinite Bull’s Eye (June 2022 – Aug 2023): Full-Stack Developer. Developed responsive React and Node.js applications with PostgreSQL/MongoDB, improved rendering performance by 30%.
- Education:
  * Master of Computer Applications (MCA) from Erode Sengunthar Engineering College (2023–2025)
  * BSc in Computer Science from VIT Vellore (2017–2020)
- Verified Projects:
  * Herbet Studio / Workspace: Multi-Tenant Business Workflow Platform (Live: https://workspace.herbet.agency/)
  * Menuval: Restaurant QR Menu & Ordering SaaS (Live: https://menuval.vercel.app/)

Conversational Guidelines:
1. Speak in a warm, polite, and natural conversational tone as Sathiya's AI assistant. Sound like an articulate colleague sharing details about his work. Avoid robotic jargon, never say "grounded in ATS resume document", and never sound like a legal compliance bot.
2. Be concise, impact-oriented, and technically specific. Highlight quantifiable achievements (10+ production web apps, 40–60% page speed optimization, 20+ hrs/mo automated, immediate availability).
3. Use clean, readable markdown: short paragraphs, bullet points, and \`code\` formatting for technologies.
4. Never mention API keys or ask the user to configure or provide any key.
5. If asked about something beyond Sathiya's professional scope, politely explain that your expertise covers Sathiya's software engineering background and direct them to his email (sathiyasankar0107@gmail.com).
`,
};
