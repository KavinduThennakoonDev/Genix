export interface FaqItem {
  question: string;
  answer: string;
}

export const homeFaqs: FaqItem[] = [
  {
    question: "Do I need prior IT or coding experience to join Genix Academy?",
    answer:
      "No. Most of our students start from a support, QA, sysadmin, or even non-technical background. Our courses begin with the fundamentals (Linux, networking, Git) before moving into DevOps tooling, so you build a solid foundation regardless of your starting point.",
  },
  {
    question: "Are the classes live or pre-recorded?",
    answer:
      "Classes are live and instructor-led, with sessions recorded and made available for lifetime access. This means you get real-time interaction and mentorship, plus the flexibility to revisit any session.",
  },
  {
    question: "Will I actually get help finding a job after the course?",
    answer:
      "Yes. Every course includes dedicated placement support: resume building, LinkedIn optimization, mock technical interviews, referrals to our hiring partner network, and one-on-one career guidance sessions with your mentor.",
  },
  {
    question: "What if I can't attend a live class?",
    answer:
      "Every live session is recorded and uploaded within 24 hours, and you keep lifetime access to the recordings and course materials, so you can always catch up on your own schedule.",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "Yes, we offer flexible installment plans on all courses in addition to early-bird discounts. See the pricing section on each course page for current options, or book a free career call and we'll walk you through what fits your budget.",
  },
  {
    question: "What happens after I submit the registration form?",
    answer:
      "Our admissions team will reach out over WhatsApp or email within 24 hours to confirm your seat, share the batch schedule, and answer any questions before your first class.",
  },
];

export const courseFaqs: FaqItem[] = [
  {
    question: "How much time do I need to commit each week?",
    answer:
      "Plan for 8–10 hours per week: 4–5 hours of live class time and 4–5 hours of hands-on lab work and assignments. The curriculum is designed to be manageable alongside a full-time job.",
  },
  {
    question: "Will I get a certificate at the end?",
    answer:
      "Yes. On successful completion of all modules and the capstone project, you receive a Genix Academy certificate of completion that validates the specific tools and skills covered, which you can add directly to your LinkedIn and resume.",
  },
  {
    question: "Is this course beginner-friendly?",
    answer:
      "Yes. We start from Linux and networking fundamentals and progressively build up to advanced topics like Kubernetes and CI/CD pipelines, so both beginners and professionals looking to upskill can follow along.",
  },
  {
    question: "What is the refund / early-bird policy?",
    answer:
      "Early-bird pricing is available for a limited time before each batch starts. If you're not satisfied within the first week of live classes, contact our support team to discuss your options — we stand behind the quality of our training.",
  },
  {
    question: "Can I switch batches if my schedule changes?",
    answer:
      "Yes, you can request a one-time batch transfer to the next available cohort at no extra cost, subject to seat availability.",
  },
];

export const webinarFaqs: FaqItem[] = [
  {
    question: "Is the webinar really free?",
    answer:
      "Yes, this webinar is completely free. It's designed to give you a genuine, practical look at the DevOps career path — no strings attached.",
  },
  {
    question: "Will the webinar be recorded?",
    answer:
      "Yes, registered attendees will receive a recording link after the session, so you won't miss out even if you can't join live.",
  },
  {
    question: "Do I need any prior experience to attend?",
    answer:
      "No prior experience is required. This session is built for career-switchers, students, and IT professionals exploring whether DevOps is the right path for them.",
  },
  {
    question: "Is there a Q&A session?",
    answer:
      "Yes, the mentor will host a live Q&A at the end of the webinar to answer your specific questions about the DevOps career path, the curriculum, and next steps.",
  },
];
