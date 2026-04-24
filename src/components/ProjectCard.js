import React, { useState } from 'react';

const projects = [
  {
    title: 'NEX-PULSE Agent', emoji: '⚡', accent: '#00e5ff',
    desc: 'Sistema avanzado de monitoreo y seguridad de redes en tiempo real. Detecta intrusiones, analiza tráfico y genera alertas automáticas para equipos SOC.',
    tags: ['Next.js', 'WebSockets', 'Node.js', 'Chart.js'],
    gradient: 'linear-gradient(135deg,#0a2e38,#0d1117)',
    github: 'https://github.com/Cristian-code24', demo: '#',
  },
  {
    title: 'Crislinux', emoji: '🐧', accent: '#a855f7',
    desc: 'Distribución Linux personalizada basada en Debian, enfocada en ciberseguridad y pentesting. +50 herramientas preconfiguradas para auditoría.',
    tags: ['Debian', 'Bash', 'Python', 'Kali Tools'],
    gradient: 'linear-gradient(135deg,#1a0a2e,#0d1117)',
    github: 'https://github.com/Cristian-code24', demo: '#',
  },
  {
    title: 'Defensa Activa', emoji: '🛡️', accent: '#10b981',
    desc: 'Framework de red teaming automatizado. Simula ataques con Nmap y Metasploit para encontrar vulnerabilidades antes que los atacantes reales.',
    tags: ['Python', 'Nmap', 'Metasploit', 'Docker'],
    gradient: 'linear-gradient(135deg,#0a2e1a,#0d1117)',
    github: 'https://github.com/Cristian-code24', demo: '#',
  },
  {
    title: 'CryptoVault', emoji: '🔐', accent: '#f59e0b',
    desc: 'Gestor de contraseñas cifrado con AES-256. Almacenamiento seguro local con exportación encriptada y generador robusto.',
    tags: ['Python', 'Crypto API', 'SQLite'],
    gradient: 'linear-gradient(135deg,#2e1a0a,#0d1117)',
    github: 'https://github.com/Cristian-code24', demo: '#',
  },
  {
    title: 'DataScope', emoji: '📊', accent: '#3b82f6',
    desc: 'Dashboard de análisis estadístico para datasets masivos. Visualizaciones interactivas, regresión y tests de hipótesis en tiempo real.',
    tags: ['Python', 'R', 'Chart.js', 'SQL'],
    gradient: 'linear-gradient(135deg,#0a1a2e,#0d1117)',
    github: 'https://github.com/Cristian-code24', demo: '#',
  },
  {
    title: 'NetScan Pro', emoji: '🔍', accent: '#ef4444',
    desc: 'Escáner de vulnerabilidades web automatizado. Detecta SQLi, XSS y misconfigs. Genera reportes con clasificación CVSS.',
    tags: ['Python', 'Selenium', 'Gobuster'],
    gradient: 'linear-gradient(135deg,#2e0a1a,#0d1117)',
    github: 'https://github.com/Cristian-code24', demo: '#',
  },
];

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="pj sec">
      <div className="sec-in">
        <span className="sec-label rv">Proyectos</span>
        <h2 className="sec-h rv rv-d1">Trabajo que habla<br/>por sí mismo</h2>
        <p className="sec-p rv rv-d2">Cada proyecto resuelve un problema real de seguridad, datos o rendimiento.</p>
        <div className="glow-line rv rv-d3"></div>

        <div className="pj__grid">
          {projects.map((p, i) => (
            <article
              key={p.title}
              className={`pj__card rv rv-d${(i%6)+1} ${selected === i ? 'pj__card--glow' : ''}`}
              style={{'--ac': p.accent}}
              onClick={() => setSelected(selected === i ? null : i)}
            >
              <div className="pj__preview" style={{background:p.gradient}}>
                <span className="pj__emoji">{p.emoji}</span>
                <div className="pj__glow-line"></div>
              </div>
              <div className="pj__body">
                <h3 className="pj__title">{p.title}</h3>
                <p className="pj__desc">{p.desc}</p>
                <div className="pj__tags">{p.tags.map(t=><span key={t} className="pj__tag">{t}</span>)}</div>
                <div className="pj__links">
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="pj__link" onClick={e=>e.stopPropagation()}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                    Code
                  </a>
                  <a href={p.demo} className="pj__link pj__link--ac" onClick={e=>e.stopPropagation()}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Demo
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .pj__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
        .pj__card{border-radius:18px;overflow:hidden;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.05);transition:all .45s var(--ease);display:flex;flex-direction:column;cursor:pointer;position:relative}
        .pj__card:hover{border-color:color-mix(in srgb,var(--ac) 40%,transparent);transform:translateY(-7px) scale(1.01);box-shadow:0 18px 50px rgba(0,0,0,.5),0 0 35px color-mix(in srgb,var(--ac) 8%,transparent)}

        /* GLOW SELECTION */
        .pj__card--glow{border-color:var(--ac)!important;box-shadow:0 0 25px color-mix(in srgb,var(--ac) 25%,transparent),0 0 60px color-mix(in srgb,var(--ac) 12%,transparent),inset 0 0 30px color-mix(in srgb,var(--ac) 5%,transparent)!important;transform:translateY(-7px) scale(1.02)!important}
        .pj__card--glow::before{content:'';position:absolute;inset:-1px;border-radius:18px;padding:1px;background:linear-gradient(135deg,var(--ac),transparent,var(--ac));-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;animation:glowRotate 3s linear infinite}
        @keyframes glowRotate{to{filter:hue-rotate(30deg)}}

        .pj__preview{height:140px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
        .pj__emoji{font-size:2.8rem;filter:drop-shadow(0 0 15px rgba(255,255,255,.08));transition:transform .4s cubic-bezier(.34,1.56,.64,1)}
        .pj__card:hover .pj__emoji{transform:scale(1.2) rotate(-5deg)}
        .pj__glow-line{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:50%;height:2px;background:linear-gradient(90deg,transparent,var(--ac),transparent);opacity:0;transition:opacity .4s}
        .pj__card:hover .pj__glow-line{opacity:1}
        .pj__body{padding:20px;flex:1;display:flex;flex-direction:column}
        .pj__title{font-size:1.1rem;font-weight:700;margin-bottom:8px}
        .pj__desc{font-size:.83rem;color:var(--t2);line-height:1.7;margin-bottom:14px;flex:1}
        .pj__tags{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:16px}
        .pj__tag{padding:3px 10px;border-radius:8px;font-size:.67rem;font-weight:600;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);color:var(--t3);transition:all .3s}
        .pj__card:hover .pj__tag{border-color:color-mix(in srgb,var(--ac) 22%,transparent);color:var(--t2)}
        .pj__links{display:flex;gap:8px;padding-top:14px;border-top:1px solid rgba(255,255,255,.04)}
        .pj__link{display:inline-flex;align-items:center;gap:5px;padding:6px 14px;border-radius:7px;font-size:.74rem;font-weight:600;color:var(--t3);border:1px solid rgba(255,255,255,.07);transition:all .3s}
        .pj__link:hover{color:#fff;border-color:rgba(255,255,255,.18);background:rgba(255,255,255,.04)}
        .pj__link--ac{color:var(--ac);border-color:color-mix(in srgb,var(--ac) 22%,transparent)}
        .pj__link--ac:hover{border-color:var(--ac);background:color-mix(in srgb,var(--ac) 8%,transparent);box-shadow:0 0 12px color-mix(in srgb,var(--ac) 12%,transparent)}
        @media(max-width:1024px){.pj__grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:640px){
          .pj__grid{grid-template-columns:1fr;gap:18px}
          .pj__card{animation:mobCardIn .5s var(--ease) both}
          .pj__card:nth-child(odd){animation-name:mobCardLeft}
          .pj__card:nth-child(even){animation-name:mobCardRight}
          .pj__card:nth-child(1){animation-delay:.05s}
          .pj__card:nth-child(2){animation-delay:.1s}
          .pj__card:nth-child(3){animation-delay:.15s}
          .pj__card:nth-child(4){animation-delay:.2s}
          .pj__card:nth-child(5){animation-delay:.25s}
          .pj__card:nth-child(6){animation-delay:.3s}
          .pj__card:active{transform:scale(.98)!important;transition:transform .15s}
          .pj__preview{height:120px}
          .pj__links{flex-wrap:wrap}
          .pj__link{flex:1;justify-content:center}
        }
        @keyframes mobCardLeft{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
        @keyframes mobCardRight{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
      `}</style>
    </section>
  );
}