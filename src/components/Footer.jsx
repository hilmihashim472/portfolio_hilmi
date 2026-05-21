import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const footerLinks = [
  { label: "HOME",         to: "/home" },
  { label: "ABOUT",        to: "/about" },
  { label: "PROJECTS",     to: "/projects" },
  { label: "ACHIEVEMENTS", to: "/achievements" },
  { label: "CONTACT",      to: "/contact" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <img src={logo} alt="Hilmi logo" className="footer__logo" />
            <span className="footer__brand-name navbar__brand-name">
              <span>Hilmi </span>
              <span>Hashim</span>
            </span>
          </div>

          <ul className="footer__links">
            {footerLinks.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className="footer__link">
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__bottom">
          © 2026 HILMI HASHIM — ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  );
}
