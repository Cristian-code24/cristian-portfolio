    // AOS init
    AOS.init({ once:false, duration:800, easing:'ease-out-cubic' });

    // Typewriter / texto dinámico
    const phrases = [
      'Pentesting en entornos controlados',
      'Frontend moderno con React',
      'Automatización con Python',
      'Análisis de datos con R + SQL'
    ];
    let idx=0, el=document.getElementById('type');
    function typeLoop(){
      const text = phrases[idx%phrases.length];
      let i=0; el.textContent='';
      const wr = setInterval(()=>{
        el.textContent = text.slice(0, ++i) + '▌';
        if(i===text.length){ clearInterval(wr); setTimeout(()=>erase(text),1000); }
      }, 40);
    }
    function erase(text){
      let i=text.length; const er = setInterval(()=>{
        el.textContent = text.slice(0, --i) + '▌';
        if(i<=0){ clearInterval(er); idx++; setTimeout(typeLoop, 300); }
      }, 20);
    }
    typeLoop();

    // Fondo Matrix Canvas
    const canvas=document.getElementById('matrix');
    const ctx=canvas.getContext('2d');
    let w,h,cols,chars;
    function resize(){
      w=canvas.width=window.innerWidth; h=canvas.height=document.querySelector('.hero').offsetHeight;
      const fontSize=14; cols=Math.floor(w/fontSize); chars=Array(cols).fill(0);
      ctx.font=fontSize+'px JetBrains Mono';
    }
    window.addEventListener('resize', resize); resize();
    function draw(){
      ctx.fillStyle='rgba(10,11,15,0.25)'; ctx.fillRect(0,0,w,h);
      ctx.fillStyle='#00e5ff';
      chars.forEach((y, i)=>{
        const text=String.fromCharCode(0x30A0 + Math.random()*96);
        const x=i*14; ctx.fillText(text, x, y);
        chars[i] = y>h + Math.random()*200 ? 0 : y + 16;
      });
      requestAnimationFrame(draw);
    }
    draw();

    // Hover neon para links
    document.querySelectorAll('.btn, .nav a').forEach(a=>{
      a.addEventListener('mousemove', e=>{
        a.style.boxShadow = '0 0 20px rgba(0,229,255,.35)';
      });
      a.addEventListener('mouseleave', ()=>{
        a.style.boxShadow = 'none';
      });
    });

    // Form (demo)
    document.forms.contact.addEventListener('submit', (e)=>{
      e.preventDefault();
      alert('Gracias por tu mensaje. Me pondré en contacto pronto.');
      e.target.reset();
    });