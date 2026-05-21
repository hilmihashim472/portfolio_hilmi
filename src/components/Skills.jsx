const skills = [
  { icon: "🌐", name: "HTML" },
  { icon: "🎨", name: "CSS" },
  { icon: "⚡", name: "JavaScript" },
  { icon: "⚛️", name: "React" },
  { icon: "💨", name: "Tailwind CSS" },
  { icon: "🐍", name: "Python" },
  { icon: "☕", name: "Java" },
  { icon: "🔷", name: "C#" },
  { icon: "➕", name: "C++" },
  { icon: "🐘", name: "PHP" },
  { icon: "🗄️", name: "SQL" },
  { icon: "🐘", name: "PostgreSQL" },
  { icon: "🔀", name: "Git" },
  { icon: "⚙️", name: "n8n" },
];

export default function Skills() {
  return (
    <div className="skills-chips">
      {skills.map((s) => (
        <div key={s.name} className="skill-chip">
          <span className="skill-chip__icon">{s.icon}</span>
          <span className="skill-chip__name">{s.name}</span>
        </div>
      ))}
    </div>
  );
}
