import { NavLink } from "react-router-dom";
import character from "../assets/profilePhoto.webp";

export default function Home() {
  return (
    <main className="px-page">
      <div className="home-hero">
        <div className="home-hero__text">
          <p className="home-hero__greeting">▸ HELLO, WORLD!</p>
          <h1 className="home-hero__name">HILMI HASHIM</h1>
          <p className="home-hero__role">DEVELOPER</p>
          <p className="home-hero__desc">
            Information Technology graduate from Universiti Teknologi MARA with
            a Bachelor of Information Technology (Hons.) and hands-on experience
            in full stack software development, system integration, and
            automation. Skilled in JavaScript, Python, C#, C++, Java, PHP, and
            SQL with a strong foundation in data structures and UI/UX design.
          </p>
          <div className="home-hero__actions">
            <NavLink to="/projects" className="px-btn px-btn--primary">
              VIEW PROJECTS
            </NavLink>
            <NavLink to="/contact" className="px-btn px-btn--outline">
              CONTACT ME
            </NavLink>
          </div>
        </div>

        <div className="home-hero__image">
          <img
            src={character}
            alt="Hilmi pixel character"
            className="home-hero__character"
          />
        </div>
      </div>
    </main>
  );
}
