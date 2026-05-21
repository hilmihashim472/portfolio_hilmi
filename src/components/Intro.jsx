import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import character from "../assets/logo.png";

function PixelCard({ title, subtitle, icon, features, accentColor, shadowColor, onClick }) {
  return (
    <button
      className="pixel-card"
      style={{ "--accent": accentColor, "--shadow": shadowColor }}
      onClick={onClick}
    >
      <div className="pixel-card__icon">{icon}</div>
      <h2 className="pixel-card__title">{title}</h2>
      <p className="pixel-card__subtitle">{subtitle}</p>
      <div className="pixel-card__divider">
        {features.map((f, i) => (
          <p key={i} className="pixel-card__feature">▸ {f}</p>
        ))}
      </div>
      <div className="pixel-card__enter">[ ENTER ]</div>
    </button>
  );
}

export default function Intro() {
  const location = useLocation();
  const navigate = useNavigate();
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const interval = setInterval(() => setBlink((b) => !b), 520);
    return () => clearInterval(interval);
  }, [location]);

  return (
    <div className="intro-page">
      <div className="intro-scanlines" />


      <div className="intro-content">
        <p className="intro-eyebrow">★ ★ ★ PORTFOLIO ★ ★ ★</p>
        <div className="intro-title-row">
          <img src={character} alt="Hilmi pixel character" className="intro-character" />
          <div>
            <h1 className="intro-title">HILMI HASHIM</h1>
            <p className="intro-subtitle">— WEB DEVELOPER —</p>
          </div>
        </div>

        <p className="intro-prompt">
          {blink ? "▶  SELECT YOUR EXPERIENCE  ◀" : "    SELECT YOUR EXPERIENCE    "}
        </p>

        <div className="intro-cards">
          <PixelCard
            title="PROFESSIONAL"
            subtitle="WEBSITE"
            icon="💼"
            features={["Clean & Elegant UI", "Business Focused", "Minimal Aesthetic"]}
            accentColor="#4a9eff"
            shadowColor="#1a4a88"
            onClick={() => navigate("/home")}
          />
          <PixelCard
            title="INTERACTIVE"
            subtitle="WEBSITE"
            icon="🎮"
            features={["Fun & Dynamic", "Game-Style UX", "Immersive Experience"]}
            accentColor="#ff4a9e"
            shadowColor="#881a4a"
            onClick={() => navigate("/interactive")}
          />
        </div>

        <p className="intro-footer">CLICK TO SELECT  •  HOVER TO PREVIEW</p>
      </div>
    </div>
  );
}
