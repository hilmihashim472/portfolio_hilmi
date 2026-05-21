import { useNavigate } from "react-router-dom";

export default function InteractivePage() {
  const navigate = useNavigate();

  return (
    <div className="intro-page" style={{ top: "var(--nav-h)" }}>
      <div className="intro-scanlines" />
      <div className="intro-content">
        <p className="intro-eyebrow">★ ★ ★ INTERACTIVE MODE ★ ★ ★</p>
        <h1 className="intro-title">WORK IN PROGRESS</h1>
        <p className="intro-subtitle">— COMING SOON —</p>
        <p
          style={{
            color: "#00e676",
            fontSize: "0.9rem",
            letterSpacing: "0.1em",
            margin: "1.5rem 0",
            textAlign: "center",
          }}
        >
          The interactive RPG experience is currently under construction.
          <br />
          Check back soon!
        </p>
        <button
          className="px-btn px-btn--outline"
          onClick={() => navigate("/")}
          style={{ marginTop: "1rem" }}
        >
          ◀ BACK TO MENU
        </button>
        <button
          className="px-btn px-btn--outline"
          onClick={() => navigate("/home")}
          style={{ marginTop: "1rem" }}
        >
          GO TO PROFESSIONAL WEBSITE ▶
        </button>
      </div>
    </div>
  );
}

/*

//PHASER.JS INTERACTIVE PAGE (IN PROGRESS)

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Phaser from 'phaser';
import MainScene from '../game/MainScene';
import GameModal from './GameModal';
import logoSrc from '../assets/logo.png';

export default function InteractivePage() {
  const containerRef = useRef(null);
  const gameRef      = useRef(null);
  const navigate     = useNavigate();
  const [modal, setModal] = useState(null); // null | 'about' | 'projects' | 'achievements' | 'contact'

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return;

    const config = {
      type: Phaser.AUTO,
      parent: containerRef.current,
      width:  containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      backgroundColor: '#0f0f1a',
      physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false },
      },
      scene: [MainScene],
      callbacks: {
        preBoot: (game) => {
          game.registry.set('navigate',  navigate);
          game.registry.set('logoSrc',   logoSrc);
          game.registry.set('openModal', (id) => setModal(id));
          game.registry.set('modalOpen', false);
        },
      },
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, [navigate]);

  // Keep Phaser registry in sync so it can freeze the player
  useEffect(() => {
    gameRef.current?.registry.set('modalOpen', modal !== null);
  }, [modal]);

  const closeModal = () => setModal(null);

  return (
    <div style={{ position: 'fixed', top: 'var(--nav-h)', left: 0, right: 0, bottom: 0, zIndex: 50, background: '#0f0f1a' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      {modal && <GameModal page={modal} onClose={closeModal} />}
    </div>
  );
}
*/

/*

//GODOT INTERACTIVE PAGE (IN PROGRESS)

export default function InteractivePage() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999 }}>
      <iframe
        src="/portfolio_hilmi/game/index.html"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Interactive RPG"
        allow="autoplay"
      />
    </div>
  );
}
*/
