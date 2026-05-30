import { FC, useEffect, useRef, useState } from 'react';

const Follower: FC = () => {
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const [follower, setFollower] = useState({ x: 50, y: 50 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMove = (e: PointerEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ((e as TouchEvent).touches) {
        const t = (e as TouchEvent).touches[0];
        clientX = t.clientX;
        clientY = t.clientY;
      } else {
        const p = e as PointerEvent;
        clientX = p.clientX;
        clientY = p.clientY;
      }
      const w = window.innerWidth;
      const h = window.innerHeight;
      setPointer({ x: (clientX / w) * 100, y: (clientY / h) * 100 });
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handleMove as EventListener);
      window.removeEventListener('touchmove', handleMove as EventListener);
    };
  }, []);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      setFollower(prev => ({
        x: lerp(prev.x, pointer.x, 0.01),
        y: lerp(prev.y, pointer.y, 0.02),
      }));
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pointer]);

  const rx = (follower.x - 50) / 50;
  const ry = (follower.y - 50) / 50;
  const tx = rx * 8;
  const ty = ry * 6;
  const rot = rx * 10;
  const sc = 1 + Math.min(0.12, Math.hypot(rx, ry) * 0.1);

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        left: `${follower.x}%`,
        top: `${follower.y}%`,
        width: 220,
        height: 160,
        pointerEvents: 'none',
        transform: `translate(-50%, -50%) translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${sc})`,
        transition: 'transform 200ms linear',
        zIndex: 0,
         opacity: 0.5,
      }}>
      <svg viewBox="0 0 180 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="gWeb3Global" x1="0" x2="1">
            <stop offset="0%" stopColor="#7bbcb4" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#0b6b63" stopOpacity="0.8" />
          </linearGradient>
          <filter id="fBlurGlobal" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>
        <g filter="url(#fBlurGlobal)">
          <path d="M60,10 C95,5 150,18 150,60 C150,100 95,115 60,105 C25,95 10,72 10,50 C10,26 25,15 60,10 Z" fill="url(#gWeb3Global)" stroke="rgba(123,188,180,0.22)" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
};

export default Follower;
