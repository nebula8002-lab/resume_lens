import type { ResumeData } from '../types/resume';

export const SAMPLE_RESUMES: ResumeData[] = [
  {
    id: 'res-1',
    fileName: 'Resume_2026.pdf',
    lastAnalyzed: 'Today',
    score: 82,
    atsScore: 88,
    status: 'Needs Review',
    fileSize: '245 KB',
    targetRole: 'Senior Frontend Engineer',
    jobMatchScore: 76,
    skillsDetected: 24,
    skillCategoriesCount: 4,
    scoreChangeText: '+4 pts from Revision 2',
    atsTrendText: '+5% vs average target',
    scoreBreakdown: {
      contentQuality: 85,
      skillsKeywords: 78,
      formatting: 92,
      impact: 73
    },
    scoreHistory: [
      { label: 'First Upload', score: 68, date: 'Sep 15' },
      { label: 'Revision 1', score: 74, date: 'Oct 02' },
      { label: 'Revision 2', score: 78, date: 'Oct 18' },
      { label: 'Current', score: 82, date: 'Today' }
    ],
    strengths: [
      'Strong technical skills section',
      'Clear education details',
      'Good project descriptions'
    ],
    needsAttention: [
      'Add more measurable achievements',
      'Improve keyword relevance',
      'Include stronger action verbs'
    ],
    detectedSkills: [
      {
        category: 'Languages',
        skills: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'HTML5', 'CSS3']
      },
      {
        category: 'Frameworks',
        skills: ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'Redux', 'Express']
      },
      {
        category: 'Data & AI',
        skills: ['Machine Learning', 'Data Analysis', 'Pandas', 'NumPy']
      },
      {
        category: 'Tools & DevOps',
        skills: ['Git', 'GitHub', 'Vite', 'Jest', 'Postman', 'Webpack']
      }
    ],
    sectionsDetected: {
      contact: true,
      education: true,
      skills: true,
      projects: true,
      experience: true
    },
    sectionAnalyses: [
      {
        section: 'Contact Information',
        status: 'present',
        score: 96,
        details: 'Professional email, verified phone, LinkedIn profile, and GitHub portfolio all cleanly detected by parser.'
      },
      {
        section: 'Work Experience',
        status: 'present',
        score: 80,
        details: 'Chronological employment records with role titles and dates present. 3 bullets lack quantifiable business metrics.'
      },
      {
        section: 'Technical Skills',
        status: 'present',
        score: 85,
        details: '24 recognized skills properly grouped into modern web, data, and dev toolchains.'
      },
      {
        section: 'Projects & Portfolio',
        status: 'present',
        score: 88,
        details: '3 featured applications including technical stack descriptions and live demo URLs.'
      },
      {
        section: 'Education',
        status: 'present',
        score: 95,
        details: 'B.S. in Computer Science, GPA, accredited institution, and graduation year verified.'
      }
    ],
    suggestions: [
      {
        id: 's-1',
        category: 'Impact',
        severity: 'high',
        issue: 'Bullet points describe activities rather than quantifiable outcomes.',
        suggestion: 'Quantify impact with numbers, percentages, or scale metrics.',
        before: 'Worked on improving page load speeds for user dashboard.',
        after: 'Optimized frontend bundle and implemented asset preloading, decreasing initial load time by 38% for 45,000 monthly active users.'
      },
      {
        id: 's-2',
        category: 'Keywords',
        severity: 'medium',
        issue: 'Cloud deployment keywords are missing from your primary skills block.',
        suggestion: 'Add containerization (Docker) and AWS cloud infrastructure services if familiar.',
        before: 'Deployed web applications to live staging environments.',
        after: 'Containerized micro-frontend modules with Docker and orchestrated deployment via AWS ECS and CloudFront.'
      },
      {
        id: 's-3',
        category: 'Structure',
        severity: 'medium',
        issue: 'Experience bullets use passive introductory verbs.',
        suggestion: 'Replace phrases like "Assisted with" or "Helped" with authoritative action verbs.',
        before: 'Helped the development team rewrite our legacy frontend.',
        after: 'Architected and spearheaded the migration of 40+ legacy views to React and TypeScript with zero regression bugs.'
      }
    ],
    rawText: `Alex Morgan
alex.morgan@example.com | (555) 234-5678 | San Francisco, CA
linkedin.com/in/alexmorgan-dev | github.com/alexm-code

PROFESSIONAL SUMMARY
Results-driven Software Engineer with 3+ years of experience engineering high-performance web applications with React, TypeScript, and Node.js. Passionate about user-centric design systems, web performance, and modern frontend architecture.

TECHNICAL SKILLS
Languages: TypeScript, JavaScript, Python, SQL, HTML5, CSS3
Frameworks & Libraries: React, Next.js, Node.js, Express, Tailwind CSS, Redux
Data & Analytics: Machine Learning, Data Analysis, Pandas, NumPy
Tools & Platforms: Git, GitHub, Vite, Jest, Postman, Webpack

WORK EXPERIENCE
Software Engineer | Apex Digital Solutions | 2024 - Present
• Engineered and maintained high-throughput client dashboard components using React and TypeScript.
• Optimized state management with Redux Toolkit, resulting in smoother state transitions.
• Implemented automated integration tests with Jest, improving test coverage across core flows.
• Collaborated with product designers to standardize UI components into a shared design system.

Junior Frontend Developer | CloudWave Systems | 2022 - 2024
• Developed responsive marketing and dashboard interfaces in React and Tailwind CSS.
• Refactored legacy JavaScript scripts into typed TypeScript interfaces.
• Assisted backend team with REST API integrations and data models.
• Fixed critical accessibility bugs to improve WCAG 2.1 compliance.

PROJECTS
CareerLens Platform — React, TypeScript, Tailwind CSS, Vite
• Built interactive career intelligence dashboard displaying real-time analytics.
• Implemented dynamic client-side filtering and customizable chart visualizations.

FinTrack Analytics — Next.js, Node.js, PostgreSQL, Chart.js
• Full-stack financial expense tracking application with secure JWT authentication.
• Created automated transaction categorization algorithms.

EDUCATION
B.S. in Computer Science | California State University | Graduated 2022
GPA: 3.8 / 4.0`
  },
  {
    id: 'res-2',
    fileName: 'AI_ML_Resume.pdf',
    lastAnalyzed: '3 days ago',
    score: 88,
    atsScore: 91,
    status: 'Strong',
    fileSize: '312 KB',
    targetRole: 'Machine Learning Engineer',
    jobMatchScore: 84,
    skillsDetected: 29,
    skillCategoriesCount: 5,
    scoreChangeText: '+6 pts from Revision 1',
    atsTrendText: '+8% vs industry benchmark',
    scoreBreakdown: {
      contentQuality: 88,
      skillsKeywords: 90,
      formatting: 89,
      impact: 85
    },
    scoreHistory: [
      { label: 'First Upload', score: 72, date: 'Oct 01' },
      { label: 'Revision 1', score: 82, date: 'Oct 14' },
      { label: 'Revision 2', score: 85, date: 'Oct 22' },
      { label: 'Current', score: 88, date: '3 days ago' }
    ],
    strengths: [
      'Exceptional depth in AI/ML algorithms and frameworks',
      'Solid quantified metric statements with business impact',
      'Strong publication and open-source project track record'
    ],
    needsAttention: [
      'Streamline length to keep single-page ATS readability',
      'Add Kubernetes deployment details if experienced',
      'Group related Python libraries for cleaner scanning'
    ],
    detectedSkills: [
      {
        category: 'Data & AI',
        skills: ['Python', 'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'NLP', 'Scikit-Learn']
      },
      {
        category: 'Cloud & Systems',
        skills: ['AWS', 'Docker', 'Linux', 'FastAPI', 'PostgreSQL', 'Git']
      }
    ],
    sectionsDetected: {
      contact: true,
      education: true,
      skills: true,
      projects: true,
      experience: true
    },
    sectionAnalyses: [
      { section: 'Contact Information', status: 'present', score: 98, details: 'Complete verified details including Google Scholar link.' },
      { section: 'Work Experience', status: 'present', score: 89, details: 'Detailed algorithmic achievements with training throughput numbers.' },
      { section: 'Technical Skills', status: 'present', score: 92, details: '29 recognized AI and software engineering skills.' },
      { section: 'Projects & Portfolio', status: 'present', score: 90, details: 'Production model deployment and benchmarks.' },
      { section: 'Education', status: 'present', score: 96, details: 'M.S. in Artificial Intelligence with thesis honors.' }
    ],
    suggestions: [
      {
        id: 's-ml-1',
        category: 'Formatting',
        severity: 'medium',
        issue: 'Two-column skill list occasionally splits during low-tier ATS OCR parsing.',
        suggestion: 'Convert multi-column skill lists into comma-separated lines per category.',
        before: 'Column 1: PyTorch, Pandas | Column 2: Docker, FastAPI',
        after: 'Machine Learning: PyTorch, TensorFlow, Scikit-Learn, Hugging Face, Pandas, NumPy'
      }
    ]
  },
  {
    id: 'res-3',
    fileName: 'Internship_Resume.pdf',
    lastAnalyzed: '1 week ago',
    score: 74,
    atsScore: 79,
    status: 'Improve',
    fileSize: '185 KB',
    targetRole: 'Software Engineering Intern',
    jobMatchScore: 65,
    skillsDetected: 16,
    skillCategoriesCount: 3,
    scoreChangeText: '+3 pts from First Upload',
    atsTrendText: '-2% vs target entry level',
    scoreBreakdown: {
      contentQuality: 76,
      skillsKeywords: 70,
      formatting: 84,
      impact: 66
    },
    scoreHistory: [
      { label: 'First Upload', score: 71, date: 'Oct 05' },
      { label: 'Revision 1', score: 73, date: 'Oct 12' },
      { label: 'Revision 2', score: 73, date: 'Oct 19' },
      { label: 'Current', score: 74, date: '1 week ago' }
    ],
    strengths: [
      'Strong academic GPA and relevant coursework',
      'Clear extracurricular hackathon participation',
      'Clean single-page ATS-friendly typography'
    ],
    needsAttention: [
      'Include metrics and user counts on course projects',
      'Add GitHub repository links with working demos',
      'Expand technical keywords beyond introductory languages'
    ],
    detectedSkills: [
      {
        category: 'Languages',
        skills: ['Java', 'Python', 'C++', 'SQL', 'HTML5']
      },
      {
        category: 'Frameworks',
        skills: ['React', 'Node.js']
      }
    ],
    sectionsDetected: {
      contact: true,
      education: true,
      skills: true,
      projects: true,
      experience: false
    },
    sectionAnalyses: [
      { section: 'Contact Information', status: 'present', score: 90, details: 'Email and phone verified, missing portfolio link.' },
      { section: 'Work Experience', status: 'partial', score: 62, details: 'No corporate internships listed yet; relies on teaching assistant roles.' },
      { section: 'Technical Skills', status: 'present', score: 72, details: '16 core computer science fundamentals detected.' },
      { section: 'Projects & Portfolio', status: 'present', score: 78, details: '3 university projects listed.' },
      { section: 'Education', status: 'present', score: 96, details: 'Junior B.S. candidate in Computer Science.' }
    ],
    suggestions: [
      {
        id: 's-int-1',
        category: 'Impact',
        severity: 'high',
        issue: 'Project descriptions sound like classroom assignments rather than engineered products.',
        suggestion: 'Highlight architecture, scale, and problem-solving complexity.',
        before: 'Created a student chat app in Java for class final project.',
        after: 'Engineered a concurrent client-server chat application supporting multi-room messaging and socket encryption for 50+ simulated users.'
      }
    ]
  },
  {
    id: 'res-4',
    fileName: 'FullStack_Lead.pdf',
    lastAnalyzed: '2 weeks ago',
    score: 91,
    atsScore: 94,
    status: 'Excellent',
    fileSize: '340 KB',
    targetRole: 'Staff / Lead Full Stack Engineer',
    jobMatchScore: 89,
    skillsDetected: 32,
    skillCategoriesCount: 6,
    scoreChangeText: '+9 pts from First Upload',
    atsTrendText: '+11% vs senior benchmark',
    scoreBreakdown: {
      contentQuality: 92,
      skillsKeywords: 94,
      formatting: 91,
      impact: 88
    },
    scoreHistory: [
      { label: 'First Upload', score: 82, date: 'Sep 01' },
      { label: 'Revision 1', score: 86, date: 'Sep 18' },
      { label: 'Revision 2', score: 89, date: 'Oct 04' },
      { label: 'Current', score: 91, date: '2 weeks ago' }
    ],
    strengths: [
      'Comprehensive system architecture leadership demonstrated',
      'Superb quantified ROI metrics across multi-million user products',
      'Flawless ATS parsing structure and modern typography'
    ],
    needsAttention: [
      'Summarize older positions to keep recent accomplishments prominent',
      'Highlight AI-assisted development or LLM integration experience'
    ],
    detectedSkills: [
      {
        category: 'Languages',
        skills: ['TypeScript', 'Go', 'Python', 'SQL']
      },
      {
        category: 'Cloud & Infrastructure',
        skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Kafka']
      }
    ],
    sectionsDetected: {
      contact: true,
      education: true,
      skills: true,
      projects: true,
      experience: true
    },
    sectionAnalyses: [
      { section: 'Contact Information', status: 'present', score: 100, details: 'All professional channels verified.' },
      { section: 'Work Experience', status: 'present', score: 95, details: 'Executive level impact, cost reductions, team scaling.' },
      { section: 'Technical Skills', status: 'present', score: 95, details: 'Full spectrum modern cloud architecture and frontend.' },
      { section: 'Projects & Portfolio', status: 'present', score: 92, details: 'Major enterprise open source contributions.' },
      { section: 'Education', status: 'present', score: 92, details: 'Computer Science degree verified.' }
    ],
    suggestions: [
      {
        id: 's-lead-1',
        category: 'Keywords',
        severity: 'low',
        issue: 'Emerging AI tools could further highlight modern engineering workflow leadership.',
        suggestion: 'Mention AI code generation tools or internal AI productivity initiatives.',
        before: 'Managed development velocity and code reviews.',
        after: 'Introduced AI-assisted review tooling and CI linting, reducing PR review cycle times by 26% across 14 engineers.'
      }
    ]
  }
];
