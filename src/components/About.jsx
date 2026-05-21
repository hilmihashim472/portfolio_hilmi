import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";

function SectionHeading({ label }) {
  return (
    <>
      <h2 className="px-heading">{label}</h2>
      <div className="px-heading-bar" />
    </>
  );
}

export default function About() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <main className="px-page">
      <div className="px-section">
        <section id="about">
          <SectionHeading label="ABOUT ME" />
          <p className="about-bio">
            Hi, I'm Hilmi — an Information Technology graduate from Universiti
            Teknologi MARA with a Bachelor of Information Technology (Hons.) and
            hands-on experience in full stack software development, system
            integration, and automation. Skilled in JavaScript, Python, C#, C++,
            Java, PHP, and SQL with a strong foundation in data structures and
            UI/UX design.
          </p>
        </section>

        <hr className="px-divider" />

        <section id="experience">
          <SectionHeading label="EXPERIENCE" />
          <Experience />
        </section>

        <hr className="px-divider" />

        <section id="education">
          <SectionHeading label="EDUCATION" />
          <Education />
        </section>

        <hr className="px-divider" />

        <section id="skills">
          <SectionHeading label="SKILLS" />
          <Skills />
        </section>
      </div>
    </main>
  );
}
