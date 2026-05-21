const projects = [
  {
    icon: "🌐",
    title: "Portfolio Website",
    desc: "Personal portfolio built with React and Tailwind CSS, featuring a pixel art theme.",
    tags: ["React", "Tailwind", "Vite"],
    link: "#",
  } /*,
  {
    icon: "🛒",
    title: "E-Commerce App",
    desc: "A full-stack shopping application with product listings, cart, and checkout flow.",
    tags: ["React", "Node.js", "MongoDB"],
    link: "#",
  },
  {
    icon: "📋",
    title: "Task Manager",
    desc: "Productivity app for managing daily tasks with drag-and-drop support.",
    tags: ["React", "Firebase"],
    link: "#",
  },*/,
];

function SectionHeading({ label }) {
  return (
    <>
      <h2 className="px-heading">{label}</h2>
      <div className="px-heading-bar" />
    </>
  );
}

export default function Projects() {
  return (
    <main className="px-page">
      <div className="px-section">
        <SectionHeading label="PROJECTS" />
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div key={i} className="project-card">
              <div className="project-card__thumb">{p.icon}</div>
              <div className="project-card__body">
                <p className="project-card__title">{p.title}</p>
                <p className="project-card__desc">{p.desc}</p>
                <div className="project-card__tags">
                  {p.tags.map((t) => (
                    <span key={t} className="px-badge">
                      {t}
                    </span>
                  ))}
                </div>
                <a href={p.link} className="project-card__link">
                  VIEW PROJECT ▸
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
