import { ChevronDownIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { FC, memo, useCallback, useMemo, useState } from 'react';

import { heroData, SectionId } from '../../data/data';
import Section from '../Layout/Section';
import Socials from '../Socials';
import { useRevealOnVisible } from '../../hooks/useRevealOnVisible';

const Hero: FC = memo(() => {
  const { name, description, actions } = heroData;
  const { ref, isVisible } = useRevealOnVisible<HTMLDivElement>();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [blurAmount, setBlurAmount] = useState(10);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
    const dx = x / 100 - 0.5;
    const dy = y / 100 - 0.5;
    const distance = Math.sqrt(dx * dx + dy * dy);
    setPointer({ x, y });
    setBlurAmount(Math.min(18, 10 + distance * 14));
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

  //const focusClip = useMemo(() => `circle(7% at ${pointer.x}% ${pointer.y}%)`, [pointer]);

  return (
    <Section noPadding sectionId={SectionId.Hero}>
      <div
        className="relative h-screen w-full overflow-hidden"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => {
          setPointer({ x: 50, y: 50 });
          setBlurAmount(12);
        }}>
         

          {/* Couche 1 : vidéo floue en fond (toute la surface) */}
           <div
            className="absolute inset-0 transition-all duration-700 ease-out"
            style={{ transform: backgroundTransform, filter: `blur(${blurAmount}px)` }}>
            <video autoPlay muted loop playsInline className="h-full w-full object-cover">
              <source src="/images/background1.mp4" type="video/mp4" />
            </video> 
            {/* Overlay sombre global */}
          <div className="absolute inset-0 bg-black/40" />
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
