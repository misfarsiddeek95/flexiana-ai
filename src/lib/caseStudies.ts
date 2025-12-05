import { CaseStudy, RelatedCaseStudy } from "@/types/caseStudy";

/**
 * Mock case studies data
 */
const mockCaseStudies: CaseStudy[] = [
  {
    id: "1",
    slug: "gitrevio",
    title: "Gitrevio",
    subtitle: "Internal Tools Modernization & Automation",
    client: "Gitrevio Inc.",
    industry: "Software Development",
    year: "2024",
    duration: "6 months",
    heroImage: "/images/case-studies/gitrevio.jpg",
    heroVideo: "https://player.vimeo.com/video/1137834847",
    heroImageAlt: "Gitrevio platform interface",
    tags: ["Refactoring", "Software", "2024"],

    overview:
      "Gitrevio needed to modernize their internal development tools and automate repetitive workflows to improve team productivity and code quality. The existing toolset was fragmented, leading to inefficiencies and inconsistent processes across teams.",

    challenge: {
      description:
        "The development team faced multiple challenges with their existing infrastructure:",
      points: [
        "Legacy codebase with technical debt accumulated over 5 years",
        "Manual code review processes causing bottlenecks",
        "Inconsistent development environments across team members",
        "Lack of automated testing and deployment pipelines",
        "Poor visibility into code quality metrics and team performance",
      ],
    },

    solution: {
      description:
        "We implemented a comprehensive modernization strategy focusing on automation, standardization, and developer experience:",
      approach: [
        {
          title: "Code Refactoring & Architecture",
          description:
            "Systematically refactored the legacy codebase using modern design patterns",
          details: [
            "Migrated from monolithic to microservices architecture",
            "Implemented clean code principles and SOLID design patterns",
            "Established coding standards and style guides",
          ],
        },
        {
          title: "Automation Pipeline",
          description:
            "Built end-to-end CI/CD pipelines for automated testing and deployment",
          details: [
            "Automated unit, integration, and e2e testing",
            "Implemented continuous deployment with rollback capabilities",
            "Set up automated code quality checks and security scanning",
          ],
        },
        {
          title: "Developer Tools",
          description:
            "Created custom tools to streamline development workflows",
          details: [
            "Built CLI tools for common development tasks",
            "Implemented automated code review assistance",
            "Created development environment templates with Docker",
          ],
        },
      ],
    },

    techStack: {
      categories: [
        {
          name: "Backend",
          technologies: ["Node.js", "TypeScript", "PostgreSQL", "Redis"],
        },
        {
          name: "Frontend",
          technologies: ["React", "Next.js", "Tailwind CSS"],
        },
        {
          name: "DevOps",
          technologies: ["Docker", "Kubernetes", "GitHub Actions", "AWS"],
        },
        {
          name: "Tools",
          technologies: ["ESLint", "Prettier", "Jest", "Cypress"],
        },
      ],
    },

    results: {
      description:
        "The modernization effort delivered significant improvements across all key metrics:",
      metrics: [
        { value: "60%", label: "Faster deployment time" },
        { value: "85%", label: "Reduction in bugs" },
        { value: "40%", label: "Increased productivity" },
        { value: "95%", label: "Test coverage" },
      ],
      outcomes: [
        "Deployment time reduced from 2 hours to 30 minutes",
        "Bug reports decreased by 85% in production",
        "Developer satisfaction scores increased by 40%",
        "Code review time cut in half with automated assistance",
        "Onboarding time for new developers reduced from 2 weeks to 3 days",
      ],
    },

    metaDescription:
      "How we modernized Gitrevio's internal tools and automated workflows, resulting in 60% faster deployments and 85% fewer bugs.",
    metaKeywords: [
      "code refactoring",
      "automation",
      "CI/CD",
      "developer tools",
    ],
    carouselData: {
      title: "Gitrevio: Code Reviews, Evolved",
      points: [
        "Track review quality",
        "Reveal team insights",
        "Speed merges & clarity",
      ],
    },
  },
  {
    id: "2",
    slug: "fiiha",
    title: "Fiiha",
    subtitle: "Multimodal AI Platform for Healthcare",
    client: "Fiiha Health",
    industry: "Healthcare Technology",
    year: "2024",
    duration: "8 months",
    heroImage: "/images/case-studies/fiiha.jpg",
    heroVideo: "https://player.vimeo.com/video/1139433575",
    heroImageAlt: "Fiiha AI platform dashboard",
    tags: ["Multimodal AI", "Software", "2024"],

    overview:
      "Fiiha required a sophisticated AI platform capable of processing multiple data types (text, images, voice) to assist healthcare professionals in diagnosis and patient care. The platform needed to be HIPAA compliant and highly accurate.",

    challenge: {
      description:
        "Building a multimodal AI system for healthcare presented unique challenges:",
      points: [
        "Processing and correlating data from multiple sources (medical images, patient records, voice notes)",
        "Ensuring HIPAA compliance and data security",
        "Achieving high accuracy rates required for medical applications",
        "Real-time processing for time-sensitive medical decisions",
        "Integration with existing hospital management systems",
      ],
    },

    solution: {
      description:
        "We developed a comprehensive multimodal AI platform with advanced machine learning capabilities:",
      approach: [
        {
          title: "AI Model Development",
          description:
            "Built custom AI models for processing multiple data modalities",
          details: [
            "Trained computer vision models for medical image analysis",
            "Implemented NLP for processing medical records and notes",
            "Developed speech-to-text for voice note transcription",
          ],
        },
        {
          title: "Security & Compliance",
          description: "Implemented enterprise-grade security measures",
          details: [
            "End-to-end encryption for all patient data",
            "HIPAA-compliant data storage and processing",
            "Audit logging and access controls",
          ],
        },
        {
          title: "Integration Layer",
          description: "Created seamless integrations with healthcare systems",
          details: [
            "HL7/FHIR API integrations",
            "Real-time data synchronization",
            "Custom connectors for legacy systems",
          ],
        },
      ],
    },

    techStack: {
      categories: [
        {
          name: "AI/ML",
          technologies: [
            "TensorFlow",
            "PyTorch",
            "OpenAI GPT-4",
            "Hugging Face",
          ],
        },
        {
          name: "Backend",
          technologies: ["Python", "FastAPI", "PostgreSQL", "MongoDB"],
        },
        {
          name: "Frontend",
          technologies: ["React", "TypeScript", "Material-UI"],
        },
        {
          name: "Infrastructure",
          technologies: ["AWS", "Docker", "Kubernetes", "Redis"],
        },
      ],
    },

    results: {
      description:
        "The AI platform transformed healthcare delivery for Fiiha's clients:",
      metrics: [
        { value: "94%", label: "Diagnostic accuracy" },
        { value: "50%", label: "Faster diagnosis" },
        { value: "10K+", label: "Patients served" },
        { value: "99.9%", label: "System uptime" },
      ],
      outcomes: [
        "Diagnostic accuracy improved to 94%, matching specialist-level performance",
        "Average diagnosis time reduced by 50%",
        "Successfully processed over 10,000 patient cases",
        "Zero security breaches or HIPAA violations",
        "Positive feedback from 95% of healthcare professionals",
      ],
    },

    metaDescription:
      "How we built a HIPAA-compliant multimodal AI platform for Fiiha, achieving 94% diagnostic accuracy and serving 10K+ patients.",
    metaKeywords: [
      "multimodal AI",
      "healthcare AI",
      "HIPAA compliance",
      "medical diagnosis",
    ],
    carouselData: {
      title: "Fiiha: Smarter Campaigns, Better Results",
      points: [
        "AIAuto-tags segments, campaigns & outreach",
        "Optimizes with Bayesian algorithms",
        "Measures what truly works for your audience",
      ],
    },
  },
  {
    id: "3",
    slug: "marginboost",
    title: "MarginBoost",
    subtitle: "E-commerce Profit Optimization Platform",
    client: "MarginBoost Inc.",
    industry: "E-commerce & Retail",
    year: "2024",
    duration: "5 months",
    heroImage: "/images/case-studies/marginboost.png",
    heroImageAlt: "MarginBoost analytics dashboard",
    heroVideo: "https://player.vimeo.com/video/1137834904",
    tags: ["Refactoring", "Software", "2024"],

    overview:
      "MarginBoost needed to refactor their legacy pricing optimization platform to handle increased scale and provide real-time analytics for e-commerce businesses. The existing system was slow, difficult to maintain, and couldn't keep up with growing customer demands.",

    challenge: {
      description:
        "The platform faced critical scalability and performance issues:",
      points: [
        "Legacy monolithic architecture causing performance bottlenecks",
        "Slow data processing taking hours instead of minutes",
        "Difficult to add new features due to tightly coupled code",
        "Poor user experience with delayed insights and reports",
        "High infrastructure costs due to inefficient resource usage",
      ],
    },

    solution: {
      description:
        "We executed a comprehensive refactoring strategy to modernize the platform:",
      approach: [
        {
          title: "Architecture Redesign",
          description:
            "Transformed the monolithic system into a scalable microservices architecture",
          details: [
            "Separated pricing engine, analytics, and reporting into independent services",
            "Implemented event-driven architecture for real-time data processing",
            "Created API gateway for unified access and rate limiting",
          ],
        },
        {
          title: "Performance Optimization",
          description:
            "Optimized data processing and database queries for speed",
          details: [
            "Implemented caching layer with Redis for frequently accessed data",
            "Optimized database queries and added proper indexing",
            "Introduced background job processing for heavy computations",
          ],
        },
        {
          title: "Code Quality Improvements",
          description: "Refactored codebase following modern best practices",
          details: [
            "Applied SOLID principles and design patterns",
            "Increased test coverage from 30% to 90%",
            "Implemented comprehensive error handling and logging",
          ],
        },
      ],
    },

    techStack: {
      categories: [
        {
          name: "Backend",
          technologies: ["Python", "FastAPI", "Celery", "PostgreSQL"],
        },
        {
          name: "Frontend",
          technologies: ["React", "TypeScript", "Redux", "Chart.js"],
        },
        {
          name: "Infrastructure",
          technologies: ["AWS", "Docker", "Kubernetes", "Redis"],
        },
        {
          name: "Analytics",
          technologies: ["Apache Spark", "Pandas", "NumPy"],
        },
      ],
    },

    results: {
      description:
        "The refactoring delivered dramatic improvements in performance and user satisfaction:",
      metrics: [
        { value: "95%", label: "Faster processing" },
        { value: "70%", label: "Cost reduction" },
        { value: "90%", label: "Test coverage" },
        { value: "4.8/5", label: "User satisfaction" },
      ],
      outcomes: [
        "Data processing time reduced from 2 hours to 6 minutes",
        "Infrastructure costs decreased by 70% through optimization",
        "System now handles 10x more concurrent users",
        "New features can be deployed in days instead of weeks",
        "Customer churn reduced by 45% due to improved experience",
      ],
    },

    metaDescription:
      "How we refactored MarginBoost's e-commerce platform, achieving 95% faster processing and 70% cost reduction.",
    metaKeywords: [
      "code refactoring",
      "e-commerce",
      "performance optimization",
      "microservices",
    ],
    carouselData: {
      title: "MarginBoost: Smarter Margins, in Real Time",
      points: [
        "Dynamic pricing",
        "Adapts instantly to markets",
        "15–20% more accurate",
      ],
    },
  },
  {
    id: "4",
    slug: "kaleidux",
    title: "Kaleidux",
    subtitle: "Multimodal AI Content Creation Platform",
    client: "Kaleidux Media",
    industry: "Media & Entertainment",
    year: "2024",
    duration: "7 months",
    heroImage: "/images/case-studies/kaleidux.png",
    heroImageAlt: "Kaleidux AI content studio",
    heroVideo: "https://player.vimeo.com/video/1137834872",
    tags: ["Multimodal AI", "Software", "2024"],

    overview:
      "Kaleidux required an advanced AI platform capable of generating and editing content across multiple formats - text, images, video, and audio. The platform needed to enable content creators to produce high-quality multimedia content efficiently using AI assistance.",

    challenge: {
      description:
        "Building a unified multimodal content creation platform presented complex challenges:",
      points: [
        "Integrating multiple AI models for different content types seamlessly",
        "Ensuring consistent quality across text, image, video, and audio generation",
        "Managing large file uploads and processing without performance degradation",
        "Creating an intuitive interface for complex AI-powered workflows",
        "Handling copyright and content moderation at scale",
      ],
    },

    solution: {
      description:
        "We developed a sophisticated multimodal AI platform with unified workflows:",
      approach: [
        {
          title: "AI Integration Layer",
          description:
            "Built a unified API layer connecting multiple AI services",
          details: [
            "Integrated GPT-4 for text generation and editing",
            "Connected DALL-E and Stable Diffusion for image creation",
            "Implemented video generation using RunwayML",
            "Added voice synthesis with ElevenLabs",
          ],
        },
        {
          title: "Workflow Engine",
          description:
            "Created a visual workflow builder for complex content pipelines",
          details: [
            "Drag-and-drop interface for building content workflows",
            "Template system for common content creation patterns",
            "Real-time preview and iteration capabilities",
          ],
        },
        {
          title: "Content Management",
          description:
            "Implemented robust asset management and version control",
          details: [
            "Cloud storage integration with CDN delivery",
            "Version history and rollback capabilities",
            "Automated content moderation and copyright checking",
          ],
        },
      ],
    },

    techStack: {
      categories: [
        {
          name: "AI/ML",
          technologies: [
            "OpenAI GPT-4",
            "DALL-E",
            "Stable Diffusion",
            "ElevenLabs",
          ],
        },
        {
          name: "Backend",
          technologies: ["Node.js", "Python", "GraphQL", "MongoDB"],
        },
        {
          name: "Frontend",
          technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
        },
        {
          name: "Infrastructure",
          technologies: ["AWS S3", "CloudFront", "Lambda", "Docker"],
        },
      ],
    },

    results: {
      description:
        "The platform revolutionized content creation for Kaleidux's users:",
      metrics: [
        { value: "80%", label: "Faster content creation" },
        { value: "50K+", label: "Assets generated" },
        { value: "98%", label: "User retention" },
        { value: "4.9/5", label: "Platform rating" },
      ],
      outcomes: [
        "Content creation time reduced by 80% on average",
        "Over 50,000 AI-generated assets created in first 3 months",
        "User retention rate of 98% - highest in the industry",
        "Platform rated 4.9/5 stars by content creators",
        "Enabled creators to produce 5x more content with same resources",
      ],
    },

    metaDescription:
      "How we built Kaleidux's multimodal AI platform, enabling 80% faster content creation and generating 50K+ assets.",
    metaKeywords: [
      "multimodal AI",
      "content creation",
      "AI platform",
      "media production",
    ],
    carouselData: {
      title: "Kaleidux: Personalization Redefined",
      points: [
        "Custom recommendation engines",
        "Leverages your data across touch points",
        "Boosts conversions up to 30%",
      ],
    },
  },
];

/**
 * Get a case study by slug
 */
export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  const caseStudy = mockCaseStudies.find((cs) => cs.slug === slug);
  return caseStudy || null;
}

/**
 * Get all case studies
 */
export function getAllCaseStudies(): CaseStudy[] {
  return mockCaseStudies;
}

/**
 * Get related case studies based on shared tags
 */
export function getRelatedCaseStudies(
  currentSlug: string,
  limit: number = 3
): RelatedCaseStudy[] {
  const currentCase = getCaseStudyBySlug(currentSlug);

  if (!currentCase) {
    return [];
  }

  const casesWithScores = mockCaseStudies
    .filter((cs) => cs.slug !== currentSlug)
    .map((cs) => {
      const sharedTags = cs.tags.filter((tag) =>
        currentCase.tags.includes(tag)
      );
      return {
        caseStudy: cs,
        score: sharedTags.length,
      };
    });

  casesWithScores.sort((a, b) => b.score - a.score);

  return casesWithScores.slice(0, limit).map(({ caseStudy }) => ({
    id: caseStudy.id,
    slug: caseStudy.slug,
    title: caseStudy.title,
    imageUrl: caseStudy.heroImage,
    tags: caseStudy.tags,
  }));
}
