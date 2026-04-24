import React, { useState, useEffect, useRef } from 'react';

export default function Hero() {
  const [typed, setTyped] = useState('');
  const [done, setDone] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef(null);
  const full = 'Cybersecurity & Data Science';

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      if (i <= full.length) { setTyped(full.slice(0, i)); i++; }
      else { setDone(true); clearInterval(t); }
    }, 50);
    return () => clearInterval(t);
  }, []);

  /* Mouse tilt effect */
  const handleMouse = (e) => {
    const card = cardRef.current;
    if (!card || flipped) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg)`;
  };
  const handleLeave = () => {
    const card = cardRef.current;
    if (card && !flipped) card.style.transform = 'perspective(800px) rotateY(0) rotateX(0)';
  };

  const yr = new Date().getFullYear();
  const exp = yr - 2022;

  return (
    <section className="h">
      <div className="h__in">
        {/* Left text */}
        <div className="h__txt">
          <div className="h__badge"><span className="h__dot" />{' '}Disponible para proyectos</div>
          <h1 className="h__title">Cristian David<br/><span className="h__grad">Quispe Lucas</span></h1>
          <h2 className="h__role">{typed}<span className={`h__cur ${done?'bk':''}`}>|</span></h2>
          <p className="h__desc">Futuro Ingeniero Estadístico e Informático · Construyo software seguro, analizo datos masivos y audito redes.</p>
          <div className="h__btns">
            <a href="/cv.cristian-luacas.pdf" download className="h__btn h__btn--p">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download CV
            </a>
            <a href="#projects" className="h__btn h__btn--o" onClick={e=>{e.preventDefault();document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})}}>
              Ver Proyectos →
            </a>
          </div>
          <div className="h__stats">
            <div className="h__st"><span className="h__st-n">+{exp}</span><span className="h__st-l">Años Exp</span></div>
            <div className="h__st-d" />
            <div className="h__st"><span className="h__st-n">+20</span><span className="h__st-l">Proyectos</span></div>
            <div className="h__st-d" />
            <div className="h__st"><span className="h__st-n">{yr - 2006}</span><span className="h__st-l">Años</span></div>
          </div>
        </div>

        {/* Right: 3D Flip Card */}
        <div className="h__card-w">
          <div
            ref={cardRef}
            className={`h__flip ${flipped ? 'h__flip--on' : ''}`}
            onClick={() => setFlipped(!flipped)}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
          >
            {/* FRONT */}
            <div className="h__flip-face h__flip-front">
              <div className="h__f-glow" />
              <div className="h__f-body">
                <div className="h__f-photo"><img src="/fotos/mifoto.jpg" alt="Cristian"/><span className="h__f-live" /></div>
                <h3 className="h__f-name">Cristian D. Quispe Lucas</h3>
                <p className="h__f-sub">{typed}<span className={`h__cur ${done?'bk':''}`}>|</span></p>
                <div className="h__f-tags">
                  <span style={{'--tc':'var(--cyan)'}}>Pentester</span>
                  <span style={{'--tc':'var(--purple)'}}>Data Scientist</span>
                  <span style={{'--tc':'var(--emerald)'}}>Developer</span>
                </div>
                <div className="h__f-socials">
                  <a href="https://github.com/Cristian-code24" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg></a>
                  <a href="https://www.linkedin.com/in/cristian-quispe-lucas-3b5677389" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
                  <a href="https://www.facebook.com/share/18UCmXgji5/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                  <a href="https://www.tiktok.com/@cris_lucas19" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg></a>
                  <a href="mailto:cristianquispelucas@gmail.com" aria-label="Email"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></a>
                </div>
                <p className="h__f-hint">▸ Click para voltear</p>
              </div>
            </div>

            {/* BACK */}
            <div className="h__flip-face h__flip-back">
              <div className="h__f-glow" />
              <div className="h__f-body">
                <div className="h__b-header">
                  <span className="h__b-id">ID-{yr}</span>
                  <span className="h__b-on">● Online</span>
                </div>
                <h3 className="h__b-title">EDUCACIÓN & METAS</h3>
                <div className="h__b-divider" />
                <div className="h__b-row"><span>🎓</span><div><strong>UNJFSC</strong><br/><span className="h__b-sub">Ing. Estadística e Informática</span></div></div>
                <div className="h__b-row"><span>📍</span><div><strong>Huacho, Lima</strong><br/><span className="h__b-sub">Perú</span></div></div>
                <div className="h__b-row"><span>🎯</span><div><strong>Especialización</strong><br/><span className="h__b-sub">Ciberseguridad + Data Science</span></div></div>
                <div className="h__b-row"><span>🏎️</span><div><strong>Pasiones</strong><br/><span className="h__b-sub">F1 · AMD · Minimalismo</span></div></div>
                <div className="h__b-divider" />
                <div className="h__b-status">
                  <span className="h__b-dot" />
                  Disponible para proyectos
                </div>
                <p className="h__f-hint">▸ Click para volver</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .h{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:100px 24px 50px;position:relative;z-index:10}
        .h__in{display:flex;align-items:center;justify-content:space-between;max-width:1200px;width:100%;gap:50px}
        .h__txt{flex:1.2;animation:fu .9s var(--ease) forwards;opacity:0}
        @keyframes fu{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}

        .h__badge{display:inline-flex;align-items:center;gap:8px;padding:5px 14px;border-radius:20px;background:var(--emerald-d);border:1px solid rgba(16,185,129,.2);font-size:.74rem;font-weight:600;color:var(--emerald);margin-bottom:20px}
        .h__dot{width:7px;height:7px;border-radius:50%;background:var(--emerald);animation:pulse 2s infinite;box-shadow:0 0 8px rgba(16,185,129,.5)}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.4)}}

        .h__title{font-size:3.2rem;font-weight:900;line-height:1.08;letter-spacing:-.03em;margin-bottom:6px}
        .h__grad{background:linear-gradient(135deg,var(--cyan),var(--emerald));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .h__role{font-family:var(--mono);font-size:1.1rem;color:var(--t2);margin-bottom:18px;min-height:1.5em}
        .h__cur{color:var(--cyan);margin-left:1px}.h__cur.bk{animation:bk 1s step-end infinite}
        @keyframes bk{50%{opacity:0}}
        .h__desc{color:var(--t2);font-size:.98rem;line-height:1.8;max-width:480px;margin-bottom:28px}

        .h__btns{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:32px}
        .h__btn{display:inline-flex;align-items:center;gap:7px;padding:12px 24px;border-radius:10px;font-size:.88rem;font-weight:600;transition:all .35s var(--ease);position:relative;overflow:hidden}
        .h__btn--p{background:linear-gradient(135deg,var(--cyan),var(--emerald));color:#000;box-shadow:0 4px 18px rgba(0,229,255,.12)}
        .h__btn--p:hover{transform:translateY(-3px) scale(1.04);box-shadow:0 8px 30px rgba(0,229,255,.35)}
        .h__btn--p::after{content:'';position:absolute;inset:0;background:rgba(255,255,255,.15);opacity:0;transition:opacity .3s}
        .h__btn--p:hover::after{opacity:1;animation:neonPulse 1.5s infinite}
        @keyframes neonPulse{0%,100%{opacity:0}50%{opacity:.15}}
        .h__btn--o{color:var(--t1);border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03)}
        .h__btn--o:hover{border-color:rgba(255,255,255,.25);background:rgba(255,255,255,.06);transform:translateY(-3px) scale(1.02)}

        .h__stats{display:flex;align-items:center;gap:20px}
        .h__st{text-align:center}
        .h__st-n{display:block;font-size:1.5rem;font-weight:800;background:linear-gradient(135deg,var(--cyan),var(--purple));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .h__st-l{font-size:.7rem;color:var(--t3);text-transform:uppercase;letter-spacing:1px;font-weight:600}
        .h__st-d{width:1px;height:32px;background:rgba(255,255,255,.07)}

        /* ═══ 3D FLIP CARD ═══ */
        .h__card-w{flex:.75;display:flex;justify-content:center;perspective:1000px;animation:fu .9s .2s var(--ease) forwards;opacity:0}
        .h__flip{position:relative;width:300px;height:420px;cursor:pointer;transition:transform .6s cubic-bezier(.4,.2,.2,1);transform-style:preserve-3d}
        .h__flip--on{transform:perspective(800px) rotateY(180deg)!important}
        .h__flip-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:22px;padding:2px;background:linear-gradient(135deg,rgba(0,229,255,.35),rgba(168,85,247,.35),rgba(16,185,129,.35))}
        .h__flip-back{transform:rotateY(180deg)}
        .h__f-glow{position:absolute;inset:-30px;border-radius:50%;background:radial-gradient(circle,rgba(0,229,255,.07),transparent 60%);filter:blur(25px);pointer-events:none}
        .h__f-body{background:rgba(8,8,12,.93);backdrop-filter:blur(18px);border-radius:20px;padding:26px 20px;text-align:center;height:100%;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden}

        /* Front */
        .h__f-photo{position:relative;width:95px;height:95px;margin:0 auto 12px;border-radius:50%;padding:3px;background:linear-gradient(135deg,var(--cyan),var(--purple))}
        .h__f-photo img{width:100%;height:100%;border-radius:50%;object-fit:cover;border:3px solid #0a0a0c}
        .h__f-live{position:absolute;bottom:4px;right:4px;width:14px;height:14px;border-radius:50%;background:var(--emerald);border:3px solid #0a0a0c;animation:pulse 2s infinite}
        .h__f-name{font-size:1.1rem;font-weight:700;margin-bottom:3px}
        .h__f-sub{font-family:var(--mono);font-size:.78rem;color:var(--t2);margin-bottom:14px;min-height:1.2em}
        .h__f-tags{display:flex;justify-content:center;gap:6px;flex-wrap:wrap;margin-bottom:14px}
        .h__f-tags span{padding:3px 10px;border-radius:10px;font-size:.65rem;font-weight:700;color:var(--tc);background:color-mix(in srgb,var(--tc) 10%,transparent);border:1px solid color-mix(in srgb,var(--tc) 22%,transparent)}
        .h__f-socials{display:flex;justify-content:center;gap:8px;padding-top:14px;border-top:1px solid rgba(255,255,255,.05)}
        .h__f-socials a{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);color:var(--t3);transition:all .3s}
        .h__f-socials a:hover{color:var(--cyan);border-color:var(--b-cyan);background:var(--cyan-d);transform:translateY(-2px)}
        .h__f-hint{font-size:.65rem;color:var(--t3);margin-top:10px;font-family:var(--mono);opacity:.6}

        /* Back */
        .h__b-header{display:flex;justify-content:space-between;margin-bottom:14px}
        .h__b-id{font-family:var(--mono);font-size:.64rem;color:var(--t3);letter-spacing:2px}
        .h__b-on{font-size:.7rem;font-weight:600;color:var(--emerald)}
        .h__b-title{font-size:1rem;font-weight:800;letter-spacing:2px;color:var(--cyan);margin-bottom:8px;text-align:center}
        .h__b-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(0,229,255,.2),transparent);margin:12px 0}
        .h__b-row{display:flex;align-items:flex-start;gap:12px;margin-bottom:10px;text-align:left;font-size:.82rem}
        .h__b-row span:first-child{font-size:1.1rem;flex-shrink:0}
        .h__b-row strong{color:var(--t1);font-size:.82rem}
        .h__b-sub{font-size:.72rem;color:var(--t3)}
        .h__b-status{display:flex;align-items:center;justify-content:center;gap:8px;padding:10px;border-radius:10px;background:var(--emerald-d);border:1px solid rgba(16,185,129,.2);font-size:.76rem;font-weight:600;color:var(--emerald)}
        .h__b-dot{width:7px;height:7px;border-radius:50%;background:var(--emerald);animation:pulse 2s infinite}

        @media(max-width:960px){
          .h__in{flex-direction:column-reverse;text-align:center;gap:35px}
          .h__title{font-size:2.3rem}.h__desc{margin:0 auto 28px}
          .h__btns{justify-content:center}.h__stats{justify-content:center}
          .h__flip{width:260px;height:370px}
          .h__txt{animation:mobSlideUp .8s .3s var(--ease) both}
          .h__card-w{animation:mobScaleIn .7s var(--ease) both}
          .h__badge{animation:mobFadeRight .6s .5s var(--ease) both}
          .h__stats{animation:mobFadeUp .7s .7s var(--ease) both}
        }
        @media(max-width:480px){
          .h__title{font-size:1.8rem}.h__stats{gap:14px}.h__st-n{font-size:1.2rem}
          .h__flip{width:240px;height:350px;animation:mobFloat 4s ease-in-out infinite}
          .h__btns{flex-direction:column;width:100%}
          .h__btn{width:100%;justify-content:center}
        }
        @keyframes mobSlideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @keyframes mobScaleIn{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}
        @keyframes mobFadeRight{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
        @keyframes mobFadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes mobFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
      `}</style>
    </section>
  );
}