import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Navbar from '../components/navbar';
import Hero from '../components/Hero';
import Projects from '../components/ProjectCard';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';

const ParticleGrid = dynamic(() => import('../components/BackgroundCanvas'), { ssr: false });
const ClockWidget = dynamic(() => import('../components/ClockWidget'), { ssr: false });
const AudioPlayer = dynamic(() => import('../components/AudioPlayer'), { ssr: false });

const DI = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
const SI = 'https://cdn.simpleicons.org';

const tools = [
  { name: 'Python',      logo: `${DI}/python/python-original.svg`,         color: '#3776ab' },
  { name: 'React',       logo: `${DI}/react/react-original.svg`,           color: '#61dafb' },
  { name: 'Next.js',     logo: `${DI}/nextjs/nextjs-original.svg`,         color: '#ffffff' },
  { name: 'Kali Linux',  logo: `${SI}/kalilinux/557C94`,                   color: '#557c94' },
  { name: 'Nmap',        logo: '/icons/nmap.svg',                           color: '#00e5ff' },
  { name: 'Metasploit',  logo: `${SI}/metasploit/2596CD`,                  color: '#2596cd' },
  { name: 'Docker',      logo: `${DI}/docker/docker-original.svg`,         color: '#2496ed' },
  { name: 'MySQL',       logo: `${DI}/mysql/mysql-original.svg`,           color: '#4479a1' },
  { name: 'Git',         logo: `${DI}/git/git-original.svg`,               color: '#f05032' },
  { name: 'Wireshark',   logo: `${SI}/wireshark/1679A7`,                   color: '#1679a7' },
  { name: 'Linux',       logo: `${DI}/linux/linux-original.svg`,           color: '#fcc624' },
  { name: 'Bash',        logo: `${DI}/bash/bash-original.svg`,             color: '#4eaa25' },
  { name: 'Node.js',     logo: `${DI}/nodejs/nodejs-original.svg`,         color: '#68a063' },
  { name: 'R',           logo: `${DI}/r/r-original.svg`,                   color: '#276dc3' },
  { name: 'PostgreSQL',  logo: `${DI}/postgresql/postgresql-original.svg`, color: '#4169e1' },
  { name: 'VS Code',     logo: `${DI}/vscode/vscode-original.svg`,        color: '#007acc' },
];

const badges = [
  { label: 'Pentester', color: '#00e5ff' },
  { label: 'Data Scientist', color: '#a855f7' },
  { label: 'Developer', color: '#10b981' },
];

