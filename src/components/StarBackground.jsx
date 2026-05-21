import { useEffect, useRef } from "react";

function makeStar(w, h) {
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.12 + Math.random() * 0.35;
  return {
    x:            Math.random() * w,
    y:            Math.random() * h,
    size:         Math.random() < 0.6 ? 1 : Math.random() < 0.85 ? 2 : 3,
    vx:           Math.cos(angle) * speed,
    vy:           Math.sin(angle) * speed,
    baseOpacity:  0.25 + Math.random() * 0.65,
    twinkleSpeed: 0.007 + Math.random() * 0.022,
    phase:        Math.random() * Math.PI * 2,
  };
}

export default function StarBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 90 }, () =>
      makeStar(canvas.width, canvas.height)
    );

    let raf;
    let tick = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick++;

      stars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;

        if (s.x < -4)                  s.x = canvas.width  + 4;
        if (s.x > canvas.width  + 4)   s.x = -4;
        if (s.y < -4)                  s.y = canvas.height + 4;
        if (s.y > canvas.height + 4)   s.y = -4;

        const alpha =
          s.baseOpacity *
          (0.25 + 0.75 * Math.abs(Math.sin(tick * s.twinkleSpeed + s.phase)));

        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.fillRect(Math.round(s.x), Math.round(s.y), s.size, s.size);
      });

      raf = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="star-bg-canvas" />;
}
