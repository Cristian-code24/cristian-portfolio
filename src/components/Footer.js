import React, { useState } from 'react';

const chatMsgs = [
  { from: 'them', text: '¡Hola Cristian! Vi tu portafolio, increíble trabajo 🔥', time: '10:32' },
  { from: 'me', text: '¡Gracias! ¿En qué puedo ayudarte?', time: '10:33' },
  { from: 'them', text: 'Necesitamos un pentester y dev para nuestro startup', time: '10:34' },
  { from: 'me', text: '¡Excelente! Mándame los detalles por email y empezamos 🚀', time: '10:35' },
];

export default function Footer() {
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = e => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); setForm({ name: '', email: '', msg: '' }); setTimeout(() => setSent(false), 3000); }, 1500);
  };

  const yr = new Date().getFullYear();

  return (
    <footer className="ft">
      <section className="ft__contact sec">
        <div className="sec-in">
          <div className="ft__hd rv">
            <span className="sec-label">Contacto</span>
            <h2 className="sec-h">Hablemos de tu<br/><span className="grad-txt">próximo proyecto</span></h2>
            <p className="sec-p">¿Tienes una idea? Estoy disponible para freelance, colaboraciones y oportunidades. ¡Escríbeme!</p>
          </div>

          <div className="ft__grid">
            {/* Chat */}
            <div className="ft__chat glass rv rv-d1">
              <div className="ft__ch-head">
                <div className="ft__ch-av"><img src="/fotos/mifoto.jpg" alt="Chat"/><span className="ft__ch-on"></span></div>
                <div><h4 className="ft__ch-nm">Cristian Quispe</h4><span className="ft__ch-st">En línea ahora</span></div>
              </div>
              <div className="ft__ch-body">
                {chatMsgs.map((m, i) => (
                  <div key={i} className={`ft__m ft__m--${m.from}`}>
                    <p>{m.text}</p><span className="ft__m-t">{m.time}</span>
                  </div>
                ))}
              </div>
              <div className="ft__ch-foot">✉ Usa el formulario para enviarme un mensaje real →</div>
            </div>

            {/* Form */}
            <div className="ft__fw glass rv rv-d2">
              <form onSubmit={submit} className="ft__form">
                <div className="ft__f"><label>Nombre</label><input type="text" placeholder="Tu nombre completo" value={form.name} onChange={e => setForm({...form, name:e.target.value})} required/></div>
                <div className="ft__f"><label>Email</label><input type="email" placeholder="tu@email.com" value={form.email} onChange={e => setForm({...form, email:e.target.value})} required/></div>
                <div className="ft__f"><label>Mensaje</label><textarea placeholder="Cuéntame tu idea..." rows="4" value={form.msg} onChange={e => setForm({...form, msg:e.target.value})} required/></div>
                <button type="submit" className="ft__sub" disabled={sending}>
                  {sending ? <><span className="ft__spin"></span>Enviando...</> : sent ? '✓ ¡Enviado!' : <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>Enviar Mensaje</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom */}
      <div className="ft__bot">
        <div className="ft__bot-in">
          <div className="ft__logo"><span className="ft__lh">⬡</span> Cristian<span style={{color:'var(--cyan)', fontWeight:400}}>.dev</span></div>
          <p className="ft__cp">© {yr} Cristian D. Quispe Lucas. Todos los derechos reservados.</p>
          <div className="ft__soc">
            <a href="https://github.com/Cristian-code24" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg></a>
            <a href="https://www.linkedin.com/in/cristian-quispe-lucas-3b5677389" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
            <a href="https://www.tiktok.com/@cris_lucas19" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg></a>
            <a href="mailto:cristianquispelucas@gmail.com" aria-label="Email"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></a>
          </div>
        </div>
      </div>

      <style>{`
        .ft{position:relative;z-index:10}
        .ft__hd{margin-bottom:45px}
        .ft__grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}
        /* Chat */
        .ft__chat{display:flex;flex-direction:column;overflow:hidden}
        .ft__ch-head{display:flex;align-items:center;gap:12px;padding:18px 22px;border-bottom:1px solid rgba(255,255,255,.05)}
        .ft__ch-av{position:relative;width:38px;height:38px}
        .ft__ch-av img{width:100%;height:100%;border-radius:50%;object-fit:cover}
        .ft__ch-on{position:absolute;bottom:0;right:0;width:9px;height:9px;border-radius:50%;background:var(--emerald);border:2px solid #0a0a0c}
        .ft__ch-nm{font-size:.85rem;font-weight:700}
        .ft__ch-st{font-size:.68rem;color:var(--emerald)}
        .ft__ch-body{flex:1;padding:18px;display:flex;flex-direction:column;gap:10px;max-height:280px;overflow-y:auto}
        .ft__m{max-width:78%;padding:9px 14px;border-radius:14px}
        .ft__m p{font-size:.84rem;line-height:1.5;margin:0}
        .ft__m-t{font-size:.62rem;color:var(--t3);margin-top:3px;display:block}
        .ft__m--them{align-self:flex-start;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.05);color:var(--t2);border-bottom-left-radius:3px}
        .ft__m--me{align-self:flex-end;background:linear-gradient(135deg,rgba(0,229,255,.1),rgba(168,85,247,.1));border:1px solid rgba(0,229,255,.12);color:var(--t1);border-bottom-right-radius:3px}
        .ft__ch-foot{padding:12px 18px;border-top:1px solid rgba(255,255,255,.05);font-size:.74rem;color:var(--t3);font-style:italic}
        /* Form */
        .ft__fw{padding:28px}
        .ft__form{display:flex;flex-direction:column;gap:18px}
        .ft__f{display:flex;flex-direction:column;gap:5px}
        .ft__f label{font-size:.75rem;font-weight:600;color:var(--t2);text-transform:uppercase;letter-spacing:1px}
        .ft__f input,.ft__f textarea{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:11px 14px;color:var(--t1);font-size:.88rem;font-family:var(--sans);transition:all .3s;outline:none;resize:none}
        .ft__f input:focus,.ft__f textarea:focus{border-color:rgba(0,229,255,.3);background:rgba(0,229,255,.03);box-shadow:0 0 18px rgba(0,229,255,.06)}
        .ft__f input::placeholder,.ft__f textarea::placeholder{color:var(--t3)}
        .ft__sub{display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:12px 24px;border-radius:10px;font-size:.88rem;font-weight:700;color:#000;background:linear-gradient(135deg,var(--cyan),var(--emerald));transition:all .35s var(--ease);box-shadow:0 4px 16px rgba(0,229,255,.12)}
        .ft__sub:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,229,255,.25)}
        .ft__sub:disabled{opacity:.7;cursor:not-allowed}
        .ft__spin{width:14px;height:14px;border-radius:50%;border:2px solid transparent;border-top-color:#000;animation:sp .6s linear infinite}
        @keyframes sp{to{transform:rotate(360deg)}}
        /* Bottom */
        .ft__bot{border-top:1px solid rgba(255,255,255,.04);padding:24px;background:rgba(0,0,0,.4)}
        .ft__bot-in{max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px}
        .ft__logo{display:flex;align-items:center;gap:6px;font-weight:700;font-size:1.05rem}
        .ft__lh{color:var(--cyan)}
        .ft__cp{font-size:.76rem;color:var(--t3)}
        .ft__soc{display:flex;gap:10px}
        .ft__soc a{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.05);color:var(--t3);transition:all .3s}
        .ft__soc a:hover{color:var(--cyan);border-color:var(--b-cyan);background:var(--cyan-d);transform:translateY(-2px)}
        @media(max-width:768px){.ft__grid{grid-template-columns:1fr}.ft__bot-in{flex-direction:column;text-align:center}}
      `}</style>
    </footer>
  );
}