import React, { useState, useEffect } from 'react';

export default function ClockWidget() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    function tick() {
      const now = new Date();
      // Peru Time (GMT-5)
      const peru = new Date(now.toLocaleString('en-US', { timeZone: 'America/Lima' }));
      setTime(peru.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
      setDate(peru.toLocaleDateString('es-PE', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="clock">
      <div className="clock__time">{time}</div>
      <div className="clock__date">{date}</div>
      <div className="clock__tz">🇵🇪 Lima, Perú · GMT-5</div>
      <style>{`
        .clock {
          padding: 20px 24px; border-radius: 16px;
          background: var(--bg-glass); border: 1px solid var(--b1);
          backdrop-filter: blur(12px);
          text-align: center;
        }
        .clock__time {
          font-family: var(--mono); font-size: 2.2rem; font-weight: 700;
          color: var(--cyan);
          text-shadow: 0 0 20px var(--cyan-g);
          letter-spacing: 3px;
        }
        .clock__date { font-size: .82rem; color: var(--t2); margin-top: 4px; }
        .clock__tz { font-size: .7rem; color: var(--t3); margin-top: 6px; font-family: var(--mono); }
      `}</style>
    </div>
  );
}
