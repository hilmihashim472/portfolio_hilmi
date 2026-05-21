import { useEffect } from 'react';
import character from '../assets/logo.png';

const CONFIG = {
  about:        { emoji: '👤', title: 'ABOUT ME',      accent: '#ffd700', accentDark: '#886e00' },
  projects:     { emoji: '💼', title: 'PROJECTS',       accent: '#4a9eff', accentDark: '#1a4a88' },
  achievements: { emoji: '🏆', title: 'ACHIEVEMENTS',   accent: '#ff8c42', accentDark: '#7a3a10' },
  contact:      { emoji: '✉️', title: 'CONTACT',        accent: '#00e676', accentDark: '#007a3a' },
};

// ── Section content ─────────────────────────────────────────

function AboutContent() {
  const skills = [
    { name: 'HTML',       pct: 95, color: '#ff6b35' },
    { name: 'CSS',        pct: 90, color: '#4a9eff' },
    { name: 'JavaScript', pct: 85, color: '#ffd700' },
    { name: 'React',      pct: 80, color: '#61dafb' },
    { name: 'Tailwind',   pct: 85, color: '#38bdf8' },
    { name: 'Git',        pct: 75, color: '#f05032' },
  ];
  return (
    <div className="gm-content">
      <div className="gm-about-header">
        <img src={character} alt="Hilmi" className="gm-avatar" />
        <div>
          <p className="gm-name">HILMI HASHIM</p>
          <p className="gm-role">▸ WEB DEVELOPER</p>
          <p className="gm-bio">
            Hi! I'm Hilmi — a web developer who loves building clean, interactive experiences.
            I turn ideas into reality through code, and I'm always growing as a developer.
          </p>
        </div>
      </div>
      <h3 className="gm-subheading">SKILLS</h3>
      <div className="gm-skills">
        {skills.map(s => (
          <div key={s.name} className="gm-skill-row">
            <span className="gm-skill-name">{s.name}</span>
            <div className="gm-skill-track">
              <div className="gm-skill-fill" style={{ width: `${s.pct}%`, background: s.color }} />
            </div>
            <span className="gm-skill-pct">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsContent() {
  const projects = [
    {
      emoji: '🌐', title: 'Portfolio Website',
      desc: 'Personal portfolio built with React and Tailwind CSS, featuring a pixel art theme and interactive RPG world.',
      tags: ['React', 'Tailwind', 'Vite', 'Phaser'],
      link: '#',
    },
    {
      emoji: '🛒', title: 'E-Commerce App',
      desc: 'Full-stack shopping application with product listings, cart, and checkout flow.',
      tags: ['React', 'Node.js', 'MongoDB'],
      link: '#',
    },
    {
      emoji: '📋', title: 'Task Manager',
      desc: 'Productivity app for managing daily tasks with drag-and-drop board support.',
      tags: ['React', 'Firebase'],
      link: '#',
    },
  ];
  return (
    <div className="gm-content">
      {projects.map((p, i) => (
        <div key={i} className="gm-project-card">
          <div className="gm-project-icon">{p.emoji}</div>
          <div className="gm-project-body">
            <p className="gm-project-title">{p.title}</p>
            <p className="gm-project-desc">{p.desc}</p>
            <div className="gm-project-tags">
              {p.tags.map(t => <span key={t} className="gm-tag">{t}</span>)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AchievementsContent() {
  const items = [
    { icon: '🏆', title: "Dean's List",           meta: '2023 — University',          desc: 'Awarded for academic excellence with GPA above 3.7 for two consecutive semesters.' },
    { icon: '🥇', title: 'Hackathon Winner',       meta: '2023 — Tech Hack KL',        desc: 'First place out of 40+ teams. Built a real-time collaboration tool in 24 hours.' },
    { icon: '📜', title: 'AWS Cloud Practitioner', meta: '2024 — Amazon Web Services', desc: 'Certified in foundational AWS cloud concepts, services, and best practices.' },
    { icon: '🌟', title: 'Open Source Contributor',meta: '2024 — GitHub',              desc: 'Contributed bug fixes and features to multiple open source React projects.' },
  ];
  return (
    <div className="gm-content">
      {items.map((a, i) => (
        <div key={i} className="gm-achievement">
          <span className="gm-achievement-icon">{a.icon}</span>
          <div>
            <p className="gm-achievement-title">{a.title}</p>
            <p className="gm-achievement-meta">{a.meta}</p>
            <p className="gm-achievement-desc">{a.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactContent() {
  const socials = [
    { icon: '🐙', label: 'GitHub',   sub: 'github.com/alexdragon14',    href: 'https://github.com/alexdragon14' },
    { icon: '💼', label: 'LinkedIn', sub: 'linkedin.com/in/hilmihashim', href: '#' },
    { icon: '✉️', label: 'Email',    sub: 'hilmihashim472@gmail.com',    href: 'mailto:hilmihashim472@gmail.com' },
  ];
  return (
    <div className="gm-content">
      <p className="gm-contact-text">
        Have a project in mind or just want to say hi? Feel free to reach out —
        I'm always open to new opportunities and collaborations.
      </p>
      <div className="gm-socials">
        {socials.map(s => (
          <a key={s.label} href={s.href} className="gm-social" target="_blank" rel="noopener noreferrer">
            <span className="gm-social-icon">{s.icon}</span>
            <div>
              <p className="gm-social-label">{s.label}</p>
              <p className="gm-social-sub">{s.sub}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

const CONTENT = {
  about:        <AboutContent />,
  projects:     <ProjectsContent />,
  achievements: <AchievementsContent />,
  contact:      <ContactContent />,
};

// ── Modal ────────────────────────────────────────────────────

export default function GameModal({ page, onClose }) {
  const cfg = CONFIG[page];

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="gm-backdrop" onClick={onClose}>
      <div
        className="gm-window"
        style={{ '--gm-accent': cfg.accent, '--gm-accent-dark': cfg.accentDark }}
        onClick={e => e.stopPropagation()}
      >
        <div className="gm-titlebar">
          <span className="gm-titlebar-label">{cfg.emoji}&nbsp;&nbsp;{cfg.title}</span>
          <button className="gm-close" onClick={onClose}>✕</button>
        </div>
        <div className="gm-body">
          {CONTENT[page]}
        </div>
      </div>
    </div>
  );
}
