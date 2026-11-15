export interface ServiceItem {
  id: string;
  orderNumber: string; // "01", "02", etc.
  title: string;
  slug: string;
  shortDescription: string;
  iconName: string;
  badge: string;
  subOfferings: string[];
  introduction: string;
  keyFeatures: {
    title: string;
    description: string;
  }[];
  deliverables: string[];
  benefits: {
    title: string;
    description: string;
  }[];
  technologies: {
    name: string;
    category: string;
  }[];
  projectExamples: {
    title: string;
    description: string;
    metrics: string;
    tags: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "ai-ml",
    orderNumber: "01",
    title: "AI & Machine Learning",
    slug: "ai-machine-learning",
    shortDescription:
      "Enterprise-grade machine learning models, custom neural networks, and automated predictive intelligence built for mission-critical operations.",
    iconName: "Cpu",
    badge: "Core AI",
    subOfferings: [
      "Custom AI solutions",
      "Machine learning models",
      "Predictive analytics",
      "Intelligent automation",
      "Computer vision",
      "NLP solutions",
    ],
    introduction:
      "We design and engineer bespoke AI systems from mathematical conception to production deployment. Whether training specialized deep neural architectures, deploying edge computer vision models, or building predictive pipelines, our engineering team ensures rigor, interpretability, and verifiable real-world accuracy.",
    keyFeatures: [
      {
        title: "Bespoke Model Architecture",
        description: "Tailored neural networks and ensemble algorithms developed specifically for your proprietary data distributions.",
      },
      {
        title: "High-Throughput Inference Pipelines",
        description: "Optimized model quantization using TensorRT, ONNX runtime, and distributed microservices with sub-50ms latencies.",
      },
      {
        title: "Vision & Spatial Intelligence",
        description: "Real-time object detection, segmentation, optical character recognition (OCR), and defect classification.",
      },
      {
        title: "NLP & Semantic Engines",
        description: "Transformer-based language understanding, entity extraction, sentiment analysis, and intelligent document synthesis.",
      },
    ],
    deliverables: [
      "Trained model artifacts (.onnx, .pt, or .safetensors)",
      "Production-ready REST/gRPC API microservice with containerization (Docker)",
      "Automated MLOps training & validation pipelines",
      "Comprehensive performance benchmarks, confusion matrix & validation reports",
      "Full source code ownership, documentation, and training run logs",
    ],
    benefits: [
      {
        title: "Accelerated Decision-Making",
        description: "Transform complex unstructured data into automated, predictive operational decisions in real time.",
      },
      {
        title: "90% Reduction in Manual Processing",
        description: "Automate repetitive verification and classification tasks with deterministic accuracy.",
      },
      {
        title: "Data Sovereignty & Security",
        description: "Deploy models within your isolated cloud perimeter (VPC) or local infrastructure without external leakage.",
      },
    ],
    technologies: [
      { name: "PyTorch", category: "Framework" },
      { name: "TensorFlow", category: "Framework" },
      { name: "Scikit-Learn", category: "Algorithms" },
      { name: "OpenCV", category: "Computer Vision" },
      { name: "Hugging Face", category: "NLP" },
      { name: "FastAPI", category: "Serving" },
      { name: "Docker & K8s", category: "Infrastructure" },
      { name: "MLflow", category: "MLOps" },
    ],
    projectExamples: [
      {
        title: "Automated Defect Detection System",
        description: "Computer vision quality inspection pipeline processing 120 FPS high-definition assembly line frames.",
        metrics: "99.2% accuracy across 15 defect categories",
        tags: ["YOLOv8", "OpenCV", "TensorRT", "FastAPI"],
      },
      {
        title: "Supply Chain Demand Forecasting Engine",
        description: "Multi-variate time-series forecasting model handling seasonal shifts and inventory bottlenecks.",
        metrics: "24% reduction in warehouse holding overhead",
        tags: ["PyTorch", "Prophet", "AWS SageMaker", "PostgreSQL"],
      },
    ],
    faqs: [
      {
        question: "How do you handle private and proprietary company data?",
        answer: "We sign strict NDAs and implement all training within your designated private cloud or on-premise servers. Your data is never transmitted to public external endpoints.",
      },
      {
        question: "What is the typical development timeline for a custom AI model?",
        answer: "Initial proof-of-concept and exploratory data analysis (EDA) takes 1–2 weeks. Complete training, refinement, and containerized deployment typically spans 4–8 weeks depending on complexity.",
      },
      {
        question: "Do you provide model maintenance and retraining after delivery?",
        answer: "Yes, we implement automated drift detection and provide ongoing support agreements to retrain models when new data distributions arise.",
      },
    ],
  },
  {
    id: "ai-chatbots",
    orderNumber: "02",
    title: "AI Chatbot Development",
    slug: "ai-chatbot-development",
    shortDescription:
      "Context-aware, zero-hallucination conversational agents, multi-channel WhatsApp bots, and enterprise RAG systems trained on your private knowledge.",
    iconName: "Bot",
    badge: "Conversational AI",
    subOfferings: [
      "Website AI chatbots",
      "WhatsApp chatbots",
      "Customer support assistants",
      "PDF-based AI assistants",
      "RAG-powered knowledge assistants",
      "Custom AI agents",
    ],
    introduction:
      "Modern businesses require conversational interfaces that are accurate, contextual, and deeply integrated into core workflows. We architect Retrieval-Augmented Generation (RAG) bots, multi-channel conversational workflows, and autonomous agents capable of querying databases, scheduling meetings, and answering complex queries with exact citations.",
    keyFeatures: [
      {
        title: "Enterprise RAG Architecture",
        description: "Hybrid vector search + lexical re-ranking ensuring answers are strictly grounded in your verified internal documents without hallucinations.",
      },
      {
        title: "Omnichannel Deployment",
        description: "Native integrations for official WhatsApp Cloud API, custom web embeds, Telegram, Discord, and Slack.",
      },
      {
        title: "Document Parsing (PDF, DOCX, Sheets)",
        description: "Advanced visual document chunking capable of parsing tables, complex layouts, and multi-page technical manuals.",
      },
      {
        title: "Tool Use & Autonomous Action Execution",
        description: "Empower agents with function-calling capabilities to create tickets, check order statuses, and trigger CRM automations.",
      },
    ],
    deliverables: [
      "Fully configured bot connected to official WhatsApp API or embeddable React widget",
      "Vector database pipeline with automated document ingestion and embedding indexing",
      "Admin telemetry dashboard showing conversations, fallback queries, and user feedback",
      "Configurable system prompts, guardrails, and role-based permissions",
      "API webhook integration with your existing CRM or customer support tool",
    ],
    benefits: [
      {
        title: "24/7 Instant Resolution",
        description: "Resolve up to 80% of Tier-1 and Tier-2 inquiries instantly without queue wait times.",
      },
      {
        title: "Zero Hallucination Guarantee",
        description: "Strict guardrails ensure the bot politely declines to speculate if source documentation does not contain the answer.",
      },
      {
        title: "Seamless Human Handoff",
        description: "Intelligently flags high-friction cases and routes the conversation directly to your human support agents.",
      },
    ],
    technologies: [
      { name: "LangChain / LlamaIndex", category: "Orchestration" },
      { name: "OpenAI / Claude API", category: "LLM" },
      { name: "Pinecone / Qdrant / pgvector", category: "Vector DB" },
      { name: "Meta WhatsApp Cloud API", category: "Integration" },
      { name: "Next.js & Tailwind CSS", category: "UI Widget" },
      { name: "Python / Node.js", category: "Backend" },
    ],
    projectExamples: [
      {
        title: "Institutional Knowledge Assistant",
        description: "RAG-powered assistant querying 10,000+ internal compliance manuals, policies, and research briefs with line citations.",
        metrics: "Instant sub-second answers across 15 departments",
        tags: ["pgvector", "Claude 3.5 Sonnet", "LlamaIndex", "Next.js"],
      },
      {
        title: "WhatsApp Commerce & Booking Agent",
        description: "Automated booking agent handling catalog browsing, slot scheduling, and payment link generation over WhatsApp.",
        metrics: "Over 4,500 monthly transactions automated",
        tags: ["WhatsApp Cloud API", "Node.js", "Redis", "Stripe"],
      },
    ],
    faqs: [
      {
        question: "Can the chatbot connect with our existing CRM or database?",
        answer: "Yes, our bots support custom function calling and webhooks to query your existing REST APIs, PostgreSQL, MongoDB, HubSpot, or Salesforce.",
      },
      {
        question: "What happens if a user asks a question not in the documents?",
        answer: "We configure explicit guardrail policies. The bot transparently informs the user that it does not possess that information and offers to connect them with a human specialist.",
      },
      {
        question: "How do WhatsApp API messaging fees work?",
        answer: "Meta charges standard per-conversation rates for the WhatsApp Business Platform. We assist you in setting up your verified Meta Business Manager account directly so you pay at cost without markups.",
      },
    ],
  },
  {
    id: "web-dev",
    orderNumber: "03",
    title: "Web Development",
    slug: "web-development",
    shortDescription:
      "Ultra-fast, responsive web platforms, high-converting SaaS products, e-commerce engines, and modern operational admin dashboards.",
    iconName: "Globe",
    badge: "Full-Stack Web",
    subOfferings: [
      "Business websites",
      "E-commerce websites",
      "SaaS platforms",
      "Landing pages",
      "Custom web applications",
      "Admin dashboards",
    ],
    introduction:
      "We build web experiences engineered for high performance, accessibility, and high conversion. Combining modern frameworks like Next.js and React with scalable database architectures, our web solutions load instantly, rank competitively on search engines, and handle high-traffic loads gracefully.",
    keyFeatures: [
      {
        title: "Next-Gen Performance & Core Web Vitals",
        description: "Optimized server-side rendering (SSR) and edge caching resulting in perfect 95+ Google Lighthouse scores.",
      },
      {
        title: "Modern UI/UX & Responsive Engineering",
        description: "Pixel-perfect implementations crafted with Tailwind CSS and smooth interactions designed for all screen sizes.",
      },
      {
        title: "Scalable Architecture & APIs",
        description: "Clean RESTful and GraphQL API backends built with Node.js, Next.js Server Actions, or Go.",
      },
      {
        title: "Role-Based Portals & Admin Controls",
        description: "Granular access controls, audit logging, and data visualization dashboards tailored for operators.",
      },
    ],
    deliverables: [
      "Complete web application codebase with clean git history",
      "Production CI/CD deployment on Vercel, AWS, or custom cloud",
      "Responsive design verified across desktop, tablet, and mobile browsers",
      "Integrated SEO metadata, sitemaps, and analytics tracking",
      "Comprehensive admin management panel and documentation",
    ],
    benefits: [
      {
        title: "Sub-Second Load Times",
        description: "Prevent bounce rates and maximize user retention with ultra-fast page transitions.",
      },
      {
        title: "Search Engine Supremacy",
        description: "Semantic HTML5 and automatic server-side generation make your site easily crawlable by Google.",
      },
      {
        title: "Enterprise Grade Security",
        description: "Built-in CSRF protection, secure HTTP-only cookies, sanitization, and SQL injection prevention.",
      },
    ],
    technologies: [
      { name: "Next.js 14", category: "Fullstack Framework" },
      { name: "React 18", category: "Frontend" },
      { name: "TypeScript", category: "Language" },
      { name: "Tailwind CSS", category: "Styling" },
      { name: "Node.js", category: "Backend" },
      { name: "PostgreSQL / Prisma", category: "Database" },
      { name: "Vercel / AWS", category: "Cloud & CDN" },
    ],
    projectExamples: [
      {
        title: "Enterprise SaaS Analytics Suite",
        description: "Multi-tenant cloud platform featuring real-time data streaming, dynamic report generation, and role management.",
        metrics: "Processes 500k+ daily events with 99.99% uptime",
        tags: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL", "Prisma"],
      },
      {
        title: "Modern Direct-to-Consumer E-Commerce",
        description: "Headless e-commerce storefront with instantaneous cart checkout, inventory sync, and payment gateway integration.",
        metrics: "48% uplift in mobile checkout conversions",
        tags: ["React", "Stripe", "Tailwind CSS", "Redis"],
      },
    ],
    faqs: [
      {
        question: "Do you build custom designs or use generic templates?",
        answer: "Every single web project is designed bespoke to match your distinct brand guidelines, audience profile, and conversion goals. We avoid off-the-shelf templates.",
      },
      {
        question: "Will I be able to edit content without a developer?",
        answer: "Yes, we integrate headless content management systems (CMS) or built-in intuitive admin interfaces allowing your team to update copy, blogs, and media easily.",
      },
      {
        question: "Do you manage hosting and domain configuration?",
        answer: "We handle complete end-to-end setup including custom domain routing, SSL certificate provisioning, and automated continuous deployment.",
      },
    ],
  },
  {
    id: "app-dev",
    orderNumber: "04",
    title: "App Development",
    slug: "app-development",
    shortDescription:
      "Native and cross-platform mobile applications for iOS and Android with intuitive gestures, offline-first reliability, and smooth animations.",
    iconName: "Smartphone",
    badge: "Mobile Solutions",
    subOfferings: [
      "Android applications",
      "iOS applications",
      "Cross-platform applications",
      "Business applications",
      "Mobile app UI/UX",
    ],
    introduction:
      "We design and build high-performance mobile apps that users enjoy using every day. Utilizing React Native and Flutter, we deliver unified single-codebase solutions that run natively on both iOS and Android with 60 FPS fluidity, native hardware integrations, and offline capabilities.",
    keyFeatures: [
      {
        title: "Cross-Platform Codebase Efficiency",
        description: "One unified codebase for iOS and Android reducing development and maintenance overhead by up to 50%.",
      },
      {
        title: "Native Device Capabilities",
        description: "Full access to camera, biometric authentication (FaceID/Fingerprint), GPS geolocation, Bluetooth, and push notifications.",
      },
      {
        title: "Offline-First Sync Engine",
        description: "Local data caching using SQLite or WatermelonDB with background conflict-free synchronization when connectivity returns.",
      },
      {
        title: "Store Approval Guidance",
        description: "Comprehensive end-to-end management of Apple App Store and Google Play Store review guidelines and signing certificates.",
      },
    ],
    deliverables: [
      "Production-ready signed APK / AAB (Android) and IPA (iOS) builds",
      "Clean TypeScript / Dart repository with modular component architecture",
      "Figma design system and interactive mobile prototype assets",
      "App Store & Google Play metadata, privacy declarations, and screenshots",
      "Backend REST/GraphQL API integration with push notification services (FCM)",
    ],
    benefits: [
      {
        title: "Rapid Time-to-Market",
        description: "Simultaneously launch on both major app ecosystems without doubling engineering headcount.",
      },
      {
        title: "Fluid 60 FPS Experience",
        description: "Smooth native gestures, transitions, and haptic feedback engineered to delight users.",
      },
      {
        title: "Zero-Downtime Updates",
        description: "Over-the-air (OTA) code push capabilities for rapid bug fixes without waiting for app store reviews.",
      },
    ],
    technologies: [
      { name: "React Native", category: "Cross-Platform" },
      { name: "Flutter", category: "Cross-Platform" },
      { name: "Expo", category: "Tooling" },
      { name: "Firebase / FCM", category: "Push & Auth" },
      { name: "SQLite / Realm", category: "Local Storage" },
      { name: "Fastlane", category: "CI/CD" },
    ],
    projectExamples: [
      {
        title: "On-Demand Field Service Platform",
        description: "Cross-platform mobile application with live GPS technician tracking, signature capture, and offline job forms.",
        metrics: "Over 20,000 active technician check-ins",
        tags: ["React Native", "Expo", "Mapbox", "Node.js"],
      },
      {
        title: "Health & Habit Tracking Application",
        description: "Consumer wellness app featuring encrypted biometric sync, interactive charts, and scheduled reminders.",
        metrics: "4.8 App Store rating with 15k+ downloads",
        tags: ["Flutter", "Dart", "Firebase", "HealthKit"],
      },
    ],
    faqs: [
      {
        question: "Should we choose Flutter or React Native for our app?",
        answer: "We assess your existing tech stack, team capabilities, and third-party library requirements to recommend the optimal framework for your goals.",
      },
      {
        question: "Do you assist with publishing to Apple App Store and Google Play?",
        answer: "Yes, we handle complete release engineering including developer account setups, bundle signing, screenshot assets, privacy manifests, and review submissions.",
      },
    ],
  },
  {
    id: "final-year-projects",
    orderNumber: "05",
    title: "Final Year Project Solutions",
    slug: "final-year-project-solutions",
    shortDescription:
      "Legitimate academic mentoring, architecture guidance, technical debugging, IEEE-standard documentation, and deployment support for engineering students.",
    iconName: "GraduationCap",
    badge: "Academic Mentoring",
    subOfferings: [
      "AI & ML project mentoring",
      "Data Science projects",
      "Deep Learning projects",
      "Full-stack projects",
      "Project documentation",
      "Deployment and technical guidance",
    ],
    introduction:
      "We provide rigorous, ethical academic mentoring and technical guidance for undergraduate and postgraduate students working on capstone and final year engineering projects. Our senior architects mentor you through problem formulation, algorithm design, codebase architecture, and IEEE-standard documentation so you master every line of code for your viva and defense.",
    keyFeatures: [
      {
        title: "1-on-1 Mentorship & Code Walkthroughs",
        description: "Personal technical sessions explaining algorithm mechanics, mathematical formulations, and system workflows in detail.",
      },
      {
        title: "IEEE & Scopus Standard Structuring",
        description: "Guidance on literature review, system architecture diagrams (UML, DFD), experimental methodology, and statistical validation.",
      },
      {
        title: "Real-World Dataset & Model Verification",
        description: "Help finding high-quality research datasets, data cleaning, baseline benchmarking, and comparative error analysis.",
      },
      {
        title: "Live Cloud Deployment & Viva Prep",
        description: "Assistance hosting live working web/mobile prototypes on cloud services and mock viva practice sessions.",
      },
    ],
    deliverables: [
      "Fully functional, cleanly documented source code repository with comprehensive comments",
      "Architecture documentation including DFD, Sequence, and Class diagrams",
      "Model training notebooks (Jupyter / Colab) with loss graphs and evaluation curves",
      "Live deployment guide and hosted demo link for project presentation",
      "Mock viva question bank and conceptual breakdown of theoretical principles",
    ],
    benefits: [
      {
        title: "Genuine Conceptual Mastery",
        description: "Understand the 'why' behind every algorithm so you confidently answer any question from your project evaluation panel.",
      },
      {
        title: "Publication-Ready Standards",
        description: "Learn how to format research results, tables, and comparative graphs to conference-level standards.",
      },
      {
        title: "Career-Ready Portfolio Piece",
        description: "Turn your final year project into an impressive, live GitHub project that stands out to tech recruiters and hiring managers.",
      },
    ],
    technologies: [
      { name: "Python / PyTorch", category: "AI/ML" },
      { name: "TensorFlow / Keras", category: "Deep Learning" },
      { name: "Jupyter & Google Colab", category: "Notebooks" },
      { name: "React & Node.js", category: "Full-Stack" },
      { name: "OpenCV & MediaPipe", category: "Vision" },
      { name: "LaTeX & Overleaf", category: "Documentation" },
    ],
    projectExamples: [
      {
        title: "Multimodal Medical Image Classification",
        description: "Deep learning research project classifying skin lesions using transfer learning with Grad-CAM visual explainability.",
        metrics: "Published paper format with 96.4% test AUC",
        tags: ["PyTorch", "DenseNet", "Grad-CAM", "FastAPI"],
      },
      {
        title: "IoT Smart Energy Monitoring with ML Anomaly Detection",
        description: "Full-stack IoT dashboard processing sensor telemetry and predicting power surges using LSTM networks.",
        metrics: "Demonstrated live in college auditorium with 100% defense score",
        tags: ["React", "MQTT", "Python", "Flask", "LSTM"],
      },
    ],
    faqs: [
      {
        question: "Is this mentoring legitimate and ethical?",
        answer: "Yes, our focus is strictly on academic mentorship, conceptual instruction, and architectural guidance. We ensure students write and comprehend the code themselves so they build genuine skills and succeed in their viva.",
      },
      {
        question: "Can you help if we already have code that is failing or broken?",
        answer: "Yes, we offer targeted debugging and architecture refactoring sessions to resolve dependency errors, model convergence issues, or broken API integrations.",
      },
      {
        question: "What project domains do you support?",
        answer: "We support Artificial Intelligence, Machine Learning, Deep Learning, Computer Vision, NLP, IoT, Blockchain, Cloud Systems, and Full-Stack Web/Mobile engineering domains.",
      },
    ],
  },
  {
    id: "portfolio-dev",
    orderNumber: "06",
    title: "Portfolio Development",
    slug: "portfolio-development",
    shortDescription:
      "Standout personal websites, developer portfolios, interactive resume sites, and recruiter-ready showcases that land high-value roles and clients.",
    iconName: "Briefcase",
    badge: "Personal Branding",
    subOfferings: [
      "Personal portfolio websites",
      "Developer portfolios",
      "Resume websites",
      "Professional portfolio design",
      "GitHub project integration",
      "Domain and deployment assistance",
    ],
    introduction:
      "Your portfolio is your digital handshake. In a crowded industry, a generic cookie-cutter resume gets overlooked. We design and develop distinctive personal portfolio websites for software engineers, designers, AI researchers, and consultants that highlight your best work with interactive previews and custom domains.",
    keyFeatures: [
      {
        title: "Editorial & Impactful Layouts",
        description: "Distinctive design aesthetics tailored to your personality, avoiding generic web templates.",
      },
      {
        title: "Interactive Project Showcases",
        description: "Live embedded demos, video walkthroughs, architecture diagrams, and direct links to GitHub repositories.",
      },
      {
        title: "Live GitHub & Social Telemetry",
        description: "Real-time contribution graphs, pinned open-source projects, and dynamic tech badge integrations.",
      },
      {
        title: "Custom Domain & Email Provisioning",
        description: "End-to-end setup of your custom domain (yourname.com) with professional email forwarding and SSL certificates.",
      },
    ],
    deliverables: [
      "Custom React / Next.js responsive portfolio codebase",
      "Automated deployment on Vercel or GitHub Pages with custom domain DNS setup",
      "Interactive resume download (PDF) and contact inquiry form",
      "OpenGraph preview cards for high-impact social sharing on LinkedIn and Twitter",
      "Documentation on how to add new projects and update career milestones",
    ],
    benefits: [
      {
        title: "Instant Recruiter Differentiation",
        description: "Make an unforgettable impression on technical hiring managers within the first 5 seconds.",
      },
      {
        title: "Showcase Proof of Work",
        description: "Let recruiters and clients interact with live systems rather than merely reading bullet points.",
      },
      {
        title: "100% Code Ownership",
        description: "No monthly proprietary platform lock-in. You own your code repository completely.",
      },
    ],
    technologies: [
      { name: "Next.js", category: "Framework" },
      { name: "Tailwind CSS", category: "Styling" },
      { name: "Framer Motion", category: "Animations" },
      { name: "GitHub API", category: "Integration" },
      { name: "Vercel / Cloudflare", category: "Hosting" },
    ],
    projectExamples: [
      {
        title: "Senior Full-Stack Engineer Portfolio",
        description: "Interactive portfolio with command-palette navigation (Cmd+K), light/dark mode, and live micro-app demos.",
        metrics: "Helped client secure 4 international remote job offers",
        tags: ["Next.js", "Tailwind", "TypeScript", "Vercel"],
      },
      {
        title: "AI Researcher & ML Engineer Showcase",
        description: "Minimalist, typography-forward site featuring arXiv paper links, Hugging Face model cards, and interactive 3D visualizations.",
        metrics: "Over 8,000 unique technical visitors in 6 months",
        tags: ["React", "Three.js", "Tailwind CSS", "LaTeX"],
      },
    ],
    faqs: [
      {
        question: "Can I easily update my projects and experience later?",
        answer: "Yes, we structure all project data in a clean JSON/Markdown file so you can add a new project in less than 2 minutes without touching complex code.",
      },
      {
        question: "Do I need to pay monthly hosting fees?",
        answer: "No, we deploy to free tier cloud infrastructure (like Vercel or Netlify) which provides enterprise-grade performance at zero recurring hosting cost for personal traffic.",
      },
    ],
  },
  {
    id: "data-science",
    orderNumber: "07",
    title: "Data Science & Analytics",
    slug: "data-science-analytics",
    shortDescription:
      "Interactive Power BI dashboards, automated Excel workflows, deep statistical analytics, and predictive data pipelines that unlock hidden revenue.",
    iconName: "BarChart3",
    badge: "Business Intelligence",
    subOfferings: [
      "Power BI dashboards",
      "Excel automation",
      "Data visualization",
      "Business analytics",
      "Predictive analytics",
      "Database analytics",
    ],
    introduction:
      "Raw data is only valuable when transformed into clear, actionable business intelligence. We architect end-to-end data pipelines, custom SQL analytics engines, automated Excel macros, and interactive Power BI executive dashboards that eliminate manual reporting and illuminate growth levers.",
    keyFeatures: [
      {
        title: "Executive Power BI & Tableau Dashboards",
        description: "Interactive, real-time drill-down dashboards designed for C-suite decision-makers and operational leads.",
      },
      {
        title: "Automated ETL & Data Cleansing",
        description: "Python and SQL pipelines that clean, transform, and merge disparate databases into unified star schemas.",
      },
      {
        title: "Excel & VBA Workflow Automation",
        description: "Turn days of repetitive manual spreadsheet copy-pasting into one-click automated Python/VBA scripts.",
      },
      {
        title: "Statistical & Predictive Analytics",
        description: "Customer churn modeling, cohort retention analysis, and revenue attribution modeling.",
      },
    ],
    deliverables: [
      "Configured Power BI (.pbix) files or hosted web embedded analytics dashboards",
      "Automated data extraction scripts (Python / SQL) with cron scheduling",
      "Automated Excel reporting templates with dynamic pivot integrations",
      "Data dictionary, schema diagrams, and metric definition documentation",
      "Executive summary presentation with key statistical insights and strategic findings",
    ],
    benefits: [
      {
        title: "Eliminate Manual Reporting Waste",
        description: "Save 15+ hours per week per analyst by automating recurring weekly and monthly reporting cycles.",
      },
      {
        title: "Single Source of Truth",
        description: "Align your management team around consistent, verified metrics without conflicting numbers.",
      },
      {
        title: "Proactive Risk Detection",
        description: "Identify revenue leakage, customer churn risks, and inventory gaps before they affect the bottom line.",
      },
    ],
    technologies: [
      { name: "Power BI", category: "BI Tool" },
      { name: "Python (Pandas/NumPy)", category: "Data Science" },
      { name: "SQL (PostgreSQL / Snowflake)", category: "Warehousing" },
      { name: "Tableau", category: "Visualization" },
      { name: "Advanced Excel / VBA", category: "Spreadsheets" },
      { name: "dbt / Airflow", category: "Pipelines" },
    ],
    projectExamples: [
      {
        title: "Multi-Store Retail Revenue Dashboard",
        description: "Consolidated automated dashboard unifying 14 retail branch ERP feeds into live hourly sales and margin analytics.",
        metrics: "Replaced 4-hour daily manual reports with 3-second live dashboards",
        tags: ["Power BI", "DAX", "SQL Server", "Power Query"],
      },
      {
        title: "SaaS Subscription Cohort Retention Engine",
        description: "Statistical cohort retention analysis pinpointing onboarding churn factors across 30,000 active subscriptions.",
        metrics: "Helped client lift 90-day retention by 18%",
        tags: ["Python", "PostgreSQL", "Pandas", "Plotly"],
      },
    ],
    faqs: [
      {
        question: "Can you connect directly to our existing database or spreadsheets?",
        answer: "Yes, we connect to PostgreSQL, MySQL, SQL Server, Google Sheets, Excel files, and cloud data warehouses seamlessly.",
      },
      {
        question: "Do our team members need technical skills to use the dashboards?",
        answer: "No, we design executive dashboards to be completely intuitive with simple click-to-filter dropdowns and clear visual KPIs.",
      },
    ],
  },
  {
    id: "digital-marketing",
    orderNumber: "08",
    title: "Digital Marketing & SEO",
    slug: "digital-marketing-seo",
    shortDescription:
      "Data-driven technical SEO, search engine optimization, content strategies, Google Business Profile ranking, and ROI-focused digital campaigns.",
    iconName: "TrendingUp",
    badge: "Growth & Visibility",
    subOfferings: [
      "Search engine optimization",
      "Technical SEO",
      "Social media marketing",
      "Google Business Profile optimization",
      "Content strategy",
      "Digital advertising",
    ],
    introduction:
      "A great digital product is ineffective if your target audience cannot discover it. Our digital marketing practice unites technical search engine optimization, algorithmic content strategy, and precise local Google presence to build sustainable organic search traffic and qualified business inbound leads.",
    keyFeatures: [
      {
        title: "Technical SEO & Schema Auditing",
        description: "Fix crawl errors, optimize Core Web Vitals, implement structured JSON-LD data, and ensure indexability.",
      },
      {
        title: "Keyword & Competitive Gap Research",
        description: "Uncover high-intent commercial keywords your competitors have missed with achievable keyword difficulty.",
      },
      {
        title: "Google Business Profile & Local SEO",
        description: "Dominate local map pack rankings, citation building, and review optimization for localized service inquiries.",
      },
      {
        title: "Content Marketing & Authority Building",
        description: "Produce technical articles, case studies, and lead magnets that earn natural backlinks and domain authority.",
      },
    ],
    deliverables: [
      "Comprehensive 50-point technical SEO audit and fix implementation plan",
      "Targeted keyword hierarchy map and 6-month organic content roadmap",
      "Optimized Google Business Profile listing with citation consistency report",
      "Monthly transparent organic ranking and inbound traffic analytics reporting",
      "High-converting landing page optimization recommendations",
    ],
    benefits: [
      {
        title: "Compounding Organic Inbound Traffic",
        description: "Build an organic discovery channel that generates qualified leads month after month without ongoing ad spend.",
      },
      {
        title: "Higher Conversion Rates",
        description: "Attract visitors searching with high commercial intent rather than accidental low-value clicks.",
      },
      {
        title: "Transparent, Data-Backed Execution",
        description: "No vanity metrics or vague promises. Clear tracking of real organic search impressions, clicks, and inquiries.",
      },
    ],
    technologies: [
      { name: "Google Search Console", category: "Telemetry" },
      { name: "Google Analytics 4", category: "Tracking" },
      { name: "Ahrefs / SEMrush", category: "Competitive Intelligence" },
      { name: "Schema.org / JSON-LD", category: "Technical SEO" },
      { name: "Meta Ads Manager", category: "Advertising" },
    ],
    projectExamples: [
      {
        title: "B2B Tech Consultancy SEO Overhaul",
        description: "Full technical remediation, structured data rollout, and topical cluster content strategy.",
        metrics: "+340% increase in qualified organic search clicks over 8 months",
        tags: ["Technical SEO", "Schema.org", "GA4", "Content Strategy"],
      },
      {
        title: "Regional Service Provider Google Map Pack Domination",
        description: "Localized citation building, category optimization, and verified review acquisition workflow.",
        metrics: "Ranked in top 3 Google Map results for 18 high-intent terms",
        tags: ["Local SEO", "Google Business Profile", "Citations"],
      },
    ],
    faqs: [
      {
        question: "Do you guarantee #1 ranking on Google?",
        answer: "No ethical agency can guarantee specific #1 rankings because search algorithms are controlled by search engines. We implement proven white-hat technical best practices, high-quality content, and verified SEO methodologies that systematically improve organic visibility and qualified clicks.",
      },
      {
        question: "How long before we see tangible organic traffic growth?",
        answer: "Technical fixes and indexing improvements typically take 2–6 weeks. Significant organic ranking and traffic growth generally compound over 3 to 6 months.",
      },
    ],
  },
];

