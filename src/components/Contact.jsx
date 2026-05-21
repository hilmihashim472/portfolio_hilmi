import { useState } from "react";

const socials = [
  { icon: "🐙", label: "GitHub", href: "https://github.com/hilmihashim472" },
  {
    icon: "💼",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hilmi-hashim14/",
  },
  { icon: "✉️", label: "Email", href: "mailto:hilmihashim472@gmail.com" },
];

function SectionHeading({ label }) {
  return (
    <>
      <h2 className="px-heading">{label}</h2>
      <div className="px-heading-bar" />
    </>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (wire up your backend here)");
  };

  return (
    <main className="px-page">
      <div className="px-section">
        <SectionHeading label="CONTACT" />
        <div className="contact-layout">
          <div>
            <p className="contact-info__text">
              Have a project in mind or just want to say hi? Feel free to reach
              out — I'm always open to new opportunities and collaborations.
            </p>
            <div className="contact-socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social"
                >
                  <span className="contact-social__icon">{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <form className="px-form" onSubmit={handleSubmit}>
            <div className="px-form__group">
              <label className="px-form__label">NAME</label>
              <input
                className="px-form__input"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>
            <div className="px-form__group">
              <label className="px-form__label">EMAIL</label>
              <input
                className="px-form__input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="px-form__group">
              <label className="px-form__label">MESSAGE</label>
              <textarea
                className="px-form__textarea"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What's on your mind?"
                required
              />
            </div>
            <button type="submit" className="px-btn px-btn--primary">
              SEND MESSAGE ▸
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
