import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('inicio');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = ['inicio','about','projects','tools','contact'];
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 160) { setActive(ids[i]); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (e, id) => { e.preventDefault(); setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  const links = [
    { id: 'inicio', l: 'Inicio' }, { id: 'about', l: 'Sobre Mí' },
    { id: 'projects', l: 'Proyectos' }, { id: 'tools', l: 'Herramientas' },
    { id: 'contact', l: 'Contacto' },
  ];

  return (
    <>
      <nav className={`n ${scrolled ? 'n--s' : ''}`}>
        <div className="n__in">
          <a href="#inicio" onClick={e => go(e,'inicio')} className="n__logo">
            <span className="n__hex">⬡</span> Cristian<span className="n__dot">.dev</span>
          </a>
          <ul className="n__links">
            {links.map(l => (
              <li key={l.id}><a href={`#${l.id}`} className={`n__a ${active===l.id?'n__a--on':''}`} onClick={e=>go(e,l.id)}>{l.l}</a></li>
            ))}
          </ul>
          <a href="#contact" className="n__cta" onClick={e=>go(e,'contact')}>Contrátame</a>
          <button className="n__burger" onClick={()=>setOpen(!open)} aria-label="Menu">
            <span className={`n__bar ${open?'o':''}`}/><span className={`n__bar ${open?'o':''}`}/><span className={`n__bar ${open?'o':''}`}/>
          </button>
        </div>
      </nav>
      {open && <div className="n__ov" onClick={()=>setOpen(false)}/>}
      <div className={`n__mob ${open?'n__mob--on':''}`}>
        <ul>{links.map(l=>(
          <li key={l.id}><a href={`#${l.id}`} className={active===l.id?'n__ma--on':''} onClick={e=>go(e,l.id)}>{l.l}</a></li>
        ))}</ul>
      </div>

      <style>{`
        .n{position:fixed;top:0;left:0;width:100%;height:68px;z-index:1000;display:flex;align-items:center;justify-content:center;transition:all .4s var(--ease)}
        .n--s{background:rgba(5,5,5,.8);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-bottom:1px solid rgba(255,255,255,.04);box-shadow:0 4px 30px rgba(0,0,0,.5)}
        .n__in{width:100%;max-width:1200px;padding:0 24px;display:flex;justify-content:space-between;align-items:center}
        .n__logo{display:flex;align-items:center;gap:6px;font-size:1.15rem;font-weight:700;color:#fff}
        .n__hex{color:var(--cyan);font-size:1.2rem}
        .n__dot{color:var(--cyan);font-weight:400}
        .n__links{display:flex;gap:26px;list-style:none;align-items:center}
        .n__a{color:var(--t3);font-size:.84rem;font-weight:500;position:relative;padding:4px 0;transition:color .3s}
        .n__a:hover,.n__a--on{color:#fff}
        .n__a::after{content:'';position:absolute;bottom:-3px;left:50%;transform:translateX(-50%);width:0;height:2px;background:linear-gradient(90deg,var(--cyan),var(--purple));border-radius:1px;transition:width .3s var(--ease)}
        .n__a:hover::after,.n__a--on::after{width:100%}
        .n__cta{padding:7px 20px;border-radius:8px;font-size:.82rem;font-weight:600;color:#000;background:linear-gradient(135deg,var(--cyan),var(--emerald));transition:all .3s var(--ease);box-shadow:0 2px 12px rgba(0,229,255,.12)}
        .n__cta:hover{transform:translateY(-2px);box-shadow:0 6px 25px rgba(0,229,255,.25)}
        .n__burger{display:none;flex-direction:column;gap:5px;padding:6px;z-index:1001}
        .n__bar{width:22px;height:2px;background:#fff;border-radius:2px;transition:all .35s var(--ease)}
        .n__bar.o:nth-child(1){transform:translateY(7px) rotate(45deg);background:var(--cyan)}
        .n__bar.o:nth-child(2){opacity:0;transform:scaleX(0)}
        .n__bar.o:nth-child(3){transform:translateY(-7px) rotate(-45deg);background:var(--cyan)}
        .n__ov{position:fixed;inset:0;z-index:998;background:rgba(0,0,0,.6);animation:fi .3s}
        .n__mob{position:fixed;top:0;right:-100%;width:260px;height:100vh;z-index:999;background:rgba(5,5,8,.97);backdrop-filter:blur(30px);border-left:1px solid rgba(255,255,255,.05);display:flex;align-items:center;justify-content:center;transition:right .45s var(--ease)}
        .n__mob--on{right:0}
        .n__mob ul{display:flex;flex-direction:column;gap:30px;text-align:center}
        .n__mob a{color:var(--t2);font-size:1.2rem;font-weight:600;transition:all .3s}
        .n__mob a:hover,.n__ma--on{color:var(--cyan)!important;text-shadow:0 0 15px var(--cyan-g)}
        @keyframes fi{from{opacity:0}to{opacity:1}}
        @media(max-width:768px){.n__links,.n__cta{display:none}.n__burger{display:flex}}
      `}</style>
    </>
  );
}