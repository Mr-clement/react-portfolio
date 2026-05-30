import {FC, memo, useEffect, useState} from 'react';

const sideLines = [
  'DÉVELOPPEUR WEB',
  'MOBILE FULL STACK',
  'REACT / NODE.JS',
  'DJANGO / MONGODB',
  'INTERFACES RESPONSIVES',
  'OPTIMISATION UX',
  'SOLUTIONS SUR MESURE',
  'TÉLÉTRAVAIL POSSIBLE',
];

const SideScrollText: FC = memo(() => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHidden(window.scrollY > window.innerHeight * 2); // Hide after scrolling past 2 viewport heights
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className={`fixed left-2 top-0 z-10 h-screen w-30 items-center justify-center py-4 flex ${
          hidden ? 'opacity-0' : 'opacity-100'
        } transition-opacity duration-700`}>
        <div className="h-full overflow-hidden">
          <div className="animate-vertical-scroll flex flex-col gap-y-8 text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-[#aecfaa]/80">
            {[...sideLines, ...sideLines, ...sideLines, ...sideLines].map((text, idx) => (
              <span key={`right-text-${idx}`}>{text}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
});

SideScrollText.displayName = 'SideScrollText';
export default SideScrollText;
