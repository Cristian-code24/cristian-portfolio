import React, { useState, useEffect, useRef } from 'react';

const LINES = [
  { delay: 300,  text: '> booting crislinux v3.7.1 ...' },
  { delay: 600,  text: '[  OK  ] Loading kernel modules' },
  { delay: 400,  text: '[  OK  ] Mounting filesystems' },
  { delay: 500,  text: '[  OK  ] Starting network manager' },
  { delay: 350,  text: '[  OK  ] Initializing firewall rules' },
  { delay: 450,  text: '[  OK  ] Loading pentesting toolkit' },
  { delay: 300,  text: '[  OK  ] Starting security daemon' },
  { delay: 600,  text: '> system ready.' },
  { delay: 400,  text: '> welcome, cristian.' },
  { delay: 500,  text: '> launching portfolio...' },
];

export default function LoadingScreen({ onFinish }) {
  const [lines, setLines] = useState([]);
  const [done, setDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    function addLine() {
      if (idx.current >= LINES.length) {
        setTimeout(() => setFadeOut(true), 400);
        setTimeout(() => { setDone(true); onFinish(); }, 1200);
        return;
      }
      const line = LINES[idx.current];
      setLines(prev => [...prev, line.text]);
      idx.current++;
      setTimeout(addLine, line.delay);
    }
    const t = setTimeout(addLine, 500);
    return () => clearTimeout(t);
  }, [onFinish]);

  if (done) return null;

  return (
    <div className={`ls ${fadeOut ? 'ls--out' : ''}`}>
      <div className="ls__inner">
        <div className="ls__header">
          <span className="ls__dot ls__dot--r"></span>
          <span className="ls__dot ls__dot--y"></span>
          <span className="ls__dot ls__dot--g"></span>
          <span className="ls__title">crislinux — terminal</span>
        </div>
        <div className="ls__body">
          {lines.map((l, i) => (
            <div key={i} className="ls__line">
              <span className={l.startsWith('>') ? 'ls__cmd' : l.includes('OK') ? 'ls__ok' : ''}>
                {l}
              </span>
            </div>
          ))}
          <span className="ls__cursor">█</span>
        </div>
      </div>

      <style>{`
        .ls {
          position: fixed; inset: 0; z-index: 9999;
          background: #000; display: flex; align-items: center; justify-content: center;
          transition: opacity .8s ease; opacity: 1;
        }
        .ls--out { opacity: 0; pointer-events: none; }
        .ls__inner {
          width: 90%; max-width: 600px;
          background: #0a0a0f; border: 1px solid rgba(0,229,255,.15);
          border-radius: 14px; overflow: hidden;
          box-shadow: 0 0 60px rgba(0,229,255,.08);
        }
        .ls__header {
          display: flex; align-items: center; gap: 8px;
          padding: 12px 16px; background: rgba(255,255,255,.03);
          border-bottom: 1px solid rgba(255,255,255,.06);
        }
        .ls__dot { width: 10px; height: 10px; border-radius: 50%; }
        .ls__dot--r { background: #ef4444; }
        .ls__dot--y { background: #f59e0b; }
        .ls__dot--g { background: #10b981; }
        .ls__title { margin-left: 8px; font-family: var(--mono); font-size: .72rem; color: #555; }
        .ls__body {
          padding: 20px; font-family: var(--mono); font-size: .82rem;
          min-height: 280px; line-height: 1.9;
        }
        .ls__line { animation: lineIn .3s ease forwards; opacity: 0; }
        .ls__cmd { color: #00e5ff; }
        .ls__ok { color: #10b981; }
        .ls__line span:not(.ls__cmd):not(.ls__ok) { color: #888; }
        .ls__cursor { color: #00e5ff; animation: blink 1s step-end infinite; }
        @keyframes lineIn { to { opacity: 1; } }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}
