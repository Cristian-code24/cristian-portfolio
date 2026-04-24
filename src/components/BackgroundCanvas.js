import React, { useRef, useEffect } from 'react';

export default function ParticleGrid() {
  const cvs = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const c = cvs.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let raf;
    let W, H;
    const COLS = 30;
    const ROWS = 20;
    const RADIUS = 120;
    const points = [];

    function resize() {
      W = c.width = window.innerWidth;
      H = c.height = window.innerHeight;
      points.length = 0;
      const gapX = W / COLS;
      const gapY = H / ROWS;
      for (let r = 0; r < ROWS; r++) {
        for (let col = 0; col < COLS; col++) {
          points.push({
            ox: gapX * col + gapX / 2,
            oy: gapY * r + gapY / 2,
            x: gapX * col + gapX / 2,
            y: gapY * r + gapY / 2,
          });
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const dx = mx - p.ox;
        const dy = my - p.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < RADIUS) {
          const force = (RADIUS - dist) / RADIUS;
          p.x = p.ox - dx * force * 0.4;
          p.y = p.oy - dy * force * 0.4;
        } else {
          p.x += (p.ox - p.x) * 0.08;
          p.y += (p.oy - p.y) * 0.08;
        }

        const alpha = dist < RADIUS ? 0.15 + (1 - dist / RADIUS) * 0.5 : 0.08;
        const size = dist < RADIUS ? 1.5 + (1 - dist / RADIUS) * 2 : 1.2;

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${alpha})`;
        ctx.fill();
      }

      // Draw connection lines
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 60) {
            const la = 0.04 * (1 - d / 60);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${la})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    }

    function onMove(e) {
      const rect = c.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    }
    function onLeave() {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <canvas ref={cvs} className="pg" />
      <div className="pg-orbs">
        <div className="pg-orb pg-orb-a"></div>
        <div className="pg-orb pg-orb-b"></div>
        <div className="pg-orb pg-orb-c"></div>
      </div>
      <style>{`
        .pg {
          position: fixed; inset: 0; z-index: 0;
          pointer-events: none; background: #050505;
        }
        .pg-orbs { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
        .pg-orb {
          position: absolute; border-radius: 50%; filter: blur(140px);
          animation: drift 25s infinite ease-in-out; will-change: transform;
        }
        .pg-orb-a { width: 600px; height: 600px; background: radial-gradient(circle,rgba(0,229,255,.18),transparent 70%); top: -15%; left: -8%; }
        .pg-orb-b { width: 650px; height: 650px; background: radial-gradient(circle,rgba(168,85,247,.14),transparent 70%); bottom: -20%; right: -8%; animation-delay: -8s; }
        .pg-orb-c { width: 450px; height: 450px; background: radial-gradient(circle,rgba(16,185,129,.10),transparent 70%); top: 50%; left: 45%; animation-delay: -16s; }
        @keyframes drift {
          0%,100% { transform: translate(0,0) scale(1); }
          25% { transform: translate(50px,-40px) scale(1.05); }
          50% { transform: translate(-35px,50px) scale(.95); }
          75% { transform: translate(40px,25px) scale(1.04); }
        }
      `}</style>
    </>
  );
}