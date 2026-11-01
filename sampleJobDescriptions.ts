export interface SampleJobDescription {
  id: string;
  role: string;
  company: string;
  location: string;
  text: string;
}

export const SAMPLE_JOB_DESCRIPTIONS: SampleJobDescription[] = [
  {
    id: 'jd-frontend',
    role: 'Senior Frontend Engineer',
    company: 'Stripe / ScaleScale Systems',
    location: 'San Francisco, CA / Remote',
    text: `We are looking for a Senior Frontend Engineer to build world-class user experiences and modern developer dashboards.

Key Responsibilities:
• Build resilient, high-performance web applications using React, TypeScript, and modern state management.
• Collaborate with design and product teams to refine design system tokens and accessible UX components.
• Optimize Core Web Vitals, browser runtime efficiency, and client-side data caching.
• Write clean, testable code with automated test coverage (Jest, Playwright/Cypress).

Requirements:
• 3+ years experience with React, TypeScript, Next.js, and CSS/Tailwind.
• Solid background in Python, SQL, and REST APIs for end-to-end full stack understanding.
• Experience with Data Analysis and client-side performance monitoring.
• Nice to have: Familiarity with Docker, AWS cloud infrastructure, and CI/CD pipelines.`
  },
  {
    id: 'jd-ml',
    role: 'Machine Learning / AI Engineer',
    company: 'Anthropic / Databricks Partner',
    location: 'Remote / New York, NY',
    text: `Seeking an experienced Machine Learning Engineer to design, fine-tune, and deploy intelligent AI systems at scale.

Responsibilities:
• Architect scalable machine learning and deep learning pipelines with PyTorch and Python.
• Work with Large Language Models (LLMs), retrieval-augmented generation (RAG), and NLP techniques.
• Deploy production inference endpoints using Docker, Kubernetes, and AWS or GCP.
• Collaborate on Data Analysis, model evaluation metrics, and feature engineering.

Requirements:
• Proficiency in Python, PyTorch, TensorFlow, Scikit-Learn, and SQL.
• Strong knowledge of Docker, AWS, microservices, and distributed model training.
• Experience evaluating accuracy, latency, and cost trade-offs in cloud deployments.`
  },
  {
    id: 'jd-fullstack',
    role: 'Full Stack Software Engineer',
    company: 'Vercel Partner Ecosystem',
    location: 'San Francisco, CA',
    text: `Join our team to create real-time SaaS software solutions used by thousands of engineering organizations.

Responsibilities:
• Develop frontend interfaces with React, Next.js, and Tailwind CSS.
• Design robust backend services and REST APIs with Node.js, TypeScript, and PostgreSQL.
• Integrate Docker containers and manage automated CI/CD deployments on AWS.
• Monitor application performance, database query optimization, and Redis caching.

Requirements:
• Experience with TypeScript, React, Node.js, SQL, and Git.
• Working familiarity with Docker, AWS, and modern automated testing.`
  }
];

