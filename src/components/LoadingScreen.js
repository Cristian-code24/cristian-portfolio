import React, { useState, useEffect } from 'react';

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('ESTABLECIENDO CONEXIÓN...');
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 15) + 5;
      if (p > 100) p = 100;
      setProgress(p);

      if (p > 20 && p < 50) setStatus('AUTENTICANDO CREDENCIALES...');
      else if (p >= 50 && p < 85) setStatus('CARGANDO MÓDULOS DE SEGURIDAD...');
      else if (p >= 85 && p < 100) setStatus('SISTEMA NEX-PULSE EN LÍNEA.');

      if (p === 100) {
        clearInterval(interval);
        setTimeout(() => setFadeOut(true), 500);
        setTimeout(() => onFinish(), 1300);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className={`ls ${fadeOut ? 'ls--out' : ''}`}>
      <div className="ls__center">
        {/* Pulsing Logo */}
        <div className="ls__logo-box">
          <svg className="ls__logo" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="var(--cyan)" strokeWidth="2" strokeDasharray="10 5" className="ls__spin" />
            <circle cx="50" cy="50" r="35" stroke="var(--purple)" strokeWidth="1.5" opacity="0.6" />
            <path d="M50 25 L75 65 L25 65 Z" stroke="var(--emerald)" strokeWidth="2" className="ls__pulse-path" />
            <circle cx="50" cy="55" r="5" fill="var(--cyan)" className="ls__pulse-core" />
          </svg>
          <div className="ls__glow"></div>
        </div>

        {/* Text & Bar */}
        <h2 className="ls__title">CRISTIAN LUCAS</h2>
        <div className="ls__subtitle">DATA & SECURITY ARCHITECT</div>
        
        <div className="ls__bar-wrap">
          <div className="ls__bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
        
        <div className="ls__status">
          <span>{status}</span>
          <span className="ls__pct">{progress}%</span>
        </div>
      </div>

      <style>{`
        .ls {
          position: fixed; inset: 0; z-index: 9999;
          background: #030305; display: flex; align-items: center; justify-content: center;
          transition: opacity .8s var(--ease), visibility .8s; opacity: 1; visibility: visible;
        }
        .ls--out { opacity: 0; visibility: hidden; pointer-events: none; }
        
        .ls__center {
          display: flex; flex-direction: column; align-items: center;
          width: 100%; max-width: 400px; padding: 0 24px;
        }

        .ls__logo-box { position: relative; width: 110px; height: 110px; margin-bottom: 30px; }
        .ls__logo { width: 100%; height: 100%; position: relative; z-index: 2; }
        .ls__glow {
          position: absolute; inset: 10px; border-radius: 50%;
          background: var(--cyan); filter: blur(35px); opacity: 0.3; z-index: 1;
          animation: pulseGlow 2s infinite alternate;
        }

        .ls__spin { transform-origin: center; animation: spin 8s linear infinite; }
        .ls__pulse-path { animation: draw 2s ease-in-out infinite alternate; }
        .ls__pulse-core { animation: pulseGlow 1s infinite alternate; }

        .ls__title {
          font-size: 1.4rem; font-weight: 800; letter-spacing: 4px;
          color: #fff; margin-bottom: 4px; text-align: center;
        }
        .ls__subtitle {
          font-family: var(--mono); font-size: .65rem; font-weight: 600;
          color: var(--cyan); letter-spacing: 3px; margin-bottom: 40px; text-align: center;
        }

        .ls__bar-wrap {
          width: 100%; height: 2px; background: rgba(255,255,255,.05);
          position: relative; overflow: hidden; margin-bottom: 12px;
        }
        .ls__bar-fill {
          position: absolute; left: 0; top: 0; height: 100%;
          background: linear-gradient(90deg, transparent, var(--cyan), var(--purple));
          box-shadow: 0 0 10px var(--cyan);
          transition: width .2s ease-out;
        }

        .ls__status {
          width: 100%; display: flex; justify-content: space-between;
          font-family: var(--mono); font-size: .6rem; color: var(--t3); letter-spacing: 1px;
        }
        .ls__pct { color: var(--cyan); font-weight: 700; }

        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes draw { 0% { stroke-dasharray: 0 200; } 100% { stroke-dasharray: 200 0; } }
        @keyframes pulseGlow { 0% { opacity: 0.3; transform: scale(0.95); } 100% { opacity: 0.8; transform: scale(1.05); } }
      `}</style>
    </div>
  );
}
