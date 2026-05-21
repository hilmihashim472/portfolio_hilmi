const items = [
  {
    year: "Mar 2022 — Aug 2025",
    title: "Universiti Teknologi MARA (UiTM)",
    degree: "Bachelor of Information Technology (Hons.)",
    detail:
      "CGPA: 3.42 — Relevant coursework: Web Development, Data Structures, Software Engineering.",
  },
  {
    year: "Sep 2018 — Feb 2022",
    title: "Universiti Teknologi MARA (UiTM)",
    degree: "Diploma in Civil Engineering",
    detail:
      "Relevant coursework: Construction Technology, Structural Analysis, Project Management.",
  },
];

export default function Education() {
  return (
    <div className="timeline">
      {items.map((item, i) => (
        <div key={i} className="timeline-item">
          <span className="timeline-item__year">{item.year}</span>
          <div className="timeline-item__body">
            <p className="timeline-item__title">{item.title}</p>
            <p className="timeline-item__sub">{item.degree}</p>
            <p className="timeline-item__detail">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
