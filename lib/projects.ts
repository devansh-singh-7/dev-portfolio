export const projects = [
  {
    slug: "indian-penpals-league",
    liveLink: "https://iplmumbai12395.org",
    id: "01",
    name: "Indian Penpals' League",
    tagline: "Connecting individuals through structured cultural exchange",
    description:
      "Indian Penpals League is a community-driven platform designed to connect individuals across different regions through meaningful conversations and cultural exchange. The platform enables users to build connections, improve communication skills, and engage in structured interaction experiences.",
    stack: ["Next.js", "React", "TypeScript", "MongoDB", "JOSE", "BCrypt", "Cloudinary"],
    type: "Community / Platform",
    duration: "Ongoing",
    role: "Platform Operations & Engagement Manager",
    status: "Live",
    problem:
      "In a highly digital world, communication has become fast but often superficial. Many people, especially students, lack platforms that encourage genuine conversations, cultural exchange, and consistent interaction. Existing platforms focus heavily on social media engagement rather than meaningful connections, lacking structure for communication-based growth.",
    approach:
      "Indian Penpals League was developed as a structured interaction platform where users can connect, communicate, and engage in guided conversations. The objective was to encourage meaningful one-on-one conversations, connect people from diverse backgrounds, improve communication and interpersonal skills, and create a structured and engaging interaction environment.",
    techDecisions: [
      {
        decision: "Structured Interaction Flow vs Casual Chat",
        reason:
          "To maintain quality of conversations and manage diverse user expectations, introduced structured communication guidelines rather than random chatting.",
      },
      {
        decision: "Community-driven Pairing Model",
        reason:
          "User pairing for one-on-one conversations was emphasizing consistency and engagement over gamified swiping, creating real impactful interactions.",
      },
      {
        decision: "Active Moderation & Coordination",
        reason:
          "Managing real-world user behavior is harder than building features. Maintained active moderation and coordination to encourage consistent participation through system design.",
      }
    ],
    results: [
      "Improved user engagement and interaction quality",
      "Helped users build better communication skills",
      "Created a community focused on meaningful connections",
      "Delivered a structured platform experience instead of random social interaction",
      "Key Learning: Structure is essential for meaningful interaction",
      "Future Scope: Enhanced matching algorithms & Scalable platform development"
    ],
    color: "#39FF14",
  },
  {
    slug: "maintenance-system",
    id: "02",
    name: "FixItNow - Maintenance System",
    tagline: "Smart Maintenance Request System",
    description:
      "FixItNow is a full-stack smart maintenance management system designed to streamline how users report issues and how service teams handle them. It integrates automation, real-time tracking, and AI-based classification to reduce manual effort and improve response efficiency.",
    stack: ["Next.js", "FastAPI", "MongoDB", "TensorFlow", "Scikit-learn"],
    type: "ML + Full Stack",
    duration: "6 weeks",
    role: "Full Stack Developer",
    status: "Completed",
    problem:
      "Traditional maintenance systems are inefficient and fragmented. Common issues include manual complaint logging, delayed technician assignment, lack of real-time tracking, poor communication, and no predictive mechanism, resulting in a frustrating user experience.",
    approach:
      "Designed an end-to-end platform connecting users, technicians, and admins. Features AI issue classification with MobileNetV2, automated technician assignment, real-time tracking, and predictive maintenance using Random Forest / Logistic Regression models.",
    techDecisions: [
      {
        decision: "FastAPI for Backend Architecture",
        reason:
          "Allowed seamless integration of Python-based ML models (TensorFlow & Scikit-learn) with fast, modular, and scalable API responses.",
      },
      {
        decision: "Lightweight AI (MobileNetV2)",
        reason:
          "Used lightweight models over heavy deep learning to ensure fast image processing and classification during the issue reporting workflow.",
      },
      {
        decision: "Document-Based NoSQL Database",
        reason:
          "MongoDB Atlas provided flexible schema design to handle diverse maintenance data, asynchronous module updates, and real-time tracking efficiently.",
      },
    ],
    results: [
      "Reduced manual effort in issue classification and tracking",
      "Improved response time through automated technician assignment",
      "Enhanced transparency via real-time tracking from reporting to resolution",
      "Enabled proactive maintenance through system failure predictions",
      "Key Learning: Real-world operational systems rely heavily on robust workflow architectures",
      "Future Scope: IoT fault detection & Smarter allocation optimization algorithms"
    ],
    color: "#39FF14",
  },
  {
    slug: "waste-management-system",
    id: "03",
    name: "Zero2Hero - Waste Management Platform",
    tagline: "Gamifying civic responsibility with AI",
    description:
      "Zero2Hero is a gamified waste management platform that encourages users to adopt eco-friendly habits by rewarding responsible waste disposal. The system combines AI-based waste verification, real-time task tracking, and community engagement to make sustainability interactive and measurable.",
    stack: ["Next.js 14", "Web3Auth", "Node.js", "Firebase", "Google Gemini AI"],
    type: "Full Stack",
    duration: "2 months",
    role: "Solo Full Stack Developer",
    status: "Completed",
    problem:
      "Waste management at an individual level is often inconsistent and lacks accountability. People are not motivated to segregate or dispose of waste properly, there is no system to verify eco-friendly actions, and most solutions focus merely on awareness but fail to drive consistent action.",
    approach:
      "Zero2Hero transforms waste management into a reward-based system where users perform eco-friendly tasks, verify them through Google Gemini AI via image uploads, and earn points on a secure Web3Auth-powered platform with real-time leaderboards.",
    techDecisions: [
      {
        decision: "AI Image Verification rather than Trust-based",
        reason:
          "Verifying real-world actions digitally is challenging. Used Google Gemini AI to analyze and classify uploaded waste disposal images for authenticity and preventing misuse.",
      },
      {
        decision: "Gamification Engine & Leaderboards",
        reason:
          "To maintain user engagement over time, built a structured task validation system backed by rewards that shifts waste management from a passive chore to active competition.",
      },
      {
        decision: "Next.js 14 + Web3Auth Integration",
        reason:
          "Next.js allowed simple intuitive UI with scalable API logic, while Web3Auth provided seamless, secure logins to bridge normal users smoothly into a broader tech ecosystem.",
      },
    ],
    results: [
      "Increased user participation in eco-friendly tasks",
      "Created a measurable, validating system for sustainability actions",
      "Encouraged consistent behavior through AI-verified rewards",
      "Key Learning: Incentives drive behavior more than awareness alone",
      "Key Learning: AI bridges the gap between real-world actions and digital validation",
      "Future Scope: Municipal system integration & Token-based web3 reward expansion"
    ],
    color: "#39FF14",
  }
] as const;

export type Project = (typeof projects)[number];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
