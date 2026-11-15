export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: "AI & ML" | "Chatbots" | "Web Apps" | "Mobile Apps" | "Data & Analytics" | "Academic" | "Portfolios";
  summary: string;
  description: string;
  technologies: string[];
  challenge: string;
  solution: string;
  keyFeatures: string[];
  results: string[];
  demoUrl?: string;
  githubUrl?: string;
  badge: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "proj-1",
    title: "NeuroVision Defect Detection Platform",
    slug: "neurovision-defect-detection",
    category: "AI & ML",
    summary: "Industrial edge computer vision model for real-time assembly line defect identification running at 120 FPS.",
    description: "An automated optical quality inspection system utilizing optimized YOLOv8 architectures to detect micro-cracks and soldering flaws in manufactured printed circuit boards.",
    technologies: ["PyTorch", "OpenCV", "TensorRT", "FastAPI", "Docker", "Python"],
    challenge: "Traditional manual optical inspection allowed micro-fractures to slip through, while existing cloud solutions suffered from 400ms latency bottlenecks.",
    solution: "Engineered an edge-quantized TensorRT pipeline deployed on local GPU edge devices with sub-12ms inference latency per frame.",
    keyFeatures: [
      "Sub-15ms edge inference on local hardware",
      "Automated bounding box annotation & defect classification",
      "Operator dashboard with live alert feeds and historical audit logs",
      "Exportable CSV and PDF quality shift reports",
    ],
    results: [
      "99.2% classification accuracy verified against benchmark test sets",
      "Over 1,200 hours of continuous factory runtime without pipeline memory leaks",
      "Decreased manual inspection time by 75%",
    ],
    demoUrl: "/portfolio/neurovision-defect-detection",
    badge: "Computer Vision",
  },
  {
    id: "proj-2",
    title: "OmniRAG Enterprise Knowledge Assistant",
    slug: "omnirag-enterprise-assistant",
    category: "Chatbots",
    summary: "Multi-tenant Retrieval-Augmented Generation system with zero hallucination guardrails querying 10,000+ PDFs.",
    description: "A secure internal intelligence assistant built for knowledge workers to query internal technical documentation, HR guidelines, and engineering specifications with exact citations.",
    technologies: ["Next.js", "Python", "LlamaIndex", "Claude 3.5 Sonnet", "pgvector", "PostgreSQL"],
    challenge: "Knowledge was fragmented across hundreds of disparate PDF manuals and Google Drive folders, leading to high support ticket response times.",
    solution: "Designed a hybrid search engine combining vector embeddings (pgvector) and BM25 keyword matching with deterministic source citation metadata.",
    keyFeatures: [
      "Exact page and paragraph citation links for every generated answer",
      "Role-based document access controls (RBAC)",
      "Automated document ingestion pipeline with semantic chunking",
      "Interactive conversational web widget and Slack bot integration",
    ],
    results: [
      "Average internal query time reduced from 14 minutes to under 3 seconds",
      "Zero reported ungrounded hallucinations during internal testing",
      "Indexed over 15,000 pages of technical documentation",
    ],
    demoUrl: "/portfolio/omnirag-enterprise-assistant",
    badge: "Enterprise RAG",
  },
  {
    id: "proj-3",
    title: "AuraCloud SaaS Management Suite",
    slug: "auracloud-saas-platform",
    category: "Web Apps",
    summary: "High-performance multi-tenant SaaS dashboard featuring live analytics, subscription billing, and team workspaces.",
    description: "A modern cloud management console engineered for rapid data exploration, real-time activity streams, and secure API key management.",
    technologies: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Stripe"],
    challenge: "Legacy SaaS dashboards often suffer from slow server response times, high client bundle sizes, and clumsy authorization setups.",
    solution: "Built on Next.js 14 App Router with React Server Components, delivering instant page transitions and optimal Core Web Vitals.",
    keyFeatures: [
      "Dynamic data tables with instant server-side filtering and sorting",
      "Integrated Stripe billing portal with webhooks",
      "Multi-tenant team workspaces with invitation flows",
      "Comprehensive dark/light UI mode with high contrast accessibility",
    ],
    results: [
      "99/100 Google Lighthouse performance score",
      "Zero render blocking JavaScript on initial route load",
      "Smooth multi-tenant data isolation verified with integration tests",
    ],
    demoUrl: "/portfolio/auracloud-saas-platform",
    badge: "Full-Stack SaaS",
  },
  {
    id: "proj-4",
    title: "PulseFit Health & Biometrics Mobile App",
    slug: "pulsefit-health-tracker",
    category: "Mobile Apps",
    summary: "Cross-platform iOS and Android wellness tracker with offline-first synchronization and wearable device integration.",
    description: "A consumer health app providing real-time biometric metrics, personalized habit challenges, and secure cloud backups.",
    technologies: ["React Native", "Expo", "TypeScript", "Node.js", "Firebase", "SQLite"],
    challenge: "Health tracking apps often fail when users lose cellular reception at gyms or outdoors.",
    solution: "Implemented an offline-first SQLite database architecture that seamlessly reconciles changes with the cloud once internet is restored.",
    keyFeatures: [
      "Offline-first local storage with background sync",
      "Native Apple HealthKit and Google Fit biometric data sync",
      "Custom interactive charts and weekly progress breakdowns",
      "Push notification reminders with smart scheduling",
    ],
    results: [
      "Maintained stable 60 FPS animations on both iOS and Android test devices",
      "Flawless offline sync recovery under simulated 100% packet-loss conditions",
    ],
    demoUrl: "/portfolio/pulsefit-health-tracker",
    badge: "Mobile App",
  },
  {
    id: "proj-5",
    title: "OmniRetail Executive Power BI Suite",
    slug: "omniretail-analytics-dashboard",
    category: "Data & Analytics",
    summary: "Automated business intelligence dashboard consolidating 12 retail outlet feeds into live revenue and inventory insights.",
    description: "An executive-grade BI solution converting disparate CSV and SQL transaction logs into an automated executive control room.",
    technologies: ["Power BI", "DAX", "Python", "SQL Server", "Power Query", "Excel Automation"],
    challenge: "Store managers were spending over 3 hours every night manually consolidating daily sales sheets, leading to data errors.",
    solution: "Constructed an automated ETL pipeline that extracts, validates, and models store transaction records into an interactive Power BI dashboard.",
    keyFeatures: [
      "Real-time gross margin and basket-size drill-downs",
      "Automated low-inventory alerts and replenishment projections",
      "One-click PDF executive summary exports",
      "Automated Excel reporting macros for branch managers",
    ],
    results: [
      "Eliminated daily manual consolidation entirely, saving 15 hours weekly",
      "Uncovered dead stock inventory representing 12% of total warehouse capacity",
    ],
    demoUrl: "/portfolio/omniretail-analytics-dashboard",
    badge: "Power BI & Analytics",
  },
  {
    id: "proj-6",
    title: "DeepSkin: Dermatological Lesion Classifier",
    slug: "deepskin-dermatological-classifier",
    category: "Academic",
    summary: "Capstone research project utilizing transfer learning and Grad-CAM visual heatmaps for skin lesion analysis.",
    description: "A final year engineering solution demonstrating end-to-end academic rigor, IEEE paper formatting, model explainability, and a live web demo.",
    technologies: ["PyTorch", "DenseNet121", "Grad-CAM", "Flask", "React", "LaTeX"],
    challenge: "Medical classification models are frequently criticized as opaque 'black boxes' lacking visual justification for clinical decisions.",
    solution: "Integrated Grad-CAM visual explainability to highlight exactly which skin regions the neural network activated upon to make predictions.",
    keyFeatures: [
      "Full IEEE-standard project documentation and architecture diagrams",
      "Grad-CAM visual heatmap overlay generation",
      "Complete Colab training notebooks with loss and validation curves",
      "Deployable React web interface for interactive test image uploads",
    ],
    results: [
      "96.4% Area Under Curve (AUC) on HAM10000 benchmark dataset",
      "Defended successfully with full marks in final university viva",
    ],
    demoUrl: "/portfolio/deepskin-dermatological-classifier",
    badge: "Academic Mentoring",
  },
];

