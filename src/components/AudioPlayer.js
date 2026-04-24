import React, { useState, useRef, useEffect } from 'react';

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const rafRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');

  function fmt(s) {
    if (isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  }

  function initAnalyser() {
    if (sourceRef.current) return;
    const audio = audioRef.current;
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    const src = ac.createMediaElementSource(audio);
    const analyser = ac.createAnalyser();
    analyser.fftSize = 128;
    src.connect(analyser);
    analyser.connect(ac.destination);
    analyserRef.current = analyser;
    sourceRef.current = src;
  }

  function drawBars() {
    const c = canvasRef.current;
    const ctx = ctxRef.current;
    const analyser = analyserRef.current;
    if (!c || !ctx || !analyser) return;

    const W = c.width;
    const H = c.height;
    const bufLen = analyser.frequencyBinCount;
    const data = new Uint8Array(bufLen);
    analyser.getByteFrequencyData(data);

    ctx.clearRect(0, 0, W, H);

    const barW = W / bufLen;
    for (let i = 0; i < bufLen; i++) {
      const h = (data[i] / 255) * H;
      const x = i * barW;

      const grad = ctx.createLinearGradient(0, H, 0, H - h);
      grad.addColorStop(0, 'rgba(0,229,255,0.6)');
      grad.addColorStop(1, 'rgba(168,85,247,0.8)');
      ctx.fillStyle = grad;

      ctx.beginPath();
      const r = Math.min(barW * 0.4, 3);
      ctx.roundRect(x + 1, H - h, barW - 2, h, [r, r, 0, 0]);
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(drawBars);
  }

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      cancelAnimationFrame(rafRef.current);
    } else {
      initAnalyser();
      audio.play();
      drawBars();
    }
    setPlaying(!playing);
  }

  useEffect(() => {
    const c = canvasRef.current;
    if (c) {
      c.width = 280;
      c.height = 50;
      ctxRef.current = c.getContext('2d');
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  function onTimeUpdate() {
    const a = audioRef.current;
    if (!a) return;
    setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0);
    setCurTime(fmt(a.currentTime));
  }

  function onLoaded() {
    setDuration(fmt(audioRef.current?.duration));
  }

  function onSeek(e) {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    a.currentTime = pct * a.duration;
  }

  return (
    <div className="ap">
      <audio ref={audioRef} src="/music/audio.m4a" preload="metadata" onTimeUpdate={onTimeUpdate} onLoadedMetadata={onLoaded} onEnded={() => { setPlaying(false); cancelAnimationFrame(rafRef.current); }} />

      <div className="ap__top">
        <button className="ap__play" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          )}
        </button>
        <div className="ap__info">
          <span className="ap__title">🎵 Crislinux Anthem</span>
          <span className="ap__artist">Cristian Lucas</span>
        </div>
      </div>

      <canvas ref={canvasRef} className="ap__viz" />

      <div className="ap__bar-wrap" onClick={onSeek}>
        <div className="ap__bar">
          <div className="ap__bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="ap__times">
          <span>{currentTime}</span>
          <span>{duration}</span>
        </div>
      </div>

      <style>{`
        .ap {
          padding: 20px; border-radius: 16px;
          background: var(--bg-glass); border: 1px solid var(--b1);
          backdrop-filter: blur(12px);
        }
        .ap__top { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
        .ap__play {
          width: 42px; height: 42px; border-radius: 50%;
          background: linear-gradient(135deg, var(--cyan), var(--emerald));
          display: flex; align-items: center; justify-content: center;
          color: #000; transition: all .3s var(--ease);
          flex-shrink: 0;
        }
        .ap__play:hover { transform: scale(1.08); box-shadow: 0 0 20px var(--cyan-g); }
        .ap__info { display: flex; flex-direction: column; }
        .ap__title { font-size: .85rem; font-weight: 700; color: var(--t1); }
        .ap__artist { font-size: .72rem; color: var(--t3); }
        .ap__viz { width: 100%; height: 50px; border-radius: 8px; margin-bottom: 10px; }
        .ap__bar-wrap { cursor: pointer; }
        .ap__bar { width: 100%; height: 4px; background: rgba(255,255,255,.06); border-radius: 2px; overflow: hidden; }
        .ap__bar-fill { height: 100%; background: linear-gradient(90deg, var(--cyan), var(--purple)); border-radius: 2px; transition: width .1s; }
        .ap__times { display: flex; justify-content: space-between; margin-top: 6px; font-size: .68rem; color: var(--t3); font-family: var(--mono); }
      `}</style>
    </div>
  );
}
