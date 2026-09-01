
export const sectionIds = ["about", "projects", "experience", "contact"];

export const profile = {
  name: "Pratik Harani",
  firstName: "Pratik",
  email: "pratik.harani@gmail.com",
};

export const hero = {
  headline: {
    beforeHighlight: "Hi, I'm Pratik",
    // Set this to an empty string to show a headline with no highlighted text.
    highlightedText: "Software Engineer",
    afterHighlight: "",
  },
  introduction: ""
};

export const aboutSection = {
  headline: "A curious builder.",
  description: ["I'm a 2nd year BSc Computer Science student at University College London (UCL), interested in cybersecurity, automation & back-end engineering. When I'm not at a screen, you can find me in competitive debating, taking photographs of cool things, or reading a good book"],
  skills: [
    "TypeScript", "React", "Next.js", "Python", "Java", "C/C++", "Node.js", "Git", "LangChain", "Haskell"],
};

export const projectsSection = {
  headline: "A selection of things I've made",
  projects: [
  {
    title: "Oberon",
    image: "/projects/Oberon.png",
    category: "Agentic AI",
    description: "Agent orchestration platform that enables real-time prompt refinement, cutting down token usage by 5.4x",
    technologies: ["React", "LangChain", "FastAPI"],
    liveUrl: "https://github.com/Pratik-Harani/Oberon",
  },
  {
    title: "StudentBudget",
    image: "/projects/StudentBudget.png",
    category: "Full stack",
    description: "Python desktop app to solve personal finance for students, using the envelope budgeting methodology.",
    technologies: ["MVC", "Python", "OOP"],
    liveUrl: "https://github.com/Pratik-Harani/StudentBudget",
  },
  {
    title: "Tetris Autoplayer AI",
    image: "/projects/TetrisAutoplayerAI.png",
    category: "Heuristic Algorithms",
    description: "A Tetris-playing AI that optimizes for 4-line clears using weighted heuristics. Ranked in the top 10% out of 200 students.",
    technologies: ["Python", "AI/ML", "PyGame"],
    liveUrl: "https://github.com/Pratik-Harani/Tetris-Autoplayer-AI",
  },
  {
    title: "Bioreactor IoT System",
    image: "/projects/Bioreactor.png",
    category: "Coursework",
    description: "Model for TB vaccine production in Uganda, with closed-loop automatic pH, heating, and stirring systems.",
    technologies: ["C++", "Arduino", "IoT"],
    liveUrl: "https://github.com/Pratik-Harani/Bioreactor-IoT-System",
  },
]
}

export const experienceSection = {
  headline: "Places I've been",
  experience: [
  {
    company: "Blueshift Education",
    logo: "/company-logos/blueshift.png",
    role: "Coding Teacher",
    dates: "Jul 2026 — Present",
    location: "London, UK",
    description: "Lead weekly Python & Javscript coding tutorials at schools around London",
  },
  {
    company: "UCL Schools Engagement",
    logo: "/company-logos/ucl.svg",
    role: "AI/ML Workshops Leader",
    dates: "Oct 2025 — Jun 2026",
    location: "London, UK",
    description: "Designed and delivered workshops for underprivileged school students on Python, swarm intelligence, and robotics, growing the Robotics club into the top 3 most popular clubs at the school. ",
  },
  {
    company: "Fedora Linux",
    logo: "/company-logos/fedora.png",
    role: "Open-Source Contributor",
    dates: "Apr 2021 — Jun 2021",
    location: "Remote",
    description: "Designed badges, logic models and banners to revamp the Fedora Forums UI, used by 1+ million people worldwide.",
  },
  ]
}

export const contactSection = {
  kickerText: "Have a project, opportunity, or idea?",
  normalHeadlineText: "Let's make something",
  highlightedHeadlineText: "good"
}

export const socialLinks = {
  github: { url: "https://github.com/Pratik-Harani" },
  linkedin: { url: "https://www.linkedin.com/in/pratik-harani/" },
  cv: { url: "/Pratik Harani CV.pdf" },
};
