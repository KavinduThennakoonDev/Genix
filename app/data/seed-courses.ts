export interface CurriculumTopic {
  title: string;
  subtopics: string[];
}

export interface CurriculumModule {
  title: string;
  outcome: string;
  topics: CurriculumTopic[];
}

export interface Pricing {
  currency: string;
  originalPrice: number;
  discountedPrice: number;
  earlyBirdDeadline: string;
  promoCode: string;
  paymentOptions: string[];
}

export interface Course {
  slug: string;
  title: string;
  category: string;
  status?: string;
  duration: string;
  totalHours: string;
  gradient: string;
  heroImage: string;
  introImage: string;
  shortDescription: string;
  heroDescription: string;
  studentsEnrolled: string;
  avatarInitials: string[];
  overview: string;
  introVideoTitle: string;
  studentResultsStats: { value: number; suffix: string; label: string }[];
  placementCompanyNames: string[];
  bento: {
    timeCommitment: string;
    whatYoullLearn: string[];
    whoShouldJoin: string[];
    careerOpportunities: string[];
    salaryPotential: string;
    learningOutcomes: string[];
  };
  roadmap: { title: string; description: string }[];
  skills: { label: string; mark: string }[];
  curriculum: CurriculumModule[];
  certification: {
    title: string;
    description: string;
    skillsValidated: string[];
    careerValue: string;
  };
  pricing: Pricing;
}

