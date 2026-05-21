const items = [
  {
    year: "Mar 2025 — Aug 2025",
    title: "Hatio SEA Sdn. Bhd.",
    role: "Support Engineer (Intern)",
    detail:
      "Developing and maintaining the companys Warehouse Management System (WMS) and resolving complex system issues for clients. Utilized DBeaver, PostgreSQL, and SQL queries to manage data structures including updates, insertions, and deletions for internal software. Designed and implemented a scalable automation workflow using n8n and OpenAI Assistants API, reducing manual response time for support inquiries by 40%g web applications. Collaborating with cross-functional teams to deliver quality products.",
  },
  {
    year: "Oct 2021 — Feb 2022",
    title: "Jack-In Pile (M) Sdn. Bhd.",
    role: "Site Engineer & Site Supervisor (Intern)",
    detail:
      "Supported high-level project management and supervision of 2 large-scale piling projects in Puchong and Kajang. Ensured piling work was completed according to project schedule, maintaining operational excellence and resource efficiency. Managed daily resources and materials to ensure sufficient capacity for completing piling and RC wall work.",
  },
];

export default function Experience() {
  return (
    <div className="timeline">
      {items.map((item, i) => (
        <div key={i} className="timeline-item">
          <span className="timeline-item__year">{item.year}</span>
          <div className="timeline-item__body">
            <p className="timeline-item__title">{item.title}</p>
            <p className="timeline-item__sub">{item.role}</p>
            <p className="timeline-item__detail">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
