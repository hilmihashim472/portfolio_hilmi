import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function ModeToggle() {
  const location = useLocation();
  const navigate = useNavigate();
  const isRPG = location.pathname === "/interactive";

  return (
    <div className="navbar__mode-toggle">
      <button
        className={"navbar__mode-btn" + (!isRPG ? " navbar__mode-btn--active" : "")}
        onClick={() => navigate("/home")}
        title="Professional Website"
      >
        💼 PRO
      </button>
      <button
        className={"navbar__mode-btn" + (isRPG ? " navbar__mode-btn--active" : "")}
        onClick={() => navigate("/interactive")}
        title="Interactive Website"
      >
        🎮 RPG
      </button>
    </div>
  );
}

const navLinks = [
  { label: "HOME",         to: "/home" },
  { label: "ABOUT",        to: "/about" },
  { label: "PROJECTS",     to: "/projects" },
  { label: "ACHIEVEMENTS", to: "/achievements" },
  { label: "CONTACT",      to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isInteractive = location.pathname === "/interactive";

  return (
    <>
      <nav className="navbar">
        <div className="navbar__inner">
          <NavLink to="/home" className="navbar__brand">
            <img src={logo} alt="Hilmi logo" className="navbar__logo" />
            <span className="navbar__brand-name">
              <span>Hilmi </span>
              <span>Hashim</span>
            </span>
          </NavLink>

          {!isInteractive && (
            <ul className="navbar__links">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      "navbar__link" + (isActive ? " navbar__link--active" : "")
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}

          <ModeToggle />

          {!isInteractive && (
            <button
              className="navbar__hamburger"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          )}
        </div>
      </nav>

      {!isInteractive && open && (
        <div className="navbar__drawer">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                "navbar__drawer-link" + (isActive ? " navbar__drawer-link--active" : "")
              }
            >
              ▸ {l.label}
            </NavLink>
          ))}
          <div className="navbar__drawer-divider" />
          <ModeToggle />
        </div>
      )}
    </>
  );
}
