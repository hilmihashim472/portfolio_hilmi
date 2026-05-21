const achievements = [
  {
    icon: "🏆",
    title: "Dean's List",
    meta: "2022 - 2025 — University",
    desc: "Awarded for academic excellence with a GPA above 3.5 for three semesters.",
  },
  /*{
    icon: "🥇",
    title: "Hackathon Winner",
    meta: "2023 — Tech Hack KL",
    desc: "First place out of 40+ teams. Built a real-time collaboration tool in 24 hours.",
  },
  {
    icon: "📜",
    title: "AWS Cloud Practitioner",
    meta: "2024 — Amazon Web Services",
    desc: "Certified in foundational AWS cloud concepts, services, and best practices.",
  },
  {
    icon: "🌟",
    title: "Open Source Contributor",
    meta: "2024 — GitHub",
    desc: "Contributed bug fixes and features to multiple open source React projects.",
  },*/
];

const certificates = [
  /*{
    title: "AWS Cloud Practitioner",
    meta: "2024 — Amazon Web Services",
    desc: "Certified in foundational AWS cloud concepts, services, and best practices.",
  },
  {
    title: "Google Data Analytics",
    meta: "2023 — Google",
    desc: "Completed a comprehensive program covering data analysis tools and techniques.",
  },*/
];

function SectionHeading({ label }) {
  return (
    <>
      <h2 className="px-heading">{label}</h2>
      <div className="px-heading-bar" />
    </>
  );
}

export default function Achievements() {
  return (
    <main className="px-page">
      <div className="px-section">
        <SectionHeading label="ACHIEVEMENTS" />
        <div className="achievements-list">
          {achievements.map((a, i) => (
            <div key={i} className="achievement-item">
              <div className="achievement-item__icon">{a.icon}</div>
              <div className="achievement-item__body">
                <p className="achievement-item__title">{a.title}</p>
                <p className="achievement-item__meta">{a.meta}</p>
                <p className="achievement-item__desc">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <hr className="px-divider" />
        <SectionHeading label="CERTIFICATES" />
        <div className="certificates-list">
          {certificates.map((c, i) => (
            <div key={i} className="certificate-item">
              <div className="certificate-item__body">
                <p className="certificate-item__title">{c.title}</p>
                <p className="certificate-item__meta">{c.meta}</p>
                <p className="certificate-item__desc">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
