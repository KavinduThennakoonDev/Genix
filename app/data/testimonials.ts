// PLACEHOLDER CONTENT — invented student names, quotes, outcomes, and photos standing in for
// real alumni testimonials. Photos are free-to-use (Unsplash License) stock photos, not real
// Genix Academy students. Replace with real (consented) student stories and photos before
// launch. See PLACEHOLDER_CONTENT.md.

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  initials: string;
  photo: string;
  outcome?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Ishara Perera",
    role: "DevOps Engineer, NimbusStack",
    quote:
      "I came in as a self-taught support engineer with zero cloud experience. Twelve weeks later I was interviewing confidently and speaking the same language as senior engineers. The mock interviews alone were worth the tuition.",
    rating: 5,
    initials: "IP",
    photo: "/images/portraits/ishara.jpg",
    outcome: "Placed within 6 weeks of graduating",
  },
  {
    name: "Dinuka Fernando",
    role: "Site Reliability Engineer, CoreVantage Cloud",
    quote:
      "Genix doesn't just teach tools — they teach you how to think like a DevOps engineer under pressure. The real production-style projects on AWS and Kubernetes are exactly what showed up in my technical interviews.",
    rating: 5,
    initials: "DF",
    photo: "/images/portraits/dinuka.jpg",
    outcome: "40% salary increase from previous role",
  },
  {
    name: "Sanduni Wickrama",
    role: "Cloud Infrastructure Engineer, BluePeak Systems",
    quote:
      "The mentor sessions were the difference-maker. Having a working DevOps lead review my Terraform code every week pushed me to write production-grade infrastructure, not tutorial-grade infrastructure.",
    rating: 5,
    initials: "SW",
    photo: "/images/portraits/sanduni.jpg",
    outcome: "Career switch from QA to DevOps in 4 months",
  },
  {
    name: "Kasun Jayasuriya",
    role: "Junior DevOps Engineer, Skyline DevOps Co.",
    quote:
      "I tried learning DevOps on my own for a year and kept stalling. The structured roadmap, weekly live classes, and accountability from the cohort got me further in 10 weeks than I got in 12 months alone.",
    rating: 4.5,
    initials: "KJ",
    photo: "/images/portraits/kasun.jpg",
    outcome: "First tech job after graduating in Business",
  },
  {
    name: "Nethmi Silva",
    role: "Platform Engineer, Northfield Digital",
    quote:
      "Resume building and LinkedIn optimization felt almost as valuable as the technical curriculum. Recruiters started reaching out to me before I'd even finished the course.",
    rating: 5,
    initials: "NS",
    photo: "/images/portraits/nethmi.jpg",
    outcome: "3 job offers before completing the program",
  },
  {
    name: "Ravindu Bandara",
    role: "Cloud & DevOps Consultant, Vertex Cloud Works",
    quote:
      "The community access alone is worth staying for — I still ask questions in the alumni group a year later and get answers from engineers who've been where I'm trying to go next.",
    rating: 5,
    initials: "RB",
    photo: "/images/portraits/ravindu.jpg",
    outcome: "Promoted to consultant within 8 months",
  },
];

export const webinarTestimonials: Testimonial[] = [
  {
    name: "Tharindu Madushanka",
    role: "Attended: AWS DevOps Career Webinar",
    quote:
      "This one free session gave me more clarity on the DevOps career path than weeks of scattered YouTube videos. I enrolled in the full course the same week.",
    rating: 5,
    initials: "TM",
    photo: "/images/portraits/tharindu.jpg",
  },
  {
    name: "Chamodi Gunasekara",
    role: "Attended: AWS DevOps Career Webinar",
    quote:
      "Loved that it wasn't just a sales pitch — the roadmap and skills breakdown were genuinely useful even before I signed up for anything.",
    rating: 5,
    initials: "CG",
    photo: "/images/portraits/chamodi.jpg",
  },
  {
    name: "Lahiru Rathnayake",
    role: "Attended: AWS DevOps Career Webinar",
    quote:
      "The mentor answered every question live, including some pretty specific ones about switching careers at 30. Highly recommend blocking the hour for this.",
    rating: 4.5,
    initials: "LR",
    photo: "/images/portraits/lahiru.jpg",
  },
];
