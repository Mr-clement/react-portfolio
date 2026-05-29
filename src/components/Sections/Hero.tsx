import {ChevronDownIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Image from 'next/image';
import {FC, memo, useCallback, useMemo, useState} from 'react';

import {heroData, SectionId} from '../../data/data';
import Section from '../Layout/Section';
import Socials from '../Socials';
import {useRevealOnVisible} from '../../hooks/useRevealOnVisible';

const Hero: FC = memo(() => {
  const {imageSrc, name, description, actions} = heroData;
  const {ref, isVisible} = useRevealOnVisible<HTMLDivElement>();
  const [pointer, setPointer] = useState({x: 50, y: 50});
  const [blurAmount, setBlurAmount] = useState(12);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
    const dx = x / 100 - 0.5;
    const dy = y / 100 - 0.5;
    const distance = Math.sqrt(dx * dx + dy * dy);
    setPointer({x, y});
    setBlurAmount(Math.min(24, 8 + distance * 24));
  }, []);

  const backgroundTransform = useMemo(() => {
    const moveX = (pointer.x - 50) * 0.14;
    const moveY = (pointer.y - 50) * 0.14;
    const rotate = (pointer.x - 50) * 0.6;
    return `translate(${moveX * -1}%, ${moveY * -1}%) scale(1.14) rotate(${rotate}deg)`;
  }, [pointer]);

  const focusClip = useMemo(() => `circle(14% at ${pointer.x}% ${pointer.y}%)`, [pointer]);

  return (
    <Section noPadding sectionId={SectionId.Hero}>
      <div
        className="relative h-screen w-full overflow-hidden"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => {
          setPointer({x: 50, y: 50});
          setBlurAmount(12);
        }}>
        <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 transition-all duration-700 ease-out"
            style={{transform: backgroundTransform, filter: `blur(${blurAmount}px)`}}>
            <Image alt="background" className="h-full w-full object-cover" placeholder="blur" priority src={imageSrc} />
          </div>
          <div
            className="absolute inset-0 transition-all duration-700 ease-out"
            style={{transform: backgroundTransform, clipPath: focusClip}}>
            <Image alt="focus-background" className="h-full w-full object-cover" placeholder="blur" priority src={imageSrc} />
          </div>
          <div className="absolute inset-0 bg-black/35" />
        </div>

        <div
          ref={ref}
          className={classNames(
            'relative z-10 flex h-full w-full items-center justify-center transition-all duration-700 ease-out',
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10',
          )}>
          <div className="flex flex-col items-center gap-y-6 rounded-xl bg-gray-800/40 p-6 text-center shadow-lg backdrop-blur-sm">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-7xl">{name}</h1>
            {description}
            <div className="flex gap-x-4 text-neutral-100">
              <Socials />
            </div>
            <div className="flex w-full justify-center gap-x-4">
              {actions.map(({href, text, primary, Icon}) => (
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
