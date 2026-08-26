import { ExperienceItem, SkillCategory, ProjectItem, SocialPlatformItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Niranjan',
  tagline: '“I turn ideas into interfaces, problems into systems, and curiosity into things that work.”',
  email: 'niranjanbhupathi123@gmail.com',
  github: 'https://github.com/NiranjanKJ304',
  linkedin: 'https://www.linkedin.com/in/niranjan-kj',
  instagram: 'https://www.instagram.com/niranjan.zip?igsi=d2FzY3RhMXFvZnJy',
  x: 'https://x.com/Niranja48809186',
  reddit: 'https://www.reddit.com/user/niranjan_kj/',
};

export const SOCIAL_PLATFORMS: SocialPlatformItem[] = [
  {
    id: 'email',
    name: 'Email',
    category: 'Direct Inquiries',
    handle: 'niranjanbhupathi123@gmail.com',
    url: 'mailto:niranjanbhupathi123@gmail.com',
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Open Source',
    handle: 'github.com/NiranjanKJ304',
    url: 'https://github.com/NiranjanKJ304',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    category: 'Professional Network',
    handle: 'linkedin.com/in/niranjan-kj',
    url: 'https://www.linkedin.com/in/niranjan-kj',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    category: 'Visuals & Stories',
    handle: '@niranjan.zip',
    url: 'https://www.instagram.com/niranjan.zip?igsi=d2FzY3RhMXFvZnJy',
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    category: 'Thoughts & Updates',
    handle: '@Niranja48809186',
    url: 'https://x.com/Niranja48809186',
  },
  {
    id: 'reddit',
    name: 'Reddit',
    category: 'Community & Tech',
    handle: 'u/niranjan_kj',
    url: 'https://www.reddit.com/user/niranjan_kj/',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    period: '2026 → Present',
    year: '2026',
    role: 'AI Engineer',
    company: 'FortRise Business Solution',
    isCurrent: true,
    highlight: 'Current role',
    details: [
      'Developing enterprise AI applications using Python, FastAPI, and LLM-based backend services.',
      'Building RAG pipelines with LangChain, LangGraph, embedding models, Qdrant, and semantic search.',
      'Developing REST APIs for document understanding and conversational AI systems, while integrating PostgreSQL, Redis, Docker, and Git into production-ready AI workflows.'
    ],
    technologies: [
      'Python',
      'FastAPI',
      'LLMs',
      'LangChain',
      'LangGraph',
      'Embedding Models',
      'Qdrant',
      'Semantic Search',
      'REST APIs',
      'Hugging Face Transformers',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Git'
    ]
  },
  {
    id: 'exp-2',
    period: '2026',
    year: '2026',
    role: 'Full Stack Builder Intern',
    company: 'Quantum Plus Technologies',
    duration: '1 Month',
    highlight: 'Hostel Management System',
    details: [
      'Built a Hostel Management System for a college environment with 7 role-based logins and combined functionality.',
      'The system helps simplify hostel operations including leave management, outing management, warden monitoring, security activities, room allocation, and other hostel administration workflows.'
    ],
    technologies: [
      'TypeScript',
      'React',
      'Node.js',
      'Express',
      'MongoDB Atlas'
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'ai-ml',
    title: 'AI / ML',
    skills: [
      'Machine Learning',
      'NLP',
      'RAG',
      'LLMs',
      'GraphRAG',
      'MCP',
      'Semantic Search'
    ]
  },
  {
    id: 'full-stack',
    title: 'FULL STACK',
    skills: [
      'React',
      'JSX',
      'TSX',
      'Python',
      'FastAPI',
      'Node.js',
      'Express',
      'REST APIs'
    ]
  },
  {
    id: 'data',
    title: 'DATA',
    skills: [
      'PostgreSQL',
      'MongoDB',
      'MongoDB Atlas',
      'MySQL',
      'Qdrant',
      'Redis'
    ]
  },
  {
    id: 'tools',
    title: 'TOOLS',
    skills: [
      'Git',
      'GitHub',
      'Docker',
      'Linux'
    ]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'candidate-ranking',
    number: '01',
    title: 'Candidate Ranking System',
    metrics: '100K+ profiles',
    domainTags: 'AI · Search · Ranking',
    concept: '100K+ Candidate Profiles → AI Ranking → Top Candidates',
    description: 'An offline AI candidate-ranking engine combining: Feature Engineering → Semantic Matching → Retrieval → Multi-Stage Ranking',
    architectureFlow: [
      '100K+ Profiles',
      'Feature Engineering',
      'Semantic Matching',
      'Retrieval',
      'Multi-Stage Ranking',
      'Top Candidates'
    ],
    technologies: ['Python', 'Sentence Transformers', 'Semantic Search', 'FastAPI', 'Ranking Pipeline'],
    githubUrl: 'https://github.com/NiranjanKJ304/Ana.de.armas-redrob-candidate-ranking'
  },
  {
    id: 'crime-intelligence',
    number: '02',
    title: 'Crime Intelligence Bot',
    metrics: 'GraphRAG & Vector Search',
    domainTags: 'AI · Knowledge Graph · Intelligence',
    description: 'An AI-powered crime investigation and analytics platform combining: ETL → PostgreSQL → Knowledge Graph → Vector Search → GraphRAG → LLM Reasoning',
    architectureFlow: [
      'ETL Pipeline',
      'PostgreSQL',
      'Knowledge Graph',
      'Vector Search',
      'GraphRAG',
      'LLM Reasoning'
    ],
    technologies: ['PostgreSQL', 'Knowledge Graph', 'Vector Search', 'GraphRAG', 'LLM Reasoning', 'FastAPI'],
    githubUrl: 'https://github.com/NiranjanKJ304/crime-intelligence-bot'
  },
  {
    id: 'msme-loan',
    number: '03',
    title: 'AI MSME Loan Processor',
    metrics: 'Intelligent Lending Engine',
    domainTags: 'AI · Automation · Financial Systems',
    description: 'An AI-driven lending workflow designed to evaluate MSME financial health using alternative financial data and intelligent decision workflows.',
    architectureFlow: [
      'Alternative Financial Data',
      'Financial Health Scoring',
      'Decision Workflows',
      'Intelligent Evaluation'
    ],
    technologies: ['Python', 'Financial Risk Scoring', 'Alternative Data', 'Decision Engine', 'REST APIs'],
    githubUrl: 'https://github.com/NiranjanKJ304/AI-MSME-Loanprocess'
  },
  {
    id: 'ai-interview-system',
    number: '04',
    title: 'AI Interview System',
    metrics: 'Real-Time Audio & Vision AI',
    domainTags: 'AI · Voice · Computer Vision · Evaluation',
    concept: 'Interview Simulation → Voice & Body Language → Real-Time AI Feedback',
    description: 'An AI-powered Interview Preparation System that simulates real-time technical and HR interviews. It generates domain-specific questions, listens to answers via microphone, evaluates responses with AI, and provides instant feedback along with body language monitoring using the webcam.',
    architectureFlow: [
      'Domain-Specific Question Generation',
      'Audio & Microphone Capture',
      'AI Response Evaluation',
      'Webcam Body Language Monitoring',
      'Instant Multimodal Feedback'
    ],
    technologies: ['Python', 'LLMs', 'Speech-to-Text', 'Computer Vision', 'Webcam Monitoring', 'FastAPI'],
    githubUrl: 'https://github.com/NiranjanKJ304/AI-Interview-BOT'
  }
];

export const NAV_LINKS = [
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
  { label: 'RESUME', href: '/resume' },
];