const passions = [
  { icon: '🏎️', label: 'F1 · Red Bull Racing', sub: 'Verstappen & Pérez' },
  { icon: '💻', label: 'AMD Enthusiast', sub: 'Ryzen / EPYC' },
  { icon: '🎯', label: 'Minimalismo', sub: 'Diseño limpio & funcional' },
];

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const onFinish = useCallback(() => setLoaded(true), []);

  /* Bidirectional Scroll Reveal — triggers on enter AND exit */
  useEffect(() => {
    if (!loaded) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('vis');
        } else {
          e.target.classList.remove('vis'); // bidirectional: re-animate on re-enter
        }
      }),
      { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
    );
    document.querySelectorAll('.rv').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [loaded]);

  const yr = new Date().getFullYear();
  const exp = yr - 2022;

  return (
    <>
      {!loaded && <LoadingScreen onFinish={onFinish} />}
      <div style={{ position: 'relative', minHeight: '100vh', visibility: loaded ? 'visible' : 'hidden' }}>
        <Head>
          <title>Cristian D. Quispe Lucas | Cybersecurity & Data Science</title>
          <meta name="description" content="Portafolio de Cristian David Quispe Lucas — Ingeniero Estadístico e Informático. Ciberseguridad, Data Science y Desarrollo Web." />
          <meta property="og:title" content="Cristian D. Quispe Lucas | Portfolio" />
          <meta property="og:type" content="website" />
        </Head>
        <main>
          <ParticleGrid />
          <Navbar />

          <div id="inicio"><Hero /></div>

          {/* ═══ ABOUT ═══ */}
          <section id="about" className="sec">
            <div className="sec-in">
              <span className="sec-label rv">Sobre Mí</span>
              <h2 className="sec-h rv rv-d1">Conoce al hacker<br/>detrás del <span className="grad-txt">código</span></h2>
              <div className="glow-line rv rv-d2"></div>
              <div className="ab__grid">
                <div className="ab__text rv rv-d2">
                  <p>Soy <strong>Cristian David Quispe Lucas</strong>, de <strong>Huacho, Lima, Perú</strong>. Estudio <strong>Ingeniería Estadística e Informática</strong> en la <strong>UNJFSC</strong>.</p>
                  <p>Mi pasión por la tecnología nació desmontando dispositivos. Hoy combino <strong>ciberseguridad</strong>, <strong>ciencia de datos</strong> y <strong>desarrollo web</strong> para construir sistemas robustos. Domino desde <strong>Kali Linux</strong> y <strong>Metasploit</strong> hasta <strong>Cálculo III</strong> y <strong>Álgebra Matricial</strong>.</p>
                  <p>El futuro está en la intersección de la IA, el Machine Learning y la defensa digital. Mi misión: proteger lo que importa mientras construyo lo que inspira.</p>
                  <div className="ab__bento">
                    <div className="ab__b-item rv rv-d3"><span className="ab__b-n">+20</span><span className="ab__b-l">Projects<br/>Finished</span></div>
                    <div className="ab__b-item rv rv-d4"><span className="ab__b-n">+{exp}</span><span className="ab__b-l">Years of<br/>Experience</span></div>
                  </div>
                  <div className="ab__passions">
                    {passions.map((p,i)=>(
                      <div key={i} className={`ab__passion rv rv-d${i+5}`}><span className="ab__p-icon">{p.icon}</span><div><strong>{p.label}</strong><br/><span className="ab__p-sub">{p.sub}</span></div></div>
                    ))}
                  </div>
                </div>
                <div className="ab__right">
                  <div className="ab__card rv rv-d3">
                    <div className="ab__card-body">
                      <div className="ab__card-top"><span className="ab__card-tag">STUDENT ID</span><span className="ab__card-on">● Activo</span></div>
                      <div className="ab__card-photo"><img src="/fotos/mifoto.jpg" alt="Cristian"/></div>
                      <h3 className="ab__card-name">Cristian D. Quispe Lucas</h3>
                      <p className="ab__card-role">Ing. Estadística e Informática</p>
                      <div className="ab__card-uni"><img src="/fotos/logouni.png" alt="UNJFSC" className="ab__card-unilogo"/><span>UNJFSC · Huacho</span></div>
                      <div className="ab__card-badges">{badges.map(b=>(<span key={b.label} style={{'--bc':b.color}} className="ab__badge">{b.label}</span>))}</div>
                      <div className="ab__card-info"><div>📍 Huacho, Lima, Perú</div><div>📧 cristianquispelucas@gmail.com</div><div>🎓 UNJFSC</div></div>
                    </div>
                  </div>
                  <div className="rv rv-d5"><ClockWidget /></div>
                  <div className="rv rv-d6"><AudioPlayer /></div>
                </div>
              </div>
            </div>
          </section>

          <div id="projects"><Projects /></div>

          {/* ═══ TOOLS ═══ */}
          <section id="tools" className="sec">
            <div className="sec-in">
              <span className="sec-label rv">Stack Tecnológico</span>
              <h2 className="sec-h rv rv-d1">Tools & <span className="grad-txt">Technologies</span></h2>
              <p className="sec-p rv rv-d2">Herramientas que domino para construir, analizar y proteger.</p>
              <div className="glow-line rv rv-d3"></div>
              <div className="tl__grid">
                {tools.map((t,i)=>(
                  <div key={t.name} className={`tl__item rv rv-d${(i%8)+1}`} style={{'--tc':t.color}}>
                    <img src={t.logo} alt={t.name} className="tl__logo" loading="lazy" />
                    <span className="tl__name">{t.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div id="contact"><Footer /></div>
        </main>
      </div>

      <style>{`
        .ab__grid{display:grid;grid-template-columns:1.2fr .8fr;gap:45px;align-items:start}
        .ab__text p{color:var(--t2);font-size:.98rem;line-height:1.85;margin-bottom:16px}
        .ab__text strong{color:var(--t1)}
        .ab__bento{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:28px 0 24px}
        .ab__b-item{background:var(--bg-glass);border:1px solid var(--b1);border-radius:16px;padding:24px 20px;text-align:center;transition:all .35s var(--ease)}
        .ab__b-item:hover{border-color:var(--b-cyan);background:var(--cyan-d);transform:translateY(-3px)}
        .ab__b-n{display:block;font-size:2.2rem;font-weight:900;background:linear-gradient(135deg,var(--cyan),var(--purple));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:2px}
        .ab__b-l{font-size:.72rem;color:var(--t3);text-transform:uppercase;letter-spacing:1px;font-weight:600;line-height:1.4}
        .ab__passions{display:flex;flex-direction:column;gap:12px;margin-top:10px}
        .ab__passion{display:flex;align-items:center;gap:14px;padding:14px 18px;border-radius:14px;background:var(--bg-glass);border:1px solid var(--b1);transition:all .3s var(--ease)}
        .ab__passion:hover{border-color:var(--b-purple);background:var(--purple-d);transform:translateX(4px)}
        .ab__p-icon{font-size:1.6rem}
        .ab__passion strong{font-size:.88rem;color:var(--t1)}
        .ab__p-sub{font-size:.74rem;color:var(--t3)}
        .ab__card{position:relative;border-radius:22px;padding:2px;background:linear-gradient(135deg,rgba(0,229,255,.3),rgba(168,85,247,.3),rgba(16,185,129,.3));margin-bottom:18px}
        .ab__card-body{background:rgba(8,8,12,.92);backdrop-filter:blur(18px);border-radius:20px;padding:28px 20px;text-align:center}
        .ab__card-top{display:flex;justify-content:space-between;margin-bottom:16px}
        .ab__card-tag{font-family:var(--mono);font-size:.62rem;color:var(--t3);letter-spacing:2px;text-transform:uppercase}
        .ab__card-on{font-size:.68rem;font-weight:600;color:var(--emerald)}
        .ab__card-photo{width:90px;height:90px;margin:0 auto 12px;border-radius:50%;padding:3px;background:linear-gradient(135deg,var(--cyan),var(--purple))}
        .ab__card-photo img{width:100%;height:100%;border-radius:50%;object-fit:cover;border:3px solid #0a0a0c}
        .ab__card-name{font-size:1.05rem;font-weight:700;margin-bottom:2px}
        .ab__card-role{font-size:.75rem;color:var(--t2);font-family:var(--mono);margin-bottom:12px}
        .ab__card-uni{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:14px;font-size:.74rem;color:var(--t2)}
        .ab__card-unilogo{width:22px;height:22px;border-radius:4px;object-fit:contain}
        .ab__card-badges{display:flex;justify-content:center;gap:5px;flex-wrap:wrap;margin-bottom:14px}
        .ab__badge{padding:3px 10px;border-radius:10px;font-size:.64rem;font-weight:700;color:var(--bc);background:color-mix(in srgb,var(--bc) 10%,transparent);border:1px solid color-mix(in srgb,var(--bc) 22%,transparent)}
        .ab__card-info{text-align:left;padding-top:14px;border-top:1px solid rgba(255,255,255,.05);display:flex;flex-direction:column;gap:8px;font-size:.76rem;color:var(--t2)}
        .tl__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
        .tl__item{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px;padding:26px 14px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.04);border-radius:14px;transition:all .35s var(--ease);cursor:default}
        .tl__item:hover{background:color-mix(in srgb,var(--tc) 6%,transparent);border-color:color-mix(in srgb,var(--tc) 28%,transparent);transform:translateY(-4px);box-shadow:0 6px 25px color-mix(in srgb,var(--tc) 10%,transparent)}
        .tl__logo{width:38px;height:38px;object-fit:contain;transition:transform .3s cubic-bezier(.34,1.56,.64,1);filter:grayscale(.3) brightness(.9)}
        .tl__item:hover .tl__logo{transform:scale(1.2);filter:grayscale(0) brightness(1) drop-shadow(0 0 8px var(--tc))}
        .tl__name{font-size:.72rem;font-weight:600;color:var(--t3);transition:color .3s}
        .tl__item:hover .tl__name{color:var(--t2)}
        @media(max-width:960px){.ab__grid{grid-template-columns:1fr;gap:35px}.ab__right{order:-1}}
        @media(max-width:768px){.tl__grid{grid-template-columns:repeat(3,1fr)}}
        @media(max-width:480px){.tl__grid{grid-template-columns:repeat(2,1fr)}.ab__bento{grid-template-columns:1fr}}
      `}</style>
    </>
  );
}