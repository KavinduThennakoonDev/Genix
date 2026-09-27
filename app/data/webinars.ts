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
