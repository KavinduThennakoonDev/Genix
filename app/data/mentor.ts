// PLACEHOLDER CONTENT — invented mentor profile. The photo is a free-to-use (Unsplash
// License) stock photo, not a real Genix Academy instructor. Replace with your real
// instructor's bio, credentials, and photo before launch. See PLACEHOLDER_CONTENT.md.

export interface Mentor {
  name: string;
  title: string;
  initials: string;
  photo: string;
  bio: string;
  credentials: string[];
  stats: { label: string; value: string }[];
  linkedin: string;
}

export const mentor: Mentor = {
  name: "Nuwan Perera",
  title: "Lead DevOps Mentor, Genix Academy",
  initials: "NP",
  photo: "/images/portraits/mentor-nuwan.jpg",
  bio: "Nuwan has spent over 9 years building and scaling cloud infrastructure for fintech and SaaS companies, and has led DevOps transformation projects across AWS and Azure. He now trains the next generation of DevOps engineers full-time, combining production war stories with a structured, project-first teaching method.",
  credentials: [
    "AWS Certified DevOps Engineer – Professional",
    "AWS Certified Solutions Architect – Associate",
    "Certified Kubernetes Administrator (CKA)",
    "HashiCorp Certified: Terraform Associate",
    "Microsoft Certified: Azure DevOps Engineer Expert",
  ],
  stats: [
    { label: "Years in Industry", value: "9+" },
    { label: "Students Mentored", value: "1,200+" },
    { label: "Cohorts Led", value: "30+" },
  ],
  linkedin: "https://linkedin.com/",
};
