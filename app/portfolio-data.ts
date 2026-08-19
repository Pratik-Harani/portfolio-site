
export const profile = {
  name: "Pratik Harani",
  firstName: "Pratik",
  status: "Computer Science student · Available for opportunities",
  email: "pratik.harani@gmail.com",
  location: "Based in London, UK",
  availability: "Open to new opportunities",
};

export const hero = {
  headline: {
    beforeHighlight: "Hi, I'm Pratik",
    // Set this to an empty string to show a headline with no highlighted text.
    highlightedText: "Software Engineer",
    afterHighlight: "",
  },
  introduction:
    "I am a second-year Computer Science student who enjoys creating calm, useful digital products and learning how good software comes together.",
};

export const aboutSection = {
  headline: ["A curious builder with a people-first mindset."],
  description: ["I am Pratik, a Computer Science student interested in the space between technology, design, and everyday life. I enjoy taking a vague idea and giving it a clear, friendly shape.",
    "Right now, I am building my foundations across full-stack development and product thinking. I care about the details that make software feel simple to use and satisfying to return to.",],
  skills: [
  "TypeScript", "React", "Next.js", "Python", "Java", "Node.js", "Tailwind CSS",
  "PostgreSQL", "Git", "Figma", "REST APIs", "Problem solving",],
};

export const projects = [
  {
    title: "Oberon",
    image: "/projects/Oberon.png",
    category: "Agentic AI",
    description: "Agent orchestration platform that enables real-time prompt refinement, cutting down token usage by 5.4x",
    technologies: ["React", "LangChain", "FastAPI"],
    liveUrl: "#",
  },
  {
    title: "StudentBudget",
    image: "/projects/StudentBudget.png",
    category: "Full stack",
    description: "Python desktop app to solve personal finance for students, using the envelope budgeting methodology.",
    technologies: ["MVC", "Python", "OOP"],
    liveUrl: "#",
  },
  {
    title: "Tetris Autoplayer AI",
    image: "/projects/TetrisAutoplayerAI.png",
    category: "Heuristic Algorithms",
    description: "A Tetris-playing AI that optimizes for 4-line clears using weighted heuristics. Ranked in the top 10% out of 200 students.",
    technologies: ["Python", "AI/ML", "PyGame"],
    liveUrl: "#",
  },
  {
    title: "Bioreactor IoT System",
    image: "/projects/Bioreactor.png",
    category: "Coursework",
    description: "Model for TB vaccine production in Uganda, with closed-loop automatic pH, heating, and stirring systems.",
    technologies: ["C++", "Arduino", "IoT"],
    liveUrl: "#",
  },
];

export const experience = [
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
];

export const socialLinks = {
  github: { url: "https://github.com/Pratik-Harani" },
  linkedin: { url: "https://www.linkedin.com/in/pratik-harani/" },
  cv: { url: "/Pratik Harani CV.pdf" },
};
