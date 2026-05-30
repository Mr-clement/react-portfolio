import { ChevronDownIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { heroData, SectionId } from '../../data/data';
import Section from '../Layout/Section';
import Socials from '../Socials';
import { useRevealOnVisible } from '../../hooks/useRevealOnVisible';

const Hero: FC = memo(() => {
  const { name, description, actions } = heroData;
  const { ref, isVisible } = useRevealOnVisible<HTMLDivElement>();
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const [blurAmount, setBlurAmount] = useState(4);
  const [follower, setFollower] = useState({ x: 50, y: 50 });
  const rafRef = useRef<number | null>(null);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
    const dx = x / 100 - 0.5;
    const dy = y / 100 - 0.5;
    const distance = Math.sqrt(dx * dx + dy * dy);
    setPointer({ x, y });
    setBlurAmount(Math.min(10, 4 + distance * 8));
  }, []);

  const backgroundTransform = useMemo(() => {
    const x = (pointer.x - 50) / 50;
    const y = (pointer.y - 50) / 50;
    const speed = 4; // 👈 contrôle global

    const moveX = x * speed; // intensité contrôlée
    const moveY = y * speed;

    const rotate = x * 6 + y * 6; // rotation subtile basée sur la position du pointeur

    return `
    translate(${-moveX}%, ${-moveY}%)
    scale(1.14)
    rotate(${rotate}deg)
  `;
  }, [pointer]);

  const followerTransform = useMemo(() => {
    const rx = (follower.x - 50) / 50;
    const ry = (follower.y - 50) / 50;
    const tx = rx * 10; // horizontal shift
    const ty = ry * 8; // vertical shift
    const rot = rx * 12; // rotation
    const sc = 1 + Math.min(0.14, Math.hypot(rx, ry) * 0.12);
    return `translate(-50%, -50%) translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${sc})`;
  }, [follower]);

  // animate follower towards pointer with a small delay (lag)
  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      setFollower(prev => {
        const nx = lerp(prev.x, pointer.x, 0.08); // smaller = slower
        const ny = lerp(prev.y, pointer.y, 0.08);
        return { x: nx, y: ny };
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [pointer]);

  //const focusClip = useMemo(() => `circle(7% at ${pointer.x}% ${pointer.y}%)`, [pointer]);

  return (
    <Section noPadding sectionId={SectionId.Hero}>
      <div
        className="relative h-screen w-full overflow-hidden"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => {
              setPointer({ x: 50, y: 50 });
              setBlurAmount(4);
            }}>
         

          {/* Couche 1 : vidéo floue en fond (toute la surface) */}
           <div
            className="fixed inset-0 -z-20 transition-all duration-700 ease-out"
            style={{ transform: backgroundTransform, filter: `blur(${blurAmount}px)` }}>
            <video autoPlay muted loop playsInline className="h-full w-full object-cover">
              <source src="/images/background1.mp4" type="video/mp4" />
            </video> 
            {/* Overlay sombre global en fond stylisé (opacité augmentée) */}
          <div className="absolute inset-0 overlay-bg" style={{opacity: 0.85}} />
          </div> 
         
         {/* Web3-style follower blob */}
         <div
           aria-hidden
           style={{
             left: `${pointer.x}%`,
             top: `${pointer.y}%`,
             width: 200,
             height: 140,
             position: 'absolute',
             zIndex: 50,
             pointerEvents: 'none',
             transform: followerTransform,
             transition: 'transform 140ms ease-out',
           }}>
           <svg viewBox="0 0 180 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
             <defs>
               <linearGradient id="gWeb3" x1="0" x2="1">
                 <stop offset="0%" stopColor="#7bbcb4" stopOpacity="0.95" />
                 <stop offset="60%" stopColor="#0b6b63" stopOpacity="0.85" />
               </linearGradient>
               <filter id="fBlur" x="-40%" y="-40%" width="180%" height="180%">
                 <feGaussianBlur stdDeviation="8" />
               </filter>
             </defs>
             <g filter="url(#fBlur)">
               <path d="M60,10 C95,5 150,18 150,60 C150,100 95,115 60,105 C25,95 10,72 10,50 C10,26 25,15 60,10 Z" fill="url(#gWeb3)" stroke="rgba(123,188,180,0.28)" strokeWidth="2" />
             </g>
             <path d="M60,10 C95,5 150,18 150,60 C150,100 95,115 60,105 C25,95 10,72 10,50 C10,26 25,15 60,10 Z" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
           </svg>
         </div>
         

        {/* Partie description de la page principale avec un effet de focus autour du pointeur de la souris, et un flou qui augmente à mesure que le pointeur s'éloigne du centre de l'écran. Le texte et les boutons d'action sont affichés au-dessus de l'image de fond, avec une animation d'apparition lorsqu'ils deviennent visibles à l'écran. */}
        

        <div
          ref={ref}
          className={classNames(
            'relative z-10 flex h-full w-full items-center justify-center transition-all duration-700 ease-out',
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10',
          )}>
          <div className="flex flex-col items-center w-[75%] gap-y-6 rounded-xl bg-gray-800/40 p-6 text-center shadow-lg backdrop-blur-4">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-7xl">{name}</h1>
            {description}
            <div className="flex gap-x-4 text-neutral-100">
              <Socials />
            </div>
            <div className="flex w-full justify-center gap-x-4">
              {actions.map(({ href, text, primary, Icon }) => (
                <a
                  className={classNames(
                    'flex gap-x-2 rounded-full border-2 bg-none px-4 py-2 text-sm font-medium text-white ring-offset-gray-700/80 hover:bg-[#7bbcb4]/20 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-base',
                    primary ? 'border-[#7bbcb4] ring-[#7bbcb4]' : 'border-white ring-white',
                  )}
                  href={href}
                  key={text}>
                  {text}
                  {Icon && <Icon className="h-5 w-5 text-white sm:h-6 sm:w-6" />}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-6 flex justify-center">
          <a
            className="rounded-full bg-white p-1 ring-white ring-offset-2 ring-offset-gray-700/80 focus:outline-none focus:ring-2 sm:p-2"
            href={`/#${SectionId.About}`}>
            <ChevronDownIcon className="h-5 w-5 bg-transparent sm:h-6 sm:w-6" />
          </a>
        </div>
      </div>
    </Section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