export const courses: Course[] = [
  {
    slug: "aws-devops",
    title: "AWS DevOps Engineering Masterclass",
    category: "AWS DevOps",
    status: "Enrolling Now",
    duration: "12 Weeks",
    totalHours: "120+ Hours",
    gradient: "from-genix-orange via-genix-orange-dark to-genix-ink",
    heroImage: "/images/scenes/course-hero-aws.jpg",
    introImage: "/images/scenes/course-intro.jpg",
    shortDescription:
      "Go from zero to job-ready AWS DevOps Engineer with live classes, real production-style projects, and dedicated placement support.",
    heroDescription:
      "A complete, mentor-led path to becoming a hireable AWS DevOps Engineer — Linux and Git fundamentals through Docker, Kubernetes, Terraform, CI/CD, and real AWS infrastructure, capped with a placement-ready portfolio.",
    studentsEnrolled: "40+ Students Enrolled",
    avatarInitials: ["IP", "DF", "SW", "KJ"],
    overview:
      "The AWS DevOps Engineering Masterclass is Genix Academy's flagship program, built for career-switchers and IT professionals who want a structured, project-driven path into DevOps. Over 12 weeks of live, instructor-led classes you'll master the full DevOps toolchain — Linux, Git, Docker, Kubernetes, Jenkins, Terraform, and AWS — while building real infrastructure, not toy tutorials. Every module ends with a hands-on project, and the course closes with a capstone deployment plus dedicated interview preparation and placement support.",
    introVideoTitle: "Watch: Inside the AWS DevOps Masterclass",
    studentResultsStats: [
      { value: 92, suffix: "%", label: "Completed the full capstone project" },
      { value: 88, suffix: "%", label: "Received an interview within 60 days" },
      { value: 40, suffix: "%", label: "Average salary increase post-placement" },
    ],
    placementCompanyNames: [
      "NimbusStack",
      "CoreVantage Cloud",
      "BluePeak Systems",
      "Orbital Data Labs",
      "Skyline DevOps Co.",
      "Northfield Digital",
    ],
    bento: {
      timeCommitment: "8–10 hours/week across 12 weeks: live classes, guided labs, and self-paced project work.",
      whatYoullLearn: [
        "Linux administration & shell scripting",
        "Git, GitHub & collaborative workflows",
        "Docker containerization from image to registry",
        "Kubernetes orchestration & Helm",
        "CI/CD pipelines with Jenkins & GitHub Actions",
        "Infrastructure as Code with Terraform",
        "Core AWS services: EC2, VPC, IAM, S3, RDS, EKS",
        "Monitoring & logging with CloudWatch, Prometheus & Grafana",
      ],
      whoShouldJoin: [
        "IT support, QA, or sysadmin professionals ready to move into DevOps",
        "Software developers who want cloud & infrastructure skills",
        "Career-switchers with basic computer literacy and drive",
        "Fresh graduates targeting cloud/DevOps roles",
      ],
      careerOpportunities: [
        "DevOps Engineer",
        "Cloud Engineer",
        "Site Reliability Engineer (SRE)",
        "Platform Engineer",
        "Build & Release Engineer",
        "Cloud Infrastructure Engineer",
      ],
      salaryPotential:
        "Genix DevOps graduates typically move into roles ranging from entry-level Cloud Engineer to mid-level DevOps Engineer positions, often with a 30–50% uplift over their pre-course salary within the first year.",
      learningOutcomes: [
        "Design and deploy production-style AWS infrastructure end-to-end",
        "Build automated CI/CD pipelines from commit to deployment",
        "Containerize and orchestrate applications with Docker & Kubernetes",
        "Write reusable Infrastructure as Code with Terraform",
        "Walk into interviews with a portfolio of real, explainable projects",
      ],
    },
    roadmap: [
      { title: "Foundations", description: "Linux, networking basics, shell scripting, and Git version control." },
      { title: "Containers", description: "Docker fundamentals — images, containers, volumes, and registries." },
      { title: "Cloud Core", description: "AWS essentials: IAM, VPC, EC2, S3, RDS, and security best practices." },
      { title: "Automation", description: "Infrastructure as Code with Terraform and configuration management." },
      { title: "Orchestration", description: "Kubernetes clusters, Helm charts, and workload scaling on EKS." },
      { title: "CI/CD & Monitoring", description: "Jenkins pipelines, GitHub Actions, CloudWatch, Prometheus & Grafana." },
      { title: "Capstone & Placement", description: "Build a full production-style project, then mock interviews, resume review, and job referrals." },
    ],
    skills: [
      { label: "Linux", mark: "LNX" },
      { label: "Git", mark: "GIT" },
      { label: "Docker", mark: "DKR" },
      { label: "Kubernetes", mark: "K8S" },
      { label: "Jenkins", mark: "JNK" },
      { label: "Terraform", mark: "TF" },
      { label: "AWS", mark: "AWS" },
      { label: "Azure", mark: "AZ" },
      { label: "CI/CD", mark: "C/CD" },
      { label: "Monitoring", mark: "MON" },
      { label: "Security", mark: "SEC" },
      { label: "Infrastructure as Code", mark: "IaC" },
      { label: "Cloud Automation", mark: "AUTO" },
    ],
    curriculum: [
      {
        title: "Module 1 — Linux, Networking & Git Foundations",
        outcome: "Comfortably operate a Linux server and manage code with Git.",
        topics: [
          {
            title: "Linux Administration",
            subtopics: ["File system & permissions", "Process & service management", "Shell scripting basics", "Package management"],
          },
          {
            title: "Networking Fundamentals",
            subtopics: ["TCP/IP & DNS", "Firewalls & security groups", "Load balancing concepts"],
          },
          {
            title: "Git & Version Control",
            subtopics: ["Branching strategies", "Pull requests & code review", "GitHub Actions basics"],
          },
        ],
      },
      {
        title: "Module 2 — Containerization with Docker",
        outcome: "Package and run applications in production-ready containers.",
        topics: [
          { title: "Docker Fundamentals", subtopics: ["Images vs. containers", "Dockerfile best practices", "Multi-stage builds"] },
          { title: "Container Networking & Storage", subtopics: ["Volumes & bind mounts", "Docker networking modes", "Docker Compose"] },
          { title: "Registries & Security", subtopics: ["Docker Hub & ECR", "Image scanning & hardening"] },
        ],
      },
      {
        title: "Module 3 — Core AWS Cloud Services",
        outcome: "Provision and secure real infrastructure on AWS.",
        topics: [
          { title: "Identity & Access", subtopics: ["IAM users, roles & policies", "Least-privilege security design"] },
          { title: "Compute & Networking", subtopics: ["EC2 instances & auto scaling", "VPC design, subnets & routing"] },
          { title: "Storage & Databases", subtopics: ["S3 buckets & lifecycle policies", "RDS managed databases"] },
        ],
      },
      {
        title: "Module 4 — Infrastructure as Code with Terraform",
        outcome: "Define and deploy repeatable, version-controlled infrastructure.",
        topics: [
          { title: "Terraform Basics", subtopics: ["Providers, resources & state", "Variables & outputs"] },
          { title: "Advanced Terraform", subtopics: ["Modules & reusability", "Remote state & workspaces"] },
        ],
      },
      {
        title: "Module 5 — Kubernetes & Orchestration",
        outcome: "Deploy and scale containerized workloads on Kubernetes/EKS.",
        topics: [
          { title: "Kubernetes Core Concepts", subtopics: ["Pods, deployments & services", "ConfigMaps & secrets"] },
          { title: "Cluster Operations", subtopics: ["Amazon EKS setup", "Helm charts", "Autoscaling & rolling updates"] },
        ],
      },
      {
        title: "Module 6 — CI/CD, Monitoring & Capstone",
        outcome: "Ship a fully automated pipeline with monitoring and present a capstone project.",
        topics: [
          { title: "CI/CD Pipelines", subtopics: ["Jenkins pipelines as code", "GitHub Actions workflows", "Blue/green & canary deploys"] },
          { title: "Monitoring & Logging", subtopics: ["CloudWatch dashboards & alarms", "Prometheus & Grafana"] },
          { title: "Capstone Project", subtopics: ["End-to-end deployment", "Architecture presentation", "Peer & mentor review"] },
        ],
      },
    ],
    certification: {
      title: "Genix Academy AWS DevOps Certificate of Completion",
      description:
        "Awarded after you complete all six modules and successfully present your capstone project to a mentor panel. Your certificate includes a unique verification ID employers can check.",
      skillsValidated: ["Linux & Git", "Docker & Kubernetes", "Terraform (IaC)", "AWS Core Services", "CI/CD Pipelines", "Monitoring & Security"],
      careerValue:
        "Add it directly to your LinkedIn and resume as proof of hands-on, project-based DevOps experience — designed to complement (not replace) vendor certifications like the AWS Certified DevOps Engineer.",
    },
    pricing: {
      currency: "USD",
      originalPrice: 799,
      discountedPrice: 499,
      earlyBirdDeadline: "August 15, 2026",
      promoCode: "GENIXAWS100",
      paymentOptions: ["Full payment (best value)", "2-installment plan", "3-installment plan"],
    },
  },
  {
    slug: "azure-devops",
    title: "Azure DevOps Engineering Program",
    category: "Azure DevOps",
    status: "Starts After AWS Batch",
    duration: "12 Weeks",
    totalHours: "110+ Hours",
    gradient: "from-genix-blue via-genix-blue-dark to-genix-ink",
    heroImage: "/images/scenes/course-hero-azure.jpg",
    introImage: "/images/scenes/course-intro.jpg",
    shortDescription:
      "The same project-driven DevOps foundation, specialized for the Microsoft Azure ecosystem — from Azure DevOps Pipelines to AKS.",
    heroDescription:
      "Build job-ready Azure DevOps skills — Linux, Git and container fundamentals through Azure Pipelines, AKS, and Infrastructure as Code — with the same mentor-led, project-first Genix Academy method.",
    studentsEnrolled: "25+ Students Interested",
    avatarInitials: ["NS", "RB", "TM"],
    overview:
      "The Azure DevOps Engineering Program mirrors the depth of our AWS Masterclass, re-focused on the Microsoft Azure ecosystem. You'll cover the same core DevOps foundations — Linux, Git, Docker, and Kubernetes — before specializing in Azure DevOps Pipelines, Azure Resource Manager, Bicep/Terraform, and Azure Kubernetes Service (AKS), finishing with a capstone project and placement support tailored to Azure-focused roles.",
    introVideoTitle: "Watch: What to Expect in the Azure DevOps Program",
    studentResultsStats: [
      { value: 90, suffix: "%", label: "Completion rate in pilot cohorts" },
      { value: 85, suffix: "%", label: "Interview-ready within 60 days" },
      { value: 35, suffix: "%", label: "Average salary increase post-placement" },
    ],
    placementCompanyNames: ["Meridian Tech", "Pinnacle SaaS", "Vertex Cloud Works", "Northfield Digital"],
    bento: {
      timeCommitment: "8–10 hours/week across 12 weeks: live classes, guided labs, and self-paced project work.",
      whatYoullLearn: [
        "Linux administration & shell scripting",
        "Git & collaborative workflows",
        "Docker & container fundamentals",
        "Azure DevOps Pipelines & Boards",
        "Infrastructure as Code with Terraform/Bicep",
        "Azure Kubernetes Service (AKS)",
        "Core Azure services: VMs, VNet, IAM, Storage, Azure SQL",
        "Monitoring with Azure Monitor & Log Analytics",
      ],
      whoShouldJoin: [
        "Professionals already working in Microsoft-centric environments",
        "IT support, QA, or sysadmin professionals moving into DevOps",
        "Developers wanting Azure infrastructure & automation skills",
        "AWS DevOps graduates looking to add a second cloud",
      ],
      careerOpportunities: [
        "Azure DevOps Engineer",
        "Cloud Engineer (Azure)",
        "Site Reliability Engineer (SRE)",
        "Platform Engineer",
        "Cloud Infrastructure Engineer",
      ],
      salaryPotential:
        "Azure DevOps skills are in high demand among enterprises running Microsoft-centric stacks, with graduates typically seeing a 25–45% salary uplift within their first year post-placement.",
      learningOutcomes: [
        "Design and deploy production-style infrastructure on Azure",
        "Build CI/CD pipelines with Azure DevOps & GitHub Actions",
        "Deploy and manage workloads on Azure Kubernetes Service",
        "Automate infrastructure with Terraform/Bicep",
        "Graduate with a placement-ready Azure project portfolio",
      ],
    },
    roadmap: [
      { title: "Foundations", description: "Linux, networking basics, shell scripting, and Git version control." },
      { title: "Containers", description: "Docker fundamentals — images, containers, volumes, and registries." },
      { title: "Azure Core", description: "Azure essentials: IAM, VNet, VMs, Storage, and security best practices." },
      { title: "Automation", description: "Infrastructure as Code with Terraform/Bicep and configuration management." },
      { title: "Orchestration", description: "Kubernetes clusters and workload scaling on AKS." },
      { title: "CI/CD & Monitoring", description: "Azure Pipelines, GitHub Actions, Azure Monitor & Log Analytics." },
      { title: "Capstone & Placement", description: "Full production-style project, mock interviews, resume review, and job referrals." },
    ],
    skills: [
      { label: "Linux", mark: "LNX" },
      { label: "Git", mark: "GIT" },
      { label: "Docker", mark: "DKR" },
      { label: "Kubernetes", mark: "K8S" },
      { label: "Azure Pipelines", mark: "ADO" },
      { label: "Terraform", mark: "TF" },
      { label: "Azure", mark: "AZ" },
      { label: "AWS", mark: "AWS" },
      { label: "CI/CD", mark: "C/CD" },
      { label: "Monitoring", mark: "MON" },
      { label: "Security", mark: "SEC" },
      { label: "Infrastructure as Code", mark: "IaC" },
      { label: "Cloud Automation", mark: "AUTO" },
    ],
    curriculum: [
      {
        title: "Module 1 — Linux, Networking & Git Foundations",
        outcome: "Comfortably operate a Linux server and manage code with Git.",
        topics: [
          { title: "Linux Administration", subtopics: ["File system & permissions", "Process & service management", "Shell scripting basics"] },
          { title: "Git & Version Control", subtopics: ["Branching strategies", "Pull requests & code review"] },
        ],
      },
      {
        title: "Module 2 — Containerization with Docker",
        outcome: "Package and run applications in production-ready containers.",
        topics: [
          { title: "Docker Fundamentals", subtopics: ["Images vs. containers", "Dockerfile best practices"] },
          { title: "Registries & Security", subtopics: ["Azure Container Registry", "Image scanning & hardening"] },
        ],
      },
      {
        title: "Module 3 — Core Azure Cloud Services",
        outcome: "Provision and secure real infrastructure on Azure.",
        topics: [
          { title: "Identity & Access", subtopics: ["Azure AD & RBAC", "Least-privilege security design"] },
          { title: "Compute & Networking", subtopics: ["Virtual Machines & scale sets", "VNet design & routing"] },
          { title: "Storage & Databases", subtopics: ["Blob Storage & lifecycle policies", "Azure SQL"] },
        ],
      },
      {
        title: "Module 4 — Infrastructure as Code",
        outcome: "Define and deploy repeatable, version-controlled infrastructure.",
        topics: [
          { title: "Terraform on Azure", subtopics: ["Providers, resources & state", "Modules & reusability"] },
          { title: "Bicep Fundamentals", subtopics: ["ARM templates vs. Bicep", "Deployment automation"] },
        ],
      },
      {
        title: "Module 5 — Kubernetes on Azure (AKS)",
        outcome: "Deploy and scale containerized workloads on AKS.",
        topics: [
          { title: "Kubernetes Core Concepts", subtopics: ["Pods, deployments & services", "ConfigMaps & secrets"] },
          { title: "AKS Operations", subtopics: ["Cluster setup & scaling", "Helm charts"] },
        ],
      },
      {
        title: "Module 6 — CI/CD, Monitoring & Capstone",
        outcome: "Ship a fully automated pipeline with monitoring and present a capstone project.",
        topics: [
          { title: "CI/CD Pipelines", subtopics: ["Azure Pipelines as code", "GitHub Actions workflows"] },
          { title: "Monitoring & Logging", subtopics: ["Azure Monitor & Log Analytics", "Alerting & dashboards"] },
          { title: "Capstone Project", subtopics: ["End-to-end deployment", "Architecture presentation"] },
        ],
      },
    ],
    certification: {
      title: "Genix Academy Azure DevOps Certificate of Completion",
      description:
        "Awarded after you complete all six modules and successfully present your capstone project to a mentor panel. Your certificate includes a unique verification ID employers can check.",
      skillsValidated: ["Linux & Git", "Docker & Kubernetes (AKS)", "Terraform / Bicep (IaC)", "Core Azure Services", "CI/CD Pipelines", "Monitoring & Security"],
      careerValue:
        "Add it directly to your LinkedIn and resume as proof of hands-on, project-based Azure DevOps experience — designed to complement vendor certifications like Microsoft's Azure DevOps Engineer Expert.",
    },
    pricing: {
      currency: "USD",
      originalPrice: 799,
      discountedPrice: 529,
      earlyBirdDeadline: "To be announced",
      promoCode: "GENIXAZURE100",
      paymentOptions: ["Full payment (best value)", "2-installment plan", "3-installment plan"],
    },
  },
];

export function getCourseBySlug(slug: string) {
  return courses.find((c) => c.slug === slug);
}
