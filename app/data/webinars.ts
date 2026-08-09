export interface WebinarTopic {
  title: string;
  subtopics: string[];
}

export interface Webinar {
  slug: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  speakerName: string;
  registeredCount: string;
  avatarInitials: string[];
  gradient: string;
  heroImage: string;
  introImage: string;
  introVideoTitle: string;
  overview: string;
  bento: {
    agenda: string[];
    outcomes: string[];
    careerBenefits: string[];
    devopsOverview: string;
    requiredKnowledge: string[];
    nextSteps: string[];
  };
  roadmap: { title: string; description: string }[];
  skills: { label: string; mark: string }[];
  topics: WebinarTopic[];
}

// PLACEHOLDER CONTENT — sample upcoming webinar. Update the date/time and registered
// count with real, live data before launch. See PLACEHOLDER_CONTENT.md.
export const webinars: Webinar[] = [
  {
    slug: "aws-devops-career-webinar",
    title: "How to Become an AWS DevOps Engineer in 2026: Live Career Webinar",
    date: "August 16, 2026",
    time: "7:00 PM (GMT+5:30)",
    duration: "60 Minutes",
    speakerName: "Nuwan Perera, Lead DevOps Mentor",
    registeredCount: "180+ Registered",
    avatarInitials: ["TM", "CG", "LR", "IP"],
    heroImage: "/images/scenes/course-hero-azure.jpg",
    introImage: "/images/scenes/webinar-hero.jpg",
    gradient: "from-genix-blue via-genix-ink to-genix-orange-dark",
    introVideoTitle: "Watch: What We'll Cover in This Webinar",
    overview:
      "Join Genix Academy's Lead DevOps Mentor for a free, no-fluff live session on what it actually takes to break into DevOps in 2026 — the real skills employers are hiring for, the exact roadmap our students follow, and how to plan your first 90 days toward a DevOps role, whether you're starting from IT support, QA, development, or a completely different career.",
    bento: {
      agenda: [
        "Why DevOps is one of the highest-demand cloud careers right now",
        "The exact skill roadmap: Linux → Git → Docker → Kubernetes → AWS → CI/CD",
        "Live walkthrough of a real DevOps project",
        "How Genix Academy's placement support works",
        "Open Q&A with the mentor",
      ],
      outcomes: [
        "A clear, personalized roadmap to start your DevOps journey",
        "Understanding of which skills matter most to employers right now",
        "Insight into realistic salary ranges and career timelines",
        "Direct access to ask a working DevOps engineer your questions",
      ],
      careerBenefits: [
        "Avoid wasting months on the wrong learning order",
        "Learn what recruiters actually screen for in DevOps resumes",
        "Get a preview of the AWS DevOps Masterclass curriculum",
        "Early-bird enrollment pricing revealed live for attendees",
      ],
      devopsOverview:
        "DevOps is the practice of unifying software development and IT operations to ship reliable software faster — using automation, cloud infrastructure, and continuous integration/continuous delivery (CI/CD) to reduce manual work and downtime. It's one of the fastest-growing, highest-paid entry points into cloud careers.",
      requiredKnowledge: [
        "No prior DevOps experience required",
        "Basic computer literacy is enough to follow along",
        "Some familiarity with the command line is helpful but not required",
      ],
      nextSteps: [
        "Register for the free webinar below",
        "Attend live and ask your questions",
        "Get early-bird access to the AWS DevOps Masterclass",
        "Book a free 1:1 career call with our admissions team",
      ],
    },
    roadmap: [
      { title: "Foundations", description: "Linux, networking basics, shell scripting, and Git version control." },
      { title: "Containers", description: "Docker fundamentals — images, containers, volumes, and registries." },
      { title: "Cloud Core", description: "AWS essentials: IAM, VPC, EC2, S3, RDS, and security best practices." },
      { title: "Automation", description: "Infrastructure as Code with Terraform and configuration management." },
      { title: "Orchestration", description: "Kubernetes clusters, Helm charts, and workload scaling on EKS." },
      { title: "CI/CD & Monitoring", description: "Jenkins pipelines, GitHub Actions, CloudWatch, Prometheus & Grafana." },
      { title: "Job-Ready", description: "Portfolio project, mock interviews, resume review, and job referrals." },
    ],
    skills: [
      { label: "Linux", mark: "LNX" },
      { label: "Git", mark: "GIT" },
      { label: "Docker", mark: "DKR" },
      { label: "Kubernetes", mark: "K8S" },
      { label: "AWS", mark: "AWS" },
      { label: "CI/CD", mark: "C/CD" },
      { label: "Terraform", mark: "TF" },
      { label: "Monitoring", mark: "MON" },
    ],
    topics: [
      {
        title: "1. The State of DevOps Hiring in 2026",
        subtopics: ["Why demand for DevOps engineers keeps rising", "Which industries are hiring the most", "Entry points into the field from non-traditional backgrounds"],
      },
      {
        title: "2. The Genix Skill Roadmap",
        subtopics: ["Linux, networking & Git fundamentals", "Docker & Kubernetes essentials", "AWS core services & Infrastructure as Code", "CI/CD pipelines & monitoring"],
      },
      {
        title: "3. Live Project Walkthrough",
        subtopics: ["A real deployment pipeline, explained end-to-end", "Common mistakes beginners make", "How to talk about projects in interviews"],
      },
      {
        title: "4. Career Planning & Placement Support",
        subtopics: ["Realistic timelines from zero to job-ready", "How Genix Academy's mock interviews & resume support work", "Q&A with the mentor"],
      },
    ],
  },
];

export function getWebinarBySlug(slug: string) {
  return webinars.find((w) => w.slug === slug);
}
