/**
 * ==================================================================================
 * SCRIPT PARA PORTAFOLIO WEB INTERACTIVO v2.1
 * ==================================================================================
 * Descripción: Script mejorado y modularizado que gestiona todas las
 * funcionalidades dinámicas del portafolio.
 *
 * Secciones:
 * 1. Inicializador Principal
 * 2. Inicialización de AOS (Animate On Scroll)
 * 3. Módulo: Efecto de Máquina de Escribir (Typewriter)
 * 4. Módulo: Fondo Animado Matrix
 * 5. Módulo: Interacciones de UI (Hover Neón)
 * 6. Módulo: Formulario de Contacto
 * 7. Módulo: Reloj y Fecha de Perú
 * 8. Módulo: Control de Audio
 * ==================================================================================
 */

// Se ejecuta cuando todo el contenido del DOM ha sido cargado y parseado.
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. INICIALIZADOR PRINCIPAL --- //
    // Llama a todas las funciones modulares para activar las características del sitio.
    const init = () => {
        initAOS();
        initTypewriterEffect();
        initMatrixBackground();
        initNeonHover();
        initContactForm();
        initPeruClock();
        initAudioPlayer(); // Llama al módulo de audio.
    };


    // --- 2. INICIALIZACIÓN DE AOS (ANIMATE ON SCROLL) --- //
    const initAOS = () => {
        // Verifica si la librería AOS está disponible antes de inicializarla.
        if (typeof AOS !== 'undefined') {
            AOS.init({
                once: false, // Las animaciones se repiten al scrollear arriba y abajo.
                duration: 800, // Duración de la animación en milisegundos.
                easing: 'ease-out-cubic' // Curva de aceleración de la animación.
            });
        } else {
            console.warn('Librería AOS no encontrada. Las animaciones en scroll están desactivadas.');
        }
    };


    // --- 3. MÓDULO: EFECTO DE MÁQUINA DE ESCRIBIR (TYPEWRITER) --- //
    const initTypewriterEffect = () => {
        const typewriterElement = document.getElementById('type');

        // Si el elemento no existe, no se ejecuta el resto del código.
        if (!typewriterElement) {
            console.warn('Elemento con id "type" no encontrado para el efecto typewriter.');
            return;
        }

        const phrases = [
            'Pentesting en entornos controlados',
            'Frontend moderno con React',
            'Automatización con Python',
            'Análisis de datos con R + SQL'
        ];

        let phraseIndex = 0; // Índice de la frase actual.
        let charIndex = 0; // Índice del carácter actual.
        let isErasing = false; // Estado para saber si se está borrando.

        const typeLoop = () => {
            const currentPhrase = phrases[phraseIndex];
            const baseSpeed = isErasing ? 30 : 70; // Velocidad de escritura/borrado.
            const randomSpeed = Math.random() * 50; // Añade un toque humano.

            // Modo borrado.
            if (isErasing) {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1) + '▌';
                charIndex--;

                // Si se ha borrado todo, cambia al modo escritura para la siguiente frase.
                if (charIndex === 0) {
                    isErasing = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                }
            }
            // Modo escritura.
            else {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1) + '▌';
                charIndex++;

                // Si se ha escrito toda la frase, espera y cambia a modo borrado.
                if (charIndex === currentPhrase.length) {
                    setTimeout(() => {
                        isErasing = true;
                        typeLoop();
                    }, 1500); // Pausa al final de la frase.
                    return;
                }
            }

            // Llama a la función de nuevo con un tiempo de espera.
            setTimeout(typeLoop, baseSpeed + randomSpeed);
        };

        // Inicia el ciclo.
        typeLoop();
    };


    // --- 4. MÓDULO: FONDO ANIMADO MATRIX --- //
    const initMatrixBackground = () => {
        const canvas = document.getElementById('matrix');

        if (!canvas) {
            console.warn('Canvas con id "matrix" no encontrado para el fondo.');
            return;
        }

        const ctx = canvas.getContext('2d');
        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const alphabet = katakana + latin + nums;
        const fontSize = 16;
        let columns, rainDrops;

        // Ajusta el canvas al tamaño de la ventana y reinicia las gotas.
        const resizeCanvas = () => {
            const heroSection = document.querySelector('.hero');
            canvas.width = window.innerWidth;
            canvas.height = heroSection ? heroSection.offsetHeight : window.innerHeight;
            columns = Math.floor(canvas.width / fontSize);
            rainDrops = Array(columns).fill(1);
        };

        // Dibuja los caracteres en el canvas.
        const draw = () => {
            // Fondo semitransparente para crear el efecto de estela.
            ctx.fillStyle = 'rgba(10, 11, 15, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00e5ff'; // Color neón de los caracteres.
            ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                // Reinicia la gota de forma aleatoria para un efecto más natural.
                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        setInterval(draw, 35); // Aproximadamente 28 FPS.
    };


    // --- 5. MÓDULO: INTERACCIONES DE UI (HOVER NEÓN) --- //
    const initNeonHover = () => {
        const interactiveElements = document.querySelectorAll('.btn, .nav a');

        interactiveElements.forEach(element => {
            element.addEventListener('mousemove', () => {
                element.style.boxShadow = '0 0 20px rgba(0, 229, 255, 0.35)';
            });

            element.addEventListener('mouseleave', () => {
                element.style.boxShadow = 'none';
            });
        });
    };


    // --- 6. MÓDULO: FORMULARIO DE CONTACTO --- //
    const initContactForm = () => {
        const contactForm = document.forms['contact'];
        if (!contactForm) return;

        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita que la página se recargue.
            alert('Gracias por tu mensaje. Me pondré en contacto pronto.');
            event.target.reset(); // Limpia los campos del formulario.
        });
    };


    // --- 7. MÓDULO: RELOJ Y FECHA DE PERÚ --- //
    const initPeruClock = () => {
        // Crea un contenedor para el reloj si no existe.
        let clockContainer = document.getElementById('clock-container');
        if (!clockContainer) {
            clockContainer = document.createElement('div');
            clockContainer.id = 'clock-container';
            document.body.appendChild(clockContainer);

            // Estilos para posicionar el reloj de forma no intrusiva.
            Object.assign(clockContainer.style, {
                position: 'fixed',
                bottom: '15px',
                right: '15px',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '14px',
                color: '#00e5ff',
                backgroundColor: 'rgba(10, 11, 15, 0.7)',
                padding: '5px 10px',
                borderRadius: '4px',
                zIndex: '1000',
                textShadow: '0 0 5px #00e5ff'
            });
        }

        const updateClock = () => {
            const now = new Date();
            const options = {
                timeZone: 'America/Lima', // Zona horaria de Perú.
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour12: false
            };
            // Formatea la fecha y hora.
            const peruTime = now.toLocaleString('es-PE', options).replace(',', ' |');
            clockContainer.textContent = `[ ${peruTime} ]`;
        };

        setInterval(updateClock, 1000); // Actualiza cada segundo.
        updateClock(); // Llama una vez para que no haya retraso inicial.
    };


    // --- 8. MÓDULO: CONTROL DE AUDIO --- //
    const initAudioPlayer = () => {
        // Crea un contenedor para el control de audio si no existe.
        let audioContainer = document.getElementById('audio-container');
        if (!audioContainer) {
            audioContainer = document.createElement('div');
            audioContainer.id = 'audio-container';
            document.body.appendChild(audioContainer);

            // Estilos para el control de audio.
            Object.assign(audioContainer.style, {
                position: 'fixed',
                bottom: '60px', // Posicionado encima del reloj.
                right: '15px',
                zIndex: '1000'
            });
        }

        // Crea el botón y el elemento de audio dinámicamente.
        const audioToggleButton = document.createElement('button');
        audioToggleButton.id = 'audio-toggle-button';
        audioToggleButton.innerHTML = '▶';
        Object.assign(audioToggleButton.style, {
            background: 'rgba(0,229,255,0.2)',
            border: '1px solid #00e5ff',
            color: '#00e5ff',
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '16px'
        });

        const ambientAudio = document.createElement('audio');
        ambientAudio.id = 'ambient-audio';
        ambientAudio.loop = true;

        // =================================================================
        // AQUÍ ASIGNAS LA RUTA DE TU ARCHIVO DE AUDIO
        // Ejemplo: 'audio/ambiente.mp3' o 'https://example.com/audio.ogg'
        ambientAudio.src = 'music/audio.m4a';
        // =================================================================

        audioContainer.appendChild(audioToggleButton);
        audioContainer.appendChild(ambientAudio);


        // Lógica para el botón de reproducción/pausa.
        audioToggleButton.addEventListener('click', () => {
            // Comprueba si el audio está en pausa para reproducirlo o pausarlo.
            if (ambientAudio.paused) {
                ambientAudio.play().catch(error => console.error("Error al reproducir audio:", error));
                audioToggleButton.textContent = '❚❚'; // Icono de pausa.
            } else {
                ambientAudio.pause();
                audioToggleButton.textContent = '▶'; // Icono de play.
            }
        });
    };

    // --- Ejecuta el inicializador principal --- //
    init();
});
